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
    payload: axios.put(url, data, config)
})

export const getCompany = url => ({
    type: "GET_COMPANY",
    payload: axios.get(url)
})

export const deleteCompany = (url, config) => ({
    type: "DELETE_COMPANY",
    payload: axios.delete(url, config)
})

export const updateCompany = (url, data, config) => ({
    type: "UPDATE_COMPANY",
    payload: axios.put(url, data, config)
})
