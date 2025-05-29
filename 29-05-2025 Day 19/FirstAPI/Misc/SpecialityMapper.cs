using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Misc
{
    public class SpecialityMapper
    {
        public Specality? MapSpecialityAddRequestDoctor(SpecialityAddRequestDto addRequestDto)
        {
            Specality speciality = new();
            speciality.Name = addRequestDto.Name;
            return speciality;
        }

        public DoctorSpecality MapDoctorSpecility(int doctorId, int specialityId)
        {
            DoctorSpecality doctorSpeciality = new();
            doctorSpeciality.DoctorId = doctorId;
            doctorSpeciality.SpecialityId = specialityId;
            return doctorSpeciality;
        }
    }
}