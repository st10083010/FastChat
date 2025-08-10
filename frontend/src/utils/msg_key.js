export const msgKey = (msg, idx) => {
    // 決定訊息的key
    if (msg && msg.id !== null && msg.id !== undefined) {
        // 優先使用資料庫 ID
        return String(msg.id);
    }

    if (msg && msg.client_id) {
        // 其次選擇前端生成的UUID(client_id)
        return `c-${msg.client_id}`;
    }

    // 若都沒有，利用sender_id、發送時間(當地時間或當前時間)、訊息內容來確保生成
    const parts = [
        "tmp",
        msg?.sender_id ?? "anon",
        msg?.send_datetime ?? msg?.local_ts ?? Date.now(),
        msg?.content ?? ""
    ];
    if (typeof idx === "number") parts.push(idx);
    return parts.join("-");
};
