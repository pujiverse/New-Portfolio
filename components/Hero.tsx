
import React, { useState } from 'react';
import { Profile } from '../types';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

interface HeroProps {
  profile: Profile;
}

const Hero: React.FC<HeroProps> = ({ profile }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 pt-24">
      {/* Profile Image Section - Top of Name */}
      <div className="relative group mb-8">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-[6px] border-neutral-900 overflow-hidden shadow-2xl">
          <img 
            src={imgError ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}` : profile.avatarUrl} 
            alt={profile.name} 
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>
      
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white">
          {profile.name}
        </h1>
        
        <p className="mt-4 text-xl md:text-3xl text-blue-400 font-bold tracking-tight">
          {profile.role}
        </p>
        
        <p className="mt-8 max-w-2xl mx-auto text-neutral-400 leading-relaxed text-lg md:text-xl font-light">
          {profile.bio}
        </p>
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-8 text-neutral-500 font-medium">
        <div className="flex items-center gap-2">
          <MapPin size={20} className="text-blue-500" />
          <span>{profile.location}</span>
        </div>
        <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-white transition-colors group">
          <Mail size={20} className="group-hover:text-blue-500 transition-colors" />
          <span>{profile.email}</span>
        </a>
      </div>

      <div className="mt-10 flex gap-5">
        {profile.github && (
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all hover:-translate-y-1">
            <Github size={28} />
          </a>
        )}
        {profile.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="p-4 glass rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all hover:-translate-y-1">
            <Linkedin size={28} />
          </a>
        )}
      </div>

      <div className="mt-24 animate-bounce text-neutral-700">
        <div className="w-0.5 h-16 bg-gradient-to-b from-blue-600 to-transparent rounded-full mx-auto"></div>
      </div>
    </section>
  );
};

export default Hero;
