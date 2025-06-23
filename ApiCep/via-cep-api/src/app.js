const express = require('express');
const cepRoutes = require('./routes/cep');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/cep', cepRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});