using System;
using System.Collections.Generic;

namespace BITS_API.Models
{
    public partial class ConcessionsInventory
    {
        public int Sku { get; set; }
        public string ItemName { get; set; }
        public double? Cost { get; set; }
        public int? Quantity { get; set; }
        public string Location { get; set; }
    }
}
