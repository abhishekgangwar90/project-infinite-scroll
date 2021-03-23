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
        rootMargin: '400px'
      })
      this.setElement = (elm) =>{
        this.setState({ element: elm })
      }
    }

  componentDidMount(){
    this.fetchRandomGif();
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

  fetchRandomGif = () =>{
    return fetch(`https://api.giphy.com/v1/gifs/trending?api_key=s899G9FtaVFVIXg5LKo1lXgYNdjtwsiO&limit=20&offset=${this.state.offset}&rating=g&lang=en`,{
      method: 'get',
    }).then((res) => res.json())
    .then(res => {
      this.setState({ data: res.data, offset: this.state.offset+5 })
    })
    .catch((err) => console.log(err))
  }

  fetchGif = () =>{
    return this.state.isLoading && fetch(`https://api.giphy.com/v1/gifs/search?api_key=s899G9FtaVFVIXg5LKo1lXgYNdjtwsiO&q=${this.state.searchTerm}&limit=10&offset=${this.state.offset}&rating=g&lang=en`,{
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
        if(this.state.searchTerm){
          this.fetchGif()
        } else{
          this.fetchRandomGif()
        }
      } else{
        this.setState({
          isLoading: false
        })
      }
    });
  }

  onSearchChange = (e) =>{
    this.setState({
      searchTerm: e.target.value
    })
  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
          Project Infinite Scroll
        </header>
        <main className="App-main">
          <SearchBar onChange={this.onSearchChange} placeholder="Enter the keyword you want the gif for" />
          <GifList gifData={this.state.data} />
          <section className="No Result">
            
          </section>
          <div ref={this.setElement} id="target">
            ...loading
          </div>
          {/* {this.state.isLoading && <div className="loading">'Loading .......'</div>} */}
        </main>
      </div>
    );      
  }  
}

export default App;
