using System.Threading.Tasks;
using System.Web.Http;

namespace MoviesApp.SPA.Controllers
{
    public class CinemaWorldController : MovieDatabaseController
    {
        public CinemaWorldController() : base(MovieDatabase.Cinema)
        {
        }
    }
}
