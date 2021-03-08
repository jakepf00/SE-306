using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BITS_API.Models
{
    public partial class BitsDatabaseContext : DbContext
    {
        public BitsDatabaseContext()
        {
        }

        public BitsDatabaseContext(DbContextOptions<BitsDatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Table1> Table1 { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=BitsDatabase;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Table1>(entity =>
            {
                entity.HasKey(e => e.Aoeu);

                entity.ToTable("Table_1");

                entity.Property(e => e.Aoeu)
                    .HasColumnName("aoeu")
                    .HasMaxLength(10)
                    .ValueGeneratedNever();

                entity.Property(e => e.Oeui).HasColumnName("oeui");
            });
        }
    }
}
