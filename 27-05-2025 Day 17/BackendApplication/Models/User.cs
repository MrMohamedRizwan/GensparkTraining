using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BackendApplication.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;

        public ICollection<Tweet> Tweets { get; set; } = new List<Tweet>();
        public ICollection<Like> Likes { get; set; } = new List<Like>();
        public ICollection<FollowersFollowing> Followers { get; set; } = new List<FollowersFollowing>();
        public ICollection<FollowersFollowing> Following { get; set; } = new List<FollowersFollowing>();
        

    }
}