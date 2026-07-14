async function test() {
  const url = `https://docs.google.com/spreadsheets/d/1MnG7c3kCBE3UnVK99XyGlyEv1InPEKuAQOYginCbUDE/gviz/tq?tqx=out:csv&sheet=Profile`;
  const response = await fetch(url);
  const text = await response.text();
  function parseCSV(text) {
    const lines = [];
    const rows = text.split(/\r?\n/);
    for (let row of rows) {
      if (!row.trim()) continue;
      const cols = [];
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
  const profileRows = parseCSV(text);
  console.log(profileRows);
}
test();
