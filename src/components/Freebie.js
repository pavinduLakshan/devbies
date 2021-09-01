import React from 'react';

const Freebie = ({imgPath,name,desc,url}) => {
    return (
        <div>
            <img src={imgPath} height="150" width="150"/>
            <h3><a href={url} target="_blank">{name}</a></h3>
            <p>{desc}</p>
        </div>
    );
};

export default Freebie;