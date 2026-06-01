namespace backend.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<VariantCategory> VariantCategories { get; set; } = new List<VariantCategory>();
    }
}
