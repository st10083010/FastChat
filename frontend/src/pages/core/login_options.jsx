import { Flex, Button } from "antd"
import { useNavigate } from "react-router"

const LoginOptions = () => {

    const navigate = useNavigate();

    return (
        <>
            <Flex gap="middle" vertical={true}>
                <Button type="primary" onClick={() => {navigate("/register")}}>Register</Button>
                <Button>Login Option 1</Button>
                <Button>Login Option 2</Button>
            </Flex>
        </>
    )
}

export default LoginOptions;