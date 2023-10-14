//using Emgu.CV;
using System.Collections.ObjectModel;
using System.Drawing;

namespace DynamicRegionTracker
{
    public class MainViewClass
    {

        //Mode _mode = Mode.Default;
        //bool isMouseDropDown = false;

        Point StarPoint;
        Point FinishPoint;
        public Rectangle rectangle;

        //public Mat _currentFrame;
        public int CurrentFrame { get; set; }

        //LB
        //public int MaxFrame
        //{
        //    set
        //    {
        //        NumberOfAllFrameslabel.Text = (value - 1).ToString();
        //        tbFrames.Maximum = value - 1;
        //        tbFrames.TickFrequency = tbFrames.Maximum / 10;
        //    }
        //}
        public List<Rectangle> BoundingBoxes { get; set; } = new List<Rectangle>();
        //ObservableCollection<string> TrackedObjects { get; set; }

        //public MainViewClass()
        //{
        //    //InitializeComponent();

        //    //comboBox1.SelectedIndex = 0;
        //    //comboBox1.SelectedIndexChanged += ComboBox1_SelectedIndexChanged;

        //    //detectionMethodCbx.SelectedIndex = 0;
        //    //detectionMethodCbx.SelectedIndexChanged += detectionMethodCbx_SelectedIndexChanged;

        //    TrackedObjects.CollectionChanged += TrackedObjects_CollectionChanged;
        //}

        //private void TrackedObjects_CollectionChanged(object sender, System.Collections.Specialized.NotifyCollectionChangedEventArgs e)
        //{
        //    if (InvokeRequired)
        //    {
        //        Invoke(new Action(() => { Update(); }));
        //    }
        //    else
        //    {
        //        Update();
        //    }
        //    void Update()
        //    {
        //        Listbox.Items.Clear();
        //        foreach (var item in TrackedObjects)
        //        {
        //            Listbox.Items.Add(item);
        //        }
        //        selObjLabel.Text = $"{TrackedObjects.Count}";
        //    }
        //}

        //public Bitmap Bitmap
        //{
        //    get { return _bitmap; }
        //    set { _bitmap = new Bitmap(value); }
        //}
        //private Bitmap _bitmap;

        string? _name;
        public string FileName
        {
            set
            {
                //Invoke(new Action(() => {
                //    
                //}));
                _name = value;
            }
        }
    }
}
