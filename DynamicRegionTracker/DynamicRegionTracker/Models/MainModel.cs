using Emgu.CV;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace DynamicRegionsTracker.Models
{
    public class MainModel
    {
        public string Algorithm { get; set; }
        public string DetectionMethod { get; set; }
    }
}
