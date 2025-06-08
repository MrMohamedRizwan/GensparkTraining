using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessTrackerAPI.Models.DTOs
{
    public class DietPlanCreateRequestDTO
    {
        public string DietTitle { get; set; } = string.Empty;
        public List<DietMealCreateDTO> Meals { get; set; } = new();
    }

    public class DietMealCreateDTO
    {
        public string MealType { get; set; } = string.Empty; // e.g., Breakfast, Lunch
        public string Description { get; set; } = string.Empty;
        public int Calories { get; set; }
        public int ProteinGrams { get; set; }
        public int CarbsGrams { get; set; }
        public int FatGrams { get; set; }
    }
}