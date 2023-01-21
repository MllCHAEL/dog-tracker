using System;
namespace dog_tracker_back_end
{
    public record Dog
    {
        public string id { get; set; }
        public string name { get; set; }
        public bool barksALot { get; set; }
    }
}
