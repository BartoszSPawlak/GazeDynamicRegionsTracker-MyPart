using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DynamicRegionsTracker.Models
{
    public class ModelBoosting
    {
        public int NumClassifiers { get; set; }
        public float SampleSearchFactor { get; set; }
        public float SampleOverlap { get; set; }
        public int IterationInit { get; set; }
        public int FeatureSetNumFeatures { get; set; }
    }
}
