using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;

namespace MoviesApp.SPA
{
    /// <summary>
    /// Custom response object to return movies.
    /// </summary>
    /// <seealso cref="System.Web.Http.IHttpActionResult" />
    public class MovieResponse : IHttpActionResult
    {
        /// <summary>
        /// The response
        /// </summary>
        private HttpResponseMessage _response;

        /// <summary>
        /// Initializes a new instance of the <see cref="MovieResponse"/> class.
        /// </summary>
        /// <param name="response">The response.</param>
        public MovieResponse(HttpResponseMessage response)
        {
            _response = response;
        }

        /// <summary>
        /// Creates an <see cref="T:System.Net.Http.HttpResponseMessage" /> asynchronously.
        /// </summary>
        /// <param name="cancellationToken">The token to monitor for cancellation requests.</param>
        /// <returns>
        /// A task that, when completed, contains the <see cref="T:System.Net.Http.HttpResponseMessage" />.
        /// </returns>
        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            return Task.FromResult(_response);
        }
    }
}