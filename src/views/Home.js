import React, { useState, useEffect } from 'react';
import Freebie from "../components/Freebie"
import freebies from "../data/freebies.json"

const Home = () => {
    const [tags,setTags] = useState([])
    const [selectedTag,setSelectedTag] = useState()

    useEffect(() => {
        setTags(Object.keys(freebies))
    },[])

    return (
        <div>
            <h1>Freebies for Developers</h1>
 
            {tags.length > 0 && tags.map(tag => <div onClick={() => setSelectedTag(tag)}>
                {tag}
            </div>)}

           {freebies[selectedTag]?.length > 0 && freebies[selectedTag].map((freebie,index) => {
               console.log(freebie)
               return (<Freebie 
                key={index}
                imgPath={freebie.img}
                name={freebie.name}
                desc={freebie.desc}
                url={freebie.url}
              />)
           })}
        </div>
    );
};

export default Home;