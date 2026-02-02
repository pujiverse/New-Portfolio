
import React, { useState, useEffect } from 'react';
import { PortfolioData } from './types';
import { getPortfolioData } from './services/sheetService';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import AIAssistant from './components/AIAssistant';
import { RefreshCcw, Info } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const portfolioData = await getPortfolioData();
      setData(portfolioData);
      setError(null);
    } catch (err) {
      setError('Failed to sync data from Google Sheet. Please check the sheet structure.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-white">
        <RefreshCcw className="animate-spin text-blue-600" size={32} />
        <p className="text-neutral-400 font-medium animate-pulse">Synchronizing with Google Sheet...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 px-6 text-center bg-white">
        <div className="p-6 bg-red-50 border border-red-100 rounded-2xl max-w-md shadow-sm">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button 
            onClick={fetchData} 
            className="w-full px-6 py-3 bg-neutral-900 text-white hover:bg-neutral-800 rounded-xl transition-all font-semibold"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="relative bg-white min-h-screen selection:bg-blue-600/10 overflow-x-hidden text-neutral-900">
      <Navbar />
      
      <main>
        <Hero profile={data.profile} />
        
        {/* Highlighting the 'About Me' Section on White background */}
        <section id="about" className="py-24 px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black text-blue-800 mb-12 flex flex-col items-center gap-4">
            About Me
            <div className="w-24 h-1.5 bg-yellow-400 rounded-full"></div>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-neutral-600 leading-relaxed font-light mb-8">
              {data.profile.bio}
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-neutral-50 border border-neutral-100 rounded-2xl text-neutral-400 text-sm font-medium">
              <Info size={16} className="text-blue-500" />
              <span>Data Engineer based in Cleveland, OH</span>
            </div>
          </div>
        </section>
        
        {data.experience.length > 0 && <Experience experience={data.experience} />}
        
        {data.skills.length > 0 && <Skills skills={data.skills} />}
        
        {/* Education Section */}
        {data.education.length > 0 && (
          <section id="education" className="py-24 px-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4 text-neutral-900">
              Education
              <span className="h-px flex-1 bg-neutral-100"></span>
            </h2>
            <div className="grid gap-10">
              {data.education.map((edu, i) => (
                <div key={i} className="p-8 bg-white border border-neutral-100 rounded-3xl group hover:border-blue-600/20 transition-all shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">{edu.degree}</h3>
                      <p className="text-neutral-500 font-medium mt-1">{edu.school}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <span className="text-sm font-bold text-neutral-400 block">{edu.year}</span>
                      {edu.gpa && (
                        <span className="inline-block mt-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-600 text-xs font-black">
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {edu.activities && (
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-3">Activities</h4>
                        <ul className="space-y-2">
                          {edu.activities.split(/[;•\n]/).filter(a => a.trim()).map((act, idx) => (
                            <li key={idx} className="text-sm text-neutral-600 flex gap-2">
                              <span className="text-neutral-300">•</span>
                              {act.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {edu.achievements && (
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mb-3">Achievements</h4>
                        <ul className="space-y-2">
                          {edu.achievements.split(/[;•\n]/).filter(a => a.trim()).map((ach, idx) => (
                            <li key={idx} className="text-sm text-neutral-800 flex gap-2">
                              <span className="text-blue-600 font-bold">★</span>
                              {ach.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer / Contact */}
        <footer id="contact" className="py-24 px-6 border-t border-neutral-100 text-center bg-neutral-50">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-neutral-900">Let's build something together.</h2>
          <p className="text-neutral-500 mb-10 text-lg max-w-xl mx-auto font-light">
            Ready to scale your data infrastructure? Feel free to reach out for collaborations.
          </p>
          <div className="flex justify-center">
            <a 
              href={`mailto:${data.profile.email}`} 
              className="px-12 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden group"
            >
              <span className="relative z-10">Get in Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
          </div>
          <p className="mt-20 text-neutral-400 text-sm font-medium tracking-wide">
            © {new Date().getFullYear()} {data.profile.name} • DATA ENGINEER
          </p>
        </footer>
      </main>

      <AIAssistant data={data} />
    </div>
  );
};

export default App;
