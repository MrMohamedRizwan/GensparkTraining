using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Contexts;
using FirstAPI.Interfaces;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Misc
{
    public class OtherFunctionalityImplementation : IOtherContextFunctionalities
    {
        private readonly ClinicContext _cliniccontext;
        public OtherFunctionalityImplementation(ClinicContext cliniccontext)
        {
            _cliniccontext = cliniccontext;
        }
        public async Task<ICollection<DoctorsBySpecialityResponseDto>> GetDoctorsBySpeciality(string speciality)
        {
            var result = await _cliniccontext.GetDoctorsbySpeciality(speciality);
            return result;
        }
    }
}