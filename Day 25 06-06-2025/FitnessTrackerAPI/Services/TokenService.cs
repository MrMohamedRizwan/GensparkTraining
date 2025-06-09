using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Misc;
using FitnessTrackerAPI.Models;
using Microsoft.IdentityModel.Tokens;

namespace FitnessTrackerAPI.Repository
{
    public class TokenService:ITokenService
    {
        private readonly SymmetricSecurityKey _securityKey;
        private readonly UniqueIdByEmail _uid;
        public TokenService(IConfiguration configuration, UniqueIdByEmail uid)
        {
            _securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Keys:JwtTokenKey"]));
            _uid = uid;
        }
        public async  Task<string> GenerateToken(User user)
        {
            var uniqueId = await _uid.GetIdByEmail(user);
            // Console.WriteLine($"\n\n ✅ {uniqueId}\n\n");
            List<Claim> claims = new List<Claim>
            {
                new Claim("UserId",uniqueId),
                new Claim(ClaimTypes.NameIdentifier,user.Email),
                new Claim(ClaimTypes.Role,user.Role)
            };
            Console.WriteLine($"\n\n ✅ {uniqueId}\n\n");

            var creds = new SigningCredentials(_securityKey, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}