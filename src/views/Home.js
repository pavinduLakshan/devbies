import React, { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Typography, Container, Chip, Box} from '@material-ui/core';
import Freebie from "../components/Freebie"
import {freebies} from "../data"

const useStyles = makeStyles((theme) => ({
    titleContainer: { 
      position: "sticky", 
      top: 0, 
      right: 0,
      zIndex: 10,
      backgroundColor: "#F26BEE",
      width: "100%" 
    },
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
    },
    tag: {
        cursor: "pointer",
        "&:hover": {
          transform: "scale(1.4)"
        }
    },
    cardGrid: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(8),
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
        <div className={classes.titleContainer}>
          <Grid item xs={12} >
          <Typography style={{marginTop: "1%",fontFamily: "ZCOOL KuaiLe, cursive"}} variant="h4" component="h4">Freebies for Developers</Typography>
          <Typography style={{marginLeft: "auto", marginRight: "auto",marginTop: "1%",width: "50%"}} variant="h6" component="h4">
          A curated collection of 1000+ free developer resources
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.tagContainer}>
          {tags.length > 0 && tags.map(tag => <NavLink className={classes.tagItem} to={"/?tag=" + tag}>
            <Chip
              className={classes.tag}
              size="medium"
              color={selectedTagParam === tag ? "secondary" : "primary" }
              label={tag}
            />
          </NavLink>)}
        </Grid>
          </div>

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