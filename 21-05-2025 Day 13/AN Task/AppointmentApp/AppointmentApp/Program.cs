// See https://aka.ms/new-console-template for more information
using AppointmentApp.Interfaces;
using AppointmentApp.Models;
using AppointmentApp.Repositories;
using AppointmentApp.Services;

namespace AppointmentAPP
{
    internal class Program
    {
        static void Main(string[] args)
        {
            IRepository<int, Appointment> repository = new AppointmentRepository();
            AppointmentService service = new AppointmentService(repository);

            while (true)
            {
                Console.WriteLine("\n--- Cardiologist Appointment Management ---");
                Console.WriteLine("1. Add Appointment");
                Console.WriteLine("2. Search Appointments");
                Console.WriteLine("3. List All Appointments");
                Console.WriteLine("3. Exit");
                Console.Write("Choose an option: ");
                string? choice = Console.ReadLine();

                switch (choice)
                {
                    case "1":
                        AddNewAppointment(service);
                        break;
                    case "2":
                        SearchAppointments(service);
                        break;
                    case "3":
                        ListAllAppointmnets(service); 
                        break;
                    case "4":
                        Console.WriteLine("Exiting...");
                        return;
                    default:
                        Console.WriteLine("Invalid choice. Try again.");
                        break;
                }
            }
        }
        static void ListAllAppointmnets(AppointmentService service)
        {
            var model = new AppointmentSearchModel();
            var results = service.SearchAppointments(model);
            if (results != null && results.Count > 0)
            {
                Console.WriteLine("\n--- Matching Appointments ---");
                foreach (var app in results)
                {
                    Console.WriteLine(app);
                    Console.WriteLine("----------------------------");
                }
            }
            else
            {
                Console.WriteLine("No appointments found with the given filters.");
            }


        }
        static void AddNewAppointment(AppointmentService service)
        {
            Appointment appointment = new Appointment();
            appointment.TakeAppointmentDetailsFromUser();
            int newId = service.AddAppointment(appointment);
            if (newId != -1)
            {
                Console.WriteLine($"Appointment added successfully with ID: {newId}");
            }
            else
            {
                Console.WriteLine("Failed to add appointment.");
            }
        }

        static void SearchAppointments(AppointmentService service)
        {
            var model = new AppointmentSearchModel();

            Console.Write("Enter Patient Name to search (or leave blank): ");
            string? name = Console.ReadLine();
            model.PatientName = string.IsNullOrWhiteSpace(name) ? null : name;

            Console.Write("Enter Appointment Date (yyyy-MM-dd) (or leave blank): ");
            string? dateInput = Console.ReadLine();
            if (DateTime.TryParse(dateInput, out DateTime parsedDate))
            {
                model.AppointmentDate = parsedDate;
            }

            Console.Write("Enter Min Age (or leave blank): ");
            string? minAgeStr = Console.ReadLine();
            Console.Write("Enter Max Age (or leave blank): ");
            string? maxAgeStr = Console.ReadLine();

            if (int.TryParse(minAgeStr, out int minAge) && int.TryParse(maxAgeStr, out int maxAge))
            {
                model.AgeRange = new AppointmentSearchModel.Range<int>(minAge, maxAge);
            }

            var results = service.SearchAppointments(model);
            if (results != null && results.Count > 0)
            {
                Console.WriteLine("\n--- All Appointments ---");
                foreach (var app in results)
                {
                    Console.WriteLine(app);
                    Console.WriteLine("----------------------------");
                }
            }
            else
            {
                Console.WriteLine("No appointments found ");
            }
        }
    }
}
