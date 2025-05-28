// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using FirstAPI.Interfaces;
// using FirstAPI.Models;
// using Microsoft.VisualBasic;

// namespace FirstAPI.Services
// {
//     public class AppointmentService : IAppointmet
//     {
//         IRepository<int, Appointment> _appointmentRepository;
//         public AppointmentService(IRepository<int, Appointment> appointmentRepository)
//         {
//             _appointmentRepository = appointmentRepository;
//         }
//         public int AddAppointmnet(Appointment appointment)
//         {
//             try
//             {
//                 var result = _appointmentRepository.Add(appointment);
//                 if (result != null)
//                 {
//                     return result.PatientId;
//                 }
//             }
//             catch (Exception e)
//             {
//                 Console.WriteLine(e.Message);
//             }
//             return -1;
//         }
        
//         public List<Appointment> SearchAppointmnet(AppointmnetSearch model)
//         {
//             try
//             {
//                 var app = _appointmentRepository.GetAll();
//                 app = SearchById(app, model.Id);
//                 if (app != null)
//                     return app.ToList();
//             }
//             catch (Exception e)
//             {
//                 System.Console.WriteLine(e.Message);
//             }
//             return null;
//         }
//         private ICollection<Appointment> SearchById(ICollection<Appointment> app, int? id)
//         {
//             if (id == null || app == null || app.Count == 0)
//                 return app;
//             else
//                 return app.ToList();
//         }
//     }
// }