// *
// **
// ***
// ****
// *****


function pattern() {
    const rows = 5;
    const cols = 5;

    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= i; j++) {
            process.stdout.write("*")            
        }
        process.stdout.write("\n") 

    }
}


pattern()

console.log('-------------- End --------------');


function patternReverse() {
    const rows = 5;
    const cols = 5;

    for (let i = rows; i > 0 ; i--) {
        for (let j = i; j > 0; j--) {
            process.stdout.write("*")            
        }
        process.stdout.write("\n") 

    }
}
patternReverse()