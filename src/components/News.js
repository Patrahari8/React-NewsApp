import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
    

  const capaitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  

  const  updateNews=async() =>{
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setarticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setloading(false);
    props.setProgress(100);

  }

  useEffect(() => {
    document.title = `${capaitalizeFirstLetter(
      props.category
    )} - NewsMonkey`;
    updateNews();
  }, [])


//   const handlePrevClick = async () => {
//     setpage(page - 1);
//     updateNews();
//   };
//   const handleNextClick = async () => {
//     setpage(page + 1);
//     updateNews();
//   };

  const fetchMoreData = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setpage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
  };

    return (
      <>
        <h1 className="text-center" style={{margin:'35px 0px', marginTop: '90px'}}>
          NewsMonkey - Top {capaitalizeFirstLetter(props.category)}{" "}
          headlines
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner/>}
        >
            <div className="container my-3">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    url={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>

        
      </>
    );
  
}
News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

News.PropType = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
  };

export default News;
