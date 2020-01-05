import axios from 'axios'

export const fetchEngineers = url => ({
    type: "FETCH_ENGINEERS",
    payload: axios.get(url)
})

export const getEngineers = url => ({
    type: "GET_ENGINEER",
    payload: axios.get(url)
})

export const engineerProfile = url => ({
    type: "PROFILE_ENGINEER",
    payload: axios.get(url)
})