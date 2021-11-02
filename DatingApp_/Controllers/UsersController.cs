using AutoMapper;
using DatingApp.API.Controllers;
using DatingApp.Data;
using DatingApp.Entities;
using DatingApp_.API.DTOs;
using DatingApp_.API.Interfaces;
using DatingApp_.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DatingApp.Controllers
{
   
    public class UsersController : BaseApiController
    {


        //OVO JE KAKO JE IZGLEDALO PRIJE NEGO STO SMO UVELI REPOZITORY PATERN
        //private readonly DataContext _context;
        //public UsersController(DataContext context)
        //{
        //    _context = context;
        //}

        //[HttpGet]
        //[AllowAnonymous]
        //public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        //{
        //    return await _context.Users.ToListAsync();
        //}

        //[HttpGet("{id}")]
        //[AllowAnonymous]
        //public async Task<ActionResult<AppUser>> GetUser(int id)
        //{
        //    return await _context.Users.FindAsync(id);
        //}





        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;

        }


        //PRIJE NEGO STO SMO UVELI DODATNI HELP ZA AUTOMAPPER TJ ZA PROJECT TO
        //[HttpGet]
        //[AllowAnonymous]
        //public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        //{

        //    var users = await _repository.GetUserAsync();
        //    var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);

        //    return Ok(usersToReturn);

        //}


        //PRIJE NEGO STO SMO UVELI DODATNI HELP ZA AUTOMAPPER TJ PROJECT TO
        //[HttpGet("{username}")]
        //[AllowAnonymous]
        //public async Task<ActionResult<MemberDto>> GetUser(string username)
        //{

        //    var user= await _repository.GetUserByUsernameAsync(username);

        //    return _mapper.Map<MemberDto>(user);

        //}

        [HttpGet("{username}")]
        [AllowAnonymous]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {

           return await _repository.GetMemberAsync(username);  //i ovdje direktno vracamo iz repozitorija, ne moramo mapirat nista

        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
        {

            var users = await _repository.GetMembersAsync();

            return Ok(users);

        }


        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdate)
        {
            //var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            //var username = User.FindFirst(JwtRegisteredClaimNames.NameId)?.Value;


            //var username = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            //var username = User.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.NameId)?.Value;

            //var username = "bob";
            var username = memberUpdate.Username;
            var user = await _repository.GetUserByUsernameAsync(username);

            _mapper.Map(memberUpdate, user);

            _repository.Update(user);

            if (await _repository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }


    }
}
