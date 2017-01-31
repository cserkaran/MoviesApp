using System.Threading.Tasks;
using System.Web.Http;

namespace MoviesApp.SPA.Controllers
{
    /// <summary>
    /// Abstract Movies API controller
    /// </summary>
    /// <seealso cref="System.Web.Http.ApiController" />
    public abstract class MovieDatabaseController : ApiController
    {
        /// <summary>
        /// The database
        /// </summary>
        private MovieDatabase _db;

        /// <summary>
        /// Initializes a new instance of the <see cref="MovieDatabaseController"/> class.
        /// </summary>
        /// <param name="db">The database.</param>
        protected MovieDatabaseController(MovieDatabase db)
        {
            _db = db;
        }

        /// <summary>
        /// Gets the movies.
        /// </summary>
        /// <returns></returns>
        public async Task<IHttpActionResult> GetMovies()
        {
            var result = await HttpClientHelper.GetMovies(_db);
            return result;
        }

        /// <summary>
        /// Gets the movie.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public async Task<IHttpActionResult> GetMovie(string id)
        {
            var result = await HttpClientHelper.GetMovie(id, _db);
            return result;
        }
    }
}
