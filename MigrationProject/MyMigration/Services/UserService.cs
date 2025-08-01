using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyMigration.Interfaces;
using MyMigration.Models;
using MyMigration.Models.DTOs;

namespace MyMigration.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<Guid, User> _userRepository;
        private readonly IEncryptionService _encryptionService;
            private readonly ITokenService _tokenService;
        public UserService(IRepository<Guid, User> userRepository, IEncryptionService encryptionService, ITokenService tokenService)
        {

            _encryptionService = encryptionService;
            _userRepository = userRepository;
            _tokenService = tokenService;
            
        }
        public async Task<bool> CreateUser(UserAddRequestDTO user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user), "User cannot be null");
            }
            var existingUser = _userRepository.GetAll().Result.FirstOrDefault(u => u.Username == user.Username);
            if (existingUser != null)
            {
                throw new Exception("User Already Exist");
            }
            var encryptedData = await _encryptionService.EncryptData(new EncryptModel { Data = user.Password });
            var newUser = new User
            {
                UserId = Guid.NewGuid(),
                Username = user.Username,
                Password = encryptedData.EncryptedData
            };
            try
            {
                await _userRepository.Add(newUser);
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw new Exception($"An error occurred while creating the user {ex} ");
            }
        }

        public async Task<IEnumerable<UserRepsonseDTO>> GetAllUsers()
        {
            var users = await _userRepository.GetAll();
            return users.Select(u => new UserRepsonseDTO
            {
                UserId = u.UserId,
                Username = u.Username
            });
        }

        public async Task<UserRepsonseDTO?> GetUserById(Guid id)
        {
            var user = await _userRepository.Get(id);
            if (user == null)
            {
                return null;
            }
            return new UserRepsonseDTO
            {
                UserId = user.UserId,
                Username = user.Username
            };
        }

        public async Task<SignUpResponseDTO> SignUp(UserAddRequestDTO user)
        {
            var dbUser = (await _userRepository.GetAll()).FirstOrDefault(u => u.Username == user.Username);
            if (dbUser == null)
                throw new Exception("No such user");

            if (!_encryptionService.Verify(user.Password, dbUser.Password))
                throw new Exception("Invalid password");

            var accessToken = await _tokenService.GenerateToken(dbUser);
            var refreshToken = _tokenService.GenerateRefreshToken();

            // dbUser.RefreshToken = refreshToken;
            // dbUser.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            
            // await _userRepository.Update(dbUser.UserId, dbUser);

            return new SignUpResponseDTO
            {
                Id = dbUser.UserId,
                UserName = dbUser.Username,
                Token = accessToken,
                RefreshToken = refreshToken
            };

        }
    }
}
