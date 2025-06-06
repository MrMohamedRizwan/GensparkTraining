using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FitnessTrackerAPI.Models.Diet
{
    public class DietPlan
    {
        public Guid Id { get; set; }
        public Guid CoachId { get; set; }
        public string DietTitle { get; set; } = string.Empty;
        public Coach? Coach { get; set; }
        public ICollection<DietMeal>? Meals { get; set; }

    }
}