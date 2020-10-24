import { API_URL } from "./constants";
import { callAuthApi } from "./fetch-helper";

export const getMovieList = (page, limit, sortKey, sortOrder) => callAuthApi(`${API_URL}movies?page=${page}&limit=${limit}&sort-key=${sortKey}&sort-order=${sortOrder}`).then(res => res.json())
