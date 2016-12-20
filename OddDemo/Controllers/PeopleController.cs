using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using OddDemo.Models;
using System.Diagnostics;
using System.Linq.Expressions;

namespace OddDemo.Controllers
{
    public class PeopleController : ApiController
    {
        private OddDemoContext db = new OddDemoContext();

        // Typed lambda expression for Select() method. 
        private static readonly Expression<Func<Position, PositionDto>> AsPositionDto = x => new PositionDto
            {
                Title = x.Title,
                Department = x.Department,
                Description = x.Description,
                startDate = x.startDate,
                EndDate = x.EndDate,
                StillEmployed = x.StillEmployed,
                PersonId = x.PersonId
            };

        // GET: api/People
        public IQueryable<Person> GetPeople()
        {
            return db.People;
        }

        // GET: api/People/5
        [ResponseType(typeof(Person))]
        public async Task<IHttpActionResult> GetPerson(int id)
        {
            Person person = await db.People.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            return Ok(person);
        }

        // PUT: api/People/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPerson(int id, Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != person.Id)
            {
                return BadRequest();
            }

            db.Entry(person).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/People
        [ResponseType(typeof(Person))]
        public async Task<IHttpActionResult> PostPerson(Person person)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.People.Add(person);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = person.Id }, person);
        }

        // DELETE: api/People/5
        [ResponseType(typeof(Person))]
        public async Task<IHttpActionResult> DeletePerson(int id)
        {
            Person person = await db.People.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            db.People.Remove(person);
            await db.SaveChangesAsync();

            return Ok(person);
        }
        /*
        //GET: api/persons/5/positions
        public IQueryable<PositionDto> GetBooksByAuthor(int id)
        {
            return db.Positions.Include(b => b.PersonId)
                .Where(b => b.PersonId == id)
                .Select(AsPositionDto);
        }
        

        // GET: api/People/5/Positions
        public IQueryable<Position> GetPositionsForPerson(int id)
        {
            return GetPositionsByPersonId(id);
        }

        private IQueryable<Position> GetPositionsByPersonId(int id)
        {
            using (var context = new OddDemoContext())
            {
                context.Database.Log = message => Debug.WriteLine(message);
                return context.Positions.Include(n => n.PersonId).Where(n => n.PersonId==id);
            }
        }
    */
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PersonExists(int id)
        {
            return db.People.Count(e => e.Id == id) > 0;
        }
    }
}