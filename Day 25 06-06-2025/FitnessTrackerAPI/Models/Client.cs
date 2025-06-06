using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessTrackerAPI.Models.WorkoutModel;

namespace FitnessTrackerAPI.Models
{
    public class Client
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Age { get; set; }
        public string Phone { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public User? User { get; set; }
        public ICollection<Workout>? Workouts { get; set; }
        public ICollection<Progress>? Progress { get; set; }
        public ICollection<PlanAssignment>? PlanAssignments { get; set; }

    }
}