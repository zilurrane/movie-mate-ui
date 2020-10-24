import { API_URL } from "./constants";
import { callAuthApi } from "./fetch-helper";

export const getMovieList = (page, limit, sortKey, sortOrder, query) => callAuthApi(`${API_URL}movies?page=${page}&limit=${limit}&sort-key=${sortKey}&sort-order=${sortOrder}&query=${query}`).then(res => res.json())
