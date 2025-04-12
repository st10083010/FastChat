from backend.database.connection_mysql import ChatRDBMS

class Tbl_ChatContent(ChatRDBMS):
    # chat content table
    table_name = "chat_content"

    def find_chat_content_by_room_id(self, room_id: int) -> list:
        # 使用 room id 搜尋對話訊息
        sql = " SELECT id, room_id, sender_id, content, send_datetime, is_delete "
        sql += f" FROM {self.table_name} "
        sql += " WHERE room_id = %s "
        sql += " ORDER BY send_datetime ASC "

        result = self.select_all(sql=sql, datas=[room_id])
        return result
    
    def insert_chat_content(self, room_id: int, sender_id: int, content: str) -> None:
        # 新增聊天室訊息
        sql = f"""
            INSERT INTO {self.table_name} (room_id, sender_id, content)
            VALUES (%s, %s, %s)
        """

        self.update_one(sql=sql, datas=[room_id, sender_id, content])