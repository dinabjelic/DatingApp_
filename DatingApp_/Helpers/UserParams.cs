using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp_.API.Helpers
{
    public class UserParams
    {
        public string Username { get; set; }
        public string OrderBy { get; set; } = "lastActive"; //defoltno sortiranje je po tome kad su zadnji put bili aktivni
    }
}
