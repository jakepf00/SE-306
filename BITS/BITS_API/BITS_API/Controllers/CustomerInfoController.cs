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
    public class CustomerInfoController : ControllerBase
    {
        private readonly ICustomerInfoService _service;

        public CustomerInfoController(ICustomerInfoService service)
        {
            _service = service;
        }

        // GET: api/CustomerInfo
        [HttpGet]
        public IEnumerable<CustomerInfo> GetCustomerInfo()
        {
            return _service.GetAll();
        }

        /*
        // GET: api/CustomerInfo/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomerInfo([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customerInfo = await _context.CustomerInfo.FindAsync(id);

            if (customerInfo == null)
            {
                return NotFound();
            }

            return Ok(customerInfo);
        }

        // PUT: api/CustomerInfo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerInfo([FromRoute] int id, [FromBody] CustomerInfo customerInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customerInfo.CustomerId)
            {
                return BadRequest();
            }

            _context.Entry(customerInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerInfoExists(id))
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

        // POST: api/CustomerInfo
        [HttpPost]
        public async Task<IActionResult> PostCustomerInfo([FromBody] CustomerInfo customerInfo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.CustomerInfo.Add(customerInfo);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CustomerInfoExists(customerInfo.CustomerId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCustomerInfo", new { id = customerInfo.CustomerId }, customerInfo);
        }

        // DELETE: api/CustomerInfo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomerInfo([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customerInfo = await _context.CustomerInfo.FindAsync(id);
            if (customerInfo == null)
            {
                return NotFound();
            }

            _context.CustomerInfo.Remove(customerInfo);
            await _context.SaveChangesAsync();

            return Ok(customerInfo);
        }

        private bool CustomerInfoExists(int id)
        {
            return _context.CustomerInfo.Any(e => e.CustomerId == id);
        }
        */
    }
}