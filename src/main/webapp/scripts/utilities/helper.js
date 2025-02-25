       /**
        * @param {number} seconds
        * @returns {Promise<void>}
        */
export function sleepSec(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
