import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom"
import { Grid, Typography, Container } from '@material-ui/core';
import Freebie from "../components/Freebie"
import TagModal from "components/TagModal"
import {useParams} from "react-router-dom"
import Logo from "assets/logo.svg"
import { freebies } from "../data"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {Helmet} from "react-helmet";
import NoCategorySelected from 'components/NoCategorySelected';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "red"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    height: "inherit",
    alignItems: "center",
    textDecoration: "none"
  },
  tagContainer: {
    display: "flex",
    width: "100%",
    height: "10vh",
    alignItems: "center",
    marginTop: "1%",
    marginBottom: "1%",
    flexDirection: "row",
    justifyContent: "center"
  },
  noTagSelected: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    color: "gray",
    justifyContent: "center",
    height: "55vh"
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
  },
  gridWithoutItems: {
    minHeight: "87vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  heading: {
    marginTop: "1%",
    textAlign: "center",
    fontFamily: "ZCOOL KuaiLe, cursive"
  },
  subHeading: {
    color: "white",
    marginLeft: "auto",
    textAlign: "center",
    marginRight: "auto",
    marginTop: "1%",
    width:  window.matchMedia('(min-width: 350px)').matches ? "80%" : "50%"
  },
  innerTagContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    width: "50%"
  },
  tagBtn: {
    backgroundColor: "#F50057",
    color: "white",
    zIndex: 2,
    width: "40%",
    marginRight: "2%",
    '&:hover, &:active': {
      background: '#ff4081',
    }
  }
}));

const Home = () => {
  const classes = useStyles();
  let { category } = useParams();
  let selectedCategory = category?.replace(/-/g," ")

  return (
    <Grid container spacing={3}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
      name="description"
      content={"Devbies | Free " + selectedCategory+" for developers"}
    />
        <meta property="og:title" content="Devbies - Freebies for Developers" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://devbies.ml" />
    <meta property="og:image" content="https://i.imgur.com/Hy4wCNU.png" />
    <meta property="og:description" content={"Free " + selectedCategory+" for developers"} />
        <title>Devbies | Freebies for Developers</title>
        <link rel="canonical" href="http://devbies.ml" />
      </Helmet>
      {/* Appbar */}
      <AppBar position="sticky" style={{    backgroundColor: "#F16751"}}>
        <Toolbar style={{ display: "flex", alignItems: "center", minHeight: "10vh" }}>
          <Link to="/" className={classes.title}>
          <img src={Logo} alt="Devbies logo" height="50" width="50" />
          <Typography variant="h4" style={{ paddingLeft: "2%",fontFamily: "'Imperial Script', cursive"}}>
            Devbies
          </Typography>
          </Link>
          {selectedCategory && <TagModal
            selectedTagParam={selectedCategory}
          />}
        </Toolbar>
      </AppBar>
      <Container className={selectedCategory ? classes.cardGrid : classes.gridWithoutItems}>
        <Grid container spacing={4}>
          {freebies[selectedCategory]?.length > 0 && freebies[selectedCategory].map((freebie, index) => {
            return (
              <Freebie
                key={index}
                imgPath={freebie.img}
                name={freebie.name}
                desc={freebie.desc}
                url={freebie.url}
              />
            )
          })}
          {!selectedCategory && <NoCategorySelected freebies={freebies}/>}
        </Grid>
      </Container>
    </Grid>
  );
};

export default Home;