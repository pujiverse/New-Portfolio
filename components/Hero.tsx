
import React, { useState } from 'react';
import { Profile } from '../types';
import { MousePointer2 } from 'lucide-react';

interface HeroProps {
  profile: Profile;
}

const Hero: React.FC<HeroProps> = ({ profile }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="home" className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-br from-blue-700 to-blue-600 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-white/20"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-6xl w-full mx-auto px-6 text-center text-white">
        
        {/* Profile Image with Golden Border */}
        <div className="relative mb-12">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-yellow-400/90 shadow-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-1">
            <img 
              src={imgError ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}` : profile.avatarUrl} 
              alt={profile.name} 
              onError={() => setImgError(true)}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        
        {/* Main Heading from Screenshot */}
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6">
          Welcome to <span className="text-yellow-400">{profile.name}'s</span> Portfolio
        </h1>
        
        {/* Subtext Tagline */}
        <p className="max-w-3xl mx-auto text-xl md:text-2xl font-medium text-blue-50/90 leading-relaxed italic opacity-90">
          "Crafting delightful user experiences with modern web technologies."
        </p>

        {/* Action Indicator */}
        <div className="mt-16 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Explore My Work</span>
          <MousePointer2 size={20} />
        </div>
      </div>
      
      {/* Section Divider/Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
