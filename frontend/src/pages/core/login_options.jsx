import { Flex, Button } from "antd"

const LoginOptions = () => {
    return (
        <>
            <Flex gap="middle" vertical={true}>
                <Button type="primary">Register</Button>
                <Button>Login Option 1</Button>
                <Button>Login Option 2</Button>
            </Flex>
        </>
    )
}

export default LoginOptions;