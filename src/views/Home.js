import React, { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Typography, Container} from '@material-ui/core';
import Freebie from "../components/Freebie"
import {freebies} from "../data"

const useStyles = makeStyles((theme) => ({
    tagContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "center"
    },
    tagItem: {
        padding: "1%",
        margin: "1%",
        textDecoration: "none",
        cursor: "pointer",
        backgroundColor: "black",
        color: "white"
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8)
    }
}));

const Home = () => {
    const classes = useStyles();
    const params = new URLSearchParams(window.location.search)
    const selectedTagParam = params.get("tag")
    const [tags,setTags] = useState([])

    useEffect(() => {
        setTags(Object.keys(freebies))
    },[])

    return (
        <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" component="h2">Freebies for Developers</Typography>
        </Grid>
        <Grid item xs={12} className={classes.tagContainer}>
          {tags.length > 0 && tags.map(tag => <NavLink className={classes.tagItem} to={"/?tag="+tag}>
                {tag}  
              </NavLink>)}
        </Grid>

        <Container className={classes.cardGrid}>
          <Grid container spacing={4}>
          {freebies[selectedTagParam]?.length > 0 && freebies[selectedTagParam].map((freebie,index) => {
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
          </Grid>
        </Container>
      </Grid>
    );
};

export default Home;