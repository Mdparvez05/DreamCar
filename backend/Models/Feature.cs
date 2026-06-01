namespace backend.Models
{
    public class Feature
    {
        public int Id { get; set; }
        public  string Name { get; set; }
        public List<VariantFeatures> Variants { get; set; } = new List<VariantFeatures>();
    }
}
