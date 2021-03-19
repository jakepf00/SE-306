using System.Collections.Generic;
using BITS_API.Models;




namespace BITS_API.Service
{
    public class ConcessionsInventoryService : IConcessionsInventoryService
    {
        BitsDatabaseContext _context;

        public ConcessionsInventoryService(BitsDatabaseContext context)
        {
            _context = context;
        }

        public IEnumerable<ConcessionsInventory> GetAll()
        {
            return _context.ConcessionsInventory;
        }
    }
}
