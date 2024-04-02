import React from 'react'
import { FaGithubSquare } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";

const Footer = () => {
  return (
    <footer style={styles.footer}>
         <a href='https://github.com/akashraghuwanshi'target='_blank' 
         style={{fontSize:'2rem',margin:'.5rem',color:'black'}} rel="noreferrer">
          <FaGithubSquare/>
          </a>
         <a href='https://www.linkedin.com/in/akashraghuwanshi/' target='_blank'
          style={{fontSize:'2rem',color:'blue'}} rel="noreferrer">
            <IoLogoLinkedin />
            </a>
         <p style={{fontSize:'1rem'}}>
          &copy; 2024 Your Website. All rights reserved.
          </p>
    </footer>
  )

  
}
export default Footer

//Inline CSS for footer
const styles ={
  footer:{
    backgroundColor: 'hsl(283, 33%, 96%)',
    color:'red',
    textAlign: 'center',
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    height:'8f0px'
  }
}