using Microsoft.EntityFrameworkCore.Migrations;

namespace WeddingPlanner.Migrations
{
    public partial class UpdateRsvpColToIntMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rsvps_Users_UserId",
                table: "Rsvps");

            migrationBuilder.DropForeignKey(
                name: "FK_Rsvps_Weddings_WeddingId",
                table: "Rsvps");

            migrationBuilder.DropIndex(
                name: "IX_Rsvps_UserId",
                table: "Rsvps");

            migrationBuilder.DropIndex(
                name: "IX_Rsvps_WeddingId",
                table: "Rsvps");

            migrationBuilder.DropColumn(
                name: "WeddingId",
                table: "Rsvps");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WeddingId",
                table: "Rsvps",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Rsvps_UserId",
                table: "Rsvps",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Rsvps_WeddingId",
                table: "Rsvps",
                column: "WeddingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rsvps_Users_UserId",
                table: "Rsvps",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rsvps_Weddings_WeddingId",
                table: "Rsvps",
                column: "WeddingId",
                principalTable: "Weddings",
                principalColumn: "WeddingId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
