import { Flex, Button } from "antd"
import { useNavigate } from "react-router"

const LoginOptions = () => {
    // 登入選項，未來可新增其他登入方式

    const navigate = useNavigate();

    return (
        <>
            <Flex gap="middle" vertical={true}>
                <Button type="primary" onClick={() => {navigate("/register")}}>Register</Button>
                {/* <Button>Login Option 1</Button>
                <Button>Login Option 2</Button> */}
            </Flex>
        </>
    )
}

export default LoginOptions;