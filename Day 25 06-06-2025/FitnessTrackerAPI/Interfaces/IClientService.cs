using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessTrackerAPI.Models.DTOs;

namespace FitnessTrackerAPI.Interfaces
{
    public interface IClientService
    {
        public Task<SignUpResponseDTO> AddCoach(ClientAddRequestDTO client);
    }
}