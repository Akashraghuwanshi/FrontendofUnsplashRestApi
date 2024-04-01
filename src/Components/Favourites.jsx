
import React from 'react'
import { useState } from 'react';
import {FaHeart,FaDownload,FaShare, FaThumbsUp} from 'react-icons/fa';

const Favourites = ({favouritePhotos,handleRemoveFavourite}) => {

  const [isFocused,setIsFocused] =useState('false')
  // console.log(favouritePhotos);

  const toggleFocus =()=>{
    setIsFocused(!isFocused)
 };

     const handleFaHeartBtn =(PhotoId)=>{
      handleRemoveFavourite(PhotoId)
    }

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

  return (
    <div>
      <nav className={`navbar ${isFocused ? 'focused' :""}`}>
        <div className="navbar_logo" onClick={toggleFocus}>Fotoflix</div>
        <div className="navbar_links">
          <a href="/" onClick={toggleFocus}>Home</a>
        </div>
      </nav>
      <main>
        <section className="photos">
          <div className="photos-center">
          {favouritePhotos.length > 0 ? (
           favouritePhotos.map((photo,index)=> (
            <article 
            key={photo.id} 
     className={`photo ${favouritePhotos.some((favPhoto)=>favPhoto.id === photo.id) ? 'favourite-photo':""}
     `}>  
      <img  
      src={photo.urls.regular} 
      alt={photo.alt_description} 
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
            ))
          ) : (
            <p>No favourite photos yet.</p>
          )
        }
          </div>
        </section>
      </main>
           </div>
  )
}

export default Favourites