using System.Configuration;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace MoviesApp.SPA
{
    /// <summary>
    /// HttpClient requests helper.
    /// </summary>
    public static class HttpClientHelper
    {
        /// <summary>
        /// The get movies URL
        /// </summary>
        private static string _getMoviesUrl = "http://webjetapitest.azurewebsites.net/api/{0}world/movies";

        /// <summary>
        /// The get movie URL
        /// </summary>
        private static string _getMovieUrl = "http://webjetapitest.azurewebsites.net/api/{0}world/movie/{1}";

        /// <summary>
        /// The authentication header type
        /// </summary>
        private static string _authHeaderType = "x-access-token";

        /// <summary>
        /// Gets the movies.
        /// </summary>
        /// <param name="db">The database.</param>
        /// <returns><see cref="Task<IHttpActionResult>"/>awaitable response</returns>
        public static async Task<IHttpActionResult> GetMovies(MovieDatabase db)
        {
            using (var client = new HttpClient())
            {
                // here we access our secret key. This will only be compromised if our server is compromised somehow.
                client.DefaultRequestHeaders.Add(_authHeaderType, ConfigurationManager.AppSettings["secret"]);
                var response = await client.GetAsync(string.Format(_getMoviesUrl, db.ToString().ToLowerInvariant()));
                return new MovieResponse(response);
            }
        }

        /// <summary>
        /// Gets the movie.
        /// </summary>
        /// <param name="movieId">The movie identifier.</param>
        /// <param name="db">The database.</param>
        /// <returns><see cref="Task<IHttpActionResult>"/>awaitable response</returns>
        public static async Task<IHttpActionResult> GetMovie(string movieId, MovieDatabase db)
        {
            using (var client = new HttpClient())
            {
                // here we access our secret key. This will only be compromised if our server is compromised somehow.
                client.DefaultRequestHeaders.Add(_authHeaderType, ConfigurationManager.AppSettings["secret"]);
                var response = await client.GetAsync(string.Format(_getMovieUrl, db.ToString().ToLowerInvariant(), movieId));
                return new MovieResponse(response);
            }
        }
    }  
}