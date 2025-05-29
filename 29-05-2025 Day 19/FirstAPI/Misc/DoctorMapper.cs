using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Misc
{
        public class DoctorMapper
        {
            public Doctor? MapDoctorAddRequestDoctor(DoctorAddRequestDto addRequestDto)
            {
                Doctor doctor = new();
                doctor.Name = addRequestDto.Name;
                doctor.YearsOfExperience = addRequestDto.YearsOfExperience;
                return doctor;
            }
        }
    }
