import React from 'react';
import Favourites from './Components/Favourites';
import Photos from './Components/Photos';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
import {useState} from 'react';


function App() {
 
  const [searchQuery ,setSearchQuery] =useState("");
  const [favouritePhotos,setFavouritePhotos] = useState([]);
  // console.log(favouritePhotos);

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
      <div>
        <nav className="navbar">
          <div className="navbar_logo">
            FotoFlix
          </div>
          <form action="" className='navbar_search_form' onSubmit={handleSearch}>
            <input 
            className='form-input'
            type="text" 
            placeholder='search'
            />
           <button type='submit' className='search-btn'>
              <FaSearch/>
            </button>
          </form>
          <div className="navbar_links">
            <Link to="/">Home</Link>
            <Link to="/favourites">Favourites</Link>
          </div>
        </nav>
        <Routes>
          <Route 
          path="/"
           element={ <Photos
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
      </div> 
    </Router>
  );
}

export default App;
