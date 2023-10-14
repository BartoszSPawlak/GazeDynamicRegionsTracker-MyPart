//using DynamicRegionTracker.Models.ModelsInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DynamicRegionsTracker.Models
{
    public class ModelKCF
    {
        public float Threshold { get; set; }
        public float OutputSigmaFactor { get; set; }
        public float Sigma { get; set; }
        public float PcaLearningRate { get; set; }
        public float Lambda { get; set; }
        public int MaxPatchSize { get; set; }
        public float InterpFactor { get; set; }
        public int CompressedSize { get; set; }
        public bool CompressFeature { get; set; }
        public bool SplitCoeff { get; set; }
        public bool WrapKernel { get; set; }
        public bool ReSize { get; set; }
        public string PescPca { get; set; }
        public string DescNpca { get; set; }
        //public Emgu.CV.TrackerKCF.Mode PescPca { get; set; }
        //public Emgu.CV.TrackerKCF.Mode DescNpca { get; set; }
    }
}
