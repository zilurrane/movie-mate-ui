import { API_URL } from "./constants";
import { callUnAuthApi } from "./fetch-helper";

export const getMovieList = (page, limit, sortKey, sortOrder, query, genreList) => callUnAuthApi(`${API_URL}api/movies?page=${page}&limit=${limit}&sort-key=${sortKey}&sort-order=${sortOrder}&query=${query}&genre=${genreList}`).then(res => res.json())

export const getGenreList = () => callUnAuthApi(`${API_URL}api/genres`).then(res => res.json())
