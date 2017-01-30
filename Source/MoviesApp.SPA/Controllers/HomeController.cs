using System.Web.Mvc;

namespace MoviesApp.SPA.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
