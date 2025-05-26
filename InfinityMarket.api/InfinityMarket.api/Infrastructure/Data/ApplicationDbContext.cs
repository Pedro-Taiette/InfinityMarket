using Microsoft.EntityFrameworkCore;
using CotacaoAPI.Domain.Entities;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace CotacaoAPI.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Company> Companies { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<PurchaseAnnouncement> PurchaseAnnouncements { get; set; }
        public DbSet<Proposal> Proposals { get; set; }
        public DbSet<Certificate> Certificates { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Company Configuration
            modelBuilder.Entity<Company>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.CNPJ).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();

                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.CNPJ).IsRequired().HasMaxLength(18);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Description).HasMaxLength(500);
                entity.Property(e => e.Phone).HasMaxLength(20);
                entity.Property(e => e.Address).HasMaxLength(300);
            });

            // Employee Configuration
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Email).IsUnique();

                entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(200);
                entity.Property(e => e.Phone).HasMaxLength(20);
                entity.Property(e => e.Position).HasMaxLength(100);

                entity.HasOne(e => e.Company)
                    .WithMany(c => c.Employees)
                    .HasForeignKey(e => e.CompanyId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // PurchaseAnnouncement Configuration
            modelBuilder.Entity<PurchaseAnnouncement>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Title).IsRequired().HasMaxLength(300);
                entity.Property(e => e.Description).IsRequired();
                entity.Property(e => e.Unit).HasMaxLength(50);

                entity.HasOne(e => e.Company)
                    .WithMany(c => c.PurchaseAnnouncements)
                    .HasForeignKey(e => e.CompanyId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.Employee)
                    .WithMany(emp => emp.PurchaseAnnouncements)
                    .HasForeignKey(e => e.EmployeeId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // Proposal Configuration
            modelBuilder.Entity<Proposal>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Description).IsRequired();
                entity.Property(e => e.UnitPrice).HasColumnType("decimal(18,2)");
                entity.Property(e => e.TotalPrice).HasColumnType("decimal(18,2)");
                entity.Property(e => e.PaymentConditions).HasMaxLength(500);
                entity.Property(e => e.AdditionalInfo).HasMaxLength(500);

                entity.HasOne(e => e.PurchaseAnnouncement)
                    .WithMany(pa => pa.Proposals)
                    .HasForeignKey(e => e.PurchaseAnnouncementId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.Company)
                    .WithMany(c => c.Proposals)
                    .HasForeignKey(e => e.CompanyId)
                    .OnDelete(DeleteBehavior.Restrict);

                // Índice único para evitar múltiplas propostas da mesma empresa para o mesmo anúncio
                entity.HasIndex(e => new { e.CompanyId, e.PurchaseAnnouncementId }).IsUnique();
            });

            // Certificate Configuration
            modelBuilder.Entity<Certificate>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.CertificateNumber).IsUnique();

                entity.Property(e => e.CertificateNumber).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Content).IsRequired();

                entity.HasOne(e => e.PurchaseAnnouncement)
                    .WithOne(pa => pa.Certificate)
                    .HasForeignKey<Certificate>(e => e.PurchaseAnnouncementId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}