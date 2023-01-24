using System;
namespace dog_tracker_back_end
{
    public record NewDog
    {
        public string name { get; set; }
        public bool barksALot { get; set; }
    }

    public record Dog : NewDog
    {
        public string id { get; set; } = Guid.NewGuid().ToString();

        public Dog(string nameInput, bool barksALotInput)
        {
            name = nameInput;
            barksALot = barksALotInput;
        }
    }
}
