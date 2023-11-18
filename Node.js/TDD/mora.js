function mora(a, b) {
    if (a === b) return 'eq';
    if (a === 'rock' && b === 'scissors') return 'a';
    if (a === 'scissors' && b === 'paper') return 'a';
    if (a === 'paper' && b === 'rock') return 'a';
    return 'b';
}
module.exports = mora;
