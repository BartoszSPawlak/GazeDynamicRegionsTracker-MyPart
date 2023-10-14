using DynamicRegionTracker.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace DynamicRegionTracker.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Index(List<IFormFile> firstName)
        {
            try
            {
                if (firstName.Count > 0)
                {
                    foreach (var file in firstName)
                    {
                        string fileName = file.FileName;
                        fileName = Path.GetFileName(fileName);
                        string uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot//data", fileName);
                        //string uploadPath = Path.GetDirectoryName(fileName);

                        var stream = new FileStream(uploadPath, FileMode.Create);
                        file.CopyToAsync(stream);

                    }
                    ViewBag.Message = "Total " + firstName.Count + "Files uploaded successfully.";
                }
            }
            catch (Exception ex)
            {
                ViewBag.Message = "Error";
            }


            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}