////////////////
/// HELPERS  ///
////////////////

export const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
export const randomInteger = max => Math.floor(Math.random()*max)

export function cycleFromValue(arr, current, direction = 1) {
    const len = arr.length;
    if (len === 0) return undefined;

    const index = arr.indexOf(current);
    if (index === -1) return undefined; // value not found

    // direction = +1 for forward, -1 for backward
    const nextIndex = (index + direction + len) % len;
  return arr[nextIndex];
}

export function rotateArray(arr, r) {
    const len = arr.length
    if (len === 0) return []

    // Handle negative offsets too
    const offset = ((r % len) + len) % len

    return arr.slice(-offset).concat(arr.slice(0, -offset))
}

export function legatoStruct(arr) {
    const out = [];
    for (let i = 0; i < arr.length; ) {
        if (arr[i] === 1) {
            let zeros = 0;
            while (i + 1 + zeros < arr.length && arr[i + 1 + zeros] === 0) zeros++;
            out.push(zeros ? `x@${zeros + 1}` : 'x');
            i += 1 + zeros;
        } else {
            i++;
        }
    }
    return out.join(' ');
}

export function weightedBins(data, numBins) {
    const n = data.length;
    const binSize = n / numBins;
    const result = [];

    for (let b = 0; b < numBins; b++) {
        const start = b * binSize;
        const end = (b + 1) * binSize;
        let sum = 0, weight = 0;

        for (let i = Math.floor(start); i < Math.ceil(end); i++) {
        // compute overlap of sample i with [start, end)
        const left = Math.max(i, start);
        const right = Math.min(i + 1, end);
        const w = right - left;
        sum += data[i] * w;
        weight += w;
        }
        result.push(sum / weight);
    }

    return result;
}