using System.Drawing;

namespace ListOfRectangles
{
    public class ListOfRectangles
    {
        private static ListOfRectangles Instance = null;
        private static object obj = new object();

        public List<Rectangle> rectangles { get; set; } = new List<Rectangle>();
        public List<string> namesOfBoundingBoxes { get; set; } = new List<string>();
        public static ListOfRectangles GetInstance()
        {
            lock (obj)
            {
                if (Instance == null)
                {
                    Instance = new ListOfRectangles();
                }

                return Instance;
            }
        }
    }
}