import React from 'react';
import "./Footer.css";



function Footer() {
    return (
        <footer className='footer-div'>
        <div>
          <div className="footer-div-2">
            <a href="https://github.com/Peeetuh" target="_blank" rel="noopener noreferrer" className='footer-a'>
            <i class="fa-brands fa-github" style={{ fontSize: "30px" }}></i>
            </a>
            <a href="https://www.linkedin.com/in/peter-sam-a8a601136/" target="_blank" rel="noopener noreferrer" className='footer-a'>
            <i class="fa-brands fa-linkedin" style={{ fontSize: "30px" }}></i>
            </a>
          </div>
          </div>
        </footer>
      );
    }

export default Footer