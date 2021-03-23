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

        public virtual DbSet<ConcessionsInventory> ConcessionsInventory { get; set; }
        public virtual DbSet<CustomerInfo> CustomerInfo { get; set; }
        public virtual DbSet<EmployeeInfo> EmployeeInfo { get; set; }
        public virtual DbSet<Equipment> Equipment { get; set; }
        public virtual DbSet<EventType> EventType { get; set; }

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
            modelBuilder.Entity<ConcessionsInventory>(entity =>
            {
                entity.HasKey(e => e.Sku);

                entity.Property(e => e.Sku)
                    .HasColumnName("SKU")
                    .ValueGeneratedNever();

                entity.Property(e => e.ItemName)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Location)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<CustomerInfo>(entity =>
            {
                entity.HasKey(e => e.CustomerId);

                entity.Property(e => e.CustomerId)
                    .HasColumnName("Customer_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.EventType)
                    .HasColumnName("eventType")
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.FName)
                    .HasColumnName("fName")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.LName)
                    .HasColumnName("lName")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.HasOne(d => d.EventTypeNavigation)
                    .WithMany(p => p.CustomerInfo)
                    .HasForeignKey(d => d.EventType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_event_type");
            });

            modelBuilder.Entity<EmployeeInfo>(entity =>
            {
                entity.HasKey(e => e.EmployeeId);

                entity.Property(e => e.EmployeeId)
                    .HasColumnName("Employee_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.BirthDate)
                    .HasColumnName("birth_date")
                    .HasColumnType("date");

                entity.Property(e => e.Department)
                    .HasColumnName("department")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.FName)
                    .HasColumnName("fName")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.HireDate)
                    .HasColumnName("hire_date")
                    .HasColumnType("date");

                entity.Property(e => e.LName)
                    .HasColumnName("lName")
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.PayRate).HasColumnName("pay_rate");

                entity.Property(e => e.Ssn).HasColumnName("SSN");
            });

            modelBuilder.Entity<Equipment>(entity =>
            {
                entity.HasKey(e => e.EqId);

                entity.Property(e => e.EqId)
                    .HasColumnName("Eq_ID")
                    .ValueGeneratedNever();

                entity.Property(e => e.Location)
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<EventType>(entity =>
            {
                entity.ToTable("Event_Type");

                entity.HasIndex(e => e.EventType1)
                    .HasName("UQ__Event_Ty__CB9D1581D9F81447")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.EventType1)
                    .IsRequired()
                    .HasColumnName("EventType")
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });
        }
    }
}
