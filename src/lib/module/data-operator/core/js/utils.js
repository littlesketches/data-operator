
////////////////
/// HELPERS  ///
////////////////

function cycleFromValue(arr, current, direction = 1) {
    const len = arr.length;
    if (len === 0) return undefined;

    const index = arr.indexOf(current);
    if (index === -1) return undefined; // value not found

    // direction = +1 for forward, -1 for backward
    const nextIndex = (index + direction + len) % len;
  return arr[nextIndex];
}


function rotateArray(arr, r) {
    const len = arr.length
    if (len === 0) return []

    // Handle negative offsets too
    const offset = ((r % len) + len) % len

    return arr.slice(-offset).concat(arr.slice(0, -offset))
}


function legatoStruct(arr) {
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

export { cycleFromValue, rotateArray, legatoStruct }