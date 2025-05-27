using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace BackendApplication.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HashTags",
                columns: table => new
                {
                    HashtagId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Tag = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HashTags", x => x.HashtagId);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "followersfollowings",
                columns: table => new
                {
                    FollowerId = table.Column<int>(type: "integer", nullable: false),
                    FollowingId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_followersfollowings", x => new { x.FollowerId, x.FollowingId });
                    table.ForeignKey(
                        name: "FK_followersfollowings_users_FollowerId",
                        column: x => x.FollowerId,
                        principalTable: "users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_followersfollowings_users_FollowingId",
                        column: x => x.FollowingId,
                        principalTable: "users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "tweet",
                columns: table => new
                {
                    TweetId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Content = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tweet", x => x.TweetId);
                    table.ForeignKey(
                        name: "FK_tweet_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "like",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    TweetId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_like", x => new { x.UserId, x.TweetId });
                    table.ForeignKey(
                        name: "FK_like_tweet_TweetId",
                        column: x => x.TweetId,
                        principalTable: "tweet",
                        principalColumn: "TweetId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_like_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tweetHashtags",
                columns: table => new
                {
                    TweetId = table.Column<int>(type: "integer", nullable: false),
                    HashTagID = table.Column<int>(type: "integer", nullable: false),
                    HashtagId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tweetHashtags", x => new { x.TweetId, x.HashTagID });
                    table.ForeignKey(
                        name: "FK_tweetHashtags_HashTags_HashtagId",
                        column: x => x.HashtagId,
                        principalTable: "HashTags",
                        principalColumn: "HashtagId");
                    table.ForeignKey(
                        name: "FK_tweetHashtags_tweet_TweetId",
                        column: x => x.TweetId,
                        principalTable: "tweet",
                        principalColumn: "TweetId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_followersfollowings_FollowingId",
                table: "followersfollowings",
                column: "FollowingId");

            migrationBuilder.CreateIndex(
                name: "IX_like_TweetId",
                table: "like",
                column: "TweetId");

            migrationBuilder.CreateIndex(
                name: "IX_tweet_UserId",
                table: "tweet",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_tweetHashtags_HashtagId",
                table: "tweetHashtags",
                column: "HashtagId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "followersfollowings");

            migrationBuilder.DropTable(
                name: "like");

            migrationBuilder.DropTable(
                name: "tweetHashtags");

            migrationBuilder.DropTable(
                name: "HashTags");

            migrationBuilder.DropTable(
                name: "tweet");

            migrationBuilder.DropTable(
                name: "users");
        }
    }
}
