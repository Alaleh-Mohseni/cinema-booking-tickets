import axios from "axios"

export const httpClient = axios.create({
  baseURL: `https://alireza7222.pythonanywhere.com`,
})
