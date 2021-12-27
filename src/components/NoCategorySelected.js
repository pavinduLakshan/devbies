import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TagModal from "components/TagModal"

const useStyles = makeStyles({
    root: {
        width: "100%",
        minHeight: "85vh",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center"
    },
    text: {
        textAlign: "center",
        fontFamily: "'Abel', sans-serif"
    },
    grow: {
        flexGrow: 1
    },
    desc: {
        marginBottom: "3%"
    }
});

const NoCategorySelected = (props) => {
    const classes = useStyles();

    function getTotalFreebieCountLowerBound() {
        let count = 0
        Object.keys(props.freebies).map(k => count += props.freebies[k].length)
        return Math.floor(count / 10) * 10;
      }

    return (
        <div className={classes.root}>
            <Typography variant="h1" style={{ paddingLeft: "2%",fontFamily: "'Abel', sans-serif"}}>
            Devbies
          </Typography>
          <Typography variant="h2" style={{ paddingLeft: "2%",fontFamily: "'Abel', sans-serif"}}>
          Freebies for Developers
          </Typography>
          <Typography variant="h4" className={`${classes.desc} ${classes.text}`}>
          A collection of {props.freebies && getTotalFreebieCountLowerBound()}+ free resources for developers in different categories
          </Typography>
            
          <TagModal /> 
          <div className={classes.grow}></div>
          <Typography variant="p" className={classes.text}>
          Designed, developed and maintained by <a href="https://github.com/pavinduLakshan">Pavindu Lakshan</a>
          </Typography>
          
        </div>
    );
};

export default NoCategorySelected;