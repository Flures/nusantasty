require('dotenv').config();
const app = require('./app');
const swaggerSetup = require('./swagger');

const PORT = process.env.PORT || 3000;

swaggerSetup(app);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});