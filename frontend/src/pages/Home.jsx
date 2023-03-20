/* React Libraries */
import React from 'react'
import { Link } from "react-router-dom";

/* MUI Icons */ 
import instagram from '../assets/images/instagram.png'
import linkedin from '../assets/images/linkedin.png'
import github from '../assets/images/github-mark.png'

/* Components */
import NavBar from '../components/NavBar';

/* Styles */
import '../assets/styles/Home.css'

function Home() {
  return (
    <div className='home-page'>
      <div className='home-container'>
        <NavBar />
        <main>
          <p className='main-title'>Welcome to our app!</p><br />
          <p className='main-desc'>This app was built by Kaviarasan ♥️</p>
        </main>
        <footer>
          <div className='footer-container'>
            <p>All rights reserved &copy; 2023 </p>
            <div className='social-links'>
              <Link to='https://github.com/Kaviarasan-R' target={'_blank'}><img src={github} width={20} height={20}/></Link>
              <Link to='https://www.linkedin.com/in/kaviarasan-r' target={'_blank'}><img src={linkedin} width={20} height={20}/></Link>
              <Link to='https://www.instagram.com/kavi._.r26/' target={'_blank'}><img src={instagram} width={20} height={20}/></Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home