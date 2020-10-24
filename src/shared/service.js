import { API_URL } from "./constants";
import { callAuthApi } from "./fetch-helper";

export const getMovieList = (page, limit) => callAuthApi(`${API_URL}movies?page=${page}&limit=${limit}`).then(res => res.json())
