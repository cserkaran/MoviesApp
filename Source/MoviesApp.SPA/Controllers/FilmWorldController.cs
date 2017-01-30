namespace MoviesApp.SPA.Controllers
{
    /// <summary>
    /// Films API controller
    /// </summary>
    /// <seealso cref="MoviesApp.SPA.Controllers.MovieDatabaseController" />
    public class FilmWorldController : MovieDatabaseController
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="FilmWorldController"/> class.
        /// </summary>
        public FilmWorldController() : base(MovieDatabase.Film)
        {
        }
    }
}
