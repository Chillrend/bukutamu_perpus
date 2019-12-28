-- phpMyAdmin SQL Dump
-- version 5.1.0-dev
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 28, 2019 at 10:30 AM
-- Server version: 10.1.34-MariaDB-0ubuntu0.18.04.1
-- PHP Version: 7.2.10-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perpus`
--

-- --------------------------------------------------------

--
-- Table structure for table `guest`
--

CREATE TABLE `guest` (
  `id` int(16) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_member` tinyint(1) NOT NULL,
  `id_number` varchar(16) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `time_visited` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guest`
--

INSERT INTO `guest` (`id`, `name`, `is_member`, `id_number`, `address`, `time_visited`) VALUES
(1, '0', 1, '4817040316', 'Jl. Awe', 1577160473),
(2, '0', 1, '4817040316', 'Jl. Awe', 1577160568),
(3, '0', 1, '4817040316', 'Jl. Awe', 1577160713),
(4, 'GBon', 1, '4817040316', 'Jl. Awe', 1577164295),
(5, 'GBon', 1, '4817040316123412', 'Jl. Awe', 1577242720),
(6, 'GBon', 1, '4817040316123412', 'Jl. Awe', 1577242725),
(7, 'GBon', 1, '4817040316123412', 'Jl. Awe', 1577242756),
(8, 'GBon', 1, '4817040316123412', 'Jl. Awe', 1577242830),
(9, '\'[object HTMLInputElement]\'', 0, NULL, '\'[object HTMLInputElement]\'', 1577248833),
(10, '\'123123123\'', 0, NULL, '\'qweqweqweqweqw\'', 1577248880),
(11, '123123', 0, NULL, 'qweqweqweqweqweq', 1577248912);

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` varchar(16) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `name`, `address`, `birthdate`, `occupation`) VALUES
('4815000000', 'GBone', 'Jl. nangka 12', '2019-12-01', 'Mahasiswa'),
('4817040316123412', 'GBon', 'Jl. Awe', '2019-12-10', 'Lont8');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `guest`
--
ALTER TABLE `guest`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `guest`
--
ALTER TABLE `guest`
  MODIFY `id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

