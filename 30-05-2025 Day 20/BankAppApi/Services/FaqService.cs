using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BankAppApi.Interface;

namespace BankAppApi.Services
{
    public class FaqService : IFaqService
    {
        public string SendResponse(string input)
        {
            return input;
        }
    }
}