namespace OddDemo.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changedmodels : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Positions", "PersonId", "dbo.People");
            DropIndex("dbo.Positions", new[] { "PersonId" });
        }
        
        public override void Down()
        {
            CreateIndex("dbo.Positions", "PersonId");
            AddForeignKey("dbo.Positions", "PersonId", "dbo.People", "Id", cascadeDelete: true);
        }
    }
}
