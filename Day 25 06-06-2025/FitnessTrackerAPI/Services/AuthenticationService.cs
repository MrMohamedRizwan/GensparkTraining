using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Models;
using FitnessTrackerAPI.Models.DTOs;

namespace FitnessTrackerAPI.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly ITokenService _tokenService;
        private readonly IEncryptionService _encryptionService;
        private readonly IRepository<string, User> _userRepository;
        public AuthenticationService(ITokenService tokenService,
                                    IEncryptionService encryptionService,
                                    IRepository<string, User> userRepository,
                                    ILogger<AuthenticationService> logger)
        {
            _tokenService = tokenService;
            _encryptionService = encryptionService;
            _userRepository = userRepository;
        }
        public async Task<UserLoginResponse> Login(UserLoginRequest user)
        {
            var dbUser = await _userRepository.Get(user.Username);
            if (dbUser == null)
            {
                throw new Exception("No such user");
            }
           bool isPasswordValid = _encryptionService.Verify(user.Password, dbUser.Password);

            if (!isPasswordValid)
            {
                throw new Exception("Invalid password");
            }
            var token = await _tokenService.GenerateToken(dbUser);

            return new UserLoginResponse
            {
                Username = dbUser.Email,
                Token=token
            };
            

        }
    }
}