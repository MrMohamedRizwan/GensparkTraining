using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessTrackerAPI.Models.DTOs
{
    public class WorkoutCreateDTO
    {
        // [Required]
        // public DateTime Date { get; set; } = DateTime.UtcNow;

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(200, ErrorMessage = "Description can't be longer than 200 characters.")]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "PlanAssignmentId is required.")]
        public Guid PlanAssignmentId { get; set; }
    }

    public class WorkoutResponseDTO
    {
        public Guid Id { get; set; }
        public Guid ClientId { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;
        public Guid? PlanAssignmentId { get; set; }
    }
}