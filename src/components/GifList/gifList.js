import React from 'react';
import './gifList.scss';

function GifList({gifData}){
  console.log(gifData);
  return <section className="infinite-target">
            {gifData.map((res) =>{
              const imageData = res.images.original;
              return <img src={imageData.url} alt={res.title} width={imageData.width} height={imageData.height} />
            })
            } 
        </section>
}

export default GifList;