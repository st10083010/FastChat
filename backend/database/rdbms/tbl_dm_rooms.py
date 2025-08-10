from backend.database.connection_mysql import ChatRDBMS
from typing import Any
from backend.database.rdbms.enum_tables import TableName

class Tbl_DMRooms(ChatRDBMS):
    def find_id_by_user_pair(self, u1: int, u2: int):
        """透過使用者尋找房間ID"""
        low, high = sorted([int(u1), int(u2)])
        sql = f"SELECT id, room_name FROM {TableName.DM_ROOMS.value} WHERE user_id_low = %s AND user_id_high = %s"
        return self.select_one(sql=sql, datas=[low, high])

    def create_dm_room_and_return_room_info(self, u1: int, u2: int) -> dict[str, Any] | None:
        """建立私訊房間並回傳資訊"""
        low, high = sorted([int(u1), int(u2)])
        sql = f"""
            INSERT INTO {TableName.DM_ROOMS.value} (user_id_low, user_id_high)
            VALUES (%s, %s)
            ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id)
        """
        self.update_one(sql=sql, datas=[low, high])

        # 取剛剛的 room_id
        sql_2 = f"SELECT * FROM {TableName.DM_ROOMS.value} WHERE user_id_low = %s AND user_id_high = %s"
        result = self.select_one(sql=sql_2, datas=[low, high])
        return result

    def find_recent_rooms_for_user(self, me_id: int, limit: int = 15):
        """
        回傳與自己相關的 DM 房間，依最近時間排序（有訊息用最後訊息時間，否則用房間建立時間）
        欄位：room_id, last_at, peer_id, peer_username
        """
        sql = f"""
        SELECT
            r.id AS room_id,
            COALESCE(MAX(c.send_datetime), r.create_datetime) AS last_at,
            u.id AS peer_id, u.username AS peer_username
        FROM {TableName.DM_ROOMS.value} AS r
        LEFT JOIN {TableName.CHAT_CONTENT.value} AS c ON c.room_id = r.id
        INNER JOIN {TableName.USERS.value} AS u ON u.id = IF(r.user_id_low = %s, r.user_id_high, r.user_id_low)
        WHERE r.user_id_low = %s OR r.user_id_high = %s
        GROUP BY r.id, u.id, u.username, r.create_datetime
        ORDER BY last_at DESC
        LIMIT %s
        """
        return self.select_all(sql=sql, datas=[me_id, me_id, me_id, int(limit)])