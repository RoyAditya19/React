import React, { useEffect, useState} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";




const News = (props)=> {

const [articles, setArticles] = useState([])
const [page, setPage] = useState(1)
const [loading, setLoading] = useState(true)
const [totalResults, setTotalResults] = useState(0)
    
    // the below comment has been used to ignore the error coming on 16th line.
    // eslint-disable-next-line react/no-typos
   
    const capitalizeFirstLetter = (string)=>
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const UpdateNews= async ()=>
    {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - GenZ`;
      UpdateNews();
    },[])
    
    const handlePrevClick =()=>
    {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6d51733eb22c487c9566823ffa3a89d1&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
        // // let url = `https://newsapi.org/v2/everything?q=tesla&country=${props.country}&from=2023-11-21&sortBy=publishedAt&apiKey=6d51733eb22c487c9566823ffa3a89d1&page = ${this.state.page - 1}&pageSize=${props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({ page: this.state.page - 1,articles: parsedData.articles,loading:false})
        setPage(page-1);
        UpdateNews()
    }

   const handleNextClick = async ()=>
    {
    //     if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)))
    //     {
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6d51733eb22c487c9566823ffa3a89d1&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //     // let url = `https://newsapi.org/v2/everything?q=tesla&country=${props.country}&from=2023-11-21&sortBy=publishedAt&apiKey=6d51733eb22c487c9566823ffa3a89d1&page = ${this.state.page + 1}&pageSize=${props.pageSize}`;
    //         this.setState({loading:true})
    //         let data = await fetch(url);
    //         let parsedData = await data.json()
    //         this.setState({ page: this.state.page + 1, articles: parsedData.articles, loading:false})
    // }
        setPage(page+1)
        UpdateNews();
        
    }
   const fetchMoreData = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        // this.setState({loading:true})
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };


    return (
      <>
        <h2>GenZ - Top {props.category} Headlines</h2>
        {loading && <Spinner/>}
        {/* {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title = {element.title?element.title.slice(0,45):""} description ={element.description?element.description.slice(0,60):""} imageUrl= {element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
        })} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
        <div className="row">
        {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem  description ={element.description?element.description.slice(0,60):""} imageUrl= {element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
        })}
        
        </div>
        </div>
        </InfiniteScroll>
        <div className="container d-flex justify-content-between my-3">
        <button disabled = {page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
        <button disabled = {page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div>
      </>
    )

}

News.defaultProps= {
  country: 'in',
  pageSize: 15,
  category: 'science'
  }
  
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
