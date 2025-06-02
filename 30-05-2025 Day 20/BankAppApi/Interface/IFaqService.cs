using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BankAppApi.Interface
{
    public interface IFaqService
    {
        public Task<string> SendResponse(string input);
    }
}