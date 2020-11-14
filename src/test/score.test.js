import Score from '../game/Score';

test('Score score to be equal 1', () => {
  expect(Score.getScore()).toBe(1);
});

test('Score score to be equal 2', () => {
  Score.incrementScore();
  expect(Score.getScore()).toBe(2);
});

test('Does not return anything', () => {
  expect(Score.incrementScore()).toBeUndefined();
});

test('Does not return anything', () => {
  expect(Score.resetScore()).toBeUndefined();
});

test('Score score to be equal 1', () => {
  Score.resetScore();
  expect(Score.getScore()).toBe(1);
});

test('Score allScore to be equal user: Test - score: 100', () => {
  const data = [{ user: 'Test', score: 100 }];
  expect(Score.allScore(data)).toBe(' User = Test - Score = 100 \n');
});
