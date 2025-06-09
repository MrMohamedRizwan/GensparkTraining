using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstAPI.Models.DTOs
{
    public class PlanAssignmentRequestDTO
    {
        public string ClientEmail { get; set; }
        public string? WorkoutName { get; set; }
        public string? DietPlanName { get; set; }
    }
}