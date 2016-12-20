using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace OddDemo.Models
{
    public class PositionDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Department { get; set; }
        public string Description { get; set; }
        public DateTime startDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool StillEmployed { get; set; }
        public int PersonId { get; set; }
    }
}