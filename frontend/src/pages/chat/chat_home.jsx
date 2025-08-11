import { useState } from 'react'
import { Input, Flex, Space, Card, App as AntdApp, Button } from "antd";
import { useApiFetch } from '../../hooks/useApiFetch';
import { baseUrl } from '../../configs/config';
import { useDispatch } from 'react-redux';
import { switchRoom, switchView, fetchRecentDMs } from '../../store/chat_slice';

const { Search } = Input;
const style = {
    width: '400px'
}

const ChatHome = () => {
    // 聊天室首頁
    const { apiFetch } = useApiFetch();
    const dispatch = useDispatch();
    const { message } = AntdApp.useApp();

    const [userResult, setUserResult] = useState([]);

    const onSearch = async (value) => {
        // console.log(value);
        if (value.trim().length === 0 || !value ) {
            // console.log(`cur value: ${value}`);
            return;
        }

        setUserResult([]); // 清空前一個，確保不影響當查無資料時，畫面還是顯示上一個查詢結果

        let url = new URL(`${baseUrl}info/find`);
        let params = new URLSearchParams({username: value.trim()})
        url.search = params;

        try {
            const res = await apiFetch(url.href, {
                method: "GET"
            });

            if (res.ok) {
                const result = await res.json();
                // console.log(result);
                if (Array.isArray(result) && result.length > 0) {
                    setUserResult(result);
                } else {
                    message.info("查無資料");
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            // 
        }

    }

    const onDM = async (user) => {
        // 按下私訊時觸發
        try {
            const res = await apiFetch(`${baseUrl}chat/dm/open?target_id=${user.id}`, { method: 'POST' });
            if (!res.ok) {
                message.error('開啟私訊失敗');
                return;
            }
            const { room_id } = await res.json();

            // 切到聊天室
            dispatch(switchRoom(room_id));
            dispatch(switchView('chat'));

            // 刷新側邊欄
            dispatch(fetchRecentDMs());

            message.success(`已開啟與「${user.username}」的私訊`);
        } catch (e) {
            message.error('開啟私訊失敗（例外）');
            console.log(e);
        }
    }

    return (
        <Flex vertical={true} gap={"large"}>
            <Flex justify={'center'} align={'start'}>
                <Search style={style} placeholder="Find a user" onSearch={onSearch} enterButton={true} />
            </Flex>
            <Space>
                {userResult.map((item, idx) => (
                    <Card key={idx} title={item.username}>
                        <p>E-mail: {item.email}</p>
                        <Space>
                            <Button onClick={() => onDM(item)}>私訊</Button>
                        </Space>
                    </Card>
                ))}
            </Space>
        </Flex>

    )
}

export default ChatHome;