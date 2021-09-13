import React, {useRef} from 'react'
import {Button, Input} from "./Login.style";
import {useAuthenticationValue} from "./AuthenticationStore";
import {login} from "../../API";

const Login = () => {
    const inputRef = useRef(null)
    const {setUserData} = useAuthenticationValue()


    const handleSubmit = async () => {
        const username = inputRef.current.value
        if(username && username !== '') {
            const data = await login(username)
            data && setUserData(data)
        }
    }

    return(
        <div>
            <Input ref={inputRef} type="text" id="login" placeholder="USERNAME"/>
            <Button onClick={handleSubmit}>SUBMIT</Button>
        </div>
    )
}

export default Login