const server = require('./server.js');
const route = server.router()

const PORT = process.env.PORT || 4000;


server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});