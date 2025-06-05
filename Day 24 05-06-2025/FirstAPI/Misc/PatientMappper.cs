using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Misc
{
    public class PatientMappper
    {
        public Patient? MappatientAddRequestpatient(PatientaddRequestDTO addRequestDto)
        {
            Patient patient = new();
            patient.Name = addRequestDto.Name;
            patient.Email = addRequestDto.Email;
            return patient;
        }
        
    }
}