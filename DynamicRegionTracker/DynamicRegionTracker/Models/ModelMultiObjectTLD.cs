using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DynamicRegionsTracker.Models
{
    public class ModelMultiObjectTLD
    {
        public int InternalWidth { get; set; }
        public int InternalHeight { get; set; }

        public float SureThreshold { get; set; }
        public float UnsureThreshold { get; set; }
    }
}
