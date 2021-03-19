using System;
using System.Collections.Generic;

namespace BITS_API.Models
{
    public partial class Equipment
    {
        public int EqId { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public int? Quantity { get; set; }
    }
}
