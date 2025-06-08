using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
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
    public class CoachService : ICoachService
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



        public CoachService(IMapper mapper,
                            IEncryptionService encryptionService,
                            IRepository<string, User> userRepository,
                            IRepository<Guid, Coach> coachRepository,
                            IRepository<Guid, DietMeal> dietMealRepository,
                            IRepository<Guid, DietPlan> dietPlanRepository,
                            IRepository<Guid, WorkoutPlan> workoutPlanRepository,
                            IRepository<Guid, WorkoutExercise> workoutExerciseRepository,
                            FitnessDBContext context
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
            _context = context;
        }

        public async Task<SignUpResponseDTO> AddCoach(CoachAddRequestDTO coach)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // System.Console.WriteLine("Before DB 😒");

                var user = _mapper.Map<CoachAddRequestDTO, User>(coach);
                var existingUser = await _userRepository.Get(coach.Email);
                if (existingUser != null)
                    throw new Exception("User Already Exist");

                var encryptedData = await _encryptionService.EncryptData(new EncryptModel
                {
                    Data = coach.Password
                });

                user.Password = encryptedData.EncryptedData;
                user.Role = "Coach";
                user = await _userRepository.Add(user);

                var newCoach = _mapper.Map<CoachAddRequestDTO, Coach>(coach);
                newCoach.Email = user.Email;

                newCoach = await _coachRepository.Add(newCoach);
                if (newCoach == null)
                    throw new Exception("Could not add Coach");
                await transaction.CommitAsync();
                return new SignUpResponseDTO
                {
                    Id = newCoach.Id,
                    Email = newCoach.Email

                };
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                Console.WriteLine($"Error ❌ {e.Message}");
                throw new Exception(e.Message);
            }
        }

        public async Task<DietPlan> AddMeal(DietPlanCreateRequestDTO diet, ClaimsPrincipal user)
        {

            var coachIdClaim = user.FindFirst("UserId")?.Value;
            if (coachIdClaim == null || !Guid.TryParse(coachIdClaim, out Guid coachId))
                throw new Exception("Invalid Coach ID from token");
            var existingPlans = await _dietPlanRepository.GetAll();
            if (existingPlans.Any(p => p.CoachId == coachId && p.DietTitle.ToLower() == diet.DietTitle.ToLower()))
            {
                throw new Exception("A diet plan with this title already exists. Choose a new title or edit the previous diet plan");
            }
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var dietPlan = _mapper.Map<DietPlan>(diet);
                dietPlan.Id = Guid.NewGuid();
                dietPlan.CoachId = coachId;

                dietPlan = await _dietPlanRepository.Add(dietPlan);

                var meals = diet.Meals.Select(mealDto =>
                {
                    var meal = _mapper.Map<DietMeal>(mealDto);
                    meal.Id = Guid.NewGuid();
                    meal.DietPlanId = dietPlan.Id;
                    return meal;
                }).ToList();

                foreach (var meal in meals)
                {
                    await _dietMealRepository.Add(meal);
                }

                await transaction.CommitAsync();
                dietPlan.Meals = meals;
                return dietPlan;
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                throw new Exception(e.Message);
            }
        }
        public async Task<DietPlan> UpdateDietPlanByTitle(string title, DietPlanCreateRequestDTO dto, ClaimsPrincipal user)
        {
            var coachIdClaim = user.FindFirst("UserId")?.Value;
            if (coachIdClaim == null || !Guid.TryParse(coachIdClaim, out Guid coachId))
                throw new Exception("Invalid Coach ID from token");

            var normalizedTitle = title.Trim().ToLower();

            var dietPlans = await _dietPlanRepository.GetAll();
            var existingDietPlan = dietPlans.FirstOrDefault(dp =>
                dp.CoachId == coachId &&
                dp.DietTitle.Trim().ToLower() == normalizedTitle
            );

            if (existingDietPlan == null)
                throw new Exception("Diet plan not found or unauthorized access");

            // // Check for duplicate title (excluding the current one)
            // var duplicateTitle = dietPlans.Any(dp =>
            //     dp.CoachId == coachId &&
            //     dp.Id != existingDietPlan.Id &&
            //     dp.DietTitle.Trim().ToLower() == dto.DietTitle.Trim().ToLower());

            // if (duplicateTitle)
            //     throw new Exception("A diet plan with this title already exists");

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // Update diet title
                existingDietPlan.DietTitle = dto.DietTitle.Trim();

                // Delete existing meals
                var existingMeals = (await _dietMealRepository.GetAll())
                    .Where(m => m.DietPlanId == existingDietPlan.Id)
                    .ToList();

                foreach (var meal in existingMeals)
                    await _dietMealRepository.Delete(meal.Id);

                // Add new meals
                var newMeals = dto.Meals.Select(mealDto =>
                {
                    var meal = _mapper.Map<DietMeal>(mealDto);
                    meal.Id = Guid.NewGuid();
                    meal.DietPlanId = existingDietPlan.Id;
                    return meal;
                }).ToList();

                foreach (var meal in newMeals)
                    await _dietMealRepository.Add(meal);

                await transaction.CommitAsync();

                existingDietPlan.Meals = newMeals;
                return existingDietPlan;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }

        }

        public async Task<bool> DeleteDietPlanByTitle(string title, ClaimsPrincipal user)
        {
            var coachIdClaim = user.FindFirst("UserId")?.Value;
            if (coachIdClaim == null || !Guid.TryParse(coachIdClaim, out Guid coachId))
                throw new Exception("Invalid Coach ID from token");

            var normalizedTitle = title.Trim().ToLower();

            var allPlans = await _dietPlanRepository.GetAll();
            var dietPlan = allPlans.FirstOrDefault(dp =>
                dp.CoachId == coachId &&
                dp.DietTitle.Trim().ToLower() == normalizedTitle);

            if (dietPlan == null)
                throw new Exception("Diet plan not found or unauthorized access");

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // Delete all associated meals
                var meals = (await _dietMealRepository.GetAll())
                    .Where(m => m.DietPlanId == dietPlan.Id)
                    .ToList();

                foreach (var meal in meals)
                    await _dietMealRepository.Delete(meal.Id);

                // Delete the diet plan
                await _dietPlanRepository.Delete(dietPlan.Id);

                await transaction.CommitAsync();
                return true;
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        public async Task<List<DietPlanResponseDTO>> GetAllDietPlansDTO(ClaimsPrincipal user)
        {
            var coachIdClaim = user.FindFirst("UserId")?.Value;
            if (coachIdClaim == null || !Guid.TryParse(coachIdClaim, out Guid coachId))
                throw new Exception("Invalid Coach ID from token");

            var allPlans = await _dietPlanRepository.GetAll();
            var coachPlans = allPlans.Where(p => p.CoachId == coachId).ToList();

            var allMeals = await _dietMealRepository.GetAll();
            var mealGroups = allMeals
                             .Where(m => coachPlans.Select(p => p.Id).Contains(m.DietPlanId))
                             .GroupBy(m => m.DietPlanId)
                             .ToDictionary(g => g.Key, g => g.ToList());

            var result = coachPlans.Select(p => new DietPlanResponseDTO
            {
                DietTitle = p.DietTitle,
                MealTypes = mealGroups.ContainsKey(p.Id)
                    ? mealGroups[p.Id].Select(m => new DietMealDTO
                    {
                        MealType = m.MealType,
                        Description = m.Description,
                        Calories = m.Calories,
                        ProteinGrams = m.ProteinGrams,
                        CarbsGrams = m.CarbsGrams,
                        FatGrams = m.FatGrams
                    }).ToList()
                    : new List<DietMealDTO>()
            }).ToList();
            return result;
        }
        public async Task<DietPlanResponseDTO?> GetDietPlanByTitle(string title, ClaimsPrincipal user)
        {
            var coachIdClaim = user.FindFirst("UserId")?.Value;
            if (coachIdClaim == null || !Guid.TryParse(coachIdClaim, out Guid coachId))
                throw new Exception("Invalid Coach ID");

            var plans = await _dietPlanRepository.GetAll();
            var plan = plans
                        .Where(p => p.CoachId == coachId)
                        .FirstOrDefault(p => p.DietTitle.Equals(title.Trim(), StringComparison.OrdinalIgnoreCase));

            if (plan == null)
                return null;

            var meals = (await _dietMealRepository.GetAll())
                            .Where(m => m.DietPlanId == plan.Id)
                            .ToList();

            return new DietPlanResponseDTO
            {
                DietTitle = plan.DietTitle,
                MealTypes = meals.Select(m => new DietMealDTO
                {
                    MealType = m.MealType,
                    Description = m.Description,
                    Calories = m.Calories,
                    ProteinGrams = m.ProteinGrams,
                    CarbsGrams = m.CarbsGrams,
                    FatGrams = m.FatGrams
                }).ToList()
            };
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
            if(workoutPlan==null)
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

        public async Task<List<WorkoutPlanResponseDTO>> GetAllWorkoutPlansDTO(ClaimsPrincipal user)
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
                Id=p.Id,
                Title = p.Title,
                Description=p.Description,
                DurationInWeeks=p.DurationInWeeks,
                Exercises = exerciseGroups.ContainsKey(p.Id)
                    ? exerciseGroups[p.Id].Select(m => new WorkoutExerciseResponseDTO
                    {
                        Id=m.Id,
                        Name = m.Name,
                        Sets = m.Sets,
                        Reps = m.Reps,
                        RestSeconds = m.RestSeconds,
                        Notes=m.Notes
                    }).ToList()
                    : new List<WorkoutExerciseResponseDTO>()
            }).ToList();
            return result;
        }

        
        public async Task<WorkoutPlanResponseDTO?> GetWorkouttPlanByTitle(string title, ClaimsPrincipal user)
        {
            var coachIdClaim = user.FindFirst("UserId")?.Value;
            if (coachIdClaim == null || !Guid.TryParse(coachIdClaim, out Guid coachId))
                throw new Exception("Invalid Coach ID");

            var plans = await _workoutPlanRepository.GetAll();
            var plan = plans
                        .Where(p => p.CoachId == coachId)
                        .FirstOrDefault(p => p.Title.Equals(title.Trim(), StringComparison.OrdinalIgnoreCase));

            if (plan == null)
                return null;

            var exercise = (await _workoutExerciseRepository.GetAll())
                            .Where(m => m.WorkoutPlanId == plan.Id)
                            .ToList();

            // Console.WriteLine($"\n\nExercise {exercise}✅");

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
