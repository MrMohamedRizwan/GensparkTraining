using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Contexts;
using FirstAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FirstAPI.Repositories
{
    public class DoctorRepo : Repository<int, Doctor>
    {
        public DoctorRepo(ClinicContext clinicContext) : base(clinicContext)
        {
        }
        public override async Task<Doctor> Get(int key)
        {
            var doctor = await _clinicContext.doctors.SingleOrDefaultAsync(d => d.Id == key);
            return doctor ?? throw new Exception("No Doctor with the given ID");
        }

        public override async Task<IEnumerable<Doctor>> GetAll()
        {
            var doctor = _clinicContext.doctors;
            if (doctor.Count() == 0)
               throw new Exception("No Patients in the database");
            return (await doctor.ToListAsync());
        }
    }
}