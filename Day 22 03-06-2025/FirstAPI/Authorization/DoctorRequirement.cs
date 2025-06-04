using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore.Metadata;

namespace FirstAPI.Authorization
{
    public class DoctorRequirement : IAuthorizationRequirement
    {
        public float MinimumYears { get; }
        public DoctorRequirement(float myoe)
        {
            MinimumYears = myoe;
        }
        
    }
}