using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessTrackerAPI.Models.DTOs
{
    public class WorkoutPlanResponseDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int DurationInWeeks { get; set; }

        public List<WorkoutExerciseResponseDTO> Exercises { get; set; } = new();
    }

    public class WorkoutExerciseResponseDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Sets { get; set; }
        public int Reps { get; set; }
        public int RestSeconds { get; set; }
        public string Notes { get; set; } = string.Empty;
    }
}