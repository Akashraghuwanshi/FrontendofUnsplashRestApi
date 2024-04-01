import React from 'react'
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react';
import {FaHeart,FaDownload,FaShare, FaThumbsUp} from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";

const Photos = ({searchQuery,onFavouriteClick,handleSearch}) => {
   
 const [loading,setLoading] = useState(false);
  const [photos,setPhotos] = useState([]);
  const [favouritePhotos,setFavouritePhotos] =useState([]);
  // console.log(favouritePhotos);
 const [isLightboxOpen,setIsLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null); // State to store the index of the selected photo
 const [page,setPage] =useState(1);
  // console.log(page);
  const [showLinks,setShowLinks] =useState(true)

  const toggleLinks =()=>{
    if(window.innerWidth<=568){
      setShowLinks(!showLinks)
    }
 };

 
 useEffect(()=>{

       const fetchImages = async()=>{
         setLoading(true);
         const clientID = '?client_id=FyBUtbxy6DWhWANKRkPjGPvxvcjweB3Ekwth7B9LHFM';
         const mainUrl = 'https://api.unsplash.com/photos/';
         let url = mainUrl + clientID + `&page=${page}`;//include the page number in the Url
         if(searchQuery){
           url =`https://api.unsplash.com/search/photos/${clientID}&query=${searchQuery}&page=${page}`;
          }
          try{
            const response = await fetch(url);
            // console.log(response);
            const data = await response.json();
            // console.log(data);
            // console.log(data.results);
            setPhotos(data.results || data);
            setLoading(false);
            
          }catch(error){
            setLoading(false);
            console.log(error);
          }
        }
        fetchImages();
      
   },[searchQuery,page]);

  
  useEffect(() => {
  const handleScrollEvent = () => {
    if (!loading && window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      

      //Simulate loading delay 
      setLoading(true);
      setTimeout(()=>{
        setLoading(false);
        setPage((prevPage)=>prevPage + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the viewport
        },2000);
      
  }
  /* console.log(window.innerHeight);
  console.log(window.scrollY);
  console.log(document.body.scrollHeight); */
}
   window.addEventListener('scroll' ,handleScrollEvent);
    
   return ()=> window.removeEventListener('scroll',handleScrollEvent);
  }, [loading,page]);

  
   const handleFaHeartBtn =(photoId)=>{  
    // console.log(photoId)
    // console.log(favouritePhotos);
    const existingElementIndex = favouritePhotos.findIndex((favPhoto)=>favPhoto.id === photoId);
    // console.log(existingElementIndex);
    if(existingElementIndex !== -1){
      setFavouritePhotos((prevFavourites)=>prevFavourites.filter((favPhoto)=>favPhoto.id !== photoId))
    }else{
      const photoToAdd = photos.find((photo)=>photo.id === photoId);
      // console.log(photoToAdd);
         setFavouritePhotos((prevFavourites)=>[...prevFavourites,photoToAdd])
         onFavouriteClick(photoToAdd)
    };
  } 
          
/* Inside the function, a shareUrl variable is declared. This variable contains a WhatsApp share link. */
 const handleFaShareBtn =(photoUrl)=>{
   const shareUrl =`https://api.whatsapp.com/send?text=${encodeURIComponent(`Checkout this awesome photo:${photoUrl}`)}`;
   window.open(shareUrl,'_blank');
 }   

 const handleFaDownloadBtn =(photoUrl,photoId)=>{
  // console.log(photoUrl);
  // console.log(photoId);
  const link = document.createElement('a')
  link.href = photoUrl;
  link.download =`photo_${photoId}.jpg`;
  // document.body.appendChild(link);
  link.click();
  // document.body.removeChild(link);
}
/* Setting the Content-Disposition header on the server side depends on the technology stack you're using. The Content-Disposition header tells the browser how to display or handle a downloaded file. When set to attachment, it prompts the browser to download the file instead of attempting to display it. */

const openLightbox = (index)=>{
  // console.log(index)
  setIsLightboxOpen(true);
  const clickedPhoto = photos[index];//get the clicked photo
  const remainingPhotos = photos.filter((_,i)=> i !== index);//filter out the clicked photo
  const reorderedPhotos =[clickedPhoto,...remainingPhotos.slice(index),...remainingPhotos.slice(0,index)];//Reordered remaining photos
  setPhotos(reorderedPhotos)//update the photos state with the reordered array
  setSelectedPhotoIndex(0);// Set the clicked photo index to 0 (first position)
}
  
   
// Create a new array of slides starting from the clicked index
const slidesArray = selectedPhotoIndex !== null ? photos.map(photo=>({src:photo.urls.full})):[];

    /* Return component */

return (
    <div>
      <nav className={`navbar ${showLinks ? 'focused' : ''}`}>
          <div className="navbar_logo" onClick={toggleLinks}>
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
         { showLinks && (
                        <div className="navbar_links">
                   <Link to="/" onClick={toggleLinks}>Home</Link>
                   <Link to="/favourites" onClick={toggleLinks}>Favourites</Link>
                 </div>
                 )}
        </nav> 
    <main >
      <section className='photos' >
      <div className="photos-center">
          {loading ? (<div className='grid-container'>
                 <div className="spinner">
                 <img src="/Image/loading.webp" alt="Loading" />
                  </div>
                 </div>) :( 
                  photos.map((photo,index)=>(
                 <article 
                  key={photo.id} 
           className={`photo ${favouritePhotos.some((favPhoto)=>favPhoto.id === photo.id) ? 'favourite-photo':""}
           `}>  
            <img  
            src={photo.urls.regular} 
            alt={photo.alt_description} 
            onClick={()=>openLightbox(index)} // Open lightbox when image is clicked
            />
            <div className="photo-info">
              <div className="photo-header">
                <h4>{photo.user.name}</h4>
                <button 
                className={`favourite-btn 
                ${favouritePhotos.some((favPhoto)=>favPhoto.id === photo.id) ? 'active' :""}`} 
                onClick={()=>handleFaHeartBtn(photo.id)}>
                  <FaHeart/>
                </button>
              </div>
              <div className="photo-actions">
                <p>
                  <FaThumbsUp className='thumbsUp-icon' />
                  {photo.likes}
                </p>
                <button 
                className='share-btn' 
                onClick={()=>handleFaShareBtn(photo.urls.regular)}><FaShare/>
                </button>
                <button 
                className="download-btn" 
                onClick={()=>handleFaDownloadBtn(photo.urls.full,photo.id)}>
                  <FaDownload/>
                  </button>
              </div>
              <a href={photo.user.portfolio_url}>
                <img 
                src={photo.user.profile_image.medium} alt={photo.user.name}
                 className='user-img'/>
              </a>
            </div>
          </article>
        )
        )) }
      </div>
        </section>     
        
       <Lightbox
      open ={isLightboxOpen}
      close={()=>setIsLightboxOpen(false)}
      slides ={slidesArray}
      currentIndex={selectedPhotoIndex} // Pass the index of the selected photo to the lightbox
      />
 </main>
 </div>
  )
}



      
export default Photos


