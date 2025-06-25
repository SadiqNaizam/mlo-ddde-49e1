import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Facebook, Instagram } from 'lucide-react';

const TwitterIcon = () => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
    <title>X</title>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);


const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const infoLinks = [
    { href: '#', label: 'About Us' },
    { href: '#', label: 'Contact' },
    { href: '#', label: 'FAQ' },
    { href: '#', label: 'Terms of Service' },
    { href: '#', label: 'Privacy Policy' },
  ];

  return (
    <footer className="bg-muted/40 py-8 text-muted-foreground">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <Plane className="h-6 w-6" />
            <span>Yatra</span>
          </Link>
          <p className="text-center md:text-left">&copy; {currentYear} Yatra. All rights reserved.</p>
        </div>
        
        <nav className="flex flex-col items-center gap-2">
           <h3 className="font-semibold text-foreground mb-2">Information</h3>
           {infoLinks.map(link => (
             <Link key={link.label} to={link.href} className="hover:text-primary transition-colors">
               {link.label}
             </Link>
           ))}
        </nav>

        <div className="flex flex-col items-center md:items-end gap-2">
            <h3 className="font-semibold text-foreground mb-2">Follow Us</h3>
            <div className="flex gap-2">
                <Link to="#" aria-label="X/Twitter"><TwitterIcon /></Link>
                <Link to="#" aria-label="Facebook"><Facebook className="h-5 w-5" /></Link>
                <Link to="#" aria-label="Instagram"><Instagram className="h-5 w-5" /></Link>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;