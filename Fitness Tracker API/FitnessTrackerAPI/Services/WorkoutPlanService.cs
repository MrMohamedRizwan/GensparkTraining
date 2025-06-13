using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FitnessTrackerAPI.Context;
using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Models;
using FitnessTrackerAPI.Models.Diet;
using FitnessTrackerAPI.Models.DTOs;
using FitnessTrackerAPI.Models.WorkoutModel;

namespace FitnessTrackerAPI.Services
{
    public class WorkoutPlanService : IWorkoutPlan
    {
        private readonly IMapper _mapper;
        private readonly IRepository<string, User> _userRepository;
        private readonly IEncryptionService _encryptionService;
        private readonly IRepository<Guid, Coach> _coachRepository;
        private readonly FitnessDBContext _context;
        private readonly IRepository<Guid, DietMeal> _dietMealRepository;
        private readonly IRepository<Guid, DietPlan> _dietPlanRepository;
        private readonly IRepository<Guid, WorkoutPlan> _workoutPlanRepository;
        private readonly IRepository<Guid, WorkoutExercise> _workoutExerciseRepository;

        private readonly IRepository<Guid, PlanAssignment> _planAssignmentRepository;
        private readonly IRepository<Guid, Client> _clientRepository;




        public WorkoutPlanService(IMapper mapper,
                            IEncryptionService encryptionService,
                            IRepository<string, User> userRepository,
                            IRepository<Guid, Coach> coachRepository,
                            IRepository<Guid, DietMeal> dietMealRepository,
                            IRepository<Guid, DietPlan> dietPlanRepository,
                            IRepository<Guid, WorkoutPlan> workoutPlanRepository,
                            IRepository<Guid, WorkoutExercise> workoutExerciseRepository,
                            FitnessDBContext context,
                             IRepository<Guid, PlanAssignment> planAssignmentRepository,
                              IRepository<Guid, Client> clientRepository
                            )
        {
            _mapper = mapper;
            _encryptionService = encryptionService;
            _userRepository = userRepository;
            _coachRepository = coachRepository;
            _dietMealRepository = dietMealRepository;
            _dietPlanRepository = dietPlanRepository;
            _workoutPlanRepository = workoutPlanRepository;
            _workoutExerciseRepository = workoutExerciseRepository;
            _planAssignmentRepository = planAssignmentRepository;
            _clientRepository = clientRepository;

            _context = context;
        }
        
         public async Task<WorkoutPlan> AddWorkoutPlan(WorkoutPlanCreateRequestDTO workout, ClaimsPrincipal user)
        {
            var coachIdClaim = user.FindFirst("UserId")?.Value;
            if (coachIdClaim == null || !Guid.TryParse(coachIdClaim, out Guid coachId))
                throw new Exception("Invalid Coach ID from token");
            var existingPlans = await _workoutPlanRepository.GetAll();
            if (existingPlans.Any(p => p.CoachId == coachId && p.Title.ToLower() == workout.Title.ToLower()))
            {
                throw new Exception("A workout plan with this title already exists. Choose a new title or edit the previous workout plan");
            }
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var workoutPlan = _mapper.Map<WorkoutPlan>(workout);
                workoutPlan.Id = Guid.NewGuid();
                workoutPlan.CoachId = coachId;
                workoutPlan = await _workoutPlanRepository.Add(workoutPlan);

                var exercise = workout.Exercises.Select(workoutDto =>
                {
                    var exe = _mapper.Map<WorkoutExercise>(workoutDto);
                    exe.Id = Guid.NewGuid();
                    exe.WorkoutPlanId = workoutPlan.Id;
                    return exe;
                }).ToList();

                foreach (var x in exercise)
                    await _workoutExerciseRepository.Add(x);

                await transaction.CommitAsync();
                workoutPlan.Exercises = exercise;
                return workoutPlan;
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                throw new Exception(e.Message);
            }

        }

        public async Task<WorkoutPlan> UpdateWorkoutPlanByTitle(string title, WorkoutPlanCreateRequestDTO dto, ClaimsPrincipal user)
        {
            var coachIdClaim = user.FindFirst("UserId")?.Value;
            if (coachIdClaim == null || !Guid.TryParse(coachIdClaim, out Guid coachId))
                throw new Exception("Invalid Coach ID from token");

            var normalizedTitle = title.Trim().ToLower();
            var workoutPlans = await _workoutPlanRepository.GetAll();
            var existingWorkoutPlan = workoutPlans.FirstOrDefault(dp =>
                dp.CoachId == coachId &&
                dp.Title.Trim().ToLower() == normalizedTitle
            );

            if (existingWorkoutPlan == null)
                throw new Exception("Workout plan not found or unauthorized access");

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                existingWorkoutPlan.Title = dto.Title.Trim();
                existingWorkoutPlan.Title = dto.Title;
                existingWorkoutPlan.Description = dto.Description;
                existingWorkoutPlan.DurationInWeeks = dto.DurationInWeeks;
                var existingWorkout = (await _workoutExerciseRepository.GetAll())
                                    .Where(m => m.WorkoutPlanId == existingWorkoutPlan.Id).ToList();
                foreach (var workout in existingWorkout)
                {
                    await _workoutExerciseRepository.Delete(workout.Id);
                }

                var newExercice = dto.Exercises.Select(exerciseDto =>
                {
                    var ex = _mapper.Map<WorkoutExercise>(exerciseDto);
                    ex.Id = Guid.NewGuid();
                    ex.WorkoutPlanId = existingWorkoutPlan.Id;
                    return ex;
                }).ToList();

                foreach (var ex in newExercice)
                    await _workoutExerciseRepository.Add(ex);

                await transaction.CommitAsync();

                existingWorkoutPlan.Exercises = newExercice;
                return existingWorkoutPlan;

            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                throw new Exception(e.Message);
            }
        }

        public async Task<bool> DeleteWorkoutPlanByTitle(string title, ClaimsPrincipal user)
        {
            var coachIdClaim = user.FindFirst("UserId")?.Value;
            if (coachIdClaim == null || !Guid.TryParse(coachIdClaim, out Guid coachId))
                throw new Exception("Invalid Coach ID from token");

            var normalizedTitle = title.Trim().ToLower();
            var allPlan = await _workoutPlanRepository.GetAll();
            var workoutPlan = allPlan.FirstOrDefault(dp =>
                dp.CoachId == coachId &&
                dp.Title.Trim().ToLower() == normalizedTitle);
            if (workoutPlan == null)
                throw new Exception("Workout plan not found or unauthorized access");

            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var workout = (await _workoutExerciseRepository.GetAll())
                            .Where(m => m.WorkoutPlanId == workoutPlan.Id)
                            .ToList();

                foreach (var x in workout)
                    await _workoutExerciseRepository.Delete(x.Id);

                await _workoutPlanRepository.Delete(workoutPlan.Id);
                await transaction.CommitAsync();

                return true;

            }
            catch (System.Exception e)
            {
                await transaction.RollbackAsync();
                throw new Exception(e.Message);
            }
        }

        public async Task<PagedResult<WorkoutPlanResponseDTO>> GetAllWorkoutPlansDTO(ClaimsPrincipal user,int pageNumber, int pageSize )
        {
            var coachIdClaim = user.FindFirst("UserId")?.Value;
            if (coachIdClaim == null || !Guid.TryParse(coachIdClaim, out Guid coachId))
                throw new Exception("Invalid Coach ID from token");

            var allPlans = await _workoutPlanRepository.GetAll();
            var coachPlans = allPlans.Where(p => p.CoachId == coachId).ToList();

            var allWorkouts = await _workoutExerciseRepository.GetAll();
            var exerciseGroups = allWorkouts
                             .Where(m => coachPlans.Select(p => p.Id).Contains(m.WorkoutPlanId))
                             .GroupBy(m => m.WorkoutPlanId)
                             .ToDictionary(g => g.Key, g => g.ToList());

            var result = coachPlans.Select(p => new WorkoutPlanResponseDTO
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                DurationInWeeks = p.DurationInWeeks,
                Exercises = exerciseGroups.ContainsKey(p.Id)
                    ? exerciseGroups[p.Id].Select(m => new WorkoutExerciseResponseDTO
                    {
                        Id = m.Id,
                        Name = m.Name,
                        Sets = m.Sets,
                        Reps = m.Reps,
                        RestSeconds = m.RestSeconds,
                        Notes = m.Notes
                    }).ToList()
                    : new List<WorkoutExerciseResponseDTO>()
            }).ToList();

             var pagedItems = result
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

            return new PagedResult<WorkoutPlanResponseDTO>
            {
                Items = pagedItems,
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalRecords = result.Count
            };
        }


        public async Task<WorkoutPlanResponseDTO?> GetWorkouttPlanByTitle(string title, ClaimsPrincipal user)
        {
            var coachIdClaim = user.FindFirst("UserId")?.Value;
            if (coachIdClaim == null || !Guid.TryParse(coachIdClaim, out Guid coachId))
                throw new Exception("Invalid Coach ID");
            // Console.WriteLine("💕");
            var plans = await _workoutPlanRepository.GetAll();
            // Console.WriteLine($"{plans.FirstOrDefault(p=>p.CoachId==coachId)} ✅");
            var normalizedTitle = title.Trim();
            var plan = plans.FirstOrDefault(p =>
                p.CoachId == coachId &&
                p.Title == normalizedTitle);

            // Console.WriteLine($"\n\nExercise {normalizedTitle} {plan}✅");
            
            if (plan == null)
                return null;

            var exercise = (await _workoutExerciseRepository.GetAll())
                            .Where(m => m.WorkoutPlanId == plan.Id)
                            .ToList();


            return new WorkoutPlanResponseDTO
            {
                Id = plan.Id,
                Title = plan.Title,
                Description = plan.Description,
                DurationInWeeks = plan.DurationInWeeks,
                Exercises = exercise.Select(m => new WorkoutExerciseResponseDTO
                {
                    Id = m.Id,
                    Name = m.Name,
                    Sets = m.Sets,
                    Reps = m.Reps,
                    RestSeconds = m.RestSeconds,
                    Notes = m.Notes
                }).ToList()
            };
        }

    }
}