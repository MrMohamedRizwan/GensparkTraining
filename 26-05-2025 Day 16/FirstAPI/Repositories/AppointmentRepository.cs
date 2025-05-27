using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Models;

namespace FirstAPI.Repositories
{
    public class AppointmentRepository : Repository<int, Appointment>
    {
        public AppointmentRepository() : base()
        {

        }

        protected override int GenerateId()
        {
            if (_items.Count == 0)
                return 101;
            else
                return _items.Max(e => e.PatientId) + 1;
        }

        protected override ICollection<Appointment> GetAll()
        {
            return _items;
        }

        protected override Appointment GetById(int id)
        {
            var Patient = _items.FirstOrDefault(x => x.PatientId == id);
            if (Patient == null)
                throw new KeyNotFoundException("Appointmnet Not Found");
            return Patient;
        }
    }
}