using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessTrackerAPI.Models.WorkoutModel
{
    public class Workout
    {

        public Guid Id { get; set; }
        public Guid ClientId { get; set; }
        public Client? Client { get; set; } = null!;
        
        public DateTime Date { get; set; } 
        public string Description { get; set; } = string.Empty; // details about the workout
        public Guid? PlanAssignmentId { get; set; }
        public PlanAssignment? PlanAssignment { get; set; }
        
    }
}