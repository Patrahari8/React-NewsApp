import React from "react";

const NewsItem =(props)=> {
  
    let {title, description, imageUrl, url, author, date, source} = props;
    return (
      <div className="my-3">
        <div className="card">
            <div style={{display:'flex', justifyContent:'flex-end', position:'absolute', right:'0'}}>
          <span className="badge rounded-pill bg-dark" style={{left:'90%', zIndex:'1'}}>{source}</span>
            </div>
          <img src={imageUrl?imageUrl:"https://news.cornell.edu/sites/default/files/styles/story_thumbnail_lg/public/dreamstime_l_75827730_1.jpg?itok=-7PqJDCP"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()} </small></p>
            <a rel="noreferrer" target="_blank" href={url} className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
