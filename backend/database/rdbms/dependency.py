# 處理不同的資料表物件
def get_table(cls):
    def dependency():
        table = cls()
        try:
            yield table
        finally:
            table.close()
    return dependency