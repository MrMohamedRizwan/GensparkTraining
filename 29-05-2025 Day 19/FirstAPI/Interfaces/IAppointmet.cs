using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Models;

namespace FirstAPI.Interfaces
{
    public interface IAppointmet
    {
        int AddAppointmnet(Appointment appointment);
        List<Appointment> SearchAppointmnet(AppointmnetSearch model);
    }
}