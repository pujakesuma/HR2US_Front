import axios from 'axios'

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
    payload: axios.patch(url, data, config)
})