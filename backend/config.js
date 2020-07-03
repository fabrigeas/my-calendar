let baseUrl;

baseUrl = "http://18.224.109.28";
baseUrl = "http://localhost"; //  !!!!!!!!!!!!!!!! comment this line when deploying for production !!!!!!!!!!!!!!!!!

const port = 3002;
const url = `${baseUrl}:${port}`;

module.exports = {
  server: {
    baseUrl,
    port,
    url,
  },
};
