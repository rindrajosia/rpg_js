import Model from '../model/Model';

test('Model soundOn to be true', () => {
  expect(Model.getSoundOn()).toBe(true);
});

test('Model soundOn to be false', () => {
  Model.setSoundOn(false);
  expect(Model.getSoundOn()).toBe(false);
});

test('Model musicOn to be true', () => {
  expect(Model.getMusicOn()).toBe(true);
});

test('Model musicOn to be false', () => {
  Model.setMusicOn(false);
  expect(Model.getMusicOn()).toBe(false);
});

test('Model bgMusicPlaying to be false', () => {
  expect(Model.getBgMusicPlaying()).toBe(false);
});

test('Model bgMusicPlaying to be true', () => {
  Model.setBgMusicPlaying(true);
  expect(Model.getBgMusicPlaying()).toBe(true);
});
