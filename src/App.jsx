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
  const [isFocused,setIsFocused] =useState('false')

  const handleSearch = (event)=>{
    event.preventDefault();
    setSearchQuery(event.target.elements[0].value);
  }

  const toggleFocus =()=>{
     setIsFocused(!isFocused)
  };

  const handleAddFavourite = (photo)=>{
    setFavouritePhotos((prevFavourites)=>[...prevFavourites,photo])
  };

  const handleRemoveFavourite =(photoId)=>{
   setFavouritePhotos((prevFavourites)=>prevFavourites.filter((favPhoto)=>favPhoto.id !== photoId)
   )};


  return ( 
    <Router>
      <div>
        <nav className={`navbar ${isFocused ? 'focused' : ''}`}>
          <div className="navbar_logo" onClick={toggleFocus}>
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
            <Link to="/" onClick={toggleFocus}>Home</Link>
            <Link to="/favourites" onClick={toggleFocus}>Favourites</Link>
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
