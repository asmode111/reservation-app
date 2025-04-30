import fs from 'fs';
import readline from 'readline';
import path from 'node:path';
import { Guest, Reservation } from '../models';
import Database from '../config/database.config';

const BATCH_SIZE: number = 1000;

async function importDataFromJSONL(filePath: string) {

  let guests: any[] = [];
  const fileStream = fs.createReadStream(filePath);

  const readLine = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of readLine) {
    const guest = JSON.parse(line);
    guests.push(guest);

    if (guests.length > BATCH_SIZE) {
      await saveBatch(guests);
      guests = [];
    }
  }

  if (guests.length > 0) {
    await saveBatch(guests);
  }
  
  console.log('Data is imported!');
}

async function saveBatch(batch: any[]) {
  const transaction = await Database.getInstance().transaction();
  try {
    for (const guestData of batch) {
      const { reservations, ...guestFields } = guestData;
      const guest = await Guest.create(guestFields, { transaction });

      if (Array.isArray(reservations) && reservations.length > 0) {
        const reservationRecords = reservations.map(r => ({
          ...r,
          guest_id: guest.id,
        }));
        await Reservation.bulkCreate(reservationRecords, { transaction });
      }
    }
    await transaction.commit();
    console.log(`Batch of ${batch.length} data saved.`);
  } catch (error) {
    await transaction.rollback();
    console.error('Error in batch:', error);
  }
}
const filePath = path.join(__dirname, 'guests.jsonl');
importDataFromJSONL(filePath).catch(console.error);
