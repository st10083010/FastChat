CREATE TABLE `chat_content` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `room_id` int unsigned NOT NULL,
  `sender_id` int unsigned NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `send_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_delete` tinyint NOT NULL DEFAULT '0' COMMENT '該訊息是否被刪除或收回',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_name` varchar(255) NOT NULL DEFAULT 'chat room',
  `create_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `is_valid` tinyint DEFAULT '1' COMMENT '是否為有效帳戶',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;