using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirstAPI.Models;
using FirstAPI.Models.Bank;
using FirstAPI.Models.DTOs;

namespace FirstAPI.Misc
{
    public class AccountMapper
    {
        public Account? MapAccountAddRequestAccount(AccountAddRequest addAccount)
        {
            Account acc = new();
            acc.HolderName = addAccount.HolderName;
            acc.Balance = addAccount.Balance;
            return acc;
        }
    }
}