import React, { useState, useEffect } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { getTVShowCredits } from "../../api/tmdb-api";
import Slider from "react-slick";
import Card from "@mui/material/Card";

const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chipLabel: {
        margin: 0.5,
    },
    card: { maxWidth: 300 },
};

var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

const TVShowDetails = (props) => {
    const tvShow = props.tvShow
    const [tvShowCredits, setTVShowCredits] = useState([]);

     useEffect(() => {
         getTVShowCredits(tvShow.id).then(tvShowCredits => {
             tvShowCredits.map(tvShowCredit => {
                 if (tvShowCredit.profile_path === null) {
                    tvShowCredit.profile_path="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
                 } else {
                    tvShowCredit.profile_path='https://www.themoviedb.org/t/p/w300_and_h300_face/' + tvShowCredit.profile_path
                 }
             })
           
            setTVShowCredits(tvShowCredits);
        });
     }, []);

    return (
        <>
            
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="span">
                {tvShow.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {tvShow.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${tvShow.episode_run_time} min.`} />
                <Chip
                    icon={<StarRate />}
                    label={`${tvShow.vote_average} out of ${tvShow.vote_count} votes`}
                />
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip label={`First Aired: ${tvShow.first_air_date}`} />
                <Chip label={`Last Aired: ${tvShow.last_air_date}`} />
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Country of Origin" sx={styles.chipLabel} color="primary" />
                </li>
                {tvShow.origin_country.map((g) => (
                    <li key={g}>
                        <Chip label={g} />
                    </li>
                ))}
                <li>
                    <Chip label="Production Countries" sx={styles.chipLabel} color="primary" />
                </li>
                {tvShow.production_countries.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Typography variant="h5" component="h3">
                Cast
            </Typography>

            <Typography variant="h6" component="span">
                <Slider {...settings}>
                    {tvShowCredits.map(tvShowCredit => (
                        <a href={"/person/"+tvShowCredit.id}>
                        <Card sx={styles.card}>
                            <div>
                                <><img src={tvShowCredit.profile_path} /><br></br></>
                                Name: {tvShowCredit.name}<br></br>
                                Character:{tvShowCredit.character}
                            </div>
                        </Card>
                        </a>
                    ))}
                </Slider>
            </Typography>
        </>
    );
};
export default TVShowDetails;
