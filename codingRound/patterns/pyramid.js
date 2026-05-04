function pyramid() {
    const rows = 5;

    for (let i = 1; i <= rows; i++) {
        let str = '';
        for (let j = 0; j <= rows - 1 - i; j++) {
            str += ' ';
        }
        process.stdout.write(str)

        for (let k = 1; k <= i; k++) {
            process.stdout.write("* ")
        }

        process.stdout.write("\n")
        
    }
}


pyramid()

// Copy
// remember to put space after we print *