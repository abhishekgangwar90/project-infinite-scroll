import React, { PureComponent } from 'react';
import './gifList.scss';

class GifList extends PureComponent{
  render(){
    return <section className="infinite-target">
            {this.props.gifData.map((res, index) =>{
              const imageData = res.images.original;
              return <img key={`imageData.hash${index}` } className="image" src={imageData.url} alt={res.title} width={imageData.width/1.5} height={imageData.height/1.5} />
            })
            } 
    </section>
  }
}

export default GifList;