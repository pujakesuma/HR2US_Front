const initialState = {
    message: '',
    email: '',
    role: '',
    token: '',
    id: ''
}

const Login = (state= initialState, action) =>{
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                id: action.payload.data.data.id,
                email: action.payload.data.data.email,
                role: action.payload.data.data.role,
                message: action.payload.data.message,
                token: action.payload.data.token
            }
        default:
            return state
    }
}

export default Login