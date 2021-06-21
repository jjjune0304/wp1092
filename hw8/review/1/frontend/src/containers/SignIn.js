import '../App.css';
import React, { useCallback } from 'react';
import { Imput, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import {
    CREATE_USER_MUTATION
} from '../graphql';

const SignIn = ({ me, setMe, setSignedIn, displayStatus }) => {
    const [addUser] = useMutation(CREATE_USER_MUTATION);
    const handleSignIn = useCallback(
        () => {
            addUser({
                variables: {
                  name: me,
                },
            });
            setSignedIn(true)
        },
        [addUser],
    );

    return(
        <>
            <div className="App-title"><h1> My Chat Room</h1></div>
            <Input.Search
                prefix = {<UserOutlined/>}
                value = {me}
                enterButton = "Sign In"
                onChange = {(e) => setMe(e.target.value)}
                placeholder = "Enter yout name"
                size = "large"
                style = { {width : 300, margin : 50} }
                onSearch = {(name) => { 
                    if (!name){
                        displayStatus({
                            type: "error",
                            msg: "Missing your name"
                        })
                    }
                    else{
                        addUser({variables: {name: name}})
                        setSignedIn(true)
                    }  }}
            >
            </Input.Search>
        </>

    )
}

export default SignIn ;