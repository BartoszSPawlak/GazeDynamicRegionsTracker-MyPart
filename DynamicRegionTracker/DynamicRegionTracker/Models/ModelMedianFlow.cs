using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DynamicRegionsTracker.Models
{
    public class ModelMedianFlow
    {
        public int pointslnGrid { get; set; }
        public int WinSize1 { get; set; }
        public int WinSize2 { get; set; }
        public int MaxLevel { get; set; }
        public int WinSizeNCC1 { get; set; }
        public int WinSizeNCC2 { get; set; }
        public int TermCriteriaMaxIter { get; set; }
        public float TermCriteriaEps { get; set; }
        public float MaxMedianLengthOfDisplacement { get; set; }

    }
}
