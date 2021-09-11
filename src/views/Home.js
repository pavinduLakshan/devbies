import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Container, Button } from '@material-ui/core';
import Freebie from "../components/Freebie"
import TagModal from "components/TagModal"
import NotSelected from "assets/not_selected.svg"
import { freebies } from "../data"

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
    '&:hover, &:active': {
      background: '#ff4081',
    }
  }
}));

const Home = () => {
  const classes = useStyles();
  const params = new URLSearchParams(window.location.search)
  const selectedTagParam = params.get("tag")
  const [isTagModalOpen, setTagModalOpen] = useState(false)
  const [tags, setTags] = useState([])
  const totalFreebies = getTotalFreebieCount()

  function getTotalFreebieCount() {
    let count = 0
    Object.keys(freebies).map(k => count += freebies[k].length)
    return Math.floor(count / 10) * 10;
  }

  useEffect(() => {
    setTags(Object.keys(freebies))
  }, [])

  const handleTagModalClose = (event,reason) => {
    if (reason !== "backdropClick"){
      setTagModalOpen(false);
    }
  };

  const handleClickOpen = () => {
    setTagModalOpen(true);
  };

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
          <div className={classes.innerTagContainer}>
            <Button className={classes.tagBtn}
            fullWidth
            onClick={handleClickOpen}>
              <strong>{selectedTagParam || "Select a category"}</strong>
            </Button>
            <TagModal
              tags={tags}
              selectedTagParam={selectedTagParam} open={isTagModalOpen} onClose={handleTagModalClose}
            />
          </div>
        </Grid>
      </div>

      <Container className={classes.cardGrid}>
        <Grid container spacing={4}>
          {freebies[selectedTagParam]?.length > 0 && freebies[selectedTagParam].map((freebie, index) => {
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