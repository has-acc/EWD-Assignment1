import React, { useState, useEffect } from "react";
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
    card: {
        maxWidth: 300,
        alignItems: "center"},

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

const PersonDetails = (props) => {
  const person = props.person
    return (
        <>
            <Typography variant="h5" component="h3">
                Biography
            </Typography>
            <br></br>
            <Typography variant="h6" component="span">
                {person.biography}
            </Typography>
        </>
    );
};
export default PersonDetails;
