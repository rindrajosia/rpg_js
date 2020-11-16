const Player = () => {
  let name = null;
  const getName = () => name;
  const setName = (newName) => {
    name = newName;
  };

  return {
    getName,
    setName,
  };
};

export default Player;
