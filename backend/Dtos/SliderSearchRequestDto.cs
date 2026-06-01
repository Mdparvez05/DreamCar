namespace backend.Dtos
{
    public class SliderSearchRequestDto
    {
        public decimal Price { get; set; }
        public string FuelType { get; set; }
        public int SeatingCapacity { get; set; }
        public string BodyType { get; set; }
        public int CategoryId { get; set; } = 0;

    }
}
