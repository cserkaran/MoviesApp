using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace MoviesApp.SPA
{
    public class MovieResponse : IHttpActionResult
    {
        private HttpResponseMessage _response;

        public MovieResponse(HttpResponseMessage response)
        {
            _response = response;
        }

        public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
        {
            return Task.FromResult(_response);
        }
    }
}