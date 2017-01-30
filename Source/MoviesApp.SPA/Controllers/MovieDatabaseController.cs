using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace MoviesApp.SPA.Controllers
{
    public abstract class MovieDatabaseController : ApiController
    {
        private MovieDatabase _db;

        protected MovieDatabaseController(MovieDatabase db)
        {
            _db = db;
        }

        public async Task<IHttpActionResult> GetMovies()
        {
            var result = await HttpClientHelper.GetMovies(_db);
            return result;
        }

        public async Task<IHttpActionResult> GetMovie(string id)
        {
            var result = await HttpClientHelper.GetMovie(id, _db);
            return result;
        }
    }
}
