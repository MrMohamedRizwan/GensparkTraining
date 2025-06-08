using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessTrackerAPI.Models.DTOs
{
    public class DietPlanResponseDTO
    {
        public string DietTitle { get; set; } = string.Empty;
        public List<DietMealDTO> MealTypes { get; set; } = new();
    }

    public class DietMealDTO
    {
        public string MealType { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Calories { get; set; }
        public int ProteinGrams { get; set; }
        public int CarbsGrams { get; set; }
        public int FatGrams { get; set; }
    }

}