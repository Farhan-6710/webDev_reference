import express from 'express';

const app = express();
const port = 5000;

// Home route
app.get('/', (req, res) => {
    res.send('<h1 style="width: 100%; text-align:center;">Home Page</h1>');
});

// Products route
app.get('/products', (req, res) => {
    res.send('<h1>Products Page</h1>');
});

// 404 route for anything else
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
