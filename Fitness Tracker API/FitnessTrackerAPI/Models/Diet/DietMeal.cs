using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessTrackerAPI.Models.Diet
{
    public class DietMeal
    {
        public Guid Id { get; set; }

        public Guid DietPlanId { get; set; }
        public string MealType { get; set; } = string.Empty; // e.g., Breakfast, Lunch, Dinner
        public string Description { get; set; } = string.Empty;
        public int Calories { get; set; }
        public int ProteinGrams { get; set; }
        public int CarbsGrams { get; set; }
        public int FatGrams { get; set; }

        public DietPlan? DietPlan { get; set; }
    }
}