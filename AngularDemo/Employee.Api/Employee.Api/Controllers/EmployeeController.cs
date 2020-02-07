using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;


namespace Employee.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        static Dto.Employee[] _employees = new Dto.Employee[] { new Dto.Employee {   Code= "emp101", Name= "Tom", Gender= "Male",
                AnnualSalary= 5500, DateOfBirth= "6/25/1988"},new Dto.Employee {   Code= "emp102", Name= "Alex", Gender= "Male",
                AnnualSalary= 5700.95M, DateOfBirth= "9/6/1982"},new Dto.Employee {   Code= "emp103", Name= "Mike", Gender= "Male",
                AnnualSalary= 5900, DateOfBirth= "12/8/1979"},new Dto.Employee {   Code= "emp104", Name= "Mary", Gender= "Female",
                AnnualSalary= 6500.826M, DateOfBirth= "10/14/1980"},new Dto.Employee {   Code= "emp105", Name= "Nancy", Gender= "Female",
                AnnualSalary= 6700.826M, DateOfBirth= "12/15/1982"},new Dto.Employee {   Code= "emp106", Name= "Steve", Gender= "Male",
                AnnualSalary= 7700.481M, DateOfBirth= "11/18/1979"}
            };
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Dto.Employee>> Get()
        {
            return Ok(_employees);
        }

        // GET api/values/5
        [HttpGet("{code}")]
        public ActionResult<Dto.Employee> Get(string code)
        {
            return Ok(_employees.FirstOrDefault(e => e.Code == code.ToString().ToLower()));
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
