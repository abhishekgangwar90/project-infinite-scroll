import React from 'react';
import './App.css';

function App() {

  const [isLoading, setIsLoading] = React.useState(false);
  const [element, setElement] = React.useState(null);

  const handleInterSectionCallback = (entries, observer) =>{
    entries.forEach(element => {
      if(element.isIntersecting){
        setIsLoading(true)
      } else{
        setIsLoading(false)
      }
    });
  }

  const observer = new IntersectionObserver(handleInterSectionCallback,{
    threshold: 1
  })


  React.useEffect(() =>{
    let elm = element
    if(elm){
      observer.observe(elm);
    }

    return () =>{
      if(elm){
        observer.unobserve(elm)
      }
    }
  },[element])

  return (
    <div className="App">
      <header className="App-header">
        Project Infinite Scroll
      </header>
      <main className="App-main">
        <section className="infinite-target">
          This is the building block and main target element.
        </section>
        <div ref={setElement} id="target">
         second block
        </div>
        {isLoading && <div className="loading">'Loading .......'</div>}
      </main>
    </div>
  );
}

export default App;
