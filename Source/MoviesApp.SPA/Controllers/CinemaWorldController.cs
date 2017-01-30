namespace MoviesApp.SPA.Controllers
{
    /// <summary>
    /// Cinema API controller
    /// </summary>
    /// <seealso cref="MoviesApp.SPA.Controllers.MovieDatabaseController" />
    public class CinemaWorldController : MovieDatabaseController
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="CinemaWorldController"/> class.
        /// </summary>
        public CinemaWorldController() : base(MovieDatabase.Cinema)
        {
        }
    }
}
