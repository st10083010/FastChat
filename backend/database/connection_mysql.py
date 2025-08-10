import json
from pathlib import Path
import pymysql
import pymysql.cursors
from typing import Any


def read_env() -> str:
    path = Path("./backend/env.txt")
    content = path.read_text().strip()
    return content

def read_json_file() -> dict:
    path = Path("./backend/database/setting.json")
    content = path.read_text()
    result = json.loads(content)
    return result

class ChatRDBMS():
    def __init__(self):
        env = read_env()
        json_file = read_json_file()
        db_info = json_file[env]

        self.conn = pymysql.connect(
            host=db_info['host'],
            user=db_info['user'],
            passwd=db_info['password'],
            port=db_info['port'],
            db=db_info['dbname'],
            cursorclass=pymysql.cursors.DictCursor
        )

    def get_connect(self):
        if self.conn:
            return self.conn
        else:
            print("Connect Error")

    def close(self):
        if self.conn:
            self.conn.close()
        
    def create_new_one(self, sql: str, datas: list[str]):
        with self.conn.cursor() as c:
            c.execute(sql, tuple(datas))
            self.conn.commit()

    def select_one(self, sql: str, datas: list[str | int]):
        result = None
        with self.conn.cursor() as c:
            c.execute(sql, tuple(datas))
            result = c.fetchone()
            self.conn.commit()

        return result
    
    def update_one(self, sql: str, datas: list[str | int]):
        with self.conn.cursor() as c:
            c.execute(sql, tuple(datas))
            self.conn.commit()

    def select_all(self, sql: str, datas: list[Any] | list):
        result = None
        with self.conn.cursor() as c:
            c.execute(sql, tuple(datas))
            result = c.fetchall()

        return result