using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstAPI.Models
{
    public class Patient
    {
        public int Id { get; set; }           
        public string Name { get; set; } = string.Empty; 
        public int Age { get; set; }
        public string Diagnosis { get; set; } = string.Empty;

    }
}