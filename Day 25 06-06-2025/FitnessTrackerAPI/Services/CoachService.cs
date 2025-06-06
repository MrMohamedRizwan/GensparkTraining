using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Models;
using FitnessTrackerAPI.Models.DTOs;

namespace FitnessTrackerAPI.Services
{
    public class CoachService : ICoachService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<string, User> _userRepository;
        private readonly IEncryptionService _encryptionService;
        private readonly IRepository<Guid, Coach> _coachRepository;
        public CoachService(IMapper mapper,
                            IEncryptionService encryptionService,
                            IRepository<string, User> userRepository,
                                IRepository<Guid, Coach> coachRepository)
        {
            _mapper = mapper;
            _encryptionService = encryptionService;
            _userRepository = userRepository;
            _coachRepository = coachRepository;
        }

        public async Task<SignUpResponseDTO> AddCoach(CoachAddRequestDTO coach)
        {
            try
            {
                // System.Console.WriteLine("Before DB 😒");

                var user = _mapper.Map<CoachAddRequestDTO, User>(coach);
                var existingUser = await _userRepository.Get(coach.Email);
                if (existingUser != null)
                    throw new Exception("User Already Exist");
                
                var encryptedData = await _encryptionService.EncryptData(new EncryptModel
                {
                    Data = coach.Password
                });
                
                user.Password = encryptedData.EncryptedData;
                user.Role = "Coach";
                user = await _userRepository.Add(user);

                var newCoach = _mapper.Map<CoachAddRequestDTO, Coach>(coach);
                newCoach.Email = user.Email; 
                
                newCoach = await _coachRepository.Add(newCoach);
                if (newCoach == null)
                    throw new Exception("Could not add Coach");
                return new SignUpResponseDTO
                {
                    Id=newCoach.Id,
                    Email = newCoach.Email
                    
                };
            }
            catch (Exception e)
            {
                Console.WriteLine($"Error ❌ {e.Message}");
                throw new Exception(e.Message);
            }
        }
        
    }
}