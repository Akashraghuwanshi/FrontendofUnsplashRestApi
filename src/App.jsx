import React from 'react';
import Favourites from './Components/Favourites';
import Photos from './Components/Photos';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import {useState} from 'react';


function App() {
 
  const [searchQuery ,setSearchQuery] =useState("");
  const [favouritePhotos,setFavouritePhotos] = useState([]);
 

  const handleSearch = (event)=>{
    event.preventDefault();
    setSearchQuery(event.target.elements[0].value);
  }

  
  const handleAddFavourite = (photo)=>{
    setFavouritePhotos((prevFavourites)=>[...prevFavourites,photo])
  };

  const handleRemoveFavourite =(photoId)=>{
   setFavouritePhotos((prevFavourites)=>prevFavourites.filter((favPhoto)=>favPhoto.id !== photoId)
   )};


  return ( 
    <Router>
      
         <Routes>
          <Route 
          path="/"
           element={ <Photos
           handleSearch={handleSearch}
           searchQuery={searchQuery}
           onFavouriteClick ={handleAddFavourite}
           /> }
           />
          <Route 
          path="/favourites" 
          element={
          <Favourites
               favouritePhotos={favouritePhotos}  
               handleRemoveFavourite={handleRemoveFavourite}        
          />}
          /> 
        </Routes>
       
    </Router>
  );
}

export default App;
