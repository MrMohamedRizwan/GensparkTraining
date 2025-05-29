using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FirstAPI.Models.DTOs
{
    public class DoctorsBySpecialityResponseDto
    {
        public int Id { get; set; }
        public string DName { get; set; } = string.Empty;
        public float Yoe { get; set; }
    }
}