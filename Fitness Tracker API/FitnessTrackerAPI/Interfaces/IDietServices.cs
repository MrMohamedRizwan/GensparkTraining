using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FitnessTrackerAPI.Models.Diet;
using FitnessTrackerAPI.Models.DTOs;

namespace FitnessTrackerAPI.Interfaces
{
    public interface IDietServices
    {
        public Task<DietPlan> AddMeal(DietPlanCreateRequestDTO diet, ClaimsPrincipal user);
        public Task<DietPlan> UpdateDietPlanByTitle(string title, DietPlanCreateRequestDTO dto, ClaimsPrincipal user);
        public Task<bool> DeleteDietPlanByTitle(string title, ClaimsPrincipal user);
        public Task<PagedResult<DietPlanResponseDTO>> GetAllDietPlansDTO(ClaimsPrincipal user,int pageNumber,int pageSize);
        public Task<DietPlanResponseDTO?> GetDietPlanByTitle(string title, ClaimsPrincipal user);
    }
}