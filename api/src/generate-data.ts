import { Guest, Reservation } from "./interfaces";

// prettier-ignore
export const names: string[] = [
  "Aaron", "Abigail", "Adam", "Alan", "Alejandro", "Alexa", "Alexandra", "Alexandria", "Alexis", "Alicia",
  "Alison", "Amanda", "Amber", "Amy", "Ana", "Andre", "Andrea", "Andrew", "Angela", "Anita",
  "Anna", "Anthony", "Antonio", "Ashlee", "Ashley", "Austin", "Bailey", "Barbara", "Barry", "Benjamin",
  "Bonnie", "Brad", "Brandon", "Brandy", "Brenda", "Brett", "Brian", "Briana", "Brooke", "Candice",
  "Carly", "Carmen", "Carolyn", "Carrie", "Cassandra", "Catherine", "Chad", "Charles", "Cheryl", "Christian",
  "Christina", "Christine", "Christopher", "Christy", "Cindy", "Cody", "Corey", "Courtney", "Cristian", "Crystal",
  "Curtis", "Cynthia", "Dale", "Dana", "Daniel", "Danny", "Darrell", "Dave", "David", "Dawn",
  "Debra", "Denise", "Donald", "Dustin", "Eileen", "Elaine", "Elizabeth", "Emma", "Eric", "Erin",
  "Ethan", "Evan", "Felicia", "Frank", "Frederick", "Gabrielle", "Gregory", "Haley", "Heather", "Henry",
  "Holly", "Howard", "Ian", "Jack", "Jackson", "Jaclyn", "Jacob", "Jacqueline", "Jade", "James"
];
console.assert(names.length === 100);

// prettier-ignore
const lastNames: string[] = [
  "Alexander", "Allen", "Allison", "Anderson", "Arroyo", "Ayala", "Ayers", "Barnes", "Barnett", "Barry",
  "Bauer", "Bautista", "Beard", "Beck", "Beltran", "Benson", "Berg", "Bowen", "Bradshaw", "Brewer",
  "Bridges", "Brown", "Burns", "Campbell", "Carpenter", "Carson", "Cervantes", "Christian", "Clark", "Clarke",
  "Cole", "Coleman", "Cook", "Cox", "Crane", "Crawford", "Cross", "Davis", "Dawson", "Dean",
  "Dickerson", "Donaldson", "Downs", "Duncan", "Elliott", "Ellis", "Ferguson", "Fischer", "Fletcher", "Flores",
  "Ford", "French", "Gallagher", "Garcia", "Garner", "Gibbs", "Gilmore", "Gomez", "Gonzalez", "Graham",
  "Grant", "Gray", "Green", "Guerrero", "Hahn", "Hall", "Hancock", "Hansen", "Harris", "Hatfield",
  "Henderson", "Henson", "Hernandez", "Herrera", "Hines", "Hodge", "Hodges", "Hoffman", "Holmes", "Horton",
  "Hubbard", "Huerta", "Jacobs", "Jefferson", "Jenkins", "Jensen", "Jimenez", "Johnson", "Jones", "Juarez",
  "Keller", "Kemp", "King", "Klein", "Knight", "Landry", "Lawson", "Lee", "Leon", "Lewis"
];
console.assert(lastNames.length === 100);

/**
 * Pads a number with leading zeros to the specified length.
 */
function pad0(value: number, length: number): string {
  return value.toString().padStart(length, '0');
}

/**
 * Returns a random element from the given array.
 */
function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Generates a large number of guest data objects.
 * @param limit - The maximum number of guests to generate. Must be between 1 and 1,000,000.
 */
export function* generateData(limit = 1_000_000): Generator<Guest> {
  if (limit < 1 || limit > 1_000_000) {
    throw new Error('Limit must be between 1 and 1,000,000');
  }

  let id = 1;
  for (const firstName of names) {
    for (const middleName of names) {
      for (const lastName of lastNames) {
        const guest: Guest = {
          id,
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          // Generate a unique email address by combining the first, middle, and last names
          email_address: `${firstName.toLowerCase()}.${middleName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
          // Generate a phone number in the fictitious range +1-XXX-500-XXXX
          phone_number: `+1-${pad0(Math.floor(id / 10000), 3)}-500-${pad0(id % 10000, 4)}`,
          // Generate 0, 1, or 2 reservations
          reservations: [...Array(id % 3).keys()].map(
            (index): Reservation => ({
              booking_reference: `BB-${pad0(id, 6)}-${pad0(index + 1, 2)}`,
              status: randomElement(['Confirmed', 'Cancelled', 'CheckedIn', 'CheckedOut']),
            }),
          ),
        };

        // Write the guest to the file
        yield guest;

        id += 1;
        if (id > limit) {
          // Limit reached, stop generating
          return;
        }
      }
    }
  }
}
