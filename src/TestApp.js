import React from 'react';
import GifList from './components/GifList';
import './App.css';


function App(){


  const [isLoading, setIsLoading] = React.useState(false);
  const [element, setElement] = React.useState(null);
  const [data, setData] = React.useState([])


  React.useEffect(() =>{
    if(element){
      observer.observe(element)
    }

    return () =>{
      if(element){
        observer.unobserve(element);
      }
    }
  },[element])

  const fetchGif = () =>{
    return fetch('https://api.giphy.com/v1/gifs/search?api_key=s899G9FtaVFVIXg5LKo1lXgYNdjtwsiO&q=dogs&limit=25&offset=0&rating=g&lang=en',{
      method: 'get',
    }).then((res) => res.json())
    .then(data => {
      setData(data)
    })
    .catch((err) => console.log(err))
  }

  const handleInterSectionCallback = (entries, observer) =>{
    entries.forEach(element => {
      if(element.isIntersecting){
        setIsLoading(true)
        fetchGif()
      } else{
        setIsLoading(false)
      }
    });
  }


  const observer = new IntersectionObserver(handleInterSectionCallback,{
        threshold: 1,
  })


  return (
      <div className="App">
        <header className="App-header">
          Project Infinite Scroll
        </header>
        <main className="App-main">
          <GifList gifData={[]} />
          <div ref={setElement} id="target">
            second block
          </div>
          {isLoading && <div className="loading">'Loading .......'</div>}
        </main>
      </div>
    );   

}


export default App;