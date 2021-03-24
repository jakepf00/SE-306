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
    public class EquipmentController : ControllerBase
    {
        private readonly IEquipmentService _service;

        public EquipmentController(IEquipmentService service)
        {
            _service = service;
        }

        // GET: api/Equipment
        [HttpGet]
        public IEnumerable<Equipment> GetEquipment()
        {
            return _service.GetAll();
        }

        /*
        // GET: api/Equipment/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEquipment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var equipment = await _context.Equipment.FindAsync(id);

            if (equipment == null)
            {
                return NotFound();
            }

            return Ok(equipment);
        }

        // PUT: api/Equipment/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEquipment([FromRoute] int id, [FromBody] Equipment equipment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != equipment.EqId)
            {
                return BadRequest();
            }

            _context.Entry(equipment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EquipmentExists(id))
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
        */

        // POST: api/Equipment
        [HttpPost]
        public async Task<IActionResult> PostEquipment([FromBody] Equipment equipment)
        {
            _service.Add(equipment);
            return Ok(equipment);
        }

        /*
        // DELETE: api/Equipment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEquipment([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var equipment = await _context.Equipment.FindAsync(id);
            if (equipment == null)
            {
                return NotFound();
            }

            _context.Equipment.Remove(equipment);
            await _context.SaveChangesAsync();

            return Ok(equipment);
        }

        private bool EquipmentExists(int id)
        {
            return _context.Equipment.Any(e => e.EqId == id);
        }
        */
    }
}