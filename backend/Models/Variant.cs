namespace backend.Models
{
    public class Variant
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ModelId { get; set; }
        public Model Model { get; set; }
        public DateTime? ReleasedDate { get; set; }
        public Spec Spec { get; set; }
        public int? TopSpeed { get; set; }
        public List<Review> Reviews { get; set; } = new List<Review>();
        public List<VariantFeatures> VariantFeatures { get; set; } = new List<VariantFeatures>();
        public List<VariantCategory> VariantCategories { get; set; } = new List<VariantCategory>();
        public List<VariantColor> VariantColors { get; set; } = new List<VariantColor>();
    }
}
