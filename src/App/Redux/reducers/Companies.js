const initialState = {
    card:[],
    base_url:'',
    isLoading: false,
    isError: false,
    next: '',
    page: '',
    previous: '',
    dataTotal:0,
    user: '',
    id:'',
    name:'',
    email:'',
    logo:'',
    location:'',
    description:''
}

const Companies = (state=initialState, action) => {
    switch(action.type){
        case "FETCH_COMPANIES_PENDING":
            return{
                ...state,
                isLoading:true,
                isError: false
            }
        case "FETCH_COMPANIES_FULFILLED":
            return{
                ...state,
                isLoading:false,
                isError: false,
                card: action.payload.data.response.data,
                next: action.payload.data.nextPage,
                previous: action.payload.data.prevPage,
                base_url: action.payload.config.url,
                page: action.payload.data.page,
                dataTotal: action.payload.data.totalData
            }
        case "FETCH_COMPANIES_REJECTED":
            return{
                ...state,
                isLoading:false,
                isError: true
            }
        case "GET_COMPANY_FULFILLED":
            return{
                ...state,
                isLoading: false,
                isError: false,
                user: action.payload.data.response[0].name
            }
        case "PROFILE_COMPANY_FULFILLED":
            return{
                ...state,
                isLoading: false,
                isError: false,
                id:action.payload.data.response[0].id,
                name:action.payload.data.response[0].name,
                email:action.payload.data.response[0].email,
                logo:action.payload.data.response[0].logo,
                location:action.payload.data.response[0].location,
                description:action.payload.data.response[0].description
            }
        default:
            return state
    }
}

export default Companies