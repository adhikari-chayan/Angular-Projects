using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PTCApi.EntityClasses;
using PTCApi.ManagerClasses;
using PTCApi.Model;

namespace PTCApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : AppControllerBase
    {
        private readonly PtcDbContext _context;
        private readonly ILogger<SecurityController> _logger;

        private JWtSettings _settings;
        public SecurityController(ILogger<SecurityController> logger, PtcDbContext context, JWtSettings settings)
        {
            _context = context;
            _logger = logger;
            _settings = settings;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] AppUser user)
        {
            IActionResult ret = null;
            AppUserAuth auth = new AppUserAuth();
            SecurityManager mgr = new SecurityManager(_context, auth, _settings);

            auth = (AppUserAuth)mgr.ValidateUser(user.UserName, user.Password);
            if(auth.IsAuthenticated)
            {
                ret = StatusCode(StatusCodes.Status200OK, auth);
            }
            else
            {
                ret = StatusCode(StatusCodes.Status403Forbidden,"Invalid User Name/Password");
            }

            return ret;
        }
    }
}