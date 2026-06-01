using System;
using System.Collections.Generic;

public class VariantResponseDto
{
    public int BrandId { get; set; }
    public string BrandName { get; set; }
    public int VariantId { get; set; }
    public string VariantName { get; set; }
    public DateTime? ReleasedDate { get; set; }
    public decimal? Mileage { get; set; }
    public int? TopSpeed { get; set; }
    public string FuelType { get; set; }
    public string BodyType { get; set; }
    public List<int> ReviewRatings { get; set; } = new List<int>();
    public decimal? AverageRating { get; set; }
}
