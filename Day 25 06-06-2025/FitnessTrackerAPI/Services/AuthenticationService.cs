// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using FitnessTrackerAPI.Interfaces;
// using FitnessTrackerAPI.Models;
// using FitnessTrackerAPI.Models.DTOs;

// namespace FitnessTrackerAPI.Services
// {
//     public class AuthenticationService : IAuthenticationService
//     {
//         private readonly ITokenService _tokenService;
//         private readonly IEncryptionService _encryptionService;
//         private readonly IRepository<string, User> _userRepository;
//         private readonly ILogger<AuthenticationService> _logger;
//         public AuthenticationService(ITokenService tokenService,
//                                     IEncryptionService encryptionService,
//                                     IRepository<string, User> userRepository,
//                                     ILogger<AuthenticationService> logger)
//         {
//             _tokenService = tokenService;
//             _encryptionService = encryptionService;
//             _userRepository = userRepository;
//             _logger = logger;
//         }
//         public async Task<UserLoginResponse> Login(UserLoginRequest user)
//         {
//             var dbUser = await _userRepository.Get(user.Username);
//             if (dbUser == null)
//             {
//                 _logger.LogCritical("User not found");
//                 throw new Exception("No such user");
//             }
//             var encryptedData = await _encryptionService.EncryptData(new EncryptModel
//             {
//                 Data = user.Password,
//             });
//             return encryptedData;
//         }
//     }
// }