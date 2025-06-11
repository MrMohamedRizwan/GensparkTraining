using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Models;
using FitnessTrackerAPI.Models.DTOs;
using FitnessTrackerAPI.Models.WorkoutModel;

namespace FitnessTrackerAPI.Services
{
    public class WorkoutService : IWorkoutService
    {
        private readonly IRepository<Guid, Workout> _workoutRepo;
        private readonly IRepository<Guid, Client> _clientRepo;
        private readonly IRepository<Guid, PlanAssignment> _planAssignmentRepo;

        public WorkoutService(
            IRepository<Guid, Workout> workoutRepo,
            IRepository<Guid, Client> clientRepo,
            IRepository<Guid, PlanAssignment> planAssignmentRepo)
        {
            _workoutRepo = workoutRepo;
            _clientRepo = clientRepo;
            _planAssignmentRepo = planAssignmentRepo;
        }

        public async Task<WorkoutResponseDTO> AddWorkout(WorkoutCreateDTO dto, ClaimsPrincipal user)
        {
            var clientIdClaim = user.FindFirst("UserId")?.Value;

            if (string.IsNullOrEmpty(clientIdClaim) || !Guid.TryParse(clientIdClaim, out Guid clientId))
                throw new UnauthorizedAccessException("Invalid or missing Client ID.");

            var planAssignment = await _planAssignmentRepo.Get(dto.PlanAssignmentId);
            System.Console.WriteLine($"{clientId} 😭");
            if (planAssignment == null || planAssignment.ClientId != clientId)
                throw new InvalidOperationException("Invalid plan assignment or unauthorized access.");

            var workout = new Workout
            {
                Id = Guid.NewGuid(),
                ClientId = clientId,
                PlanAssignmentId = dto.PlanAssignmentId,
                Date = DateTime.UtcNow,
                Description = dto.Description
            };

            await _workoutRepo.Add(workout);

            return new WorkoutResponseDTO
            {
                Id = workout.Id,
                ClientId=clientId,
                Date = workout.Date,
                Description = workout.Description,
                PlanAssignmentId = workout.PlanAssignmentId
            };
        }

        public async Task<WorkoutResponseDTO?> GetWorkoutById(Guid workoutId, ClaimsPrincipal user)
        {
            var role = user.FindFirst(ClaimTypes.Role)?.Value;
            var userIdClaim = user.FindFirst("UserId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out Guid userId))
                throw new UnauthorizedAccessException("Invalid User ID");

            var workout = await _workoutRepo.Get(workoutId);
            var planId= workout?.PlanAssignmentId;

            var ps=(await _planAssignmentRepo.GetAll())
                    .FirstOrDefault(ps=>ps.Id == planId);

            if (role == "Coach" && (ps == null || ps.AssignedByCoachId != userId))
            throw new UnauthorizedAccessException("Coaches can only access workouts assigned by themselves.");



            if (workout == null)
                return null;

            if (role == "Client" && workout.ClientId != userId)
                throw new UnauthorizedAccessException("Clients can only access their own workouts.");

            return new WorkoutResponseDTO
            {
                Id = workout.Id,
                Date = workout.Date,
                Description = workout.Description,
                PlanAssignmentId = workout.PlanAssignmentId,
                ClientId = workout.ClientId
            };
        }

        public async Task<IEnumerable<WorkoutResponseDTO>> GetWorkoutsForCurrentClient(ClaimsPrincipal user)
        {
            var role = user.FindFirst(ClaimTypes.Role)?.Value;
            var userIdClaim = user.FindFirst("UserId")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out Guid coachId))
                throw new UnauthorizedAccessException("Invalid Coach ID.");

            // if (role != "Coach")
            //     throw new UnauthorizedAccessException("Only coaches can access this resource.");

            var allWorkouts = await _workoutRepo.GetAll();
            var allPlanAssignments = await _planAssignmentRepo.GetAll();

            var coachAssignedPlanIds = allPlanAssignments
                .Where(p => p.AssignedByCoachId == coachId)
                .Select(p => p.Id)
                .ToHashSet();

            var filteredWorkouts = allWorkouts
                .Where(w => w.PlanAssignmentId.HasValue &&
                            coachAssignedPlanIds.Contains(w.PlanAssignmentId.Value));

            return filteredWorkouts.Select(w => new WorkoutResponseDTO
            {
                Id = w.Id,
                Date = w.Date,
                Description = w.Description,
                PlanAssignmentId = w.PlanAssignmentId,
                ClientId = w.ClientId
            });
        }


        public async Task<IEnumerable<WorkoutResponseDTO>> GetWorkoutsByClientId(Guid clientId)
        {
            var allWorkouts = await _workoutRepo.GetAll();

            return allWorkouts
                .Where(w => w.ClientId == clientId)
                .Select(w => new WorkoutResponseDTO
                {
                    Id = w.Id,
                    Date = w.Date,
                    Description = w.Description,
                    PlanAssignmentId = w.PlanAssignmentId,
                    ClientId = w.ClientId
                });
        }
    }
}
