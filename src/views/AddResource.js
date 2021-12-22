import React, {useState} from 'react';
import { makeStyles, Grid, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    paper: {
        display: "flex",
        flexDirection: "row",
        padding: theme.spacing(2)
    },
    button: {
        marginLeft: "1%"
    }
  }));

const AddResource = () => {
    const classes = useStyles();
    const [img,setImg] = useState("")
    const [name,setName] = useState("")
    const [desc,setDesc] = useState("")
    const [url,setUrl] = useState("")

    function fetchData(){
        fetch("http://localhost:8080/api/getUrlData?url="+url,{
            method: 'GET'
        }).then(res => res.json())
        .then(res => {
            console.log(res)
            setImg(res.img)
            setDesc(res.desc)
            setName(res.name)
        })
        .catch(err => console.error(err))
    }

    function copyGeneratedEntry(){
        let copyText = document.getElementById("generated").innerText;
        window.navigator.clipboard.writeText(copyText)
        alert("Copied to clipboard");  
    }

    function handleChange(e){
        setUrl(e.target.value)
    }

    return (
        <div>
<Grid container spacing={3}>
        <Grid item xs={12} md={2}></Grid>
        <Grid item xs={12} md={8}>
            <div className={classes.paper}>
                <TextField id="outlined-basic" onChange={handleChange} label="Enter URL" fullWidth variant="outlined" />
                <Button onClick={fetchData} variant="contained" color="primary" className={classes.button}>
                   Generate
                </Button>
            </div>
            <div style={{textAlign: "justify"}}>
                <Button 
                onClick={copyGeneratedEntry}
                style={{float: "right"}}>copy</Button>
                <pre id="generated">
                {",\n{\n"}
                <p>  "img": "{img}",</p>
                <p>  "name": "{name}",</p> 
                <p>  "desc": "{desc}",</p>   
                <p>  "url": "{url}"</p>   
                {"\n}"}
                </pre>
            </div>
        </Grid>
        <Grid item xs={12} md={2}></Grid>
        </Grid>
        </div>
    );
};

export default AddResource;