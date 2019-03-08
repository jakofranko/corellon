function generateId() {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = lowercase.toUpperCase();
    const numbers = '1234567890';

    let id = '';
    for (let i = 0, t = 10; i < t; i++) {
        switch(randomZeroTo(3)) {
            case 0:
                id += lowercase[randomZeroTo(lowercase.length)];
                break;
            case 1:
                id += uppercase[randomZeroTo(uppercase.length)];
                break;
            case 2:
                id += numbers[randomZeroTo(numbers.length)]
        }
    }

    return id;
}

function randomZeroTo(max) {
    return Math.floor(Math.random() * max);
}

export { randomZeroTo, generateId };
