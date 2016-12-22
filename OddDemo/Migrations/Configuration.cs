namespace OddDemo.Migrations
{
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<OddDemo.Models.OddDemoContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(OddDemo.Models.OddDemoContext context)
        {
            context.People.AddOrUpdate(x => x.Id,
                new Person() { Id = 1, FName = "Odd Andreas", LName="Hartvigsen", Email="odd.hartvigsen@gmail.com", Phone="99692272"},
                new Person() { Id = 2, FName = "Kari", LName = "Normann", Email = "kn@me.com", Phone = "55566777"},
                new Person() { Id = 3, FName = "Freddy", LName = "Krueger", Email = "fk@hotmail.com", Phone = "40040555"}
                );

            context.Positions.AddOrUpdate(x => x.Id,
                new Position()
                {
                    Id = 1,
                    Title = "Developer",
                    Department = "R&D",
                    Description = "Fully certified developer.",
                    PersonId = 1,
                    startDate = new DateTime(2017,1,1),
                    StillEmployed = true
                },
                new Position()
                {
                    Id = 2,
                    Title = "Analyst",
                    Department = "Sales",
                    Description = "Expert in South-American market",
                    PersonId = 2,
                    startDate = new DateTime(2010, 10, 28),
                    EndDate = new DateTime(2016, 1, 3),
                    StillEmployed = false
                },
                new Position()
                {
                    Id = 3,
                    Title = "Janitor",
                    Department = "Maintenance",
                    Description = "Dodgy character.",
                    PersonId = 3,
                    startDate = new DateTime(1999, 1, 1),
                    EndDate = new DateTime(1999, 1, 3),
                    StillEmployed = false
                },
                new Position()
                {
                    Id = 4,
                    Title = "CEO",
                    Department = "Sales",
                    Description = "Best person alive!",
                    PersonId = 2,
                    startDate = new DateTime(2016, 1, 4),
                    StillEmployed = true

                });
            
        }
    }
}
