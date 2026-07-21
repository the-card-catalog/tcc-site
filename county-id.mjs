#!/usr/bin/env node

import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

/**
 * Retrieves the latitude and longitude for a given city and state.
 * Uses Nominatim OpenStreetMap API.
 * @param {string} city 
 * @param {string} state 
 * @returns {Promise<{lat: string, lon: string} | null>}
 */
async function getLatLon(city, state) {
  const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&format=json`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; county-id-node-script/1.0)'
    }
  });

  if (response.ok) {
    const data = await response.json();
    if (data && data.length > 0) {
      // Log coordinates to stderr so stdout remains clean for the FIPS code
      console.error(`Lat: ${data[0].lat}, Lon: ${data[0].lon}`);
      return { lat: data[0].lat, lon: data[0].lon };
    } else {
      console.error(`No results found for ${city}, ${state}. Full response:`, data);
    }
  } else {
    console.error(`Nominatim API returned status: ${response.status}`);
  }
  return null;
}

/**
 * Retrieves the County FIPS code for a given latitude and longitude.
 * Uses geo.fcc.gov API.
 * @param {string} lat 
 * @param {string} lon 
 * @returns {Promise<string | null>}
 */
async function getFips(lat, lon) {
  const url = `https://geo.fcc.gov/api/census/block/find?latitude=${lat}&longitude=${lon}&format=json`;
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    const fips = data?.County?.FIPS;
    if (fips) {
      return fips;
    } else {
      console.error(`FIPS code not found in FCC response:`, data);
    }
  } else {
    console.error(`FCC API returned status: ${response.status}`);
  }
  return null;
}

async function main() {
  let city = '';
  let state = '';

  // Support both command-line arguments and interactive prompts
  if (process.argv.length >= 4) {
    city = process.argv[2];
    state = process.argv[3];
  } else {
    const rl = readline.createInterface({ input, output });
    try {
      city = await rl.question('Enter the city: ');
      state = await rl.question('Enter the state: ');
    } finally {
      rl.close();
    }
  }

  city = city.trim();
  state = state.trim();

  if (!city || !state) {
    console.error('Error: Both city and state are required.');
    process.exit(1);
  }

  try {
    const coords = await getLatLon(city, state);
    if (!coords) {
      console.error(`Could not retrieve latitude and longitude for ${city}, ${state}.`);
      process.exit(1);
    }

    const fips = await getFips(coords.lat, coords.lon);
    if (!fips) {
      console.error(`Could not retrieve FIPS code for coordinates (${coords.lat}, ${coords.lon}).`);
      process.exit(1);
    }

    // Output the FIPS code to stdout
    console.log(fips);
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

main();
