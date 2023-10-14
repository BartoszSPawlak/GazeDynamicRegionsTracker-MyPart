using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DynamicRegionsTracker.Models
{
    public class ModelCSRT
    {
        public bool userColorNames { get; set; }
        public bool userChanWeight { get; set; }
        public bool userRgb { get; set; }
        public bool userHog { get; set; }
        public bool userSegmentation { get; set; }
        public bool userGray { get; set; }

        public float kaiserAlpha { get; set; }
        public float chebAttenuation { get; set; }
        public float templateSize { get; set; }
        public float gslSigma { get; set; }
        public float hogOrientations { get; set; }
        public float hogClip { get; set; }
        public float padding { get; set; }
        public float filterLr { get; set; }
        public float weightLr { get; set; }
        public int numHogChannelsUsed { get; set; }
        public int admmIterations { get; set; }
        public float histogramLr { get; set; }
        public int backgroundRatio { get; set; }
        public int numberOfScales { get; set; }
        public float scaleSigmaFactor { get; set; }
        public float scaleModelMaxArea { get; set; }
        public float scaleLr { get; set; }
        public float scaleStep { get; set; }
        public int histogramBins { get; set; }
    }
}
