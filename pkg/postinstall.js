const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUTBOUND_URL = 'https://fntlnz.wtf'; // Replace with the desired outbound URL
const OUTPUT_FILE_PATH = '/etc/hello_dolphins.txt'; // Modify the file path as needed

function makeOutboundConnection() {
  https.get(OUTBOUND_URL, (res) => {
    console.log(`Connected to ${OUTBOUND_URL}, statusCode: ${res.statusCode}`);
    // Do something with the response if needed
    res.on('data', (data) => {
      // Process the response data if necessary
    });
  }).on('error', (err) => {
    console.error('Error making outbound connection:', err.message);
  });
}

function writeFileWithDescription() {
  try {
    // Read npm_package_description from .npmrc
    // const npmrcFilePath = path.join(process.env.HOME || process.env.USERPROFILE, '.npmrc');
    // const npmrcContent = fs.readFileSync(npmrcFilePath, 'utf8');
    // const npmPackageDescriptionMatch = npmrcContent.match(/staging=(.*)/);
    // if (!npmPackageDescriptionMatch) {
    //   throw new Error('npm_package_description not found in .npmrc');
    // }
    // const npmPackageDescription = npmPackageDescriptionMatch[1];

    // Write the file with the npm_package_description
    const fileContent = `hello dolphins!`;
    fs.writeFileSync(OUTPUT_FILE_PATH, fileContent, 'utf8');
    console.log(`File written to ${OUTPUT_FILE_PATH}`);
  } catch (error) {
    console.error('An error occurred while writing the file:', error);
  }
}

// Call the functions to make the outbound connection and write the file
makeOutboundConnection();
writeFileWithDescription();
