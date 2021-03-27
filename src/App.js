import React from 'react';
import './App.css';
import GifList from './components/GifList';
import SearchBar from './components/Search'
class App extends React.Component {

    constructor(){
      super();
      this.state = {
        isLoading: false,
        element: null,
        offset: 0,
        data: [],
        searchTerm: ''
      };
      this.observer = new IntersectionObserver(this.handleInterSectionCallback,{
        threshold:1,
        rootMargin: '500px'
      })
      this.setElement = (elm) =>{
        this.setState({ element: elm })
      }
    }

  componentDidMount(){
    this.fetchGif();
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
    const url = this.state.searchTerm 
    ? `https://api.giphy.com/v1/gifs/search?api_key=s899G9FtaVFVIXg5LKo1lXgYNdjtwsiO&q=${this.state.searchTerm}&limit=10&offset=${this.state.offset}&rating=g&lang=en` 
    : `https://api.giphy.com/v1/gifs/trending?api_key=s899G9FtaVFVIXg5LKo1lXgYNdjtwsiO&limit=20&offset=${this.state.offset}&rating=g&lang=en`

    return this.state.isLoading && fetch(url,{
      method: 'get',
    }).then((res) => res.json())
    .then(res => {
      const modifiedData = [
        ...this.state.data,
        ...res.data
      ]
      this.setState({ isLoading: false, data: modifiedData, offset: this.state.offset+5 })
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

  onSearchKeyDown = (e) =>{
   if(e.keyCode === 13 && e.target.value){
     this.fetchGif();
     this.setState({
       isLoading: true,
       data: []
     })
   } else{
    this.setState({
      searchTerm: e.target.value
    })
   }
  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
          Project Infinite Scroll
        </header>
        <main className="App-main">
          <SearchBar onKeyDown={this.onSearchKeyDown} placeholder="Enter the keyword you want the gif for" />
          <GifList gifData={this.state.data} />
          {
            !this.state.isLoading && this.state.data.length === 0 && 
            <section className="No Result">
              Could not find any result
            </section>
          }
          <div ref={this.setElement} id="target">
            {this.state.isLoading && '... Loading more results, Please wait'}
          </div>
        </main>
      </div>
    );      
  }  
}

export default App;
