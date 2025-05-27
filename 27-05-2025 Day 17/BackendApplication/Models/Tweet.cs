using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackendApplication.Models
{
    public class Tweet
    {
        [Key]
        public int TweetId { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        [ForeignKey("UserId")]
        public User? User { get; set; }
        public ICollection<Like> Likes { get; set; } = new List<Like>();
        public ICollection<TweetHashtag> TweetHashtags { get; set; } = new List<TweetHashtag>();

    }
}