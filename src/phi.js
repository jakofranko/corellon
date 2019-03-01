// Given a correlation table for two variables [a, b, c, d],
// a is the number of measurments where the two variables are both
// false, be is the variable where the first variable is true
// and the second is false, for c the first variable is false
// and the second is true, and d is when both variables are true.
// With such a table, the phi coefficient can be expressed with
// the following function:
function phi(table) {
    debugger;
    return ((table[3] * table[0]) - (table[1] * table[2])) / Math.sqrt((table[2] + table[3]) * (table[0] + table[1]) * (table[1] + table[3]) * (table[0] + table[2]))
}

// Generate a table [a, b, c, d] where a is the number of
// entries where neither events were present, b is the number
// of entries where eventA but not eventB was present, c is
// the number of entries where eventB but not eventA were present,
// and d is the number of entries where both events were present.
function tableFor(eventA, eventB, journal) {
    let table = [0, 0, 0, 0];
    for (let i = 0, l = journal.length; i < l; i++) {
        let entry = journal[i], index = 0;
        if (entry.events.includes(eventA)) index += 1;
        if (entry.events.includes(eventB)) index += 2;
        table[index] += 1;
    }

    return table;
}

export { phi, tableFor };
