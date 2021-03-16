import React from 'react';
import './App.css';
import GifList from './components/GifList';

class App extends React.Component {

    constructor(){
      super();
      this.state = {
        isLoading: false,
        element: null,
        offset: 0,
        data: []
      };
      this.observer = new IntersectionObserver(this.handleInterSectionCallback,{
        threshold:1,
        rootMargin: '400px'
      })
      this.setElement = (elm) =>{
        this.setState({ element: elm })
      }
    }


  componentDidUpdate(){
    if(this.state.element)
      this.observer.observe(this.state.element)
  }

  componentWillUnmount(){
    if(this.state.element){
      this.observer.unobserve(this.state.element)
    }
  }

  fetchGif = () =>{
    return this.state.isLoading && fetch(`https://api.giphy.com/v1/gifs/search?api_key=s899G9FtaVFVIXg5LKo1lXgYNdjtwsiO&q=dogs&limit=5&offset=${this.state.offset}&rating=g&lang=en`,{
      method: 'get',
    }).then((res) => res.json())
    .then(res => {
      const modifiedData = [
        ...this.state.data,
        ...res.data
      ]
      this.setState({ data: modifiedData, offset: this.state.offset+5 })
    })
    .catch((err) => console.log(err))
  }

  handleInterSectionCallback = (entries, observer) =>{
    entries.forEach(element => {
      if(element.isIntersecting){
        this.setState({
          isLoading: true
        })
        this.fetchGif()
      } else{
        this.setState({
          isLoading: false
        })
      }
    });
  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
          Project Infinite Scroll
        </header>
        <main className="App-main">
          <GifList gifData={this.state.data} />
          <div ref={this.setElement} id="target">
            second block
          </div>
          {/* {this.state.isLoading && <div className="loading">'Loading .......'</div>} */}
        </main>
      </div>
    );      
  }  
}

export default App;
