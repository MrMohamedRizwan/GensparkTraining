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
    public class ClientService : IClientService
    {
         private readonly IMapper _mapper;
        private readonly IRepository<string, User> _userRepository;
        private readonly IEncryptionService _encryptionService;
        private readonly IRepository<Guid, Client> _clientRepository;
        public ClientService(IMapper mapper,
                            IEncryptionService encryptionService,
                            IRepository<string, User> userRepository,
                                IRepository<Guid, Client> clientRepository)
        {
            _mapper = mapper;
            _encryptionService = encryptionService;
            _userRepository = userRepository;
            _clientRepository = clientRepository;
        }
        public async Task<SignUpResponseDTO> AddCoach(ClientAddRequestDTO client)
        {
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
                return new SignUpResponseDTO
                {
                    Id = newClient.Id,
                    Email = newClient.Email

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