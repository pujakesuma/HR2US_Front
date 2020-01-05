import axios from 'axios'

export const Login = url => ({
    type: "LOGIN",
    payload: axios.post(url)
})