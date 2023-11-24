using DynamicRegionsTracker.Models;
using DynamicRegionTracker.Models;
using Emgu.CV;
using Emgu.CV.Structure;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.Text.Json;
using System.Text;

namespace DynamicRegionTracker.Controllers
{
    public class MainController : Controller
    {
        private readonly ILogger<MainController> _logger;
        
        Point StarPoint;
        Point FinishPoint;

        Thread playbackThread;

        bool _play = false;
        bool _forward = true;

        Rectangle rectangleForAlgorithm;
        DataStore dataStore;
        ListOfRectangles.ListOfRectangles results;

        public MainController(ILogger<MainController> logger)
        {
            _logger = logger;
            CurrentFrame = 0;
            dataStore = DataStore.GetInstance();
            rectangleForAlgorithm = new Rectangle();
            results = ListOfRectangles.ListOfRectangles.GetInstance();
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Main()
        {
            var listForDescNpca = new List<string>() { "Gray", "CN", "Custom" };
            ViewBag.listForDescNpca = listForDescNpca;

            var listOfDetectionMethod = new List<string>() { "None", "Template Matching", "Feature Matching" };
            ViewBag.listOfDetectionMethod = listOfDetectionMethod;

            var listOfAlgorithms = new List<string>() { "KCF", "Boost", "CSRT", "GOTRUN", "MedianFlow", "MIL", "MOSSE", "Multi Object TLD", "TLD" };
            ViewBag.listOfAlgorithms = listOfAlgorithms;

            return View();
        }

        [HttpPost]
        [RequestFormLimits(MultipartBodyLengthLimit = 40971520)]
        [RequestSizeLimit(40971520)]
        public IActionResult Main([FromForm] List<IFormFile>? fileUpload)
        {
            dataStore.listOfPaths.Clear();
            string deletePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot//data");
            Directory.Delete(deletePath, true);
            Directory.CreateDirectory(deletePath);

            if (fileUpload.Count > 0)
            {
                foreach (var file in fileUpload)
                {
                    string fileName = file.FileName;
                    fileName = Path.GetFileName(fileName);
                    string uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot//data", fileName);

                    using (var stream = new FileStream(uploadPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        dataStore.listOfPaths.Add(uploadPath);

                        stream.Flush();
                    }
                    
                }
            }
            _view_Open(dataStore.listOfPaths[0]);// zamiana pierwszej klatki filmu na macierz Mat
            return Json("ok");
        }

        [HttpPost]
        public IActionResult GetSizeOfImage([FromBody] JsonElement sizeOfImage)
        {
            dataStore.widthOfImage = JsonSerializer.Deserialize<int>(sizeOfImage.GetProperty("width"));
            dataStore.heightOfImage = JsonSerializer.Deserialize<int>(sizeOfImage.GetProperty("height"));
            return Json("ok");
        }

        private void _view_Open(string path)
        {
            
        }

        private Rectangle ScaleToOriginal(Rectangle rectangle)
        {
            float scaleX = (float)dataStore.widthOfImage / (float)900;
            float scaleY = (float)dataStore.heightOfImage / (float)500;

            rectangle.X = (int)(scaleX * rectangle.X);
            rectangle.Y = (int)(scaleY * rectangle.Y);
            rectangle.Width = (int)(scaleX * rectangle.Width);
            rectangle.Height = (int)(scaleY * rectangle.Height);

            if (rectangle.Width < 0) { 
                rectangle.X = rectangle.X + rectangle.Width;
                if (rectangle.X < 0) { rectangle.X = 1; }
                rectangle.Width = rectangle.Width * (-1); 
            }
            if (rectangle.Height < 0) { 
                rectangle.Y = rectangle.Y + rectangle.Height;
                if (rectangle.Y < 0) { rectangle.Y = 1; }
                rectangle.Height = rectangle.Height * (-1); 
            }

            return rectangle;
        }

        public long CurrentFrame { get; set; }

        [HttpPost]
        public IActionResult GetObject([FromBody] JsonElement x)//, string y, string weith, string height)//powinien byc json z prostokątem, string z nazwą algorytmu, json z ustawieniami algorytmu i string z nazwą prostokąta.obiektu
        {
            var indexOfBoundingBox = JsonSerializer.Deserialize<int>(x.GetProperty("indexOfBoundingBox"));
            var rectangle = JsonSerializer.Deserialize<Rectangle>(x.GetProperty("rectangle"));
            var nameOfRectangle = JsonSerializer.Deserialize<string>(x.GetProperty("nameOfRectangle"));
            var nameOfAlgorithm = JsonSerializer.Deserialize<string>(x.GetProperty("nameOfAlgorithm"));
            
            CurrentFrame = 0;
            _view_AddObject(rectangle, CurrentFrame, GetTrackerSettings(nameOfAlgorithm, x), nameOfRectangle, nameOfAlgorithm, indexOfBoundingBox);

            var listForPescPca = new List<string>() { "Gray", "CN", "Custom" };
            ViewBag.listForPescPca = listForPescPca;

            var listForDescNpca = new List<string>() { "Gray", "CN", "Custom" };
            ViewBag.listForDescNpca = listForDescNpca;

            var listOfDetectionMethod = new List<string>() { "None", "Template Matching", "Feature Matching" };
            ViewBag.listOfDetectionMethod = listOfDetectionMethod;

            var listOfAlgorithms = new List<string>() { "KCF", "Boost", "CSRT", "GOTRUN", "MedianFlow", "MIL", "MOSSE", "Multi Object TLD", "TLD" };
            ViewBag.listOfAlgorithms = listOfAlgorithms;

            return View("Main");
        }

        private void _view_AddObject(Rectangle rectangle, long frame, string settings, string name, string nameOfAlgorithm, int indexOfBoundingBox)
        {
            rectangleForAlgorithm = ScaleToOriginal(rectangle);
            ValidateRectangle(rectangleForAlgorithm);
            var s = new Mat(dataStore._currentFrame,
                rectangleForAlgorithm);

            //tworzenie obiektu pozwalającego śledzić zaznaczony elemeny na ekranie i inicjalizowanie go
        }

        private void _view_DetectionMethodChanged(int methodIndex)
        {
            switch (methodIndex)
            {
                case 0:
                    //brak metody detekcji
                    break;
                case 1:
                    //template detection
                    break;
                case 2:
                    //feature detection
                    break;
            }
        }

        private string GetTrackerSettings(string nameOfAlgorithm, JsonElement json)//deserializacja ustawień algorytmu na model danego algorytmu - oryginalnie zwracała inny ty
        {
            switch (nameOfAlgorithm)
            {
                case "KCF":
                    {
                        var kcfSettings = JsonSerializer.Deserialize<ModelKCF>(json.GetProperty("settingsOfAlgorithm"));

                        TrackerKCF.Mode descPca = TrackerKCF.Mode.Cn;
                        TrackerKCF.Mode descNpca = TrackerKCF.Mode.Gray;
                        switch (kcfSettings.PescPca)
                        {
                            case "Gray":
                                descPca = TrackerKCF.Mode.Gray;
                                break;
                            case "CN":
                                descPca = TrackerKCF.Mode.Cn;
                                break;
                            case "Custom":
                                descPca = TrackerKCF.Mode.Custom;
                                break;
                        }
                        switch (kcfSettings.DescNpca)
                        {
                            case "Gray":
                                descNpca = TrackerKCF.Mode.Gray;
                                break;
                            case "CN":
                                descNpca = TrackerKCF.Mode.Cn;
                                break;
                            case "Custom":
                                descNpca = TrackerKCF.Mode.Custom;
                                break;
                        }

                        //tworzenie obiektu przechowującegi ustawienia dla algorytmu KCF
                    }
                    break;
                case "Boosting":
                    {
                        //tworzenie obiektu przechowującegi ustawienia dla algorytmu Boosting
                    }
                    break;
                case "GOTRUN":
                    {
                        //tworzenie obiektu przechowującegi ustawienia dla algorytmu GOTRUN
                    }
                    break;
                case "MedianFlow":
                    {
                        var medianFlowSettings = JsonSerializer.Deserialize<ModelMedianFlow>(json.GetProperty("settingsOfAlgorithm"));

                        MCvTermCriteria mCvTermCriteria = new MCvTermCriteria(medianFlowSettings.TermCriteriaMaxIter, medianFlowSettings.TermCriteriaEps);

                        //tworzenie obiektu przechowującegi ustawienia dla algorytmu MedianFlow
                    }
                    break;
                case "MIL":
                    {
                        //tworzenie obiektu przechowującegi ustawienia dla algorytmu MIL
                    }
                    break;
                case "MOSSE":
                    {
                        //tworzenie obiektu przechowującegi ustawienia dla algorytmu MOSSE
                    }
                    break;
                case "TLD":
                    {
                        //tworzenie obiektu przechowującegi ustawienia dla algorytmu TLD
                    }
                    break;
                case "CSRT":
                    {
                        //tworzenie obiektu przechowującegi ustawienia dla algorytmu CSRT
                    }
                    break;
                case "Multi Object TLD":
                    {
                        //tworzenie obiektu przechowującegi ustawienia dla algorytmu Multi Object TLD
                    }
                    break;
            }
            return null;
        }

        [HttpPost]
        public IActionResult changeDetectionMethod([FromBody] JsonElement x)//
        {
            var detectionMethod = JsonSerializer.Deserialize<int>(x.GetProperty("detectionMethod"));

            _view_DetectionMethodChanged(detectionMethod);

            return Json("ok");
        }

        //w tej funkcji było generowanie kolejnych instancji obszarów zainteresow dla kolejnych klatek filmu
        private void _view_Play()
        {
            foreach (var image in dataStore.listOfPaths)
	        {
                dataStore.imageInString.Add(ImageToString(image));
	        }
        }

        [HttpPost]
        public IActionResult StartBtn([FromBody] JsonElement frameIdInJson)//
        {
            if (dataStore.isVideo == true && dataStore.firstCalculation == true)
            {
                dataStore.firstCalculation = false;
                splitVideoIntoFrames();
            }
            dataStore._keyOfStartFrame = 1;
            dataStore._frameIterator = JsonSerializer.Deserialize<int>(frameIdInJson.GetProperty("frameId"));

            _view_Play();

            var listForPescPca = new List<string>() { "Gray", "CN", "Custom" };
            ViewBag.listForPescPca = listForPescPca;

            var listForDescNpca = new List<string>() { "Gray", "CN", "Custom" };
            ViewBag.listForDescNpca = listForDescNpca;

            var listOfDetectionMethod = new List<string>() { "None", "Template Matching", "Feature Matching" };
            ViewBag.listOfDetectionMethod = listOfDetectionMethod;

            var listOfAlgorithms = new List<string>() { "KCF", "Boost", "CSRT", "GOTRUN", "MedianFlow", "MIL", "MOSSE", "Multi Object TLD", "TLD" };
            ViewBag.listOfAlgorithms = listOfAlgorithms;

            var c = JsonSerializer.SerializeToDocument(new ModelResults(dataStore.imageInString,
                dataStore.boundingBoxesX, dataStore.boundingBoxesY, dataStore.boundingBoxesHeight,
                dataStore.boundingBoxesWidth, dataStore.namesOfBoundingBoxes));
            
            return Json(c);
        }

        void splitVideoIntoFrames()
        {
            var outputPath = "output_images";
            System.IO.Directory.CreateDirectory(outputPath);
            int i = 0;
            var capture = new VideoCapture(dataStore.listOfPaths[i]);
            var image = new Mat();
            

            while (capture.IsOpened)
            {
                var a = capture.Read(image);
                if (image.IsEmpty)
                {
                    break;
                }
                string imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot//framesOfVideo", "frame" + i + ".bmp");
                if (i != 0)
                {
                    dataStore.listOfPaths.Add(imagePath);
                }
                else
                {
                    dataStore.listOfPaths[i] = imagePath;
                }
                CvInvoke.Resize(image, image, new Size(320, 180));

                image.Save(imagePath);
                i++;
            }
        }

        [HttpPost]
        public IActionResult GetCsvFile()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("#Dynamic Regions (DAOIs) from Gaze Data Explorer, exported " + DateTime.Now.ToString()+";");
            sb.Append("\r\n");

            sb.Append("#name"+";");
            sb.Append("shape"+";"); 
            sb.Append("left" + ";"); 
            sb.Append("top" + ";"); 
            sb.Append("width" + ";");
            sb.Append("height" + ";"); 
            sb.Append("startTime" + ";"); 
            sb.Append("endTime" + ";");
            sb.Append("\r\n");

            return File(Encoding.UTF8.GetBytes(sb.ToString()), "text/csv", "ResultFile.csv");
        }

        [HttpPost]
        public IActionResult _view_Stop()
        {
            _play = false;

            return Json("ok");
        }

        public string ImageToString(string path)
        {
            if (path == null)

                throw new ArgumentNullException("path");

            Image im = Image.FromFile(path);

            MemoryStream ms = new MemoryStream();

            im.Save(ms, im.RawFormat);

            byte[] array = ms.ToArray();

            return Convert.ToBase64String(array);
        }

        [HttpPost]
        public IActionResult GetResults()
        {
            while (dataStore.isFinished == false) { }

            return View("Main");
        }

        [HttpPost]
        public IActionResult DeleteObject([FromBody] JsonElement objectIndexInJson)
        {
            var objectIndex = JsonSerializer.Deserialize<int>(objectIndexInJson.GetProperty("objectIndex"));//
   
            return View("Main");
        }

        Rectangle ValidateRectangle(Rectangle rectangle)
        {
            if (rectangle.X < 0)
                rectangle.X = 0;
            if (rectangle.Y < 0)
                rectangle.Y = 0;
            if (rectangle.X + rectangle.Width > 900)
                rectangle.Width = 900 - rectangle.X;
            if (rectangle.Y + rectangle.Height > 500)
                rectangle.Height = 500 - rectangle.Y;
            return rectangle;
        }

        [HttpPost]
        public IActionResult FixObject([FromBody] JsonElement bountingBoxAndName)
        {
            var name = JsonSerializer.Deserialize<string>(bountingBoxAndName.GetProperty("objectToFix"));
            var rectangle = JsonSerializer.Deserialize<Rectangle>(bountingBoxAndName.GetProperty("rectangle"));
            var whichImage = JsonSerializer.Deserialize<int>(bountingBoxAndName.GetProperty("whichImage"));

            string result = null; //oryginalnie było tu wyszukiwannie obszaru zainteresowania po nazwie i zmienna result była innego typu, którego nie mogę ujawnić. Nazwy muszą być unikatowe.
            if (result != null)
            {
                rectangle = ValidateRectangle(rectangle);
                rectangle = ScaleToOriginal(rectangle);
                dataStore._frameIterator = whichImage;

		//tu była wykonywana stosowna funkcja na zmiennej result

                dataStore.results = new Dictionary<string, List<Rectangle>>();
            }
            return Json("ok");
        }

        [HttpPost]
        public IActionResult AddTemplate([FromBody] JsonElement newTemplate)
        {
            var name = JsonSerializer.Deserialize<string>(newTemplate.GetProperty("nameOfObject"));
            var template = JsonSerializer.Deserialize<Rectangle>(newTemplate.GetProperty("template"));

            string result = null;//oryginalnie było tu wyszukiwannie obszaru zainteresowania po nazwie i zmienna result była innego typu, którego nie mogę ujawnić
            if (result != null)
            {
                template = ScaleToOriginal(template);
                template = ValidateRectangle(template);
                //tu była wykonywana stosowna funkcja na zmiennej result
            }
                
            return View("Main");
        }
    }
}
