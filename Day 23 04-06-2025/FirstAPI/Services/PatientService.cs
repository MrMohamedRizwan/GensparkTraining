using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FirstAPI.Interfaces;
using FirstAPI.Misc;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace FirstAPI.Services
{
    public class PatientService : IPatientService
    {
        PatientMappper patientmapper;
        private readonly IRepository<int, Patient> _patientRepository;
        private readonly IRepository<string, User> _userRepository;

        private readonly IEncryptionService _encryptionService;
        private readonly IMapper _mapper;
        public PatientService(IRepository<int, Patient> patientRepository, IRepository<string, User> userRepository, IEncryptionService encryptionService,
                            IMapper mapper)
        {
            _mapper = mapper;
            _patientRepository = patientRepository;
            _userRepository = userRepository;
            _encryptionService = encryptionService;

        }

        public async Task<Patient> AddPatient(PatientaddRequestDTO patient)
        {
            try
            {
                var user = _mapper.Map<PatientaddRequestDTO, User>(patient);
                var encryptedData = await _encryptionService.EncryptData(new EncryptModel
                {
                    Data = patient.Password
                });
                user.Password = encryptedData.EncryptedData;
                user.HashKey = encryptedData.HashKey;
                user.Role = "Patient";
                user = await _userRepository.Add(user);
                var newpatient = _mapper.Map<Patient>(patient);
                var newp = await _patientRepository.Add(newpatient);
                return newp;
            }
            catch (DbUpdateException ex) when (ex.InnerException?.Message.Contains("duplicate key") == true)
            {
                throw new Exception("User with this email already exists.");
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<Patient> GetPatient(string name)
        {
            var patients = await _patientRepository.GetAll();
            var patient = patients.FirstOrDefault(p => p.Name == name);
            if (patient == null)
            {
                throw new Exception("Patient not found");
            }
            return patient;
        }
    }
}