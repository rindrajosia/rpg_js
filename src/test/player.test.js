import Player from '../model/Player';

const player = Player();

test('Player name to be null', () => {
  expect(player.getName()).toBeNull();
});

test('Player name to be Josia', () => {
  player.setName('Josia');
  expect(player.getName()).toBe('Josia');
});
