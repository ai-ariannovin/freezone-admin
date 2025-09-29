-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 2.187.255.129:3308
-- Generation Time: Sep 29, 2025 at 07:08 AM
-- Server version: 8.0.34
-- PHP Version: 8.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `freezone`
--

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int UNSIGNED NOT NULL,
  `permission_category_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `permission_category_id`, `name`, `slug`, `description`, `model`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'نمایش کاربران', 'view.users', 'مشاهده لیست کاربران', 'User', '2025-09-22 06:42:40', '2025-09-22 06:42:40', NULL),
(2, 1, 'ساخت کاربر جدید', 'create.users', 'افزودن کاربر جدید به سیستم', 'User', '2025-09-22 06:42:40', '2025-09-22 06:42:40', NULL),
(3, 2, 'نمایش نقش‌ها', 'view.roles', 'دسترسی به لیست نقش‌ها', 'Role', '2025-09-22 06:42:40', '2025-09-22 06:42:40', NULL),
(4, 2, 'ویرایش دسترسی‌ها', 'edit.permissions', 'ویرایش یا تغییر مجوزهای نقش', 'Permission', '2025-09-22 06:42:40', '2025-09-22 06:42:40', NULL),
(5, 3, 'مشاهده مجوزها', 'view.licenses', 'نمایش لیست مجوزهای فعال', 'License', '2025-09-22 06:42:40', '2025-09-22 06:42:40', NULL),
(6, 3, 'ثبت درخواست مجوز', 'request.license', 'ارسال فرم صدور مجوز', 'LicenseRequest', '2025-09-22 06:42:40', '2025-09-22 06:42:40', NULL),
(7, 4, 'مدیریت مناطق آزاد', 'manage.freezones', 'ایجاد، ویرایش و حذف مناطق آزاد', 'FreeZone', '2025-09-22 06:42:40', '2025-09-22 06:42:40', NULL),
(8, 4, 'اتصال کسب‌و‌کار به منطقه آزاد', 'link.business.freezone', 'اتصال کسب‌وکارها به مناطق آزاد', 'FreeZoneActiveBusiness', '2025-09-22 06:42:40', '2025-09-22 06:42:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `permission_categories`
--

CREATE TABLE `permission_categories` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission_categories`
--

INSERT INTO `permission_categories` (`id`, `title`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'مدیریت کاربران', 'user_management', '2025-09-22 06:42:40', '2025-09-22 06:42:40', NULL),
(2, 'مدیریت نقش ها و دسترسی ها', 'role_permission_management', '2025-09-22 06:42:40', '2025-09-22 06:42:40', NULL),
(3, 'مدیریت مجوز ها', 'license_management', '2025-09-22 06:42:40', '2025-09-22 06:42:40', NULL),
(4, 'مدیریت کاربران و مناطق آزاد', 'user_freezone_management', '2025-09-22 06:42:40', '2025-09-22 06:42:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

CREATE TABLE `permission_role` (
  `id` int UNSIGNED NOT NULL,
  `permission_id` int UNSIGNED NOT NULL,
  `role_id` int UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permission_role`
--

INSERT INTO `permission_role` (`id`, `permission_id`, `role_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 1, '2025-09-22 06:42:52', '2025-09-22 06:42:52', NULL),
(2, 2, 1, '2025-09-22 06:42:52', '2025-09-22 06:42:52', NULL),
(3, 3, 1, '2025-09-22 06:42:52', '2025-09-22 06:42:52', NULL),
(4, 4, 1, '2025-09-22 06:42:52', '2025-09-22 06:42:52', NULL),
(5, 5, 1, '2025-09-22 06:42:52', '2025-09-22 06:42:52', NULL),
(6, 6, 1, '2025-09-22 06:42:52', '2025-09-22 06:42:52', NULL),
(7, 7, 1, '2025-09-22 06:42:52', '2025-09-22 06:42:52', NULL),
(8, 8, 1, '2025-09-22 06:42:52', '2025-09-22 06:42:52', NULL),
(9, 6, 2, '2025-09-22 06:42:52', '2025-09-22 06:42:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `level` int NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `slug`, `description`, `level`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'مدیر سیستم', 'admin', 'دسترسی کامل به تمامی بخش‌های پنل مدیریت', 5, '2025-09-22 06:42:40', '2025-09-22 06:42:40', NULL),
(2, 'کاربر حقیقی', 'personuser', 'کاربر حقیقی ثبت‌شده در سامانه', 1, '2025-09-22 06:42:40', '2025-09-22 06:42:40', NULL),
(3, 'کاربر حقوقی', 'companyuser', 'شرکت یا سازمان ثبت‌شده در سامانه', 2, '2025-09-22 06:42:40', '2025-09-22 06:42:40', NULL),
(4, 'مدیر منطقه آزاد', 'freezonemanager', 'مدیر مسئول نظارت بر مناطق آزاد', 3, '2025-09-22 06:42:40', '2025-09-22 06:42:40', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role_user`
--

CREATE TABLE `role_user` (
  `id` int UNSIGNED NOT NULL,
  `role_id` int UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_slug_unique` (`slug`),
  ADD KEY `permissions_permission_category_id_foreign` (`permission_category_id`);

--
-- Indexes for table `permission_categories`
--
ALTER TABLE `permission_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permission_role_permission_id_index` (`permission_id`),
  ADD KEY `permission_role_role_id_index` (`role_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_slug_unique` (`slug`);

--
-- Indexes for table `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_user_role_id_index` (`role_id`),
  ADD KEY `role_user_user_id_index` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `permission_categories`
--
ALTER TABLE `permission_categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `permission_role`
--
ALTER TABLE `permission_role`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `role_user`
--
ALTER TABLE `role_user`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `permissions`
--
ALTER TABLE `permissions`
  ADD CONSTRAINT `permissions_permission_category_id_foreign` FOREIGN KEY (`permission_category_id`) REFERENCES `permission_categories` (`id`);

--
-- Constraints for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
