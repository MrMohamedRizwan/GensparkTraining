using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FitnessTrackerAPI.Interfaces;
using FitnessTrackerAPI.Models;

namespace FitnessTrackerAPI.Misc
{
    public class UniqueIdByEmail
    {
        private readonly IRepository<Guid, Coach> _coachRepository;
        private readonly IRepository<Guid, Client> _clientRepositroy;
        public UniqueIdByEmail(IRepository<Guid, Coach> coachRepository, IRepository<Guid, Client> clientRepositroy)
        {
            _coachRepository = coachRepository;
            _clientRepositroy = clientRepositroy;
        }
        public async Task<string> GetIdByEmail(User user)
        {
            if (user.Role == "Coach")
            {
                try
                {
                    var email = user.Email;
                    var coach = (await _coachRepository.GetAll())
                               .FirstOrDefault(d => d.Email == email);
                    // System.Console.WriteLine(coach.Id);
                    if (coach == null)
                    {
                        // Console.WriteLine($"\n\nNo coach found with email: {email}");
                        return "coachisNull";
                    }
                    // Console.WriteLine($"\n\nGet coach ID by email{coach.Email} {coach.Id}");

                    return coach.Id.ToString();
                }
                catch (Exception e)
                {
                    // Console.WriteLine("\n\n  Error", e.Message);
                    return "Exception";

                }
            }
            else if (user.Role == "Coach")
            {
                try
                {
                    var email = user.Email;
                    var client = (await _clientRepositroy.GetAll())
                               .FirstOrDefault(d => d.Email == email);
                    if (client == null)
                    {
                        // Console.WriteLine($"\n\nNo client found with email: {email}");
                        return "";

                    }
                    // Console.WriteLine($"\n\nGet client ID by email{client.Email} {client.Id}");
                    return client.Id.ToString();
                }
                catch (Exception e)
                {
                    Console.WriteLine("\n\n  Error", e.Message);
                    return "";
                }
            }
            return "";
            
        }

        
    }
}