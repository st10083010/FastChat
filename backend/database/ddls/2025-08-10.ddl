ALTER TABLE `chat`.`chat_content` 
ADD COLUMN `client_id` VARCHAR(45) NOT NULL COMMENT '訊息的UUID，用於去重複' AFTER `is_delete`;

ALTER TABLE `chat`.`rooms` 
ADD COLUMN `user_id_low` INT UNSIGNED NOT NULL COMMENT '較小的使用者ID' AFTER `create_datetime`,
ADD COLUMN `user_id_high` INT UNSIGNED NOT NULL COMMENT '較大的使用者ID' AFTER `user_id_low`, RENAME TO  `chat`.`dm_rooms` ;

CREATE UNIQUE INDEX `uniq_pair`  ON `chat`.`dm_rooms` (user_id_low, user_id_high) COMMENT '' ALGORITHM DEFAULT LOCK DEFAULT;