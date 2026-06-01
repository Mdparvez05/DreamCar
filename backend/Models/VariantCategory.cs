namespace backend.Models
{
    public class VariantCategory
    {
        public int Id { get; set; }
        public int VariantId { get; set; }
        public int CategoryId { get; set; }
        public Variant Variant { get; set; }
        public Category Category { get; set; }

        
        
    }
}
