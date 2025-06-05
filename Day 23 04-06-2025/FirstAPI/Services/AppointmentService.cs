using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Interfaces;
using FirstAPI.Models;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IRepository<string, Appointmnet> _appointmentRepository;
        IRepository<int, Doctor> _doctorRepository;
        public AppointmentService(IRepository<int, Doctor> doctorRepository, IRepository<string, Appointmnet> appointmentRepository)
        {
            _appointmentRepository = appointmentRepository;
            _doctorRepository = doctorRepository;
        }
        public Task<Appointmnet> AddAppointmnet(AppointmnetAddRequestDTO Appointment)
        {
            throw new NotImplementedException();
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