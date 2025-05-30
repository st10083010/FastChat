import { Flex, Divider } from "antd";
import Login from "./login";
import LoginOptions from "./login_options";

const Home = () => {
    return (
        <Flex justify="center" gap="large" align="center" style={{ height: '100vh' }}>
            <Login/>
            <Divider type="vertical" style={{ height: 200 }}/>
            <LoginOptions/>
        </Flex>
    )
}

export default Home;