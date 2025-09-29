-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 2.187.255.129:3308
-- Generation Time: Sep 28, 2025 at 08:53 AM
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
-- Table structure for table `businesses`
--

CREATE TABLE `businesses` (
  `id` bigint UNSIGNED NOT NULL,
  `isic_tree_id` mediumint UNSIGNED NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `keywords` text COLLATE utf8mb4_unicode_ci,
  `keywords_ids` tinytext COLLATE utf8mb4_unicode_ci,
  `status_id` bigint UNSIGNED NOT NULL,
  `version` mediumint UNSIGNED NOT NULL DEFAULT '1',
  `updated_by` bigint UNSIGNED DEFAULT NULL,
  `update_description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `business_activities`
--

CREATE TABLE `business_activities` (
  `id` int UNSIGNED NOT NULL,
  `business_id` bigint UNSIGNED NOT NULL,
  `business_category_id` tinyint UNSIGNED NOT NULL,
  `title` varchar(512) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `show_diagram` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `business_activity_licenses`
--

CREATE TABLE `business_activity_licenses` (
  `id` mediumint UNSIGNED NOT NULL,
  `business_activity_id` int UNSIGNED NOT NULL,
  `license_base_id` bigint UNSIGNED NOT NULL,
  `sort_order` tinyint UNSIGNED NOT NULL,
  `is_base` tinyint(1) NOT NULL DEFAULT '0',
  `is_operational` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `business_categories`
--

CREATE TABLE `business_categories` (
  `id` tinyint UNSIGNED NOT NULL,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `show_on_search` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `business_requests`
--

CREATE TABLE `business_requests` (
  `id` bigint UNSIGNED NOT NULL,
  `business_id` bigint UNSIGNED NOT NULL,
  `business_activity_id` int UNSIGNED NOT NULL,
  `business_category_id` tinyint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `free_zone_id` bigint UNSIGNED DEFAULT NULL,
  `province_id` bigint UNSIGNED DEFAULT NULL,
  `township_id` bigint UNSIGNED DEFAULT NULL,
  `postal_code` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` tinytext COLLATE utf8mb4_unicode_ci,
  `status_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `business_request_status_histories`
--

CREATE TABLE `business_request_status_histories` (
  `id` bigint UNSIGNED NOT NULL,
  `business_request_id` bigint UNSIGNED NOT NULL,
  `status_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `change_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reason` text COLLATE utf8mb4_unicode_ci,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `captchas`
--

CREATE TABLE `captchas` (
  `token` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires_at` timestamp NOT NULL,
  `attempts` smallint UNSIGNED NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `company_details`
--

CREATE TABLE `company_details` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `national_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `register_date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `company_personnel`
--

CREATE TABLE `company_personnel` (
  `id` bigint UNSIGNED NOT NULL,
  `company_id` bigint UNSIGNED NOT NULL,
  `person_id` bigint UNSIGNED NOT NULL,
  `position` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `is_contact` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `external_api_services`
--

CREATE TABLE `external_api_services` (
  `id` bigint UNSIGNED NOT NULL,
  `provider` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'freezone',
  `free_zone_id` bigint UNSIGNED DEFAULT NULL,
  `service_type_id` bigint UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `method` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'POST',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `behind_pgsb` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `external_api_service_headers`
--

CREATE TABLE `external_api_service_headers` (
  `id` bigint UNSIGNED NOT NULL,
  `service_id` bigint UNSIGNED NOT NULL,
  `header_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `header_value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `external_api_service_params`
--

CREATE TABLE `external_api_service_params` (
  `id` bigint UNSIGNED NOT NULL,
  `service_id` bigint UNSIGNED NOT NULL,
  `param_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `param_value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `external_service_types`
--

CREATE TABLE `external_service_types` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `foreign_person_details`
--

CREATE TABLE `foreign_person_details` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foreign_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passport_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthday` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `free_zones`
--

CREATE TABLE `free_zones` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `icon` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `free_zone_active_businesses`
--

CREATE TABLE `free_zone_active_businesses` (
  `id` bigint UNSIGNED NOT NULL,
  `business_id` bigint UNSIGNED NOT NULL,
  `free_zone_id` bigint UNSIGNED NOT NULL,
  `issuing_authority` bigint UNSIGNED NOT NULL DEFAULT '0' COMMENT '1=zone / 0=mainland',
  `economic_activity_license` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `free_zone_api_services`
--

CREATE TABLE `free_zone_api_services` (
  `id` bigint UNSIGNED NOT NULL,
  `free_zone_id` bigint UNSIGNED NOT NULL,
  `service_type_id` bigint UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `method` enum('GET','POST','PUT','DELETE') COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `free_zone_api_service_params`
--

CREATE TABLE `free_zone_api_service_params` (
  `id` bigint UNSIGNED NOT NULL,
  `service_id` bigint UNSIGNED NOT NULL,
  `param_key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `param_value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `free_zone_locations`
--

CREATE TABLE `free_zone_locations` (
  `id` bigint UNSIGNED NOT NULL,
  `free_zone_id` bigint UNSIGNED NOT NULL,
  `province_id` bigint UNSIGNED NOT NULL,
  `township_id` bigint UNSIGNED NOT NULL,
  `city_id` bigint UNSIGNED DEFAULT NULL,
  `postal_code_range` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `x_coordinate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `y_coordinate` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `free_zone_service_types`
--

CREATE TABLE `free_zone_service_types` (
  `id` bigint UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genders`
--

CREATE TABLE `genders` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `isic_tree`
--

CREATE TABLE `isic_tree` (
  `id` mediumint UNSIGNED NOT NULL,
  `parent_id` mediumint UNSIGNED DEFAULT NULL,
  `title_fa` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title_en` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_short` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isic_code` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` enum('1','2','3','4','5') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('active','inactive','deleted') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `licenses`
--

CREATE TABLE `licenses` (
  `id` bigint UNSIGNED NOT NULL,
  `license_base_id` bigint UNSIGNED NOT NULL,
  `license_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `license_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_id` bigint UNSIGNED NOT NULL,
  `request_type_id` bigint UNSIGNED NOT NULL,
  `license_version` int UNSIGNED NOT NULL DEFAULT '1',
  `duration_time` int UNSIGNED DEFAULT NULL,
  `validity_time` int UNSIGNED DEFAULT NULL,
  `validity_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duration_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hint` mediumtext COLLATE utf8mb4_unicode_ci,
  `notes` mediumtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `license_bases`
--

CREATE TABLE `license_bases` (
  `id` bigint UNSIGNED NOT NULL,
  `license_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `license_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_id` bigint UNSIGNED NOT NULL,
  `license_version` int UNSIGNED NOT NULL DEFAULT '1',
  `hint` mediumtext COLLATE utf8mb4_unicode_ci,
  `notes` mediumtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `license_base_genders`
--

CREATE TABLE `license_base_genders` (
  `id` bigint UNSIGNED NOT NULL,
  `license_base_id` bigint UNSIGNED NOT NULL,
  `gender_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `license_base_user_types`
--

CREATE TABLE `license_base_user_types` (
  `id` bigint UNSIGNED NOT NULL,
  `license_base_id` bigint UNSIGNED NOT NULL,
  `user_type_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `license_conditions`
--

CREATE TABLE `license_conditions` (
  `id` bigint UNSIGNED NOT NULL,
  `license_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `license_costs`
--

CREATE TABLE `license_costs` (
  `id` bigint UNSIGNED NOT NULL,
  `license_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expense` decimal(12,2) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `license_documents`
--

CREATE TABLE `license_documents` (
  `id` bigint UNSIGNED NOT NULL,
  `license_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `license_inquiries`
--

CREATE TABLE `license_inquiries` (
  `id` bigint UNSIGNED NOT NULL,
  `license_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `version` int UNSIGNED NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `license_requests`
--

CREATE TABLE `license_requests` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `business_request_id` bigint UNSIGNED DEFAULT NULL,
  `request_number` bigint UNSIGNED NOT NULL,
  `license_id` bigint UNSIGNED NOT NULL,
  `follow_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `license_note` json DEFAULT NULL,
  `parent_request_id` bigint UNSIGNED DEFAULT NULL,
  `status_id` bigint UNSIGNED NOT NULL,
  `status_date` timestamp NULL DEFAULT NULL,
  `issue_date` timestamp NULL DEFAULT NULL,
  `expire_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `license_request_inquiry_results`
--

CREATE TABLE `license_request_inquiry_results` (
  `id` bigint UNSIGNED NOT NULL,
  `license_request_status_history_id` bigint UNSIGNED NOT NULL,
  `license_request_inquiry_id` bigint UNSIGNED NOT NULL,
  `started_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` text COLLATE utf8mb4_unicode_ci,
  `date_valid` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `license_request_sequences`
--

CREATE TABLE `license_request_sequences` (
  `id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `license_request_status_histories`
--

CREATE TABLE `license_request_status_histories` (
  `id` bigint UNSIGNED NOT NULL,
  `license_request_id` bigint UNSIGNED NOT NULL,
  `status_id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `change_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `until_date` timestamp NULL DEFAULT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci,
  `comment` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `license_tags`
--

CREATE TABLE `license_tags` (
  `id` bigint UNSIGNED NOT NULL,
  `license_id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `client_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `client_id` bigint UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint UNSIGNED NOT NULL,
  `client_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `permission_user`
--

CREATE TABLE `permission_user` (
  `id` int UNSIGNED NOT NULL,
  `permission_id` int UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `person_details`
--

CREATE TABLE `person_details` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `national_code` char(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `father_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth_certificate_no` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `birthday` date NOT NULL,
  `gender_id` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `provinces`
--

CREATE TABLE `provinces` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pulse_aggregates`
--

CREATE TABLE `pulse_aggregates` (
  `id` bigint UNSIGNED NOT NULL,
  `bucket` int UNSIGNED NOT NULL,
  `period` mediumint UNSIGNED NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `key_hash` binary(16) GENERATED ALWAYS AS (unhex(md5(`key`))) VIRTUAL,
  `aggregate` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` decimal(20,2) NOT NULL,
  `count` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pulse_entries`
--

CREATE TABLE `pulse_entries` (
  `id` bigint UNSIGNED NOT NULL,
  `timestamp` int UNSIGNED NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `key_hash` binary(16) GENERATED ALWAYS AS (unhex(md5(`key`))) VIRTUAL,
  `value` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pulse_values`
--

CREATE TABLE `pulse_values` (
  `id` bigint UNSIGNED NOT NULL,
  `timestamp` int UNSIGNED NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `key_hash` binary(16) GENERATED ALWAYS AS (unhex(md5(`key`))) VIRTUAL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reject_reasons`
--

CREATE TABLE `reject_reasons` (
  `id` bigint UNSIGNED NOT NULL,
  `license_request_id` bigint UNSIGNED NOT NULL,
  `type` tinyint UNSIGNED NOT NULL,
  `reference_id` bigint UNSIGNED DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reject_reason_types`
--

CREATE TABLE `reject_reason_types` (
  `id` bigint UNSIGNED NOT NULL,
  `code` tinyint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `request_statuses`
--

CREATE TABLE `request_statuses` (
  `id` bigint UNSIGNED NOT NULL,
  `slug` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `request_status_change_reasons`
--

CREATE TABLE `request_status_change_reasons` (
  `id` bigint UNSIGNED NOT NULL,
  `license_request_status_history_id` bigint UNSIGNED NOT NULL,
  `request_status_change_reason_type_id` bigint UNSIGNED NOT NULL,
  `reference_id` bigint UNSIGNED DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `request_status_change_reason_types`
--

CREATE TABLE `request_status_change_reason_types` (
  `id` bigint UNSIGNED NOT NULL,
  `code` tinyint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `request_types`
--

CREATE TABLE `request_types` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sms_templates`
--

CREATE TABLE `sms_templates` (
  `id` bigint UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Unique key for template lookup e.g. revoked_license',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'fa',
  `template` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Template text containing {{placeholders}}',
  `variables` json DEFAULT NULL COMMENT 'Optional precomputed variable list, e.g. ["name","request_number"]',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_by` bigint UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `statuses`
--

CREATE TABLE `statuses` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `telescope_entries`
--

CREATE TABLE `telescope_entries` (
  `sequence` bigint UNSIGNED NOT NULL,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch_id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `family_hash` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `should_display_on_index` tinyint(1) NOT NULL DEFAULT '1',
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `telescope_entries_tags`
--

CREATE TABLE `telescope_entries_tags` (
  `entry_uuid` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `telescope_monitoring`
--

CREATE TABLE `telescope_monitoring` (
  `tag` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `townships`
--

CREATE TABLE `townships` (
  `id` bigint UNSIGNED NOT NULL,
  `province_id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `user_type_id` bigint UNSIGNED NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `due_date` date NOT NULL,
  `status_id` bigint UNSIGNED NOT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_statuses`
--

CREATE TABLE `user_statuses` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_types`
--

CREATE TABLE `user_types` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `businesses`
--
ALTER TABLE `businesses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `businesses_isic_tree_id_foreign` (`isic_tree_id`),
  ADD KEY `businesses_status_id_foreign` (`status_id`),
  ADD KEY `businesses_updated_by_foreign` (`updated_by`);
ALTER TABLE `businesses` ADD FULLTEXT KEY `businesses_keywords_fulltext` (`keywords`);

--
-- Indexes for table `business_activities`
--
ALTER TABLE `business_activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `business_activities_business_id_foreign` (`business_id`),
  ADD KEY `business_activities_business_category_id_foreign` (`business_category_id`);

--
-- Indexes for table `business_activity_licenses`
--
ALTER TABLE `business_activity_licenses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_business_activity_license` (`business_activity_id`,`license_base_id`,`sort_order`),
  ADD KEY `business_activity_licenses_license_base_id_foreign` (`license_base_id`);

--
-- Indexes for table `business_categories`
--
ALTER TABLE `business_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `business_requests`
--
ALTER TABLE `business_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_business_request` (`business_id`,`business_activity_id`,`business_category_id`,`user_id`,`postal_code`),
  ADD KEY `business_requests_user_id_foreign` (`user_id`),
  ADD KEY `business_requests_free_zone_id_foreign` (`free_zone_id`),
  ADD KEY `business_requests_status_id_foreign` (`status_id`),
  ADD KEY `business_requests_business_activity_id_foreign` (`business_activity_id`),
  ADD KEY `business_requests_business_category_id_foreign` (`business_category_id`),
  ADD KEY `business_requests_province_id_foreign` (`province_id`),
  ADD KEY `business_requests_township_id_foreign` (`township_id`);

--
-- Indexes for table `business_request_status_histories`
--
ALTER TABLE `business_request_status_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `business_request_status_histories_business_request_id_foreign` (`business_request_id`),
  ADD KEY `business_request_status_histories_status_id_foreign` (`status_id`),
  ADD KEY `business_request_status_histories_user_id_foreign` (`user_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `captchas`
--
ALTER TABLE `captchas`
  ADD PRIMARY KEY (`token`);

--
-- Indexes for table `company_details`
--
ALTER TABLE `company_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `company_details_national_id_unique` (`national_id`),
  ADD KEY `company_details_user_id_foreign` (`user_id`);

--
-- Indexes for table `company_personnel`
--
ALTER TABLE `company_personnel`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `company_personnel_company_id_person_id_unique` (`company_id`,`person_id`),
  ADD KEY `company_personnel_person_id_foreign` (`person_id`);

--
-- Indexes for table `external_api_services`
--
ALTER TABLE `external_api_services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `external_api_services_free_zone_id_index` (`free_zone_id`),
  ADD KEY `external_api_services_service_type_id_index` (`service_type_id`);

--
-- Indexes for table `external_api_service_headers`
--
ALTER TABLE `external_api_service_headers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `external_api_service_headers_service_id_index` (`service_id`);

--
-- Indexes for table `external_api_service_params`
--
ALTER TABLE `external_api_service_params`
  ADD PRIMARY KEY (`id`),
  ADD KEY `external_api_service_params_service_id_index` (`service_id`);

--
-- Indexes for table `external_service_types`
--
ALTER TABLE `external_service_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `external_service_types_slug_unique` (`slug`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `foreign_person_details`
--
ALTER TABLE `foreign_person_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `foreign_person_details_foreign_code_unique` (`foreign_code`),
  ADD UNIQUE KEY `foreign_person_details_passport_code_unique` (`passport_code`),
  ADD KEY `foreign_person_details_user_id_foreign` (`user_id`);

--
-- Indexes for table `free_zones`
--
ALTER TABLE `free_zones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `free_zones_user_id_foreign` (`user_id`);

--
-- Indexes for table `free_zone_active_businesses`
--
ALTER TABLE `free_zone_active_businesses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `free_zone_active_businesses_free_zone_id_business_id_unique` (`free_zone_id`,`business_id`),
  ADD KEY `free_zone_active_businesses_business_id_foreign` (`business_id`);

--
-- Indexes for table `free_zone_api_services`
--
ALTER TABLE `free_zone_api_services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `free_zone_api_services_free_zone_id_foreign` (`free_zone_id`),
  ADD KEY `free_zone_api_services_service_type_id_foreign` (`service_type_id`);

--
-- Indexes for table `free_zone_api_service_params`
--
ALTER TABLE `free_zone_api_service_params`
  ADD PRIMARY KEY (`id`),
  ADD KEY `free_zone_api_service_params_service_id_foreign` (`service_id`);

--
-- Indexes for table `free_zone_locations`
--
ALTER TABLE `free_zone_locations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `free_zone_locations_free_zone_id_foreign` (`free_zone_id`),
  ADD KEY `free_zone_locations_province_id_foreign` (`province_id`),
  ADD KEY `free_zone_locations_township_id_foreign` (`township_id`);

--
-- Indexes for table `free_zone_service_types`
--
ALTER TABLE `free_zone_service_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `free_zone_service_types_slug_unique` (`slug`);

--
-- Indexes for table `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `genders_name_unique` (`name`),
  ADD UNIQUE KEY `genders_slug_unique` (`slug`);

--
-- Indexes for table `isic_tree`
--
ALTER TABLE `isic_tree`
  ADD PRIMARY KEY (`id`),
  ADD KEY `isic_tree_parent_id_foreign` (`parent_id`);
ALTER TABLE `isic_tree` ADD FULLTEXT KEY `isic_tree_title_fa_fulltext` (`title_fa`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `licenses`
--
ALTER TABLE `licenses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `licenses_license_code_request_type_id_license_version_unique` (`license_code`,`request_type_id`,`license_version`),
  ADD KEY `licenses_license_base_id_foreign` (`license_base_id`),
  ADD KEY `licenses_status_id_foreign` (`status_id`),
  ADD KEY `licenses_request_type_id_foreign` (`request_type_id`);

--
-- Indexes for table `license_bases`
--
ALTER TABLE `license_bases`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `license_bases_license_code_unique` (`license_code`),
  ADD KEY `license_bases_status_id_foreign` (`status_id`);

--
-- Indexes for table `license_base_genders`
--
ALTER TABLE `license_base_genders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `license_base_genders_license_base_id_gender_id_unique` (`license_base_id`,`gender_id`),
  ADD KEY `license_base_genders_gender_id_foreign` (`gender_id`);

--
-- Indexes for table `license_base_user_types`
--
ALTER TABLE `license_base_user_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_license_base_user` (`license_base_id`,`user_type_id`),
  ADD KEY `license_base_user_types_user_type_id_foreign` (`user_type_id`);

--
-- Indexes for table `license_conditions`
--
ALTER TABLE `license_conditions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `license_conditions_license_id_foreign` (`license_id`);

--
-- Indexes for table `license_costs`
--
ALTER TABLE `license_costs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `license_costs_license_id_foreign` (`license_id`);

--
-- Indexes for table `license_documents`
--
ALTER TABLE `license_documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `license_documents_license_id_foreign` (`license_id`);

--
-- Indexes for table `license_inquiries`
--
ALTER TABLE `license_inquiries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `license_inquiries_license_id_foreign` (`license_id`);

--
-- Indexes for table `license_requests`
--
ALTER TABLE `license_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `license_requests_request_number_unique` (`request_number`),
  ADD KEY `license_requests_user_id_foreign` (`user_id`),
  ADD KEY `license_requests_business_request_id_foreign` (`business_request_id`),
  ADD KEY `license_requests_license_id_foreign` (`license_id`),
  ADD KEY `license_requests_status_id_foreign` (`status_id`);

--
-- Indexes for table `license_request_inquiry_results`
--
ALTER TABLE `license_request_inquiry_results`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `lir_unique` (`license_request_status_history_id`,`license_request_inquiry_id`),
  ADD KEY `fk_inquiry_results_inquiry_id` (`license_request_inquiry_id`);

--
-- Indexes for table `license_request_sequences`
--
ALTER TABLE `license_request_sequences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `license_request_status_histories`
--
ALTER TABLE `license_request_status_histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `license_request_status_histories_license_request_id_foreign` (`license_request_id`),
  ADD KEY `license_request_status_histories_status_id_foreign` (`status_id`),
  ADD KEY `license_request_status_histories_user_id_foreign` (`user_id`);

--
-- Indexes for table `license_tags`
--
ALTER TABLE `license_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `license_tags_license_id_foreign` (`license_id`),
  ADD KEY `license_tags_name_index` (`name`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

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
-- Indexes for table `permission_user`
--
ALTER TABLE `permission_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permission_user_permission_id_index` (`permission_id`),
  ADD KEY `permission_user_user_id_index` (`user_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `person_details`
--
ALTER TABLE `person_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `person_details_national_code_unique` (`national_code`),
  ADD KEY `person_details_user_id_foreign` (`user_id`),
  ADD KEY `person_details_gender_id_foreign` (`gender_id`);

--
-- Indexes for table `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pulse_aggregates`
--
ALTER TABLE `pulse_aggregates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pulse_aggregates_bucket_period_type_aggregate_key_hash_unique` (`bucket`,`period`,`type`,`aggregate`,`key_hash`),
  ADD KEY `pulse_aggregates_period_bucket_index` (`period`,`bucket`),
  ADD KEY `pulse_aggregates_type_index` (`type`),
  ADD KEY `pulse_aggregates_period_type_aggregate_bucket_index` (`period`,`type`,`aggregate`,`bucket`);

--
-- Indexes for table `pulse_entries`
--
ALTER TABLE `pulse_entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pulse_entries_timestamp_index` (`timestamp`),
  ADD KEY `pulse_entries_type_index` (`type`),
  ADD KEY `pulse_entries_key_hash_index` (`key_hash`),
  ADD KEY `pulse_entries_timestamp_type_key_hash_value_index` (`timestamp`,`type`,`key_hash`,`value`);

--
-- Indexes for table `pulse_values`
--
ALTER TABLE `pulse_values`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pulse_values_type_key_hash_unique` (`type`,`key_hash`),
  ADD KEY `pulse_values_timestamp_index` (`timestamp`),
  ADD KEY `pulse_values_type_index` (`type`);

--
-- Indexes for table `reject_reasons`
--
ALTER TABLE `reject_reasons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reject_reasons_license_request_id_foreign` (`license_request_id`);

--
-- Indexes for table `reject_reason_types`
--
ALTER TABLE `reject_reason_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reject_reason_types_code_unique` (`code`);

--
-- Indexes for table `request_statuses`
--
ALTER TABLE `request_statuses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `request_statuses_slug_unique` (`slug`);

--
-- Indexes for table `request_status_change_reasons`
--
ALTER TABLE `request_status_change_reasons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_history` (`license_request_status_history_id`),
  ADD KEY `fk_type` (`request_status_change_reason_type_id`);

--
-- Indexes for table `request_status_change_reason_types`
--
ALTER TABLE `request_status_change_reason_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `request_status_change_reason_types_code_unique` (`code`);

--
-- Indexes for table `request_types`
--
ALTER TABLE `request_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `request_types_name_unique` (`name`),
  ADD UNIQUE KEY `request_types_slug_unique` (`slug`);

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
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `sms_templates`
--
ALTER TABLE `sms_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sms_templates_slug_unique` (`slug`);

--
-- Indexes for table `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `statuses_name_unique` (`name`),
  ADD UNIQUE KEY `statuses_slug_unique` (`slug`);

--
-- Indexes for table `telescope_entries`
--
ALTER TABLE `telescope_entries`
  ADD PRIMARY KEY (`sequence`),
  ADD UNIQUE KEY `telescope_entries_uuid_unique` (`uuid`),
  ADD KEY `telescope_entries_batch_id_index` (`batch_id`),
  ADD KEY `telescope_entries_family_hash_index` (`family_hash`),
  ADD KEY `telescope_entries_created_at_index` (`created_at`),
  ADD KEY `telescope_entries_type_should_display_on_index_index` (`type`,`should_display_on_index`);

--
-- Indexes for table `telescope_entries_tags`
--
ALTER TABLE `telescope_entries_tags`
  ADD PRIMARY KEY (`entry_uuid`,`tag`),
  ADD KEY `telescope_entries_tags_tag_index` (`tag`);

--
-- Indexes for table `telescope_monitoring`
--
ALTER TABLE `telescope_monitoring`
  ADD PRIMARY KEY (`tag`);

--
-- Indexes for table `townships`
--
ALTER TABLE `townships`
  ADD PRIMARY KEY (`id`),
  ADD KEY `townships_province_id_foreign` (`province_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`),
  ADD KEY `users_user_type_id_foreign` (`user_type_id`),
  ADD KEY `users_status_id_foreign` (`status_id`);

--
-- Indexes for table `user_statuses`
--
ALTER TABLE `user_statuses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_statuses_name_unique` (`name`),
  ADD UNIQUE KEY `user_statuses_slug_unique` (`slug`);

--
-- Indexes for table `user_types`
--
ALTER TABLE `user_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_types_name_unique` (`name`),
  ADD UNIQUE KEY `user_types_slug_unique` (`slug`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `businesses`
--
ALTER TABLE `businesses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `business_activities`
--
ALTER TABLE `business_activities`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `business_activity_licenses`
--
ALTER TABLE `business_activity_licenses`
  MODIFY `id` mediumint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `business_categories`
--
ALTER TABLE `business_categories`
  MODIFY `id` tinyint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `business_requests`
--
ALTER TABLE `business_requests`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `business_request_status_histories`
--
ALTER TABLE `business_request_status_histories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company_details`
--
ALTER TABLE `company_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company_personnel`
--
ALTER TABLE `company_personnel`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `external_api_services`
--
ALTER TABLE `external_api_services`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `external_api_service_headers`
--
ALTER TABLE `external_api_service_headers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `external_api_service_params`
--
ALTER TABLE `external_api_service_params`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `external_service_types`
--
ALTER TABLE `external_service_types`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `foreign_person_details`
--
ALTER TABLE `foreign_person_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `free_zones`
--
ALTER TABLE `free_zones`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `free_zone_active_businesses`
--
ALTER TABLE `free_zone_active_businesses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `free_zone_api_services`
--
ALTER TABLE `free_zone_api_services`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `free_zone_api_service_params`
--
ALTER TABLE `free_zone_api_service_params`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `free_zone_locations`
--
ALTER TABLE `free_zone_locations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `free_zone_service_types`
--
ALTER TABLE `free_zone_service_types`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `genders`
--
ALTER TABLE `genders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `isic_tree`
--
ALTER TABLE `isic_tree`
  MODIFY `id` mediumint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `licenses`
--
ALTER TABLE `licenses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `license_bases`
--
ALTER TABLE `license_bases`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `license_base_genders`
--
ALTER TABLE `license_base_genders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `license_base_user_types`
--
ALTER TABLE `license_base_user_types`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `license_conditions`
--
ALTER TABLE `license_conditions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `license_costs`
--
ALTER TABLE `license_costs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `license_documents`
--
ALTER TABLE `license_documents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `license_inquiries`
--
ALTER TABLE `license_inquiries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `license_requests`
--
ALTER TABLE `license_requests`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `license_request_inquiry_results`
--
ALTER TABLE `license_request_inquiry_results`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `license_request_sequences`
--
ALTER TABLE `license_request_sequences`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `license_request_status_histories`
--
ALTER TABLE `license_request_status_histories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `license_tags`
--
ALTER TABLE `license_tags`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permission_categories`
--
ALTER TABLE `permission_categories`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permission_role`
--
ALTER TABLE `permission_role`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permission_user`
--
ALTER TABLE `permission_user`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `person_details`
--
ALTER TABLE `person_details`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pulse_aggregates`
--
ALTER TABLE `pulse_aggregates`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pulse_entries`
--
ALTER TABLE `pulse_entries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pulse_values`
--
ALTER TABLE `pulse_values`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reject_reasons`
--
ALTER TABLE `reject_reasons`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reject_reason_types`
--
ALTER TABLE `reject_reason_types`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `request_statuses`
--
ALTER TABLE `request_statuses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `request_status_change_reasons`
--
ALTER TABLE `request_status_change_reasons`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `request_status_change_reason_types`
--
ALTER TABLE `request_status_change_reason_types`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role_user`
--
ALTER TABLE `role_user`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sms_templates`
--
ALTER TABLE `sms_templates`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `telescope_entries`
--
ALTER TABLE `telescope_entries`
  MODIFY `sequence` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `townships`
--
ALTER TABLE `townships`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_statuses`
--
ALTER TABLE `user_statuses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `businesses`
--
ALTER TABLE `businesses`
  ADD CONSTRAINT `businesses_isic_tree_id_foreign` FOREIGN KEY (`isic_tree_id`) REFERENCES `isic_tree` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `businesses_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`),
  ADD CONSTRAINT `businesses_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT;

--
-- Constraints for table `business_activities`
--
ALTER TABLE `business_activities`
  ADD CONSTRAINT `business_activities_business_category_id_foreign` FOREIGN KEY (`business_category_id`) REFERENCES `business_categories` (`id`),
  ADD CONSTRAINT `business_activities_business_id_foreign` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `business_activity_licenses`
--
ALTER TABLE `business_activity_licenses`
  ADD CONSTRAINT `business_activity_licenses_business_activity_id_foreign` FOREIGN KEY (`business_activity_id`) REFERENCES `business_activities` (`id`),
  ADD CONSTRAINT `business_activity_licenses_license_base_id_foreign` FOREIGN KEY (`license_base_id`) REFERENCES `license_bases` (`id`);

--
-- Constraints for table `business_requests`
--
ALTER TABLE `business_requests`
  ADD CONSTRAINT `business_requests_business_activity_id_foreign` FOREIGN KEY (`business_activity_id`) REFERENCES `business_activities` (`id`),
  ADD CONSTRAINT `business_requests_business_category_id_foreign` FOREIGN KEY (`business_category_id`) REFERENCES `business_categories` (`id`),
  ADD CONSTRAINT `business_requests_business_id_foreign` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `business_requests_free_zone_id_foreign` FOREIGN KEY (`free_zone_id`) REFERENCES `free_zones` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `business_requests_province_id_foreign` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`),
  ADD CONSTRAINT `business_requests_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `request_statuses` (`id`),
  ADD CONSTRAINT `business_requests_township_id_foreign` FOREIGN KEY (`township_id`) REFERENCES `townships` (`id`),
  ADD CONSTRAINT `business_requests_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `business_request_status_histories`
--
ALTER TABLE `business_request_status_histories`
  ADD CONSTRAINT `business_request_status_histories_business_request_id_foreign` FOREIGN KEY (`business_request_id`) REFERENCES `business_requests` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `business_request_status_histories_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `request_statuses` (`id`),
  ADD CONSTRAINT `business_request_status_histories_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `company_details`
--
ALTER TABLE `company_details`
  ADD CONSTRAINT `company_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `company_personnel`
--
ALTER TABLE `company_personnel`
  ADD CONSTRAINT `company_personnel_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `company_details` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `company_personnel_person_id_foreign` FOREIGN KEY (`person_id`) REFERENCES `person_details` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `external_api_services`
--
ALTER TABLE `external_api_services`
  ADD CONSTRAINT `external_api_services_free_zone_id_foreign` FOREIGN KEY (`free_zone_id`) REFERENCES `free_zones` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `external_api_services_service_type_id_foreign` FOREIGN KEY (`service_type_id`) REFERENCES `external_service_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `external_api_service_headers`
--
ALTER TABLE `external_api_service_headers`
  ADD CONSTRAINT `external_api_service_headers_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `external_api_services` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `external_api_service_params`
--
ALTER TABLE `external_api_service_params`
  ADD CONSTRAINT `external_api_service_params_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `external_api_services` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `foreign_person_details`
--
ALTER TABLE `foreign_person_details`
  ADD CONSTRAINT `foreign_person_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `free_zones`
--
ALTER TABLE `free_zones`
  ADD CONSTRAINT `free_zones_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT;

--
-- Constraints for table `free_zone_active_businesses`
--
ALTER TABLE `free_zone_active_businesses`
  ADD CONSTRAINT `free_zone_active_businesses_business_id_foreign` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `free_zone_active_businesses_free_zone_id_foreign` FOREIGN KEY (`free_zone_id`) REFERENCES `free_zones` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `free_zone_api_services`
--
ALTER TABLE `free_zone_api_services`
  ADD CONSTRAINT `free_zone_api_services_free_zone_id_foreign` FOREIGN KEY (`free_zone_id`) REFERENCES `free_zones` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `free_zone_api_services_service_type_id_foreign` FOREIGN KEY (`service_type_id`) REFERENCES `free_zone_service_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `free_zone_api_service_params`
--
ALTER TABLE `free_zone_api_service_params`
  ADD CONSTRAINT `free_zone_api_service_params_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `free_zone_api_services` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `free_zone_locations`
--
ALTER TABLE `free_zone_locations`
  ADD CONSTRAINT `free_zone_locations_free_zone_id_foreign` FOREIGN KEY (`free_zone_id`) REFERENCES `free_zones` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `free_zone_locations_province_id_foreign` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `free_zone_locations_township_id_foreign` FOREIGN KEY (`township_id`) REFERENCES `townships` (`id`) ON DELETE RESTRICT;

--
-- Constraints for table `isic_tree`
--
ALTER TABLE `isic_tree`
  ADD CONSTRAINT `isic_tree_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `isic_tree` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `licenses`
--
ALTER TABLE `licenses`
  ADD CONSTRAINT `licenses_license_base_id_foreign` FOREIGN KEY (`license_base_id`) REFERENCES `license_bases` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `licenses_request_type_id_foreign` FOREIGN KEY (`request_type_id`) REFERENCES `request_types` (`id`),
  ADD CONSTRAINT `licenses_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`);

--
-- Constraints for table `license_bases`
--
ALTER TABLE `license_bases`
  ADD CONSTRAINT `license_bases_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`);

--
-- Constraints for table `license_base_genders`
--
ALTER TABLE `license_base_genders`
  ADD CONSTRAINT `license_base_genders_gender_id_foreign` FOREIGN KEY (`gender_id`) REFERENCES `genders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `license_base_genders_license_base_id_foreign` FOREIGN KEY (`license_base_id`) REFERENCES `license_bases` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `license_base_user_types`
--
ALTER TABLE `license_base_user_types`
  ADD CONSTRAINT `license_base_user_types_license_base_id_foreign` FOREIGN KEY (`license_base_id`) REFERENCES `license_bases` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `license_base_user_types_user_type_id_foreign` FOREIGN KEY (`user_type_id`) REFERENCES `user_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `license_conditions`
--
ALTER TABLE `license_conditions`
  ADD CONSTRAINT `license_conditions_license_id_foreign` FOREIGN KEY (`license_id`) REFERENCES `licenses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `license_costs`
--
ALTER TABLE `license_costs`
  ADD CONSTRAINT `license_costs_license_id_foreign` FOREIGN KEY (`license_id`) REFERENCES `licenses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `license_documents`
--
ALTER TABLE `license_documents`
  ADD CONSTRAINT `license_documents_license_id_foreign` FOREIGN KEY (`license_id`) REFERENCES `licenses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `license_inquiries`
--
ALTER TABLE `license_inquiries`
  ADD CONSTRAINT `license_inquiries_license_id_foreign` FOREIGN KEY (`license_id`) REFERENCES `licenses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `license_requests`
--
ALTER TABLE `license_requests`
  ADD CONSTRAINT `license_requests_business_request_id_foreign` FOREIGN KEY (`business_request_id`) REFERENCES `business_requests` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `license_requests_license_id_foreign` FOREIGN KEY (`license_id`) REFERENCES `licenses` (`id`),
  ADD CONSTRAINT `license_requests_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `request_statuses` (`id`),
  ADD CONSTRAINT `license_requests_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `license_request_inquiry_results`
--
ALTER TABLE `license_request_inquiry_results`
  ADD CONSTRAINT `fk_inquiry_results_inquiry_id` FOREIGN KEY (`license_request_inquiry_id`) REFERENCES `license_inquiries` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_license_request_status_history_id` FOREIGN KEY (`license_request_status_history_id`) REFERENCES `license_request_status_histories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `license_request_status_histories`
--
ALTER TABLE `license_request_status_histories`
  ADD CONSTRAINT `license_request_status_histories_license_request_id_foreign` FOREIGN KEY (`license_request_id`) REFERENCES `license_requests` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `license_request_status_histories_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `request_statuses` (`id`),
  ADD CONSTRAINT `license_request_status_histories_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `license_tags`
--
ALTER TABLE `license_tags`
  ADD CONSTRAINT `license_tags_license_id_foreign` FOREIGN KEY (`license_id`) REFERENCES `licenses` (`id`) ON DELETE CASCADE;

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
-- Constraints for table `permission_user`
--
ALTER TABLE `permission_user`
  ADD CONSTRAINT `permission_user_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `permission_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `person_details`
--
ALTER TABLE `person_details`
  ADD CONSTRAINT `person_details_gender_id_foreign` FOREIGN KEY (`gender_id`) REFERENCES `genders` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `person_details_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reject_reasons`
--
ALTER TABLE `reject_reasons`
  ADD CONSTRAINT `reject_reasons_license_request_id_foreign` FOREIGN KEY (`license_request_id`) REFERENCES `license_requests` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `request_status_change_reasons`
--
ALTER TABLE `request_status_change_reasons`
  ADD CONSTRAINT `fk_history` FOREIGN KEY (`license_request_status_history_id`) REFERENCES `license_request_status_histories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_type` FOREIGN KEY (`request_status_change_reason_type_id`) REFERENCES `request_status_change_reason_types` (`id`) ON DELETE RESTRICT;

--
-- Constraints for table `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `telescope_entries_tags`
--
ALTER TABLE `telescope_entries_tags`
  ADD CONSTRAINT `telescope_entries_tags_entry_uuid_foreign` FOREIGN KEY (`entry_uuid`) REFERENCES `telescope_entries` (`uuid`) ON DELETE CASCADE;

--
-- Constraints for table `townships`
--
ALTER TABLE `townships`
  ADD CONSTRAINT `townships_province_id_foreign` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `user_statuses` (`id`) ON DELETE RESTRICT,
  ADD CONSTRAINT `users_user_type_id_foreign` FOREIGN KEY (`user_type_id`) REFERENCES `user_types` (`id`) ON DELETE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
