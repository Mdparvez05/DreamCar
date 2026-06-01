namespace backend.Services.Interfaces
{
    using Dtos;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IHomePageService
    {
        Task<List<SliderSearchResDto>> GetSliderSearchAsync(SliderSearchRequestDto request);
        Task<List<backend.Models.Brand>> GetSliderResultAsync();
    }
}
