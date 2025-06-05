using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FirstAPI.Interfaces;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<string, User> _userRepository;
        private readonly IEncryptionService _encryptionService;

        public UserService(IRepository<string, User> userRepository, IMapper mapper, IEncryptionService encryptionService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _encryptionService = encryptionService;
        }
        public async Task<User> AddUser(AddUserDTO user)
        {
            var newUser = _mapper.Map<AddUserDTO, User>(user);
            var encryptedData = await _encryptionService.EncryptData(new EncryptModel
            {
                Data = user.Password
            });
            newUser.Password = encryptedData.EncryptedData;
            newUser.HashKey = encryptedData.HashKey;

            var NU = await _userRepository.Add(newUser);
            return NU;
        }
    }
}