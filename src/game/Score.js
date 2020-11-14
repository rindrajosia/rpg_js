const Score = (() => {
  let score = 1;

  const incrementScore = () => {
    score += 1;
  };

  const resetScore = () => {
    score = 1;
  };


  const getScore = () => score;

  const allScore = (data) => {
    const arr = [...data];
    let list = '';
    arr.sort((a, b) => b.score - a.score);

    for (let i = 0; i < arr.length; i += 1) {
      list += ` User = ${arr[i].user} - Score = ${arr[i].score} \n`;
    }

    return list;
  };


  return {
    incrementScore,
    getScore,
    resetScore,
    allScore,
  };
})();

export default Score;
