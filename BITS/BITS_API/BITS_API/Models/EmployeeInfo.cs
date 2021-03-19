using System;
using System.Collections.Generic;

namespace BITS_API.Models
{
    public partial class EmployeeInfo
    {
        public int EmployeeId { get; set; }
        public DateTime? BirthDate { get; set; }
        public string FName { get; set; }
        public string LName { get; set; }
        public string Address { get; set; }
        public int? Age { get; set; }
        public int? PostalCode { get; set; }
        public string Email { get; set; }
        public int? Ssn { get; set; }
        public DateTime? HireDate { get; set; }
        public double? PayRate { get; set; }
        public string Department { get; set; }
    }
}
