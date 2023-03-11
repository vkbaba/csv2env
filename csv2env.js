/**
 * @param {string} csv - csv format string
 * @returns {string} - multiline string of environment variables
 * @example
 * csv2env(`user, password
 * user1, password1
 * user2, password2
 * user3, password3
 * `)
 * // returns
 * `
 * USER_1=user1
 * PASSWORD_1=password1
 * USER_2=user2
 * PASSWORD_2=password2
 * USER_3=user3
 * PASSWORD_3=password3
 * `   
*/
function csv2env(csv) {
    const MAX_LINE = 5000;
    let lines = csv.split('\n');
    // check if too many lines or too few lines
    if (lines.length > MAX_LINE) {
        console.log('Too many lines');
        return;
    } else if (lines.length < 2) {
        console.log('Too few lines');
        return;
    }
    // get column names
    const numColumns = lines[0].split(',').length;
    let columnHeaders = lines[0].split(',');
    columnHeaders = columnHeaders.map(col => col.replace(/ /g, ""));
    let res = {};
    for (const [i, line] of lines.entries()) {
        if (i == 0) continue;
        let columns = line.split(',');
        // remove unnecessary spaces
        columns = columns.map(col => col.replace(/ /g, ""));

        if (columns.length != numColumns) {
            console.log(`Line ${i + 1} is invalid`);
            return;
        }
        for (const col of columns) {
            res[`${columnHeaders[columns.indexOf(col)].toUpperCase() + "_" + i.toString()}`] = col;
        }
    }

    return Object.entries(res).map(([key, value]) => `${key}=${value}`).join('\n');
}
