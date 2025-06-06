using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessTrackerAPI.Models;
using FitnessTrackerAPI.Models.DTOs;

namespace FitnessTrackerAPI.Interfaces
{
    public interface ICoachService
    {
        public Task<SignUpResponseDTO> AddCoach(CoachAddRequestDTO coach);
    }
}