'use strict'

const crypto = require('crypto')

/**
 * Generates a unique hash from WebSocket message data for span pointer identification.
 * The hash is calculated from the message content to allow matching producer and consumer spans.
 * @param {string|Buffer|ArrayBuffer|Blob} data - The WebSocket message data
 * @returns {string|undefined} A 32-character hash uniquely identifying the message, or undefined if unable to hash
 */
function generateWebSocketMessageHash (data) {
  try {
    let dataToHash

    if (typeof data === 'string') {
      dataToHash = data
    } else if (Buffer.isBuffer(data)) {
      dataToHash = data
    } else if (data instanceof ArrayBuffer) {
      dataToHash = Buffer.from(data)
    } else if (data instanceof Blob) {
      // For Blobs, we can't synchronously get the content
      // Skip hashing for now
      return undefined
    } else if (Array.isArray(data)) {
      // Handle array of buffers
      dataToHash = Buffer.concat(data.map(chunk => Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)))
    } else {
      // Unknown data type
      return undefined
    }

    const hash = crypto.createHash('sha256').update(dataToHash).digest('hex')
    return hash.slice(0, 32)
  } catch (err) {
    // If hashing fails for any reason, return undefined
    return undefined
  }
}

module.exports = {
  generateWebSocketMessageHash
}

