import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import Login from './pages/Login';
import Register from "./pages/Register";
import AuthProvider from "./contexts/AuthProvider";
import AuthRoute from "./components/authRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import PasswordReset from "./pages/PasswordReset";
import UpcomingMovies from "./pages/upcomingMovies";
import PopularTVShows from "./pages/popularTVShows"

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <SiteHeader />
                <Routes>
                    <Route element={<AuthRoute />}>
                        <Route path="/movies/movieFavourites" element={<FavouriteMoviesPage type="movies" />} />
                        <Route path="/tvshows/tvFavourites" element={<FavouriteMoviesPage type="tvshows" />} />
                    </Route>
                    <Route path="/movies/:id" element={<MoviePage type="movies" />} />
                    <Route path="/tvshows/:id" element={<MoviePage type="tvshows" />} />
                    <Route path="/movies/" element={<HomePage type="movies" />} />
                    <Route path="/movies/upcoming" element={<UpcomingMovies type="movies" />} />
                    <Route path="/tvshows/" element={<HomePage type="tvshows" />} />
                    <Route path="/tvshows/popular" element={<PopularTVShows type="tvshows" />} />
                    <Route path="/person/:id" element={<MoviePage type="actor" />} />
                    <Route path="/movies/reviews/:id" element={<MovieReviewPage type="movies" />} />
                    <Route path="/tvshows/reviews/:id" element={<MovieReviewPage type="tvshows" />} />
                    <Route path="/passwordreset" element={<PasswordReset />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<HomePage type="movies" />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
