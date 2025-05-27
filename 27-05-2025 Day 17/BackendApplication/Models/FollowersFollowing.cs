using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BackendApplication.Models
{
    public class FollowersFollowing
    {
        public int FollowerId { get; set; }
        public int FollowingId { get; set; }

        [ForeignKey("FollowerId")]
        public User? Follower { get; set; }

        [ForeignKey("FollowingId")]
        public User? Following { get; set; }
    }
}