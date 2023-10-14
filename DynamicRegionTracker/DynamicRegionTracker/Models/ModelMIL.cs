using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DynamicRegionsTracker.Models
{
    public class ModelMIL
    {
        public int FeatureSetNumFeatures { get; set; }
        public int samplerInitMaxNegNum { get; set; }
        public float SamplerSearchWinSize { get; set; }
        public float SamplerTrackInRadius { get; set; }
        public int SamplerTrackMaxPosNum { get; set; }
        public float SamplerInitInRadius { get; set; }
        public int SamplerTrackMaxNegNum { get; set; }
    }
}
