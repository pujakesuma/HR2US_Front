const iniatialState = {
  id: '',
  name: '',
  logo: null,
  description: '',
  location: '',
  email: '',
  isDeleted: false,
  isLoading: false,
  isError: false
}
const CompanyProfile = (state=iniatialState, action) => {
  switch(action.type){
      case "GET_COMPANY_PENDING":
          case "DELETE_COMPANY_PENDING":
              case "UPDATE_COMPANY_PENDING":
                  return{
                      ...state,
                      isLoading: true,
                      isError: false
                  }
      case "GET_COMPANY_FULFILLED":
          return{
              ...state,
              id: action.payload.data.response[0].id,
              name: action.payload.data.response[0].name,
              logo: action.payload.data.response[0].logo,
              description: action.payload.data.response[0].description,
              location: action.payload.data.response[0].location,
              email: action.payload.data.response[0].email,
              isError: false,
              isLoading: false
          }
      case "GET_COMPANY_REJECTED":
          return{
              ...state,
              isLoading: false,
              isError: true
          }
      case "DELETE_COMPANY_FULFILLED":
          return{
              ...state,
              isDeleted: true,
              isLoading: false,
              isError: false
          }
      case "DELETE_COMPANY_REJECTED":
          return{
              ...state,
              isDeleted: false,
              isLoading: false,
              isError: true
          }
      case "UPDATE_COMPANY_FULFILLED":
          return{
              ...state,
              isError: false,
              isLoading: false,
              message: 'Update Success!'
          }
      case "UPDATE_COMPANY_REJECTED":
          return{
              ...state,
              isError: true,
              isLoading: false,
              message: 'Update Failed!'
          }
      default:
          return state
  }
}

export default CompanyProfile