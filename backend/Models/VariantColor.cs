namespace backend.Models
{
    public class VariantColor
    {
        public int Id { get; set; }
        public int VariantId { get; set; }
        public int ColorId { get; set; }
        public Variant Variant { get; set; }
        public Color Color { get; set; }
    }
}
