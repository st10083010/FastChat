import json
from pathlib import Path
import pymysql
import pymysql.cursors


def read_env() -> str:
    path = Path("./backend/env.txt")
    content = path.read_text().strip()
    return content

def read_json_file() -> dict:
    path = Path("./backend/database/setting.json")
    content = path.read_text()
    result = json.loads(content)
    return result


class MySQL():
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

    def test(self):
        with self.conn.cursor() as c:
            sql = "show tables"
            c.execute(sql)
            result = c.fetchall()
            return result
