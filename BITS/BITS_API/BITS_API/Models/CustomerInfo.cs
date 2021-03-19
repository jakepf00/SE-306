using System;
using System.Collections.Generic;

namespace BITS_API.Models
{
    public partial class CustomerInfo
    {
        public int CustomerId { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public string Address { get; set; }
        public int? Age { get; set; }
        public int? PostalCode { get; set; }
        public string Email { get; set; }
        public int EventType { get; set; }

        public EventType EventTypeNavigation { get; set; }
    }
}
