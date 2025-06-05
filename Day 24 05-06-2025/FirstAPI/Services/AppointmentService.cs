using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FirstAPI.Interfaces;
using FirstAPI.Misc;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IRepository<string, Appointmnet> _appointmentRepository;
        private readonly IRepository<int, Doctor> _doctorRepository;
        private readonly IRepository<int, Patient> _patientRepository;
        IMapper _mapper;
        AppointmnetMapper _appmapper;
        public AppointmentService(IRepository<int, Doctor> doctorRepository, IRepository<string, Appointmnet> appointmentRepository,
                                    IMapper mapper, IRepository<int, Patient> patientRepository,
                                    AppointmnetMapper appmapper)
        {
            _appointmentRepository = appointmentRepository;
            _doctorRepository = doctorRepository;
            _mapper = mapper;
            _patientRepository = patientRepository;
            _appmapper = appmapper;
        }
        public async Task<Appointmnet> AddAppointmnet(AppointmnetAddRequestDTO Appointment)
        {
            System.Console.WriteLine("Add Appointmnet 😌");
            // var appointment = _mapper.Map<AppointmnetAddRequestDTO, Appointmnet>(Appointment);
            var appointment = _appmapper.MapAppointmnetAddRequest(Appointment);
            var doctorId = Appointment.doctorId;
            var doctor = _doctorRepository.Get(doctorId);
            if (doctor == null)
                throw new Exception("No doctor with that Id");
            var patient = _patientRepository.Get(appointment.PatientId);
            if (patient == null)
                throw new Exception("No doctor with that Id");
            appointment.AppointmnetDateTime = DateTime.UtcNow;
            appointment.Status = "active";
            // var newAppointmnet = _mapper.Map<Appointmnet>(appointment);
            var newAppointmnet = await _appointmentRepository.Add(appointment);
            return newAppointmnet;
        }

        public async Task<bool> CancelAppointment(string email, string AppointmnetNo)
        {
            var doctorId = await GetDoctorIdByEmail(email);
            var doctors = await _doctorRepository.GetAll();
            var doctor = doctors.FirstOrDefault(d=>d.Id == doctorId);
            if (doctor == null)
            {
                return false;
            }


            var appointment = (await _appointmentRepository.GetAll())
                                .FirstOrDefault(a => a.AppointmnetNumber == AppointmnetNo && a.DoctorId == doctor.Id);
            if (appointment == null)
            {
                System.Console.WriteLine("Appnull");
                return false;

            }

            try
            {
                await _appointmentRepository.Delete(appointment.AppointmnetNumber);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public async Task<int> GetDoctorIdByEmail(string email)
        {
            try
            {
                 var doctor= (await _doctorRepository.GetAll())
                            .FirstOrDefault(d => d.Email == email);
                if (doctor == null)
                {
                    Console.WriteLine($"\n\nNo doctor found with email: {email}");
                    return -1;
                }
                Console.WriteLine($"\n\nGet Doctor ID by email{doctor.Email} {doctor.Id}");

                return doctor.Id;
            }
            catch (Exception e)
            {
                Console.WriteLine("\n\n  Error", e.Message);
                return -1;
            }
        }
    }
}