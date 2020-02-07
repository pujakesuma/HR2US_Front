const initialState = {
  card: [],
  base_url: "",
  isLoading: false,
  isError: false,
  next: "",
  page: "",
  previous: "",
  dataTotal: 0,
  user: "",
  id: "",
  name: "",
  photo: "",
  description: "",
  skill: "",
  location: "",
  dateOfBirth: "",
  expectedSalary: "",
  email: "",
  showcase: ""
};

const Engineers = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ENGINEERS_PENDING":
      return {
        ...state, //collect all previous state.
        isError: false,
        isLoading: true
      };
    case "FETCH_ENGINEERS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        card: action.payload.data.response.data,
        next: action.payload.data.nextPage,
        previous: action.payload.data.prevPage,
        base_url: action.payload.config.url,
        page: action.payload.data.page,
        dataTotal: action.payload.data.totalData
      };
    case "FETCH_ENGINEERS_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case "GET_ENGINEER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: action.payload.data.response[0].name
      };
    case "PROFILE_ENGINEER_FULFILLED":
      let date = new Date(action.payload.data.response[0].date_of_birth);
      let dob =
        date.getUTCMonth() + 1 > 9
          ? date.getUTCFullYear() +
            "-" +
            (date.getUTCMonth() + 1) +
            "-" +
            date.getUTCDate()
          : date.getUTCFullYear() +
            "-0" +
            (date.getUTCMonth() + 1) +
            "-0" +
            date.getUTCDate();
      return {
        ...state,
        id: action.payload.data.response[0].id,
        name: action.payload.data.response[0].name,
        photo: action.payload.data.response[0].photo,
        description: action.payload.data.response[0].description,
        skill: action.payload.data.response[0].skill,
        location: action.payload.data.response[0].location,
        dateOfBirth: dob,
        expectedSalary: action.payload.data.response[0].expected_salary,
        email: action.payload.data.response[0].email,
        showcase: action.payload.data.response[0].showcase
      };
    default:
      return state;
  }
};

export default Engineers;
