from backend.database.connection_mysql import ChatRDBMS
from typing import Any
from backend.database.rdbms.enum_tables import TableName

class Tbl_Users(ChatRDBMS):
    def create_new_user(self, user_info: list[str]) -> None:
        # 建立新使用者
        sql = f" Insert into {TableName.USERS.value}(username, password, email) Values(%s, %s, %s) "
        self.create_new_one(sql=sql, datas=user_info)

    def find_an_user_by_email(self, email: str):
        # 透過 email 尋找使用者
        sql = " Select id, username, password, email "
        sql += f" From {TableName.USERS.value} "
        sql += f" Where email = %s "

        result = self.select_one(sql=sql, datas=[email])
        return result
    
    def update_user_password_hash_value(self, new_hashed_pw: str, user_id: int):
        # 更新使用者的密碼 hash 值
        sql = f" Update {TableName.USERS.value} "
        sql += " Set password = %s "
        sql += " Where id = %s "

        self.update_one(sql=sql, datas=[new_hashed_pw, user_id])

    def find_an_user_by_id(self, user_id: int):
        # 透過 id 尋找使用者
        int_user_id = int(user_id)
        sql = " Select id, username, email "
        sql += f" From {TableName.USERS.value} "
        sql += f" Where id = %s "

        result = self.select_one(sql=sql, datas=[int_user_id])
        return result
    
    def find_a_user_by_username(self, username: str, limit: int = 15, exclude_id: int | None = None):
        # 透過 username 模糊搜尋使用者，並限制回傳筆數與排除特定使用者
        keyword = f"%{username}%"
        sql = f"""
            SELECT id, username, email
            FROM {TableName.USERS.value}
            WHERE username LIKE %s
        """

        datas: list[Any] = [keyword]
        if exclude_id is not None:
            sql += " AND id != %s "
            datas.append(int(exclude_id))

        sql += " ORDER BY username ASC LIMIT %s "
        datas.append(int(limit))

        result = self.select_all(sql=sql, datas=datas)
        return result