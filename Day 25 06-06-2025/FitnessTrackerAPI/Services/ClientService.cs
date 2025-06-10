using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using FirstAPI.Models.DTOs;
using FitnessTrackerAPI.Context;
using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Models;
using FitnessTrackerAPI.Models.Diet;
using FitnessTrackerAPI.Models.DTOs;
using FitnessTrackerAPI.Models.WorkoutModel;

namespace FitnessTrackerAPI.Services
{
    public class ClientService : IClientService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<string, User> _userRepository;
        private readonly IEncryptionService _encryptionService;
        private readonly IRepository<Guid, Client> _clientRepository;
        private readonly FitnessDBContext _context;
        private readonly IRepository<Guid, PlanAssignment> _planAssignmentRepository;
        private readonly IRepository<Guid, WorkoutPlan> _workoutPlanRepository;
        private readonly IRepository<Guid, DietPlan> _dietPlanRepository;
        
        

        public ClientService(IMapper mapper,
                            IEncryptionService encryptionService,
                            IRepository<string, User> userRepository,
                                IRepository<Guid, Client> clientRepository,
                                IRepository<Guid, PlanAssignment> planAssignmentRepository,
                                IRepository<Guid, WorkoutPlan> workoutPlanRepository,
                                IRepository<Guid, DietPlan> dietPlanRepository,
                                FitnessDBContext context)
        {
            _mapper = mapper;
            _encryptionService = encryptionService;
            _userRepository = userRepository;
            _clientRepository = clientRepository;
            _planAssignmentRepository = planAssignmentRepository;
            _workoutPlanRepository = workoutPlanRepository;
            _dietPlanRepository = dietPlanRepository;
            _context = context;

        }
        public async Task<SignUpResponseDTO> AddCoach(ClientAddRequestDTO client)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var user = _mapper.Map<ClientAddRequestDTO, User>(client);
                var existingUser = await _userRepository.Get(client.Email);
                if (existingUser != null)
                    throw new Exception("User Already Exist");

                var encryptedData = await _encryptionService.EncryptData(new EncryptModel
                {
                    Data = client.Password
                });

                user.Password = encryptedData.EncryptedData;
                user.Role = "Client";
                user = await _userRepository.Add(user);

                var newClient = _mapper.Map<ClientAddRequestDTO, Client>(client);
                newClient.Email = user.Email;

                newClient = await _clientRepository.Add(newClient);
                if (newClient == null)
                    throw new Exception("Could not add Client");
                await transaction.CommitAsync();
                return new SignUpResponseDTO
                {
                    Id = newClient.Id,
                    Email = newClient.Email

                };
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                Console.WriteLine($"Error ❌ {e.Message}");
                throw new Exception(e.Message);
            }
        }
        public async Task<List<AssignedPlanNamesDTO>> GetAssignedPlansForClient(ClaimsPrincipal user)
        {
            try
            {
                var clientIdClaim = user.FindFirst("UserId")?.Value;
                if (clientIdClaim == null || !Guid.TryParse(clientIdClaim, out Guid clientId))
                    throw new Exception("Invalid Client ID");

                // var assignments = await _planAssignmentRepository.GetAll();

                // var latestAssignment = assignments
                //     .Where(p => p.ClientId == clientId)
                //     .FirstOrDefault();

                var assignments = (await _planAssignmentRepository.GetAll())
                                .Where(a => a.ClientId == clientId)
                                .ToList();

                var result = new List<AssignedPlanNamesDTO>();

                foreach (var assignment in assignments)
                {
                    var workoutPlan = assignment.WorkoutPlanId.HasValue
                        ? await _workoutPlanRepository.Get(assignment.WorkoutPlanId.Value)
                        : null;

                    var dietPlan = assignment.DietPlanId.HasValue
                        ? await _dietPlanRepository.Get(assignment.DietPlanId.Value)
                        : null;

                    result.Add(new AssignedPlanNamesDTO
                    {
                        PlanAssignmentId = assignment.Id,
                        WorkoutPlanTitle = workoutPlan?.Title ?? "Not Assigned",
                        DietPlanTitle = dietPlan?.DietTitle ?? "Not Assigned"
                    });
                }

                return result;
            }
            catch (Exception e)
            {
                Console.WriteLine($"{e.Message}  ❌");
                throw;
            }
        }

    }
}