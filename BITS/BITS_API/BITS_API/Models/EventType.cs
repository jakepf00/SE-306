using System;
using System.Collections.Generic;

namespace BITS_API.Models
{
    public partial class EventType
    {
        public EventType()
        {
            CustomerInfo = new HashSet<CustomerInfo>();
        }

        public int Id { get; set; }
        public string EventType1 { get; set; }

        public ICollection<CustomerInfo> CustomerInfo { get; set; }
    }
}
