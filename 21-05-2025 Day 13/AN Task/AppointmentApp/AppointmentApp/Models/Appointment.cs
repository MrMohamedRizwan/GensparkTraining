using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public string PatientName { get; set; }
        public int PatientAge { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string Reason { get; set; }
        public Appointment()
        {
            PatientName = string.Empty;
            Reason = string.Empty;
        }

        public Appointment(int id, string patientName, int patientAge, DateTime appointmentDate, string reason)
        {
            Id = id;
            PatientName = patientName;
            PatientAge = patientAge;
            AppointmentDate = appointmentDate;
            Reason = reason;
        }

        public void TakeAppointmentDetailsFromUser()
        {
            Console.WriteLine("Please enter the patient's name:");
            PatientName = Console.ReadLine() ?? string.Empty;

            Console.WriteLine("Please enter the patient's age:");
            int age;
            while (!int.TryParse(Console.ReadLine(), out age) || age <= 0)
            {
                Console.WriteLine("Invalid age. Please enter a positive integer.");
            }
            PatientAge = age;
            DateTime appointmentDate = DateTime.Now;
            
            AppointmentDate = appointmentDate;

            Console.WriteLine("Please enter the reason for appointment:");
            Reason = Console.ReadLine() ?? string.Empty;
        }

        public override string ToString()
        {
            return $"Appointment ID: {Id}\nPatient Name: {PatientName}\nPatient Age: {PatientAge}\nAppointment Date: {AppointmentDate}\nReason: {Reason}";
        }
    }
}
