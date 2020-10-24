import { API_URL } from "./constants";
import { callAuthApi } from "./fetch-helper";

export const getMovieList = (page, limit, sortKey, sortOrder, query, genreList) => callAuthApi(`${API_URL}api/movies?page=${page}&limit=${limit}&sort-key=${sortKey}&sort-order=${sortOrder}&query=${query}&genre=${genreList}`).then(res => res.json())
