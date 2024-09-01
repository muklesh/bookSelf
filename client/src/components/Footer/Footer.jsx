import React from 'react';
import style from './Footer.module.css';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footerContainer}>
        {/* Brand Section */}
        <div className={style.brandSection}>
          <h2 className={style.brandName}>BookHub</h2>
          <p className={style.brandTagline}>
            Discover, Read, and Share your favorite books.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className={style.linksSection}>
          <h4 className={style.sectionTitle}>Quick Links</h4>
          <ul className={style.linkList}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/search'>Search</Link></li>
            <li><Link to='/user'>Profile</Link></li>
            <li><Link to='/favourite'>Favourite</Link></li>
            <li><Link to='/user'>Reviews</Link></li>
            <li><Link to='/about'>Help</Link></li>
          </ul>
        </div>

        {/* Categories Section */}
        <div className={style.linksSection}>
          <h4 className={style.sectionTitle}>Categories</h4>
          <ul className={style.linkList}>
            <li><Link to='/category/All'>All Books</Link></li>
            <li><Link to='/category/Novel'>Novels</Link></li>
            <li><Link to='/category/Story'>Stories</Link></li>
          </ul>
        </div>

        {/* Contribute Section */}
        <div className={style.contactSection}>
          <h4 className={style.sectionTitle}>Contribute</h4>
          <p>If you have book details that are not on our platform, let us know!</p>
          <Link to='/sendInfo' className={style.ctaButton}>Contribute Now</Link>
        </div>

        {/* Social Media Section */}
        <div className={style.socialSection}>
          <h4 className={style.sectionTitle}>Follow Us</h4>
          <div className={style.socialIcons}>
            <a href='https://github.com/muklesh' target='_blank' rel='noreferrer'>
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href='https://www.linkedin.com/in/muklesh-kumar/' target='_blank' rel='noreferrer'>
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className={style.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} <a href='https://own-ai-tools.vercel.app/' target='_blank' rel="noreferrer">Muklesh Kumar</a>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
