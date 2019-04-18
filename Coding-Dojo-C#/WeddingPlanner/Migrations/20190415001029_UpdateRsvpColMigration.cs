using Microsoft.EntityFrameworkCore.Migrations;

namespace WeddingPlanner.Migrations
{
    public partial class UpdateRsvpColMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rsvps_Users_UserId1",
                table: "Rsvps");

            migrationBuilder.DropForeignKey(
                name: "FK_Rsvps_Weddings_WeddingId1",
                table: "Rsvps");

            migrationBuilder.RenameColumn(
                name: "WeddingId1",
                table: "Rsvps",
                newName: "WeddingId");

            migrationBuilder.RenameColumn(
                name: "UserId1",
                table: "Rsvps",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Rsvps_WeddingId1",
                table: "Rsvps",
                newName: "IX_Rsvps_WeddingId");

            migrationBuilder.RenameIndex(
                name: "IX_Rsvps_UserId1",
                table: "Rsvps",
                newName: "IX_Rsvps_UserId");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rsvps_Users_UserId",
                table: "Rsvps");

            migrationBuilder.DropForeignKey(
                name: "FK_Rsvps_Weddings_WeddingId",
                table: "Rsvps");

            migrationBuilder.RenameColumn(
                name: "WeddingId",
                table: "Rsvps",
                newName: "WeddingId1");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Rsvps",
                newName: "UserId1");

            migrationBuilder.RenameIndex(
                name: "IX_Rsvps_WeddingId",
                table: "Rsvps",
                newName: "IX_Rsvps_WeddingId1");

            migrationBuilder.RenameIndex(
                name: "IX_Rsvps_UserId",
                table: "Rsvps",
                newName: "IX_Rsvps_UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Rsvps_Users_UserId1",
                table: "Rsvps",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rsvps_Weddings_WeddingId1",
                table: "Rsvps",
                column: "WeddingId1",
                principalTable: "Weddings",
                principalColumn: "WeddingId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
