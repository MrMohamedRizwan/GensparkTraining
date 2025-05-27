using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Interfaces;
using Microsoft.AspNetCore.SignalR.Protocol;

namespace FirstAPI.Repositories
{
    public abstract class Repository<K, T> : IRepository<K, T> where T : class
    {
        protected List<T> _items = new List<T>();
        protected abstract K GenerateId();
        protected abstract ICollection<T> GetAll();
        protected abstract T GetById(K id);

        public T Add(T item)
        {
            var id = GenerateId();
            var property = typeof(T).GetProperty("Id");
            if (property != null)
                property.SetValue(item, id);
            if (_items.Contains(item))
            {
                throw new DuplicateWaitObjectException("Appointmnet Already Exists");
            }
            _items.Add(item);
            return item;
        }

        public T Delete(K id)
        {
            var item = GetById(id);
            if (item == null)
                throw new Exception("Item not found");
            _items.Remove(item);
            return item;
        }


        ICollection<T> IRepository<K, T>.GetAll()
        {
            return GetAll();
        }

        T IRepository<K, T>.GetById(K id)
        {
            return GetById(id);
        }
    }
}