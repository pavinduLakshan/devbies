import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    }
  }));

const Freebie = ({imgPath,name,desc,url}) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4} spacing={3}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={imgPath}
                    title={name}
                />
                <CardContent className={classes.cardContent}>
                    <a href={url} rel="noreferrer" target="_blank">
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    </a>
                    <Typography style={{textAlign: "justify"}}>
                        {desc}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Freebie;