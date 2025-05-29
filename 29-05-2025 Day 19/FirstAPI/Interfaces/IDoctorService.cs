using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Interfaces
{
    public interface IDoctorService
    {
        public Task<Doctor> GetDoctByName(string name);
        public Task<ICollection<DoctorsBySpecialityResponseDto>> GetDoctorsBySpecialityProc(string speciality);
        public Task<Doctor> AddDoctor(DoctorAddRequestDto doctor);
    }
}