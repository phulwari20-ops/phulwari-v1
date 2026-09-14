const fs = require('fs');
const path = require('path');

const nextDir = path.join(__dirname, '.next');

console.log('Cleaning Next.js build cache directory:', nextDir);

if (fs.existsSync(nextDir)) {
  try {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log('Successfully deleted .next build cache directory!');
  } catch (err) {
    console.error('Error deleting .next directory:', err.
      message);
  }
} else {
  console.log('.next directory does not exist or already deleted.');
}
