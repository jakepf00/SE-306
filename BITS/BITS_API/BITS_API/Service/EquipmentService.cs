using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BITS_API.Models;

namespace BITS_API.Service
{
    public class EquipmentService : IEquipmentService
    {
        BitsDatabaseContext _context;

        public EquipmentService(BitsDatabaseContext context)
        {
            _context = context;
        }

        public IEnumerable<Equipment> GetAll()
        {
            return _context.Equipment;
        }
    }
}
