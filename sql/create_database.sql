CREATE DATABASE travelverse;

USE travelverse;

CREATE TABLE `users_x` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(64) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `created_t` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_x_id_unique` (`id`),
  UNIQUE KEY `users_x_username_unique` (`username`),
  KEY `users_x_id_idx` (`id`),
  KEY `users_x_username_idx` (`username`)
);
