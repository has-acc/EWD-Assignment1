export const getMovies = () => {
    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
        .then(res => res.json())
        .then(json => json.results);
};

export const getMovie = id => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then(res => res.json());
};

export const getGenres = () => {
    return fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY +
        "&language=en-US"
    )
        .then(res => res.json())
        .then(json => json.genres);
};

export const getMovieImages = (id) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
        .then((res) => res.json())
        .then((json) => json.posters);
};

export const getTVShows = () => {
    return fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
        .then(res => res.json())
        .then(json => json.results);
};

export const getTVShow = (id) => {
    return fetch(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
        .then(res => res.json());
};

export const getTVShowImages = (id) => {
    return fetch(
        `https://api.themoviedb.org/3/tv/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
        .then((res) => res.json())
        .then((json) => json.posters);
};

export const getTVShowCredits = (id) => {
    return fetch(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
        .then((res) => res.json())
        .then(json => json.cast);

}

export const getMovieCredits = (id) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
        .then((res) => res.json())
        .then(json => json.cast);

}

export const getPerson = (id) => {
    return fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
        .then((res) => res.json());

}

export const getPersonImages = (id) => {
    return fetch(
        `https://api.themoviedb.org/3/person/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
        .then((res) => res.json())
        .then((json) => json.profiles);
};
