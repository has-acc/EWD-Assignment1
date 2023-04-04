import React from "react";
import TVShow from "../tvShowCard";
import Grid from "@mui/material/Grid";

const TVShowList = (props) => {

    let tvShowCards = props.tvShows.map((tv) => (
        <Grid key={tv.id} item xs={12} sm={6} md={4} lg={3} xl={2} >
            <TVShow key={tv.id} tvShow={tv} selectTVFavourite={props.selectTVFavourite} />
        </Grid >
    ));
    return tvShowCards;
};

export default TVShowList;
