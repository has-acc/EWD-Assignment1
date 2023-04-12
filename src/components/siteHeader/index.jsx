import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from "../../contexts/AuthProvider";

const styles = {
    title: {
        flexGrow: 1,
    },
    appbar: {
        // background: 'none',
    },
    // offset: theme.mixins.toolbar,
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
    const { auth, signOut } = useAuth();

    const menuOptions = [
        { label: "Home", path: "/" },
        !auth && (
            { label: "Login", path: "/login/" }),
        { label: "Discover Movies", path: "/movies/" },
        { label: "Upcoming Movies", path: "/movies/upcoming" },
        { label: "Discover TV Shows", path: "/tvshows" },
        { label: "Popular TV", path: "/tvshows/popular" },
        { label: "Movie Favourites", path: "/movies/movieFavourites" },
        { label: "TV Favourites", path: "/tvshows/tvFavourites" },

        auth && (
            { label: "Signout", path: "/signout" }),
    ];

    const handleLogout = async (e) => {
        try {
            const { error } = await signOut();
            console.log(error);
        } catch (error) {
            console.log(error);
        }
    };

    const handleMenuSelect = (pageURL) => {
        if (pageURL === "/signout") {
            handleLogout();
        }
        navigate(pageURL);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <AppBar sx={styles.appbar} position="fixed" elevation={0} color="primary">
                <Toolbar>
                    <Typography variant="h4" sx={styles.title}>
                        TMDB Client
                    </Typography>
                    <Typography variant="h6" sx={styles.title}>
                        All you ever wanted to know about Movies!
                    </Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                size="large"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                {menuOptions.map((opt) => (
                                    opt.label === "Signout" ?
                                        <MenuItem
                                            key={opt.label}
                                            onClick={() => handleLogout()}
                                        >
                                            {opt.label}
                                        </MenuItem>
                                        :
                                        <MenuItem
                                            key={opt.label}
                                            onClick={() => handleMenuSelect(opt.path)}
                                        >
                                            {opt.label}
                                        </MenuItem>
                                ))}
                            </Menu>
                        </>
                    ) : (
                        <>
                            {menuOptions.map((opt) => (
                                opt.label === "Signout" ?
                                    <Button
                                        key={opt.label}
                                        color="inherit"
                                        onClick={() => handleLogout()}
                                    >
                                        {opt.label}
                                    </Button>
                                    :
                                    <Button
                                        key={opt.label}
                                        color="inherit"
                                        onClick={() => handleMenuSelect(opt.path)}
                                    >
                                        {opt.label}
                                    </Button>
                            ))}
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Offset />

            {/* <div className={classes.offset} /> */}
        </>
    );
};

export default SiteHeader;
