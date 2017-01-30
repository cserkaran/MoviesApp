using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MoviesApp.SPA.Controllers
{
    public class FilmWorldController : MovieDatabaseController
    {
        public FilmWorldController() : base(MovieDatabase.Film)
        {
        }
    }
}
