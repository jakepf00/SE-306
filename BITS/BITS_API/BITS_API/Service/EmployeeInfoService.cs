using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BITS_API.Models;

namespace BITS_API.Service
{
    public class EmployeeInfoService : IEmployeeInfoService
    {
        BitsDatabaseContext _context;

        public EmployeeInfoService(BitsDatabaseContext context)
        {
            _context = context;
        }

        public IEnumerable<EmployeeInfo> GetAll()
        {
            return _context.EmployeeInfo;
        }
    }
}
