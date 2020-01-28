import axios from 'axios'

export const getEngineer = url => ({
    type: "GET_ENGINEER",
    payload: axios.get(url)
})

export const deleteEngineer = (url, config) => ({
    type: "DELETE_ENGINEER",
    payload: axios.delete(url, config)
})

export const updateEngineer = (url, data, config) => ({
    type: "UPDATE_ENGINEER",
    payload: axios.patch(url, data, config)
})

