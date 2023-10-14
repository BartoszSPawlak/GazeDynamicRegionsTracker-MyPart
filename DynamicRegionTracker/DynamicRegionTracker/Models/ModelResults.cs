using System.Drawing;

namespace DynamicRegionTracker.Models
{
    public class ModelResults
    {
        public List<string> _imagesInStrings { get; set; }
        public List<List<double>> _boundingBoxX { get; set; }
        public List<List<double>> _boundingBoxY { get; set; }
        public List<List<double>> _boundingBoxHeight { get; set; }
        public List<List<double>> _boundingBoxWidth { get; set; }
        public List<List<string>> _namesOfBoundingBoxes { get; set; }

        public ModelResults(List<string> imagesInStrings, List<List<double>> boundingBoxX, List<List<double>> boundingBoxY,
            List<List<double>> boundingBoxHeight, List<List<double>> boundingBoxWidth, List<List<string>> namesOfBoundingBoxes)
        {
            _imagesInStrings = imagesInStrings;
            _boundingBoxX = boundingBoxX;
            _boundingBoxY = boundingBoxY;
            _boundingBoxHeight = boundingBoxHeight;
            _boundingBoxWidth = boundingBoxWidth;
            _namesOfBoundingBoxes = namesOfBoundingBoxes;

        }
    }
}
