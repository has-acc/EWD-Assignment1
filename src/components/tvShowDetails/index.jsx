import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";

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
};

const TVShowDetails = (props) => {
    const tvshow = props.tvShow

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {tvshow.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {tvshow.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${tvshow.episode_run_time} min.`} />
                <Chip
                    icon={<StarRate />}
                    label={`${tvshow.vote_average} out of ${tvshow.vote_count} votes`}
                />
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip label={`First Aired: ${tvshow.first_air_date}`} />
                <Chip label={`Last Aired: ${tvshow.last_air_date}`} />
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Country of Origin" sx={styles.chipLabel} color="primary" />
                </li>
                {tvshow.origin_country.map((g) => (
                    <li key={g}>
                        <Chip label={g} />
                    </li>
                ))}
                <li>
                    <Chip label="Production Countries" sx={styles.chipLabel} color="primary" />
                </li>
                {tvshow.production_countries.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>
        </>
    );
};
export default TVShowDetails;
