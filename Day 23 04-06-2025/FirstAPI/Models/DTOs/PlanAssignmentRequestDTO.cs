using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstAPI.Models.DTOs
{
    public class PlanAssignmentRequestDTO
    {
        public Guid ClientName { get; set; }
        public Guid? WorkoutName { get; set; }
        public Guid? DietPlanName { get; set; }
    }
}