using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BITS_API.Models;

namespace BITS_API.Service
{
    public class CustomerInfoService : ICustomerInfoService
    {
        BitsDatabaseContext _context;

        public CustomerInfoService(BitsDatabaseContext context)
        {
            _context = context;
        }

        public IEnumerable<CustomerInfo> GetAll()
        {
            return _context.CustomerInfo;
        }
    }
}
