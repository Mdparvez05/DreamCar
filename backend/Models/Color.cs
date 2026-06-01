namespace backend.Models
{
    public class Color
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string HexCode { get; set; }

        public List<VariantColor> VariantColors { get; set; } = new List<VariantColor>();
    }
}
