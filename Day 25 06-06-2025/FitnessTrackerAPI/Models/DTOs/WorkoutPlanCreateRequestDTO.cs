using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessTrackerAPI.Models.DTOs
{
    public class WorkoutPlanCreateRequestDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int DurationInWeeks { get; set; }
        public List<WorkoutExerciseCreateDTO> Exercises { get; set; } = new();
    }

    public class WorkoutExerciseCreateDTO
    {
        public string Name { get; set; } = string.Empty;           // e.g., Squats, Push-Ups
        public int Sets { get; set; }                              // e.g., 3
        public int Reps { get; set; }                              // e.g., 12
        public int RestSeconds { get; set; }                       // e.g., 60 (seconds between sets)
        public string Notes { get; set; } = string.Empty;          // e.g., "Use resistance bands"
    }
}