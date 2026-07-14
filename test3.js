function transformImageLink(url) {
  if (!url) return '';
  const trimmedUrl = url.trim().replace(/['"]/g, '');
  if (trimmedUrl.includes('drive.google.com') || trimmedUrl.includes('docs.google.com/uc')) {
    let id = '';
    const dMatch = trimmedUrl.match(/\/d\/([^\/?#]+)/);
    const idMatch = trimmedUrl.match(/[?&]id=([^&?#]+)/);
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
console.log(transformImageLink("https://drive.google.com/file/d/1z4KtcKEtHtazSxq63Roql_9wnQBYBDeH/view?usp=sharing"));
