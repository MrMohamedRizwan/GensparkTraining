using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FirstAPI.Interfaces;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Services
{
    public class PatientService : IPatientService
    {
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
                    Data=patient.Password
                });
                user.Password = encryptedData.EncryptedData;
                user.HashKey=encryptedData.HashKey;
                user.Role = "Patient";
                user = await _userRepository.Add(user);
                var newpatient = _mapper.Map<Patient>(patient);
                return newpatient;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public Task<Patient> GetPatient(string name)
        {
            throw new NotImplementedException();
        }
    }
}