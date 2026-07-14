async function fetchSheetCSV(sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/1MnG7c3kCBE3UnVK99XyGlyEv1InPEKuAQOYginCbUDE/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
  const response = await fetch(url);
  const text = await response.text();
  console.log(JSON.stringify(text));
}
fetchSheetCSV('Profile');
