import React, {useState,useEffect} from 'react';
import { useHistory } from "react-router-dom"
import { Chip, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from "@material-ui/icons/Close"
import { blue } from '@material-ui/core/colors';
import { freebies } from "../data"

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  tag: {
    cursor: "pointer",
    margin: "1%",
    "&:hover, &:active": window.matchMedia('(min-width: 768px)').matches ? {
      transform: "scale(1.2)"
    } : null
  },
  tagItem: {
    padding: "1%",
    textDecoration: "none",
    cursor: "pointer",
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


});

export default function TagModal(props) {
  const classes = useStyles();
  const history = useHistory()
  const [isTagModalOpen, setTagModalOpen] = useState(false)
  const { selectedTagParam } = props;
  const [tags, setTags] = useState([])

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
    <>
              <Button className={classes.tagBtn}
            onClick={handleClickOpen} fullWidth>
            <strong>{selectedTagParam || "Select a category"}</strong>
          </Button>
          <Dialog
      maxWidth="sm" onClose={handleTagModalClose} aria-labelledby="simple-dialog-title" open={isTagModalOpen}>
      <DialogTitle id="simple-dialog-title">
        <div style={{ height: "5vh", alignItems: "center", display: "flex", flexDirection: "row" }}>
          <h4>Select a category</h4>
          <div style={{ flexGrow: 1 }}></div>
          <CloseIcon style={{ cursor: "pointer" }} onClick={handleTagModalClose} />
        </div>
      </DialogTitle>
      <List style={{ margin: "2%" }}>
        {tags.length > 0 &&
          tags.map(tag =>
            <Chip
              key={tag}
              className={classes.tag}
              size="medium"
              onClick={() => {
                history.push("/categories/" + tag.replace(" ","-"));
                handleTagModalClose()
              }}
              color={selectedTagParam === tag ? "secondary" : "primary"}
              label={tag}
            />)}
      </List>
    </Dialog>
    </>
  );
}