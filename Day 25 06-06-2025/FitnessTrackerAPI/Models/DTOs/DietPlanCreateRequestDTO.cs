using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessTrackerAPI.Models.DTOs
{
    public class DietPlanCreateRequestDTO
    {
        [Required]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Diet title must be between 2 and 100 characters.")]
        public string DietTitle { get; set; } = string.Empty;

        [Required]
        [MinLength(1, ErrorMessage = "At least one meal must be provided.")]
        public List<DietMealCreateDTO> Meals { get; set; } = new();
    }

    public class DietMealCreateDTO
    {
        [Required]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "Meal type must be between 2 and 50 characters.")]
        public string MealType { get; set; } = string.Empty; // e.g., Breakfast, Lunch

        [Required]
        [StringLength(200, MinimumLength = 2, ErrorMessage = "Description must be between 2 and 200 characters.")]
        public string Description { get; set; } = string.Empty;

        [Range(0, 10000, ErrorMessage = "Calories must be between 0 and 10,000.")]
        public int Calories { get; set; }

        [Range(0, 1000, ErrorMessage = "Protein grams must be between 0 and 1,000.")]
        public int ProteinGrams { get; set; }

        [Range(0, 1000, ErrorMessage = "Carbs grams must be between 0 and 1,000.")]
        public int CarbsGrams { get; set; }

        [Range(0, 1000, ErrorMessage = "Fat grams must be between 0 and 1,000.")]
        public int FatGrams { get; set; }
    }
}