namespace backend.Models
{
    public class VariantFeatures
    {
        public int Id { get; set; }
        public int VariantId { get; set; }
        public int FeatureId { get; set; }
        public Variant Variant { get; set; }
        public Feature Feature { get; set; }
    }
}
