using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackendApplication.Models
{
    public class TweetHashtag
    {
        public int TweetId { get; set; }
        public int HashTagID { get; set; }
        
        [ForeignKey("TweetId")]
        public Tweet? Tweet { get; set; }

        [ForeignKey("HashtagId")]
        public Hashtag? Hashtag { get; set; }
    }
}