using backend.Data;
using backend.Services.Interfaces;
using backend.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace backend.Services.Implementations
{
    public class HomePageService : IHomePageService
    {
        private readonly DreamCarDbContext _context;
        
        public HomePageService(DreamCarDbContext context)
        {
            _context = context;
        }
        public async Task<List<backend.Models.Brand>> GetSliderResultAsync()
        {
            return await _context.Brands.Take(5).ToListAsync();
        }

        public async Task<List<Dtos.SliderSearchResDto>> GetSliderSearchAsync(Dtos.SliderSearchRequestDto request)
        {
            // start from Variants and build filters; project directly to DTO to avoid loading full entities
            var q = _context.Variants.AsNoTracking().AsQueryable();

            if (!string.IsNullOrWhiteSpace(request.FuelType))
            {
                var fuelList = request.FuelType.Split(',', System.StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToList();
                q = q.Where(v => v.Spec != null && fuelList.Contains(v.Spec.FuelType));
            }

            if (!string.IsNullOrWhiteSpace(request.BodyType))
            {
                var bodyList = request.BodyType.Split(',', System.StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToList();
                q = q.Where(v => v.Spec != null && bodyList.Contains(v.Spec.BodyType));
            }

            if (request.SeatingCapacity > 0)
                q = q.Where(v => v.Spec != null && v.Spec.SeatingCapacity == request.SeatingCapacity);

            if (request.CategoryId > 0)
                q = q.Where(v => v.VariantCategories.Any(vc => vc.CategoryId == request.CategoryId));

            if (request.Price > 0)
                q = q.Where(v => v.Spec != null && v.Spec.Price != null && v.Spec.Price <= request.Price);

            var results = await q.Select(v => new Dtos.SliderSearchResDto
            {
                BrandId = v.Model!.Brand!.Id,
                BrandName = v.Model.Brand.Name,
                VariantId = v.Id,
                VariantName = v.Name,
                ReleasedDate = v.ReleasedDate,
                Mileage = v.Spec != null ? (decimal?)v.Spec.Mileage : null,
                TopSpeed = v.TopSpeed,
                FuelType = v.Spec != null ? v.Spec.FuelType : null,
                BodyType = v.Spec != null ? v.Spec.BodyType : null,
                ReviewRatings = v.Reviews.Select(r => r.Rating).ToList(),
                AverageRating = v.Reviews.Any() ? (decimal?)v.Reviews.Average(r => r.Rating) : null
            }).ToListAsync();

            return results;
        }
        
    }
}
