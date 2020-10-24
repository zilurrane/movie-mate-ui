export const API_URL = 'https://movie-mate-api.herokuapp.com/';

export const SORT_OPTIONS = [
    {
        value: 'popularity99-desc',
        label: 'Popularity - High to Low'
    }, {
        value: 'popularity99-asc',
        label: 'Popularity - Low to High'
    }, {
        value: 'director-asc',
        label: 'Director Name - A to Z'
    }, {
        value: 'director-desc',
        label: 'Director Name - Z to A'
    }, {
        value: 'name-asc',
        label: 'Movie Name - A to Z'
    }, {
        value: 'name-desc',
        label: 'Movie Name - Z to A'
    }, {
        value: 'imdb_score-desc',
        label: 'IMDB Rating - High to Low'
    }, {
        value: 'imdb_score-asc',
        label: 'IMDB Rating - Low to High'
    }
]

export const DEFAULT_SORT = 'popularity99-desc';

export const DEFAULT_PAGE_NUMBER = 1;

export const DEFAULT_PAGE_SIZE = 12;
