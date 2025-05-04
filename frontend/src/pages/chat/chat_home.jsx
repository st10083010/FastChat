import { Input, Flex } from "antd";

const { Search } = Input;
const style = {
    width: '400px'
}

const ChatHome = () => {
    const onSearch = (value) => {
        console.log(value);
    }

    return (
        <Flex justify={'center'} align={'center'} style={{ height: '100vh' }}>
            <Search style={style} placeholder="Find a user" onSearch={onSearch} enterButton={true} />
        </Flex>
    )
}

export default ChatHome;