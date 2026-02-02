
import { PortfolioData, Profile, Experience, Project, Skill, Education } from '../types';

const SHEET_ID = '1MnG7c3kCBE3UnVK99XyGlyEv1InPEKuAQOYginCbUDE';

/**
 * Transforms common sharing links (like Google Drive) into direct image URLs.
 */
function transformImageLink(url: string): string {
  if (!url) return '';
  const trimmedUrl = url.trim().replace(/['"]/g, ''); // Remove potential quotes
  
  // Handle Google Drive links
  if (trimmedUrl.includes('drive.google.com') || trimmedUrl.includes('docs.google.com/uc')) {
    let id = '';
    
    // Pattern 1: /d/ID/view
    const dMatch = trimmedUrl.match(/\/d\/([^\/?#]+)/);
    // Pattern 2: ?id=ID or &id=ID
    const idMatch = trimmedUrl.match(/[?&]id=([^&?#]+)/);
    // Pattern 3: uc?id=ID
    const ucMatch = trimmedUrl.match(/uc\?id=([^&?#]+)/);
    
    if (dMatch) id = dMatch[1];
    else if (idMatch) id = idMatch[1];
    else if (ucMatch) id = ucMatch[1];
    
    if (id) {
      return `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
    }
  }
  return trimmedUrl;
}

// Helper to fetch CSV from Google Sheets gviz API
async function fetchSheetCSV(sheetName: string): Promise<string[][]> {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) return []; 
    const text = await response.text();
    return parseCSV(text);
  } catch (error) {
    console.error(`Error fetching sheet ${sheetName}:`, error);
    return [];
  }
}

function parseCSV(text: string): string[][] {
  const lines: string[][] = [];
  const rows = text.split(/\r?\n/);
  
  for (let row of rows) {
    if (!row.trim()) continue;
    const cols: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < row.length; i++) {
      const char = row[i];
      if (char === '"') {
        if (inQuotes && row[i+1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        cols.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    cols.push(current.trim());
    lines.push(cols.map(c => c.replace(/^"(.*)"$/, '$1')));
  }
  return lines;
}

export const getPortfolioData = async (): Promise<PortfolioData> => {
  const [profileRows, expRows, projRows, skillRows, eduRows] = await Promise.all([
    fetchSheetCSV('Profile'),
    fetchSheetCSV('Experience'),
    fetchSheetCSV('Projects'),
    fetchSheetCSV('Skills'),
    fetchSheetCSV('Education')
  ]);

  // Default Profile
  let profile: Profile = {
    name: 'Pujith Sakhamuri',
    role: 'Data Engineer',
    bio: '6+ years of experience in Data Engineering, ML/AI, building scalable data pipelines, NLP, Computer Vision, Generative AI, and MLOps solutions.',
    email: 'sakhamuripujith@gmail.com',
    location: 'Cleveland, OH',
    github: '',
    linkedin: 'https://www.linkedin.com/in/pujith-s-284a4219b/',
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=Pujith`
  };

  if (profileRows.length > 0) {
    if (profileRows.length >= 4 && profileRows[3] && profileRows[3][0]) {
      const a4Value = profileRows[3][0].trim();
      if (a4Value.toLowerCase().startsWith('http')) {
        profile.avatarUrl = transformImageLink(a4Value);
      }
    }

    const findInColumnA = (keys: string[]) => {
      for (const row of profileRows) {
        const key = row[0]?.toLowerCase().trim();
        if (keys.includes(key) && row[1]) return row[1];
      }
      return null;
    };

    const headers = profileRows[0].map(h => h.toLowerCase().trim());
    const findInRow1 = (keys: string[]) => {
      for (const k of keys) {
        const idx = headers.indexOf(k);
        if (idx !== -1 && profileRows[1] && profileRows[1][idx]) return profileRows[1][idx];
      }
      return null;
    };

    const getName = () => {
      const first = findInColumnA(['first name', 'firstname']) || findInRow1(['first name', 'firstname']);
      const last = findInColumnA(['last name', 'lastname']) || findInRow1(['last name', 'lastname']);
      if (first || last) return `${first || ''} ${last || ''}`.trim();
      return findInColumnA(['name']) || findInRow1(['name']);
    };

    const fetchedName = getName();
    if (fetchedName) profile.name = fetchedName;
    
    profile.role = findInColumnA(['current role', 'role', 'occupation']) || findInRow1(['current role', 'role', 'occupation']) || profile.role;
    profile.bio = findInColumnA(['summary', 'bio', 'description', 'about']) || findInRow1(['summary', 'bio', 'description', 'about']) || profile.bio;
    profile.email = findInColumnA(['email', 'email address']) || findInRow1(['email', 'email address']) || profile.email;
    profile.location = findInColumnA(['location', 'address', 'city']) || findInRow1(['location', 'address', 'city']) || profile.location;
    profile.github = findInColumnA(['github', 'git']) || findInRow1(['github', 'git']) || profile.github;
    profile.linkedin = findInColumnA(['linkedin']) || findInRow1(['linkedin']) || profile.linkedin;

    const secondaryAvatar = findInColumnA(['photo', 'avatar', 'portfolio', 'image', 'picture']) || findInRow1(['photo', 'avatar', 'portfolio', 'image', 'picture']);
    if (secondaryAvatar && secondaryAvatar.toLowerCase().startsWith('http')) {
      profile.avatarUrl = transformImageLink(secondaryAvatar);
    }
    
    if (!profile.avatarUrl || profile.avatarUrl.includes('dicebear')) {
      for (const row of profileRows) {
        for (const cell of row) {
          if (typeof cell === 'string' && (cell.toLowerCase().includes('drive.google.com') || cell.toLowerCase().includes('docs.google.com/uc')) && cell.toLowerCase().includes('http')) {
            profile.avatarUrl = transformImageLink(cell);
            break;
          }
        }
        if (profile.avatarUrl && !profile.avatarUrl.includes('dicebear')) break;
      }
    }
  }

  const experience: Experience[] = expRows.slice(1).map(row => ({
    company: row[0],
    role: row[1],
    period: row[2],
    description: row[3],
    logo: transformImageLink(row[4]) || `https://api.dicebear.com/7.x/initials/svg?seed=${row[0]}`,
    responsibilities: row[5],
    environment: row[6]
  })).filter(e => e.company);

  const projects: Project[] = projRows.slice(1).map(row => ({
    title: row[0],
    description: row[1],
    tech: row[2] ? row[2].split(',').map(s => s.trim()) : [],
    link: row[3],
    image: transformImageLink(row[4]) || `https://picsum.photos/600/400?random=${Math.random()}`
  })).filter(p => p.title);

  const skills: Skill[] = skillRows.slice(1).map(row => ({
    category: row[0],
    name: row[1],
    level: parseInt(row[2]) || 85
  })).filter(s => s.name);

  const education: Education[] = eduRows.slice(1).map(row => ({
    school: row[0],
    degree: row[1],
    year: row[2],
    gpa: row[5],
    activities: row[6],
    achievements: row[7]
  })).filter(e => e.school);

  return { profile, experience, projects, skills, education };
};
