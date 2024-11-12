// src/Header.js
import React from 'react';

const Footer = () => {
    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            backgroundColor: '#333',  // Cor de fundo mais escura
            color: '#fff',  // Texto claro para contraste
            textAlign: 'center',
            padding: '10px 0',  // Altura reduzida
            fontSize: '0.8rem',
        }}>
            <p>
                Desenvolvido por WesleyPauloTI &copy; {new Date().getFullYear()}
            </p>
            <p>
                <a href="https://github.com/wesleypauloti" target="_blank" rel="noopener noreferrer">GitHub</a> |
                <a href="https://linkedin.com/in/wesley-paulo-ti" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
            </p>
        </div>
    );
};

export default Footer;
