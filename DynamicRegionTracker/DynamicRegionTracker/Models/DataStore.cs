using Emgu.CV;
using System.Drawing;

namespace DynamicRegionTracker.Models
{
    sealed public class DataStore
    {
        private DataStore(){}
        private static DataStore Instance = null;
        private static object obj = new object();

        public Mat _currentFrame { get; set; }

        public int _frameIterator { get; set; } = 0;
        public int _keyOfStartFrame { get; set; } = 1;

        public Dictionary<string, List<Rectangle>> results =
            new Dictionary<string, List<Rectangle>>();

        public List<List<string>> namesOfBoundingBoxes = new List<List<string>>();

        public List<string> listOfPaths { get; set; } = new List<string>();
        public List<string> imageInString { get; set; } = new List<string>();
        public List<List<double>> boundingBoxesX { get; set; } = new List<List<double>>();
        public List<List<double>> boundingBoxesY { get; set; } = new List<List<double>>();
        public List<List<double>> boundingBoxesHeight { get; set; } = new List<List<double>>();
        public List<List<double>> boundingBoxesWidth { get; set; } = new List<List<double>>();

        public bool isFinished;

        public int widthOfImage { get; set; }
        public int heightOfImage { get; set; }

        public bool isVideo { get; set; } = false;
        public bool firstCalculation { get; set; } = true;

        public static DataStore GetInstance()
        {
            lock (obj)
            {
                if (Instance == null)
                {
                    Instance = new DataStore();
                }

                return Instance;
            }
        }
    }
}
