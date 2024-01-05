import React from 'react'

const NewsItem =(props)=> {
    
      let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div>
        <div className= "card my-3">
        <span className="badge rounded-pill bg-danger" style={{position: 'absolute', right: 0, display:'flex',justifyContent: 'end'}}>{source}</span>
        <img src={!imageUrl?"https://storage0.dms.mpinteractiv.ro/media/1/1/1686/22219917/1/317908502-675981933958041-3206687385285157629-n.jpg?width=640":imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
            <h5 className = "card-title">{title}...</h5>
            <p className = "card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='_blank' className="btn btn-sm btn-dark" rel='noreferrer'>Read More</a>
        </div>
        </div>
      </div>
    )
  
}

export default NewsItem
