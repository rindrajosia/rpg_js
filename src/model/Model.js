const Model = (() => {
  let soundOn = true;
  let musicOn = true;
  let bgMusicPlaying = false;

  const setMusicOn = (value) => {
    musicOn = value;
  };

  const getMusicOn = () => musicOn;

  const setSoundOn = (value) => {
    soundOn = value;
  };

  const getSoundOn = () => soundOn;

  const setBgMusicPlaying = (value) => {
    bgMusicPlaying = value;
  };

  const getBgMusicPlaying = () => bgMusicPlaying;


  return {
    setMusicOn,
    getMusicOn,
    setSoundOn,
    getSoundOn,
    setBgMusicPlaying,
    getBgMusicPlaying,
  };
})();

export default Model;
