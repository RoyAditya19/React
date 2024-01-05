import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps= {
        country: 'in',
        pageSize: 15,
        category: 'science'
        }
    // the below comment has been used to ignore the error coming on 16th line.
    // eslint-disable-next-line react/no-typos
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    
    capitalizeFirstLetter = (string)=>
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props)
    {
        super(props);
        this.state = {
          articles:  [],
          page: 1,
          loading: false,
          totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - GenZ`
    }

    async UpdateNews()
    {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=15`;
        this.setState({loading:true})
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(60);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false})
        this.props.setProgress(100);
    }
    async componentDidMount()
    {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d51733eb22c487c9566823ffa3a89d1&page=1&pageSize=15`;
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false})
        this.UpdateNews();
    }
    async handlePrevClick ()
    {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d51733eb22c487c9566823ffa3a89d1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // // let url = `https://newsapi.org/v2/everything?q=tesla&country=${this.props.country}&from=2023-11-21&sortBy=publishedAt&apiKey=6d51733eb22c487c9566823ffa3a89d1&page = ${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({ page: this.state.page - 1,articles: parsedData.articles,loading:false})
        this.setState({page: this.state.page - 1});
        this.UpdateNews();
    }

    handleNextClick = async ()=>
    {
    //     if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
    //     {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6d51733eb22c487c9566823ffa3a89d1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     // let url = `https://newsapi.org/v2/everything?q=tesla&country=${this.props.country}&from=2023-11-21&sortBy=publishedAt&apiKey=6d51733eb22c487c9566823ffa3a89d1&page = ${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //         this.setState({loading:true})
    //         let data = await fetch(url);
    //         let parsedData = await data.json()
    //         this.setState({ page: this.state.page + 1, articles: parsedData.articles, loading:false})
    // }
        this.setState({page: this.state.page + 1})
        this.UpdateNews();
        
    }
    fetchMoreData = async() => {
        this.setState({page: this.state.page + 1})
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=15`;
        // this.setState({loading:true})
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults})
      };

  render() {
    return (
      <>
        <h2>GenZ - Top {this.props.category} Headlines</h2>
        {this.state.loading && <Spinner/>}
        {/* {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title = {element.title?element.title.slice(0,45):""} description ={element.description?element.description.slice(0,60):""} imageUrl= {element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
        })} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title = {element.title?element.title.slice(0,45):""} description ={element.description?element.description.slice(0,60):""} imageUrl= {element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
        })}
        
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between my-3">
        <button disabled = {this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
        <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News
