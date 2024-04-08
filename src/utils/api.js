import axios from "axios"

const BASE_URL = "https://api.themoviedb.org/3"
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZTg0ODFlZmE4OTlmNTUyNGI2MGU3YjcwZGU3Y2Q1YSIsInN1YiI6IjY2MGFhNzc2MTQ5NTY1MDE2M2I5YzU1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zgl8RfYTJBM9Khxyk6IJlO9CM6ro6Wauy1xz5o7P4Ko";

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};
export const fetchDataFromApi = async (url, params) => {
    try{
        const {data} = await axios.get(BASE_URL + url, {
            headers: headers,
            params: params
        })
        return data;
    }catch(e){
        console.log(e)
        return e
    }
}