using AppointmentApp.Interfaces;
using AppointmentApp.Repositories;
using AppointmentApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IRepository<int, Appointment> _repository;

        public AppointmentService(IRepository<int, Appointment> repository)
        {
            _repository = repository;
        }

        public int AddAppointment(Appointment appointment)
        {
            try
            {
                var result = _repository.Add(appointment);
                if (result != null)
                {
                    return result.Id;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error adding appointment: {ex.Message}");
            }
            return -1;
        }

        public List<Appointment> SearchAppointments(AppointmentSearchModel model)
        {
            try
            {
                var appointments = _repository.GetAll();

                appointments = SearchByName(appointments, model.PatientName);
                appointments = SearchByDate(appointments, model.AppointmentDate);
                appointments = SearchByAge(appointments, model.AgeRange);

                if (appointments != null && appointments.Count > 0)
                    return appointments.ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error during search: {ex.Message}");
            }
            return null;
        }
        private ICollection<Appointment> SearchByName(ICollection<Appointment> appointments, string? name)
        {
            if (string.IsNullOrWhiteSpace(name) || appointments == null || appointments.Count == 0)
                return appointments;

            return appointments
                .Where(a => a.PatientName.ToLower().Contains(name.ToLower()))
                .ToList();
        }
        private ICollection<Appointment> SearchByDate(ICollection<Appointment> appointments, DateTime? date)
        {
            if (!date.HasValue || appointments == null || appointments.Count == 0)
                return appointments;

            return appointments
                .Where(a => a.AppointmentDate.Date == date.Value.Date)
                .ToList();
        }

        private ICollection<Appointment> SearchByAge(ICollection<Appointment> appointments, AppointmentSearchModel.Range<int>? ageRange)
        {
            if (ageRange == null || appointments == null || appointments.Count == 0)
                return appointments;

            return appointments
                .Where(a => a.PatientAge >= ageRange.MinVal && a.PatientAge <= ageRange.MaxVal)
                .ToList();
        }
    }
}
