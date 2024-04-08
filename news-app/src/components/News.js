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
        props.setProgress(40);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
//let's understand how useEffect is being functioned, once the user is clicking on any tabs present in the navbar(or re-loading the page) then the component is being re-rendered. as soon as the component is being re-rendered, useEffect comes into picture and then it runs the updatenews function and then it also updates the title of the page. this useeffect function used in function based components are replaced by componentDidMount methods in class based components
    useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - GenZ`;
      UpdateNews();
    // eslint-disable-next-line
    },[])
    
    const handlePrevClick =()=>
    {
        setPage(page-1);
        UpdateNews()
    }

   const handleNextClick = async ()=>
    {
        setPage(page+1)
        UpdateNews();
    }
    //here below in the fetchmoredata function we have not displayed the loader/spinner because when the next data is being fetched using infinitescroll, there only we are displaying spinner using the loader option present in the infinitescroll tag
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
        <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={<Spinner/>} >
        <div className="container">
        <div className="row">
        {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}> {/*here key has been used bcoz each div should be unique(when we return each individual div based on every element present in the array) */}
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
  
News.propTypes= {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

export default News
