from backend.database.connection_mysql import ChatRDBMS
from backend.database.rdbms.enum_tables import TableName

class Tbl_ChatContent(ChatRDBMS):
    def find_chat_content_by_room_id(self, room_id: int, user_id: int) -> tuple:
        """使用 room id 搜尋對話訊息"""
        sql = f"""
            SELECT a.id, a.room_id, a.sender_id, a.content, a.send_datetime, a.is_delete, a.client_id
            , b.username
            FROM {TableName.CHAT_CONTENT.value} AS a
            INNER JOIN {TableName.USERS.value} AS b
            ON a.sender_id = b.id
            WHERE a.room_id = %s
            ORDER BY a.send_datetime ASC
        """

        result = self.select_all(sql=sql, datas=[room_id])
        return result
    
    def insert_chat_content(self, room_id: int, sender_id: int, content: str, client_id: str) -> None:
        """新增聊天室訊息"""
        sql = f"""
            INSERT INTO {TableName.CHAT_CONTENT.value} (room_id, sender_id, content, client_id)
            VALUES (%s, %s, %s, %s)
        """

        self.update_one(sql=sql, datas=[room_id, sender_id, content, client_id])