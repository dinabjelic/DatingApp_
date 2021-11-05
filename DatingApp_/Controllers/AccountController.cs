using AutoMapper;
using DatingApp.API.DTOs;
using DatingApp.Data;
using DatingApp.Entities;
using DatingApp_.API.DTOs;
using DatingApp_.API.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(DataContext context, ITokenService tokenService, IMapper mapper)
        {
            _tokenService = tokenService;
            _context = context;
            _mapper = mapper;
        }
        
       
       
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDTO register)
        {
            if (await UserExists(register.UserName))
            {
                return BadRequest("UserName is taken");
            }

            //ovdje cemo ic da uzmemo podatke iz register i stavimo ih u appUser
            var user = _mapper.Map<AppUser>(register);

            using var hmac = new HMACSHA512();

            //i na tog kreiranog usera cemo nadododat ovo enkodiranje
            user.UserName = register.UserName.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password));
            user.PasswordSalt = hmac.Key;

            

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                KnownAs =user.KnownAs
                
            };
        }


        

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDTO loginDto)
        {

             var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == loginDto.UserName);


            if (user == null)
            {
                return Unauthorized("Invalid Username");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return Unauthorized("Invalid password");
            }

            return new UserDto
            {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user),
                KnownAs = user.KnownAs

            };


        }
        private async Task<bool> UserExists(string UserName)
        {
            return await _context.Users.AnyAsync(x => x.UserName == UserName.ToLower());

        }

      

    }
}
