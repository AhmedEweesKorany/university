-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 18, 2024 at 03:55 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `university`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(255) DEFAULT NULL,
  `admin_email` varchar(255) DEFAULT NULL,
  `admin_password` varchar(255) DEFAULT NULL,
  `isSuper` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `competation`
--

CREATE TABLE `competation` (
  `competation_id` int(11) NOT NULL,
  `competation_name` varchar(255) DEFAULT NULL,
  `competation_author` varchar(255) DEFAULT NULL,
  `competation_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `competation`
--

INSERT INTO `competation` (`competation_id`, `competation_name`, `competation_author`, `competation_image`, `created_at`) VALUES
(2, 'Sport competation', 'Ahmed Ewees', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D', '2024-03-12 09:07:15'),
(3, 'Dance competation', 'omar ali', 'https://images.unsplash.com/photo-1546427660-eb346c344ba5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGFuY2V8ZW58MHx8MHx8fDA%3D', '2024-03-12 09:25:12'),
(4, 'testing', 'test abn testing', 'https://images.unsplash.com/photo-1520004434532-668416a08753?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVzdHxlbnwwfHwwfHx8MA%3D%3D', '2024-03-12 09:57:46'),
(5, 'Acadimic Competation', 'Acadimic', 'https://images.unsplash.com/photo-1607013407627-6ee814329547?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWNhZGVtaWN8ZW58MHx8MHx8fDA%3D', '2024-03-16 14:39:58');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(11) NOT NULL,
  `event_title` varchar(255) DEFAULT NULL,
  `event_type` varchar(255) DEFAULT NULL,
  `event_des` varchar(255) DEFAULT NULL,
  `competation_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `event_title`, `event_type`, `event_des`, `competation_id`, `created_at`) VALUES
(2, 'best player in world 2033', 'football', 'this event to choose the best football played in the world ', 2, '2024-03-16 11:35:39'),
(4, 'min testing', 'test', 'test start at 23 from this month', 4, '2024-03-12 10:05:34'),
(6, 'dancer', 'dance', 'lore dsf kgdfkjsd', 3, '2024-03-16 12:49:26'),
(8, 'اوائل الطلبة', 'acadimic', 'تكريم اوائل الطلبة', 5, '2024-03-16 14:47:03'),
(10, 'الامتحان التجريبي', 'acadimic', 'يوم 23 مارس الفدام', 5, '2024-03-16 14:46:03'),
(11, 'kingstone', 'مشقاادر', 'asdsd', 3, '2024-03-16 14:47:23');

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE `result` (
  `result_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `team_id` int(11) NOT NULL,
  `team_name` varchar(255) DEFAULT NULL,
  `leader_id` int(11) DEFAULT NULL,
  `team_members` text NOT NULL DEFAULT '       ',
  `current_member` int(11) NOT NULL DEFAULT 0,
  `team_code` varchar(255) DEFAULT NULL,
  `team_points` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`team_id`, `team_name`, `leader_id`, `team_members`, `current_member`, `team_code`, `team_points`) VALUES
(10, 'webbrical', 6, 'ahmed@gmail.com,', 1, '35bbe70d-d172-4f02-ad9a-5106a2fbb1be', 0);

-- --------------------------------------------------------

--
-- Table structure for table `team_in_competation`
--

CREATE TABLE `team_in_competation` (
  `id` int(11) NOT NULL,
  `team_id` int(11) DEFAULT NULL,
  `competation_id` int(11) DEFAULT NULL,
  `Score` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_in_competation`
--

INSERT INTO `team_in_competation` (`id`, `team_id`, `competation_id`, `Score`, `created_at`) VALUES
(4, 10, 4, 0, '2024-03-16 12:59:27'),
(5, 10, 2, 0, '2024-03-16 13:03:34');

-- --------------------------------------------------------

--
-- Table structure for table `team_in_event`
--

CREATE TABLE `team_in_event` (
  `id` int(11) NOT NULL,
  `team_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_password` varchar(255) DEFAULT NULL,
  `is_team` int(1) DEFAULT 0,
  `isAdmin` int(11) NOT NULL DEFAULT 0,
  `isSuper` int(11) NOT NULL DEFAULT 0,
  `points` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_email`, `user_password`, `is_team`, `isAdmin`, `isSuper`, `points`) VALUES
(6, 'ahmed', 'ahmed@gmail.com', '$2b$10$z7YBVbm7f/8ApD20vg7DfusUH33Lnzsb5C5ei2ViotVYR4VAfAJsW', 1, 1, 1, 0),
(12, 'emad', 'emad@gmail.com', '$2b$10$N7o5DG6oSSaQxY14A3rRjerDhquwi54pIsYtnhnVqJ.Mz0GyLNx3K', 0, 1, 0, 0),
(21, 'Maher', 'maher@gmail.com', '$2b$10$sVFP8HYne5lXHWTEUJih/.FS2KykH9dy6xvz2OHXVFCz4YouKGiSa', NULL, 1, 0, 0),
(22, 'eslam', 'eslam@gmail.com', '$2b$10$JfGxlFOw07dUdD9vfW3e..dvik6xnaC1HtmG5M.MLIHGiXG20TpmS', NULL, 0, 0, 77),
(23, 'Farouk', 'farouk@gmail.com', '$2b$10$CS/YrBwMia0koxKqKzTehOq8P.tIThoN35CgjHAZ7Hxy42M0CWRca', 1, 0, 0, 100);

-- --------------------------------------------------------

--
-- Table structure for table `users_in_competation`
--

CREATE TABLE `users_in_competation` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `competation_id` int(11) DEFAULT NULL,
  `Score` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_in_competation`
--

INSERT INTO `users_in_competation` (`id`, `user_id`, `competation_id`, `Score`, `created_at`) VALUES
(1, 6, 3, 0, '2024-03-12 12:33:23'),
(2, 12, 3, 0, '2024-03-12 12:38:21'),
(3, 12, 2, 0, '2024-03-12 12:42:17'),
(4, 12, 4, 0, '2024-03-12 12:42:49'),
(8, 21, 3, 0, '2024-03-12 12:58:11'),
(9, 21, 4, 0, '2024-03-12 12:58:19'),
(10, 22, 2, 0, '2024-03-12 13:05:04'),
(11, 6, 2, 0, '2024-03-16 07:06:01');

-- --------------------------------------------------------

--
-- Table structure for table `users_in_event`
--

CREATE TABLE `users_in_event` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `competation`
--
ALTER TABLE `competation`
  ADD PRIMARY KEY (`competation_id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `compation_id_for_events` (`competation_id`);

--
-- Indexes for table `result`
--
ALTER TABLE `result`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `team_id_for_result` (`team_id`),
  ADD KEY `user_id_for_result` (`user_id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`team_id`),
  ADD KEY `user_id_for_team` (`leader_id`);

--
-- Indexes for table `team_in_competation`
--
ALTER TABLE `team_in_competation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_id_for_teamincomp` (`team_id`),
  ADD KEY `competation_id_for_teamincomp` (`competation_id`);

--
-- Indexes for table `team_in_event`
--
ALTER TABLE `team_in_event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_id_for_teamInEvent` (`team_id`),
  ADD KEY `event_id_for_teamInEvent` (`event_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `users_in_competation`
--
ALTER TABLE `users_in_competation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_for_usersInCompetation` (`user_id`),
  ADD KEY `team_id_for_teamInCompetation` (`competation_id`);

--
-- Indexes for table `users_in_event`
--
ALTER TABLE `users_in_event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_for_userInEvent` (`user_id`),
  ADD KEY `event_id_for_userInEvent` (`event_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `competation`
--
ALTER TABLE `competation`
  MODIFY `competation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `result`
--
ALTER TABLE `result`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `team_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `team_in_competation`
--
ALTER TABLE `team_in_competation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `team_in_event`
--
ALTER TABLE `team_in_event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users_in_competation`
--
ALTER TABLE `users_in_competation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users_in_event`
--
ALTER TABLE `users_in_event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `compation_id_for_events` FOREIGN KEY (`competation_id`) REFERENCES `competation` (`competation_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `user_id_for_team` FOREIGN KEY (`leader_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `team_in_competation`
--
ALTER TABLE `team_in_competation`
  ADD CONSTRAINT `competation_id_for_teamincomp` FOREIGN KEY (`competation_id`) REFERENCES `competation` (`competation_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `team_id_for_teamincomp` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_in_competation`
--
ALTER TABLE `users_in_competation`
  ADD CONSTRAINT `team_id_for_teamInCompetation` FOREIGN KEY (`competation_id`) REFERENCES `competation` (`competation_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_id_for_usersInCompetation` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
