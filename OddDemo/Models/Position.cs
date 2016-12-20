using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace OddDemo.Models
{
    public class Position
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Department { get; set; }
        public string Description { get; set; }
        [Required]
        public DateTime startDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool StillEmployed { get; set; }
        public int PersonId { get; set; }

    }
}

