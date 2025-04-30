import fs from 'node:fs';
import path from 'node:path';
import { generateData } from './generate-data';

const filePath = path.join(__dirname, 'guests.jsonl');
// Open a file for writing (truncate if it exists)
const file = fs.createWriteStream(filePath, { flags: 'w' });

for (const guest of generateData()) {
  // Write the guest to the file
  file.write(JSON.stringify(guest) + '\n');
}

// Close the file
file.end();
