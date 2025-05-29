using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Contexts;
using FirstAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FirstAPI.Repositories
{
    public class DoctorSpecalityRepo : Repository<int, DoctorSpecality>
    {
        public DoctorSpecalityRepo(ClinicContext clinicContext) : base(clinicContext)
        {
        }

        public override async Task<DoctorSpecality> Get(int key)
        {
            var doctorSpecialities = await _clinicContext.doctorspecialities.SingleOrDefaultAsync(p => p.SerialNumber == key);

            return doctorSpecialities??throw new Exception("No doctor specialities with the given ID");
        }

        public override async Task<IEnumerable<DoctorSpecality>> GetAll()
        {
            var doctorSpeciality = _clinicContext.doctorspecialities;
            if (doctorSpeciality.Count() == 0)
                throw new Exception("No doctor speciality in the database");
            return (await doctorSpeciality.ToListAsync());
        }
    }
}