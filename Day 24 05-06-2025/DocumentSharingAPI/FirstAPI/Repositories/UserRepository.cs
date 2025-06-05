using FirstAPI.Contexts;
using FirstAPI.Interfaces;
using FirstAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FirstAPI.Repositories
{
    public class UserRepository : Repository<string, User>
    {
        public UserRepository(UserContext context):base(context)
        {
            
        }
        public override async Task<User> Get(string key)
        {
            return await _userContext.Users.SingleOrDefaultAsync(u => u.email == key);
        }

        public override async Task<IEnumerable<User>> GetAll()
        {
            return await _userContext.Users.ToListAsync();
        }
            
    }
}