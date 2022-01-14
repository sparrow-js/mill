const atoz = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
];

export function generateConsistentUID (
    existingIDs: Set<string>,
    possibleStartingValue: string
): string {
    if (possibleStartingValue.length >= 3) {
        const maxSteps = Math.floor(possibleStartingValue.length / 3);
        for (let step = 0; step <maxSteps; step++) {
            const possibleUID = possibleStartingValue.substring(step * 3, (step + 1) * 3);
            if (!existingIDs.has(possibleUID)) {
                return possibleUID;
            }
        }

        for (const firstChar of atoz) {
            for (const secondChar of atoz) {
                for (const thirdChar of atoz) {
                    const possibleUID = `${firstChar}${secondChar}${thirdChar}`;
                    if (!existingIDs.has(possibleUID)) {
                        return possibleUID;
                    }
                }
            }
        }
    }
    
    return ''
}