using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Employee.Api.Dto
{
    public class Employee
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public Decimal AnnualSalary { get; set; }
        
        public string DateOfBirth { get; set; }
    }
}
