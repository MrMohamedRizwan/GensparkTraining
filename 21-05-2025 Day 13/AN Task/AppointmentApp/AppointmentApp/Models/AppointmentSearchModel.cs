﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentApp.Models
{
    public class AppointmentSearchModel
    {
        public string? PatientName { get; set; }
        public DateTime? AppointmentDate { get; set; }
        public Range<int>? AgeRange { get; set; }

        public class Range<T>
        {
            public T MinVal { get; set; }
            public T MaxVal { get; set; }

            public Range() { }

            public Range(T minVal, T maxVal)
            {
                MinVal = minVal;
                MaxVal = maxVal;
            }
        }
    }
}

