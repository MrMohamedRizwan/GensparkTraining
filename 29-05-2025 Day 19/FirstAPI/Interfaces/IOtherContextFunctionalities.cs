using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Interfaces
{
    public interface IOtherContextFunctionalities
    {
        public Task<ICollection<DoctorsBySpecialityResponseDto>> GetDoctorsBySpeciality(string speciality);
    }
}