using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackendApplication.Models
{
    public class Like
    {
        public int UserId { get; set; }
        public int TweetId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }
        [ForeignKey("TweetId")]
        public Tweet? Tweet { get; set; }
    }
}