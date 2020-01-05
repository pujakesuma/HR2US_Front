import axios from 'axios'

export const fetchCompanies = url => ({
    type: 'FETCH_COMPANIES',
    payload: axios.get(url)
})

export const getCompanies = url => ({
    type: 'GET_COMPANIES',
    payload: axios.get(url)
})

export const companyProfile = url => ({
    type: 'PROFILE_COMPANY',
    payload: axios.get(url)
})