const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const apiRoutes = require('./routes/api');

app.use(express.json());
app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

module.exports = app; // for testing
