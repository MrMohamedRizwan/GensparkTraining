using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using FirstAPI.Interfaces;
using FirstAPI.Misc;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Services
{
    public class DoctorService : IDoctorService
    {
        DoctorMapper doctorMapper ;
        SpecialityMapper specialityMapper;
        private readonly IRepository<int, Doctor> _doctorRepository;
        private readonly IRepository<int, Specality> _specialityRepository;
        private readonly IRepository<int, DoctorSpecality> _doctorSpecialityRepository;
        private readonly IOtherContextFunctionalities _otherContextFunctionities;

        public DoctorService(IRepository<int, Doctor> doctorRepository,
                            IRepository<int, Specality> specialityRepository,
                            IRepository<int, DoctorSpecality> doctorSpecialityRepository,
                            IOtherContextFunctionalities otherContextFunctionities)
        {
            doctorMapper = new DoctorMapper();
            specialityMapper = new SpecialityMapper();
            _doctorRepository = doctorRepository;
            _specialityRepository = specialityRepository;
            _doctorSpecialityRepository = doctorSpecialityRepository;
            _otherContextFunctionities = otherContextFunctionities;

        }

        public async Task<Doctor> AddDoctor(DoctorAddRequestDto doctor)
        {
            try
            {
                var newDoctor = doctorMapper.MapDoctorAddRequestDoctor(doctor);
                newDoctor = await _doctorRepository.Add(newDoctor);
                if (newDoctor == null)
                    throw new Exception("Could not add doctor");
                if (doctor.Specialities.Count() > 0)
                {
                    int[] specialities = await MapAndAddSpeciality(doctor);
                    for (int i = 0; i < specialities.Length; i++)
                    {
                        var doctorSpeciality = specialityMapper.MapDoctorSpecility(newDoctor.Id, specialities[i]);
                        doctorSpeciality = await _doctorSpecialityRepository.Add(doctorSpeciality);
                    }
                }
                // nu
                return newDoctor;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            
        }

        private async Task<int[]> MapAndAddSpeciality(DoctorAddRequestDto doctor)
        {
            int[] specialityIds = new int[doctor.Specialities.Count()];
            IEnumerable<Specality> existingSpecialities = null;
            try
            {
                existingSpecialities = await _specialityRepository.GetAll();
            }
            catch (Exception e)
            {

            }
            int count = 0;
            foreach (var item in doctor.Specialities)
            {
                Specality speciality = null;
                if (existingSpecialities != null)
                    speciality = existingSpecialities.FirstOrDefault(s => s.Name.ToLower() == item.Name.ToLower());
                if (speciality == null)
                {
                    speciality = specialityMapper.MapSpecialityAddRequestDoctor(item);
                    speciality = await _specialityRepository.Add(speciality);
                }
                specialityIds[count] = speciality.Id;
                count++;
            }
            return specialityIds;
        }

        public Task<Doctor> GetDoctByName(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<ICollection<DoctorsBySpecialityResponseDto>> GetDoctorsBySpecialityProc(string speciality)
        {
            Console.WriteLine("\n\nHello \n\n");
            var result = await _otherContextFunctionities.GetDoctorsBySpeciality(speciality);
            return result;
        }

    }
}