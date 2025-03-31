from backend.database.connection_mysql import ChatRDBMS

class Tbl_Users(ChatRDBMS):
    # users 資料表
    table_name = "users"

    def create_new_user(self, user_info: list[str]) -> None:
        # 建立新使用者
        sql = f" Insert into {self.table_name}(username, password, email) Values(%s, %s, %s) "
        self.create_new_one(sql=sql, datas=user_info)

    def find_an_user_by_email(self, email: str):
        # 透過 email 尋找使用者
        sql = " Select id, username, password, email "
        sql += f" From {self.table_name} "
        sql += f" Where email = %s "

        result = self.select_one(sql=sql, datas=[email])
        return result
    
    def update_user_password_hash_value(self, new_hashed_pw: str, user_id: int):
        # 更新使用者的密碼 hash 值
        sql = f" Update {self.table_name} "
        sql += " Set password = %s "
        sql += " Where id = %s "

        self.update_one(sql=sql, datas=[new_hashed_pw, user_id])

    def find_an_user_by_id(self, user_id: int):
        # 透過 id 尋找使用者
        int_user_id = int(user_id)
        sql = " Select id, username, email "
        sql += f" From {self.table_name} "
        sql += f" Where id = %s "

        result = self.select_one(sql=sql, datas=[int_user_id])
        return result