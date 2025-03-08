import { Flex, Button } from "antd"
import { Link } from "react-router"

const LoginOptions = () => {


    return (
        <>
            <Flex gap="middle" vertical={true}>
                <Button type="primary" href="/register">Register</Button>
                <Button>Login Option 1</Button>
                <Button>Login Option 2</Button>
            </Flex>
        </>
    )
}

export default LoginOptions;