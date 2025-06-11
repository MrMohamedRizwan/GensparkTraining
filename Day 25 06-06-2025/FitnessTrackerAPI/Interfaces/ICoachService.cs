using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FirstAPI.Models.DTOs;
using FitnessTrackerAPI.Models;
using FitnessTrackerAPI.Models.Diet;
using FitnessTrackerAPI.Models.DTOs;
using FitnessTrackerAPI.Models.WorkoutModel;

namespace FitnessTrackerAPI.Interfaces
{
    public interface ICoachService
    {
        public Task<SignUpResponseDTO> AddCoach(CoachAddRequestDTO coach);
        public Task<DietPlan> AddMeal(DietPlanCreateRequestDTO diet, ClaimsPrincipal user);
        public Task<DietPlan> UpdateDietPlanByTitle(string title, DietPlanCreateRequestDTO dto, ClaimsPrincipal user);
        public Task<bool> DeleteDietPlanByTitle(string title, ClaimsPrincipal user);
        public Task<List<DietPlanResponseDTO>> GetAllDietPlansDTO(ClaimsPrincipal user);
        public Task<DietPlanResponseDTO?> GetDietPlanByTitle(string title, ClaimsPrincipal user);




        public Task<WorkoutPlan> AddWorkoutPlan(WorkoutPlanCreateRequestDTO workout, ClaimsPrincipal user);
        public Task<WorkoutPlan> UpdateWorkoutPlanByTitle(string title, WorkoutPlanCreateRequestDTO dto, ClaimsPrincipal user);
        public Task<bool> DeleteWorkoutPlanByTitle(string title, ClaimsPrincipal user);
        public Task<List<WorkoutPlanResponseDTO>> GetAllWorkoutPlansDTO(ClaimsPrincipal user);
        public Task<WorkoutPlanResponseDTO?> GetWorkouttPlanByTitle(string title, ClaimsPrincipal user);


        public Task<PlanAssignment> AssignPlanToClient(PlanAssignmentRequestDTO dto, ClaimsPrincipal user);
        public Task<List<AssignedPlanNamesDTO>> GetAssignedPlans(string title, ClaimsPrincipal user);
        public Task<List<ClientWithoutPlansDTO>> GetClientsWithoutAssignedPlans();
        public Task<bool> MarkPlanAsCompletedAsync(Guid planAssignmentId, ClaimsPrincipal user);

    }
}