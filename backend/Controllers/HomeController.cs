using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using backend.Dtos;
using backend.Services.Interfaces;

namespace backend.Controllers
{
    [Route("api/slider")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IHomePageService _homePageService;

        public HomeController(IHomePageService homePageService)
        {
            _homePageService = homePageService;
        }

        [HttpPost]
        public async Task<ActionResult<List<SliderSearchResDto>>> Search([FromBody] SliderSearchRequestDto request)
        {
            if (request == null)
                return BadRequest();

            var result = await _homePageService.GetSliderSearchAsync(request);
            return Ok(result);
        }
        
    }
}
