
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-800/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl md:text-2xl font-black text-white tracking-tighter">
          {/* Using Name for Branding */}
          Pujith Sakhamuri
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: 'About', id: 'home' },
            { name: 'Experience', id: 'experience' },
            { name: 'Skills', id: 'skills' },
            { name: 'Education', id: 'education' },
            { name: 'Contact', id: 'contact' }
          ].map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`} 
              onClick={(e) => scrollTo(e, link.id)}
              className={`text-sm font-bold tracking-tight transition-all relative group py-1 ${
                link.id === 'home' ? 'text-white' : 'text-blue-100/70 hover:text-white'
              }`}
            >
              {link.name}
              {link.id === 'home' && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-400"></span>
              )}
              <span className="absolute -bottom-1 left-0 right-full h-0.5 bg-yellow-400 group-hover:right-0 transition-all"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Menu Icon (Visual only) */}
        <div className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
