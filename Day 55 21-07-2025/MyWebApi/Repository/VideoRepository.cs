using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyWebApi.Context;
using MyWebApi.Models;

namespace MyWebApi.Repository
{
    public class VideoRepository : Repository<Guid, Video>
    {
        public VideoRepository(VideoContext context):base(context)
        {
            
        }
        public override async Task<Video> Get(Guid key)
        {
            return await _videoContext.Videos.SingleOrDefaultAsync(u => u.Id == key);
        }

        public override async Task<IEnumerable<Video>> GetAll()
        {
            return await _videoContext.Videos.ToListAsync();
        }
        
    }
}