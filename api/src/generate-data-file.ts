import fs from 'node:fs';
import { generateData } from './generate-data';

// Open a file for writing (truncate if it exists)
const file = fs.createWriteStream('guests.jsonl', { flags: 'w' });

for (const guest of generateData()) {
  // Write the guest to the file
  file.write(JSON.stringify(guest) + '\n');
}

// Close the file
file.end();
