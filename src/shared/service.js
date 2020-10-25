import { API_URL } from './constants';
import { callAuthApi, callUnAuthApi } from './fetch-helper';

export const getMovieList = (page, limit, sortKey, sortOrder, query, genreList) => callUnAuthApi(`${API_URL}api/movies?page=${page}&limit=${limit}&sort-key=${sortKey}&sort-order=${sortOrder}&query=${query}&genre=${genreList}`).then(res => res.json());

export const deleteMovie = id => callAuthApi(`${API_URL}api/movies/${id}`, {
    method: 'DELETE'
});

export const addMovie = data => callAuthApi(`${API_URL}api/movies`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});

export const editMovie = (id, data) => callAuthApi(`${API_URL}api/movies/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
});

export const getGenreList = () => callUnAuthApi(`${API_URL}api/genres`).then(res => res.json());

export const login = data => callUnAuthApi(`${API_URL}api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
}).then(res => res.json());
