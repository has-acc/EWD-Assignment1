import { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useAuth } from "../contexts/AuthProvider";
import { supabase } from "../supabase";

const FavouriteMoviesPage = (props) => {
  const { user } = useAuth();
  const [movies, setFavourites] = useState([]);
  const [tvShows, setTVFavourites] = useState([]);

  useEffect(() => {
    getFavourites();
  }, []);

  async function getFavourites() {
    const { data } = await supabase.from(props.type).select().eq("user_id", user?.id);
    if (props.type === "movies") {
      setFavourites(data);
    } else if (props.type === "tvshows") {
      setTVFavourites(data);
    }
  }

  return (
    <>
      <PageTemplate movies={movies} props={props} tvShows={tvShows} />
    </>
  );
};

export default FavouriteMoviesPage;
