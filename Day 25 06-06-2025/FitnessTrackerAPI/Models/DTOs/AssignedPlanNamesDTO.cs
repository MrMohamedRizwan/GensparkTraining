using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstAPI.Models.DTOs
{
    public class AssignedPlanNamesDTO
    {
        public Guid? PlanAssignmentId{ get; set; }
        public string? WorkoutPlanTitle { get; set; }
        public string? DietPlanTitle { get; set; }
        
    }
}