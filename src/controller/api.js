const Api = (() => {
  const key = 'FBPkKVVQVi1i5V71obYP';

  const urlRequest = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${key}/scores`;
  const getScores = () => new Promise((resolve, reject) => {
    fetch(urlRequest)
      .then(response => response.json()
        .then((json) => {
          resolve(json.result);
        })).catch((e) => {
        reject(e);
      });
  });

  const setScores = (data) => fetch(urlRequest, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(result => result.json());


  return { getScores, setScores };
})();

export default Api;
