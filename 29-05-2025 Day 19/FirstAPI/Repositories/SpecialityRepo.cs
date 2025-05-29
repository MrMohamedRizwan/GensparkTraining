using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Contexts;
using FirstAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FirstAPI.Repositories
{
    public class SpecialityRepo: Repository<int, Specality>
    {
        public SpecialityRepo(ClinicContext clinicContext) : base(clinicContext)
        {
        }

        public override async Task<Specality> Get(int key)
        {
            var speciality = await _clinicContext.specialities.SingleOrDefaultAsync(p => p.Id == key);

            return speciality??throw new Exception("No speciality with the given ID");
        }

        public override async Task<IEnumerable<Specality>> GetAll()
        {
            var specialities = _clinicContext.specialities;
            if (specialities.Count() == 0)
                throw new Exception("No Speciality in the database");
            return await specialities.ToListAsync();
        }
    }
}