const { exec } = require('child_process');
const path = require('path');
const os = require('os');

function getDownloadsPath() {
  const homeDir = os.homedir(); 
  return path.join(homeDir, 'Downloads');
}

const url = process.argv[2];
const format = process.argv[3];

if (!url || !format) {
  console.error('URL e formato são necessários.');
  process.exit(1);
}

const downloadsPath = getDownloadsPath();

function downloadVideo(url, format) {
  const formatOption = format === 'audio' ? 'bestaudio' : 'bestvideo';
  const command = `yt-dlp -f ${formatOption} "${url}" -o "${path.join(downloadsPath, '%(title)s.%(ext)s')}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

downloadVideo(url, format);
