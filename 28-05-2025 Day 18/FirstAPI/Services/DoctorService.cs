using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using FirstAPI.Interfaces;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IRepository<int, Doctor> _doctorRepo;
        private readonly IRepository<int, Specality> _specialityRepo;
        private readonly IRepository<int, DoctorSpecality> _doctorSpecalityRepo;

        public DoctorService(
            IRepository<int, Doctor> doctorRepo,
            IRepository<int, Specality> specialityRepo,
            IRepository<int, DoctorSpecality> doctorSpecalityRepo)
        {
            _doctorRepo = doctorRepo;
            _specialityRepo = specialityRepo;
            _doctorSpecalityRepo = doctorSpecalityRepo;
        }
        public async Task<Doctor> AddDoctor(DoctorAddRequestDto doctorDto)
        {
            var doctor = new Doctor
            {
                Name = doctorDto.Name,
                YearsOfExperience = doctorDto.YearsOfExperience
            };
            doctor = await _doctorRepo.Add(doctor);
            if (doctorDto.Specialities != null)
            {
                foreach (var specialityDto in doctorDto.Specialities)
                {
                    var speciality = (await _specialityRepo.GetAll()).FirstOrDefault(s => s.Name.Equals(specialityDto.Name, StringComparison.OrdinalIgnoreCase));
                    // Console.WriteLine("\nHello\n");
                    if (speciality == null)
                    {
                        speciality = new Specality
                        {
                            Name = specialityDto.Name,
                            Status="active"
                        };
                        speciality = await _specialityRepo.Add(speciality);
                    }

                    var doctorSpeciality = new DoctorSpecality
                    {
                        DoctorId = doctor.Id,
                        SpecialityId = speciality.Id
                    };

                    await _doctorSpecalityRepo.Add(doctorSpeciality);
                }
            }
            return doctor;
        }

        public async Task<Doctor> GetDoctByName(string name)
        {
            var doctors = await _doctorRepo.GetAll();
            var doctor = doctors.FirstOrDefault(d => d.Name.Equals(name, StringComparison.OrdinalIgnoreCase));
            if (doctor != null)
                return doctor;
            else
                throw new Exception($"Doctor with name '{name}' not found");
        }

        public async Task<ICollection<Doctor>> GetDoctorsBySpeciality(string speciality)
        {
            var spec = (await _specialityRepo.GetAll()).FirstOrDefault(s => s.Name.Equals(speciality));

            if (spec == null)
                throw new Exception($"Speciality {speciality} not found");

            var docSpec = (await _doctorSpecalityRepo.GetAll()).Where(ds => ds.SpecialityId == spec.Id).ToList();
            var docId = docSpec.Select(ds => ds.DoctorId);
            var doctors = await _doctorRepo.GetAll();
            var docspec = doctors.Where(d => docId.Contains(d.Id)).ToList();
            return docspec;
        }
    }
}