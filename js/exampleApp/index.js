const express = require('express');
const app = express();
const PORT = 3000;

// Define a GET endpoint at the root route
app.get('/', (req, res) => {
    res.redirect(req.query.url);
});

// Start the server on the specified PORT
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});