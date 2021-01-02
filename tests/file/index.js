const fs = require('fs');
const path = require('path');
const namespacing = require('../../src/namespacing.js');

const originDirName = 'origin';
const modifiedDirName = 'modified';
function getFileList() {
  return fs.readdirSync(path.resolve(__dirname, `./${originDirName}`));
}

function readFile(filename) {
  return new Promise((resolve, reject) => {
    const url = path.resolve(__dirname, `./${originDirName}/${filename}`);
    fs.readFile(url, 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function writeFile(filename, data) {
  const url = path.resolve(__dirname, `./${modifiedDirName}/${filename}`);
  fs.appendFile(url, data, { flag: 'w' }, (err) => { if (err) throw err; });
}

const files = getFileList();
files.forEach(async (filename) => {
  let data = await readFile(filename);
  data = namespacing(data);
  writeFile(filename, data);
});
