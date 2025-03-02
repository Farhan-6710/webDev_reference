import http from 'http';

const port = 5000;

const app = http.createServer((req, res) => {
    const { method, url } = req;  // Extract method and url from request

    if (method === 'GET' && url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1 style="width: 100%; text-align:center;">Home Page</h1>');
    } else if (method === 'GET' && url === '/products') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Products Page</h1>');
    } else {
        // Correctly sets 404 status for other routes or methods
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
