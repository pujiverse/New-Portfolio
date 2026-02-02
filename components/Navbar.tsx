
import React from 'react';

const Navbar: React.FC = () => {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
      <div className="glass flex items-center gap-4 md:gap-8 px-6 md:px-8 py-3 rounded-full pointer-events-auto shadow-2xl">
        <a 
          href="#home" 
          onClick={(e) => scrollTo(e, 'home')}
          className="text-xs md:text-sm font-medium text-neutral-400 hover:text-white transition-colors"
        >
          Home
        </a>
        <a 
          href="#experience" 
          onClick={(e) => scrollTo(e, 'experience')}
          className="text-xs md:text-sm font-medium text-neutral-400 hover:text-white transition-colors"
        >
          Work
        </a>
        <a 
          href="#skills" 
          onClick={(e) => scrollTo(e, 'skills')}
          className="text-xs md:text-sm font-medium text-neutral-400 hover:text-white transition-colors"
        >
          Skills
        </a>
        <a 
          href="#education" 
          onClick={(e) => scrollTo(e, 'education')}
          className="text-xs md:text-sm font-medium text-neutral-400 hover:text-white transition-colors"
        >
          Education
        </a>
        <a 
          href="#contact" 
          onClick={(e) => scrollTo(e, 'contact')}
          className="text-xs md:text-sm font-medium text-neutral-400 hover:text-white transition-colors"
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
