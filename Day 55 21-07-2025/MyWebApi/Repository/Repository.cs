using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyWebApi.Context;
using MyWebApi.Interfaces;

namespace MyWebApi.Repository
{
    public abstract class Repository<K, T> : IRepository<K, T> where T : class
    {
        protected readonly VideoContext _videoContext;
        public Repository(VideoContext videoContext)
        {
            _videoContext = videoContext;
        }

        public async Task<T> Add(T item)
        {
            _videoContext.Add(item);
            await _videoContext.SaveChangesAsync();//generate and execute the DML quries for the objects whse state is in ['added','modified','deleted'],
            return item;
        }

        public async Task<T> Delete(K key)
        {
            var item = await Get(key);
            if (item != null)
            {
                _videoContext.Remove(item);
                await _videoContext.SaveChangesAsync();
                return item;
            }
            throw new Exception("No such item found for deleting");
        }

        public abstract Task<T> Get(K key);


        public abstract Task<IEnumerable<T>> GetAll();


        public async Task<T> Update(K key, T item)
        {
            var myItem = await Get(key);
            if (myItem != null)
            {
                _videoContext.Entry(myItem).CurrentValues.SetValues(item);
                await _videoContext.SaveChangesAsync();
                return item;
            }
            throw new Exception("No such item found for updation");
        }
        
    }
}