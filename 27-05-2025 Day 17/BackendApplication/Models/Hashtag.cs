using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendApplication.Models
{
    public class Hashtag
    {
        [Key]
        public int HashtagId { get; set; }
        public string Tag { get; set; } = string.Empty;
    }
}