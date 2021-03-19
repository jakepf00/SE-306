using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BITS_API.Models;
using BITS_API.Service;

namespace BITS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConcessionsInventoryController : ControllerBase
    {
        private readonly IConcessionsInventoryService _service;

        public ConcessionsInventoryController(IConcessionsInventoryService service)
        {
            _service = service;
        }

        // GET: api/ConcessionsInventory
        [HttpGet]
        public IEnumerable<ConcessionsInventory> GetConcessionsInventory()
        {
            return _service.GetAll();
        }

        /*
        // GET: api/ConcessionsInventory/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetConcessionsInventory([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var concessionsInventory = await _context.ConcessionsInventory.FindAsync(id);

            if (concessionsInventory == null)
            {
                return NotFound();
            }

            return Ok(concessionsInventory);
        }

        // PUT: api/ConcessionsInventory/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConcessionsInventory([FromRoute] int id, [FromBody] ConcessionsInventory concessionsInventory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != concessionsInventory.Sku)
            {
                return BadRequest();
            }

            _context.Entry(concessionsInventory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConcessionsInventoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ConcessionsInventory
        [HttpPost]
        public async Task<IActionResult> PostConcessionsInventory([FromBody] ConcessionsInventory concessionsInventory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ConcessionsInventory.Add(concessionsInventory);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ConcessionsInventoryExists(concessionsInventory.Sku))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetConcessionsInventory", new { id = concessionsInventory.Sku }, concessionsInventory);
        }

        // DELETE: api/ConcessionsInventory/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConcessionsInventory([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var concessionsInventory = await _context.ConcessionsInventory.FindAsync(id);
            if (concessionsInventory == null)
            {
                return NotFound();
            }

            _context.ConcessionsInventory.Remove(concessionsInventory);
            await _context.SaveChangesAsync();

            return Ok(concessionsInventory);
        }

        private bool ConcessionsInventoryExists(int id)
        {
            return _context.ConcessionsInventory.Any(e => e.Sku == id);
        }
        */
    }
}