import React from 'react';
import './gifList.scss';

function GifList({gifData}){
  console.log(gifData);
  return <section className="infinite-target">
            {gifData.map((res) =>{
              const imageData = res.images.original;
              return <img className="image" src={imageData.url} alt={res.title} width={imageData.width/1.5} height={imageData.height/1.5} />
            })
            } 
        </section>
}

export default GifList;