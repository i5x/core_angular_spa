using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace Intalex.NetCore.Angular.SPA.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHostingEnvironment _env;

        public HomeController(IHostingEnvironment env)
        {
            _env = env;
        }

        // GET: Home
        public ActionResult Index()
        {
            return View("~/views/shared/spa.cshtml");
        }

        // GET: *
        public ActionResult Partials(string url)
        {
            var webRoot = _env.ContentRootPath;
            var filePath = System.IO.Path.Combine(webRoot, $"views/" + url + ".cshtml");
            var fileName = "~/views/" + url + ".cshtml";
            if (!System.IO.File.Exists(filePath))
                return NotFound();

            return View(fileName);
        }
    }
}