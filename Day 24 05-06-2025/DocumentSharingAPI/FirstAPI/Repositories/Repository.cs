using FirstAPI.Contexts;
using FirstAPI.Interfaces;

namespace FirstAPI.Repositories
{
    public  abstract class Repository<K, T> : IRepository<K, T> where T:class
    {
        protected readonly UserContext _userContext;
        public Repository(UserContext UserContext)
        {
            _userContext = UserContext;
        }

        public async Task<T> Add(T item)
        {
            _userContext.Add(item);
            await _userContext.SaveChangesAsync();//generate and execute the DML quries for the objects whse state is in ['added','modified','deleted'],
            return item;
        }

        public async Task<T> Delete(K key)
        {
            var item = await Get(key);
            if (item != null)
            {
                _userContext.Remove(item);
                await _userContext.SaveChangesAsync();
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
                _userContext.Entry(myItem).CurrentValues.SetValues(item);
                await _userContext.SaveChangesAsync();
                return item;
            }
            throw new Exception("No such item found for updation");
        }
    }
}
