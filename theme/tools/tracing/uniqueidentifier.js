import { v4 as uuidv4 } from 'uuid';

// Function to generate a Unique ID if it doesn't exist in a cookie
function generateUniqueId() {
    const uniqueId = uuidv4();
    return uniqueId;
}

// Function to retrieve or generate the Unique ID
function getUniqueId() {
    return generateUniqueId();
}

// Get or generate the Unique ID
export const uniqueId = getUniqueId();
