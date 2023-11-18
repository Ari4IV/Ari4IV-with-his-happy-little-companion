function mora(a, b) {
    if (a === b) return 'eq';
    return (a === 'rock' && b === 'scissors') || (a === 'scissors' && b === 'paper') || (a === 'paper' && b === 'rock') ? 'a' : 'b';
}

module.exports = mora;
