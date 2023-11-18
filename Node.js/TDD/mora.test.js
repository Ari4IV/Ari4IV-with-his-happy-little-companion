const mora = require("./mora");

test("a石頭 b剪刀 a獲勝", () => {
    expect(mora('rock', 'scissors')).toBe('a');
});
test("a石頭 b石頭 平手", () => {
    expect(mora('rock', 'rock')).toBe('eq');
});
test("a剪刀 b石頭 b獲勝", () => {
    expect(mora('scissors', 'rock')).toBe('b');
});
test("a剪刀 b剪刀 平手", () => {
    expect(mora('scissors', 'scissors')).toBe('eq');
});
test("a剪刀 b布 a獲勝", () => {
    expect(mora('scissors', 'paper')).toBe('a');
});
test("a布 b石頭 a獲勝", () => {
    expect(mora('paper', 'rock')).toBe('a');
});
test("a布 b剪刀 b獲勝", () => {
    expect(mora('paper', 'scissors')).toBe('b');
});
test("a布 b布 平手", () => {
    expect(mora('paper', 'paper')).toBe('eq');
});
