namespace backend.Models
{
    public class Spec
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CubicCapacity { get; set; }
        public int HorsePower { get; set; }
        public string FuelType { get; set; }
        public string Transmission { get; set; }
        public decimal Mileage { get; set; }
        public decimal? VariantPrice { get; set; }
        public int Torque { get; set; }
        public int SeatingCapacity { get; set; }
        public int GearCount { get; set; }
        public int TopSpeed { get; set; }
        public string BodyType { get; set; }
        public int TankCapacity { get; set; }
        public int BootSpaceLtrs { get; set; }
        public decimal SafetyRating { get; set; } = 0;

        public DateTime ReleaseDate { get; set; }
        public decimal Price { get; set; }
        public int VariantId { get; set; }
        public Variant Variant { get; set; }
    }
}
