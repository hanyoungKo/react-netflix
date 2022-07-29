import React from 'react'
import Banner from '../../components/Banner';
import Row from '../../components/Row';
import requests from '../../api/requests';


export default function MainPage() {
  return (
    <div>
    <Banner/>
    <Row 
      title="NETFLIX ORIGNALS"
      id="NO"
      fetchUrl ={requests.fetchNetflixOriginals}
      isLargeRow
    /> 
    <Row
     title="Trending Now"
     id="TN"
     fetchUrl ={requests.fetchTrending}
    />  
     <Row
     title="Top Rated"
     id="TR"
     fetchUrl ={requests.fetchTopRated}
    />      
     <Row
     title="Action Movies"
     id="Am"
     fetchUrl ={requests.fetchActionMovies}
    />   
     <Row
     title="Comedy Movies"
     id="Cm"
     fetchUrl ={requests.fetchComedyMovies}
    />   
     <Row
     title="Documentaries Movies"
     id="Dm"
     fetchUrl ={requests.fetchDocumentaries}
    />   
 
 </div>
  )
}
