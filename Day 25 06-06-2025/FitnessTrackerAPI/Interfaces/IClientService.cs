using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FirstAPI.Models.DTOs;
using FitnessTrackerAPI.Models.DTOs;

namespace FitnessTrackerAPI.Interfaces
{
    public interface IClientService
    {
        public Task<SignUpResponseDTO> AddCoach(ClientAddRequestDTO client);
        public Task<List<AssignedPlanNamesDTO>> GetAssignedPlansForClient(ClaimsPrincipal user);

    }
}