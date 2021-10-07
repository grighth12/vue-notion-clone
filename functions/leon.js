exports.handler = async function() {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'leon',
      age: 85,
      email: 'jh@abc.com'
    })
  };
};