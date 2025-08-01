using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyMigration.Models.DTOs;

namespace MyMigration.Interfaces
{
    public interface IUserService
    {
        Task<bool> CreateUser(UserAddRequestDTO user);
        // Task<bool> UpdateUser(Guid id, UserAddRequestDTO user);
        // Task<bool> DeleteUser(Guid id);
        Task<UserRepsonseDTO?> GetUserById(Guid id);
        Task<IEnumerable<UserRepsonseDTO>> GetAllUsers();
        Task<SignUpResponseDTO> SignUp(UserAddRequestDTO user);

    }
}