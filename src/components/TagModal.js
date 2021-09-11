import React from 'react';
import { useHistory } from "react-router-dom"
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from "@material-ui/icons/Close"
import { blue } from '@material-ui/core/colors';

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
});

export default function TagModal(props) {
  const classes = useStyles();
  const history = useHistory()
  const { onClose, selectedTagParam, open, tags } = props;

  const handleClose = () => {
    onClose(selectedTagParam);
  };

  return (
    <Dialog
      maxWidth="sm" onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        <div style={{ height: "5vh", alignItems: "center", display: "flex", flexDirection: "row" }}>
          <h4>Select a category</h4>
          <div style={{ flexGrow: 1 }}></div>
          <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
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
                history.push("/?tag=" + tag);
                handleClose()
              }}
              color={selectedTagParam === tag ? "secondary" : "primary"}
              label={tag}
            />)}
      </List>
    </Dialog>
  );
}