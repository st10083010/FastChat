from backend.database.connection_mysql import ChatRDBMS

class Tbl_Rooms(ChatRDBMS):
    # Rooms table
    table_name = "rooms"