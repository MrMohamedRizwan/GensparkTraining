
using FirstAPI.Interfaces;
using FirstAPI.Models;
using FirstAPI.Models.DTOs.DoctorSpecialities;
using Google.Apis.Auth;
using Microsoft.Extensions.Logging;

namespace FirstAPI.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly ITokenService _tokenService;
        private readonly IEncryptionService _encryptionService;
        private readonly IRepository<string, User> _userRepository;
        private readonly ILogger<AuthenticationService> _logger;

        public AuthenticationService(ITokenService tokenService,
                                    IEncryptionService encryptionService,
                                    IRepository<string, User> userRepository,
                                    ILogger<AuthenticationService> logger)
        {
            _tokenService = tokenService;
            _encryptionService = encryptionService;
            _userRepository = userRepository;
            _logger = logger;
        }
        public async Task<UserLoginResponse> Login(UserLoginRequest user)
        {
            var dbUser = await _userRepository.Get(user.Username);
            if (dbUser == null)
            {
                _logger.LogCritical("User not found");
                throw new Exception("No such user");
            }
            var encryptedData = await _encryptionService.EncryptData(new EncryptModel
            {
                Data = user.Password,
                HashKey = dbUser.HashKey
            });
            for (int i = 0; i < encryptedData.EncryptedData.Length; i++)
            {
                if (encryptedData.EncryptedData[i] != dbUser.Password[i])
                {
                    _logger.LogError("Invalid login attempt");
                    throw new Exception("Invalid password");
                }
            }
            var token = await _tokenService.GenerateToken(dbUser);
            return new UserLoginResponse
            {
                Username = user.Username,
                Token = token,
            };
        }

        public async Task<UserLoginResponse> Loginbyoauth(string email)
        {
            try
            {
                // Console.WriteLine($"\n\nidtokekenf {idToken}");
                // var payload = await GoogleJsonWebSignature.ValidateAsync(idToken);
                // var email = payload.Email;

                var dbUser = await _userRepository.Get(email);
                if (dbUser == null)
                {
                    throw new Exception("User not found for Google login");
                }

                var token = await _tokenService.GenerateToken(dbUser);

                return new UserLoginResponse
                {
                    Username = dbUser.Username,
                    Token = token
                };
            }
            catch (InvalidJwtException ex)
            {
                _logger.LogError("Invalid Google token: " + ex.Message);
                throw new Exception("Invalid Google token");
            }
        }
    }
}