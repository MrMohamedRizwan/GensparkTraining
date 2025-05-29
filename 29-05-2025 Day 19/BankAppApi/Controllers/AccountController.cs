using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BankAppApi.Interface;
using BankAppApi.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace BankAppApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }
        [HttpPost]
        public async Task<ActionResult<AccountDto>> CreateAccount(CreateAccountDto dto)
        {
            // Console.WriteLine("hi");
            var account = await _accountService.CreateAccount(dto);
            return Created("", account);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<AccountDto>> GetAccountByID(int id)
        {
            var account = await _accountService.GetAccount(id);
            return Ok(account);
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccountDto>>> GetAllAccounts()
        {
            var accounts = await _accountService.GetAllAccounts();
            return Ok(accounts);
        }
    }
}