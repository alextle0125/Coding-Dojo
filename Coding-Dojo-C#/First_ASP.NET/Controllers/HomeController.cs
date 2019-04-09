using Microsoft.AspNetCore.Mvc;
namespace HelloASP
{
	public class HomeController : Controller
	{
		// Requests
		// localhost:5000
		[HttpGet("")]
		public ViewResult Index()
		{
			return View();
		}

		// localhost:5000/hello
		[HttpGet("hello")]
		public RedirectToActionResult Hello()
		{
			return RedirectToAction("Index");
		}

		// localhost:5000/users/???
		[HttpGet("users/{username}")]
		public string HelloUser(string username)
		{
			return $"Hello {username}";
		}
	}
}