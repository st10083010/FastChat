ALTER TABLE `chat`.`users` 
ADD COLUMN `last_log_out_datetime` DATETIME NOT NULL DEFAULT '2025-08-11 12:00:00' COMMENT '上次登出時間' AFTER `is_valid`;