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
    public class Table1Controller : ControllerBase
    {
        private readonly ITable1Service _service;

        public Table1Controller(ITable1Service service)
        {
            _service = service;
        }

        // GET: api/Table1
        [HttpGet]
        public IEnumerable<Table1> GetTable1()
        {
            return _service.GetAll();
        }

        /*
        // GET: api/Table1/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTable1([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var table1 = await _context.Table1.FindAsync(id);

            if (table1 == null)
            {
                return NotFound();
            }

            return Ok(table1);
        }

        // PUT: api/Table1/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTable1([FromRoute] string id, [FromBody] Table1 table1)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != table1.Aoeu)
            {
                return BadRequest();
            }

            _context.Entry(table1).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Table1Exists(id))
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

        // POST: api/Table1
        [HttpPost]
        public async Task<IActionResult> PostTable1([FromBody] Table1 table1)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Table1.Add(table1);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (Table1Exists(table1.Aoeu))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTable1", new { id = table1.Aoeu }, table1);
        }

        // DELETE: api/Table1/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTable1([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var table1 = await _context.Table1.FindAsync(id);
            if (table1 == null)
            {
                return NotFound();
            }

            _context.Table1.Remove(table1);
            await _context.SaveChangesAsync();

            return Ok(table1);
        }

        private bool Table1Exists(string id)
        {
            return _context.Table1.Any(e => e.Aoeu == id);
        }
        */
    }
}