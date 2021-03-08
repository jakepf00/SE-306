using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BITS_API.Models;

namespace BITS_API.Service
{
    public class Table1Service : ITable1Service
    {
        BitsDatabaseContext _context;

        public Table1Service(BitsDatabaseContext context)
        {
            _context = context;
        }

        public IEnumerable<Table1> GetAll()
        {
            return _context.Table1;
        }
    }
}
