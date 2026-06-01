namespace backend.Models
{
    public class Review
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int Rating { get; set; }
        public int VariantId { get; set; }
        public Variant Variant { get; set; }
    }
}
