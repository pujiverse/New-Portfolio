
import React, { useState, useEffect } from 'react';
import { PortfolioData } from './types';
import { getPortfolioData } from './services/sheetService';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import AIAssistant from './components/AIAssistant';
import { RefreshCcw } from 'lucide-react';

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
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 bg-neutral-950">
        <RefreshCcw className="animate-spin text-blue-500" size={32} />
        <p className="text-neutral-500 font-medium animate-pulse">Synchronizing with Google Sheet...</p>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4 px-6 text-center bg-neutral-950">
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl max-w-md">
          <p className="text-red-400 font-medium mb-4">{error}</p>
          <button 
            onClick={fetchData} 
            className="w-full px-6 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl transition-all font-semibold"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="relative bg-neutral-950 min-h-screen">
      <Navbar />
      
      <main>
        <Hero profile={data.profile} />
        
        {data.experience.length > 0 && <Experience experience={data.experience} />}
        
        {data.skills.length > 0 && <Skills skills={data.skills} />}
        
        {/* Education Section */}
        {data.education.length > 0 && (
          <section id="education" className="py-24 px-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
              Education
              <span className="h-px flex-1 bg-neutral-800"></span>
            </h2>
            <div className="grid gap-10">
              {data.education.map((edu, i) => (
                <div key={i} className="p-8 glass rounded-3xl group hover:border-blue-500/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{edu.degree}</h3>
                      <p className="text-neutral-400 font-medium mt-1">{edu.school}</p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <span className="text-sm font-bold text-neutral-500 block">{edu.year}</span>
                      {edu.gpa && (
                        <span className="inline-block mt-2 px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-black">
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {edu.activities && (
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-3">Activities</h4>
                        <ul className="space-y-2">
                          {edu.activities.split(/[;•\n]/).filter(a => a.trim()).map((act, idx) => (
                            <li key={idx} className="text-sm text-neutral-400 flex gap-2">
                              <span className="text-neutral-600">•</span>
                              {act.trim()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {edu.achievements && (
                      <div>
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-3">Achievements</h4>
                        <ul className="space-y-2">
                          {edu.achievements.split(/[;•\n]/).filter(a => a.trim()).map((ach, idx) => (
                            <li key={idx} className="text-sm text-neutral-300 flex gap-2">
                              <span className="text-blue-500 font-bold">★</span>
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
        <footer id="contact" className="py-24 px-6 border-t border-neutral-900 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's build something together.</h2>
          <p className="text-neutral-500 mb-10 text-lg max-w-xl mx-auto">
            Ready to scale your data infrastructure? Feel free to reach out for collaborations.
          </p>
          <div className="flex justify-center">
            <a 
              href={`mailto:${data.profile.email}`} 
              className="px-12 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 text-white shadow-xl shadow-blue-900/20"
            >
              Get in Touch
            </a>
          </div>
          <p className="mt-20 text-neutral-600 text-sm">
            © {new Date().getFullYear()} {data.profile.name}. Live sync enabled.
          </p>
        </footer>
      </main>

      <div className="fixed top-4 right-4 z-[70] hidden md:block">
        <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full border-white/5 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">Live Sync Active</span>
        </div>
      </div>

      <AIAssistant data={data} />
    </div>
  );
};

export default App;
