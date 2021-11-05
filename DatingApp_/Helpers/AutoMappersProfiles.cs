
using AutoMapper;
using DatingApp.API.DTOs;
using DatingApp.Entities;
using DatingApp_.API.DTOs;
using DatingApp_.API.Extensions;
using System.Linq;

namespace DatingApp_.API.Helpers
{
    public class AutoMappersProfiles:Profile
    {
       
        public AutoMappersProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(
                      src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(
                      src => src.DateOfBirth.CalculateAge()));

            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDTO, AppUser>();


        }


    }
}
