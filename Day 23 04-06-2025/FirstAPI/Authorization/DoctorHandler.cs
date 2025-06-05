using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using FirstAPI.Interfaces;
using FirstAPI.Models;
using Microsoft.AspNetCore.Authorization;

namespace FirstAPI.Authorization
{
    public class DoctorHandler : AuthorizationHandler<DoctorRequirement>
    {
        private readonly IRepository<int, Doctor> _doctorRepository;
        public DoctorHandler(IRepository<int, Doctor> doctorRepositry)
        {
            _doctorRepository = doctorRepositry;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, DoctorRequirement requirement)
        {
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userIdClaim))
                return;
            var email = userIdClaim;
            // Console.WriteLine(email);

            
            // var d = await _doctorRepository.GetAll();
            var doctorall = (await _doctorRepository.GetAll())
                            .FirstOrDefault(d =>d.Email == email);
            // Console.WriteLine($"\n\nInside Handle Requirements\n\n{doctorall} doctorlll");
            int userId = doctorall.Id;
            float yoe = doctorall.YearsOfExperience;

            
            if (doctorall != null && yoe >= requirement.MinimumYears)
            {
                // Console.WriteLine($"\n\nThis is the UserId in db{userId} {requirement.MinimumYears}  {yoe}\n\n");
                context.Succeed(requirement);
            }
        }
    }
}