import React, { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Typography, Container, Chip} from '@material-ui/core';
import {ChevronLeft,ChevronRight} from "@material-ui/icons"
import Freebie from "../components/Freebie"
import NotSelected from "assets/not_selected.svg"
import {freebies} from "../data"

const useStyles = makeStyles((theme) => ({
    titleContainer: { 
      position: "sticky", 
      top: 0, 
      right: 0,
      zIndex: 10,
      backgroundColor: "#BC51F1",
      width: "100%" 
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
    tagItem: {
        padding: "1%",
        margin: "1%",
        textDecoration: "none",
        cursor: "pointer",
    },
    tag: {
        cursor: "pointer",
        "&:hover, &:active": window.matchMedia('(min-width: 768px)').matches ? {
          transform: "scale(1.3)"
        } : null
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
      paddingBottom: theme.spacing(8),
    },
    heading: {
      marginTop: "1%",
      fontFamily: "ZCOOL KuaiLe, cursive"
    },
    subHeading: {
      color: "white",
      marginLeft: "auto", 
      marginRight: "auto",
      marginTop: "1%",
      width: "50%"
    },
    innerTagContainer: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      width: "75%"
    }
}));

const Home = () => {
    const classes = useStyles();
    const params = new URLSearchParams(window.location.search)
    const selectedTagParam = params.get("tag")
    const [tags,setTags] = useState([])
    const [currentTagSetNo,setCurrentTagSetNo] = useState(1)
    const totalFreebies = getTotalFreebieCount()
    
    function getTotalFreebieCount(){
      let count = 0
      Object.keys(freebies).map(k => count += freebies[k].length)
      return Math.floor(count / 10) * 10;
    }

    useEffect(() => {
        setTags(Object.keys(freebies))
    },[])

    return (
        <Grid container spacing={3}>
        <div className={classes.titleContainer}>
          <Grid item xs={12} >
          <Typography className={classes.heading} variant="h4" component="h4">Devbies - Freebies for Developers</Typography>
          <Typography className={classes.subHeading} variant="h6" component="h4">
          A curated collection of {totalFreebies}+ free developer resources
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.tagContainer}>
          <ChevronLeft style={{
            color: currentTagSetNo === 1 ? "#5F5A5F" : "white",
            fontSize: 35,
            cursor: "pointer"}} onClick={() => {
            if(currentTagSetNo > 1){
              setCurrentTagSetNo(currentTagSetNo - 1)
            }
          }}/>
          <div className={classes.innerTagContainer}>
          {tags.length > 0 && 
          tags.slice((currentTagSetNo -1)*4, currentTagSetNo*4)
          .map(tag => <NavLink className={classes.tagItem} to={"/?tag=" + tag}>
            <Chip
              className={classes.tag}
              size="medium"
              color={selectedTagParam === tag ? "secondary" : "primary" }
              label={tag}
            />
          </NavLink>)}
          </div>
          <ChevronRight style={{
            color: currentTagSetNo < Math.ceil(tags.length / 4)? "white":"#5F5A5F",
            fontSize: 35,
            cursor: "pointer"}} onClick={() => {
            if(currentTagSetNo < Math.ceil(tags.length / 4) ){
              setCurrentTagSetNo(currentTagSetNo + 1)
            }
          }}/>
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
           {!selectedTagParam && <div className={classes.noTagSelected}>
               <img src={NotSelected} alt="no category selected" height="150" width="150" />
            <Typography variant="h6" component="h6">Select a category to view freebies</Typography>
             </div>}
          </Grid>
        </Container>
     
     </Grid>
    );
};

export default Home;