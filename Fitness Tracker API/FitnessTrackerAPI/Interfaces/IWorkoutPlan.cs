using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FitnessTrackerAPI.Models.DTOs;
using FitnessTrackerAPI.Models.WorkoutModel;

namespace FitnessTrackerAPI.Interfaces
{
    public interface IWorkoutPlan
    {
        public Task<WorkoutPlan> AddWorkoutPlan(WorkoutPlanCreateRequestDTO workout, ClaimsPrincipal user);
        public Task<WorkoutPlan> UpdateWorkoutPlanByTitle(string title, WorkoutPlanCreateRequestDTO dto, ClaimsPrincipal user);
        public Task<bool> DeleteWorkoutPlanByTitle(string title, ClaimsPrincipal user);
        public Task<PagedResult<WorkoutPlanResponseDTO>> GetAllWorkoutPlansDTO(ClaimsPrincipal user, int pageNumber, int pageSize);
        public Task<WorkoutPlanResponseDTO?> GetWorkouttPlanByTitle(string title, ClaimsPrincipal user);
    }
}