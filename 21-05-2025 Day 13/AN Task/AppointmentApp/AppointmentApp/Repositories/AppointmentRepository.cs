using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentApp.Interfaces;
using AppointmentApp.Exceptions;
using AppointmentApp.Models;

namespace AppointmentApp.Repositories
{
    public class AppointmentRepository : IRepository<int, Appointment>
    {
        private readonly List<Appointment> _appointments = new();
        private int _nextId = 1;
        public Appointment Add(Appointment item)
        {
            item.Id = _nextId++;
            _appointments.Add(item);
            return item;
        }

        public Appointment Delete(int id)
        {
            
            var app = GetById(id);
            if (app != null)
            {
                _appointments.Remove(app);
                return app;
            }
            throw new KeyNotFoundException("Appointment not found.");
        }

        public ICollection<Appointment> GetAll()
        {
            if (_appointments.Count == 0)
            {
                throw new CollectionEmptyException("No Appointments found");
            }
            return _appointments;
        }

        public Appointment GetById(int id)
        {
            var appointment=_appointments.FirstOrDefault(x => x.Id == id);
            if (appointment==null)
            {
                throw new KeyNotFoundException("Appointment not found.");
            }
            return appointment;
        }

    }
}
