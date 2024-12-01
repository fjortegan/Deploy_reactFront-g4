import React from 'react';
import './index.css';
import GithubLogo from '../../assets/github.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-social">
        <a href="https://github.com/IES-Rafael-Alberti/grupo4-company/tree/main/puesta_en_produccion_segura" target="_blank" rel="noopener noreferrer">
          <img src={GithubLogo} alt="Github Logo" className="social-logo" />
        </a>
      </div>
      <div className="footer-info">
        <p>© 2024 Grupo 4 company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
