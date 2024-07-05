const { parse } = require('querystring');
const db = require('../../database');

function createUser(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        if (!body) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Bad Request: No data received' }));
            return;
        }

        let data;
        try {
            data = JSON.parse(body);
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Bad Request: Invalid JSON' }));
            return;
        }

        const { name, age } = data;

        if (!name || !age) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Bad Request: Missing name or age' }));
            return;
        }

        const stmt = db.prepare("INSERT INTO users (name, age) VALUES (?, ?)");
        stmt.run(name, age, function (err) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Failed to create user' }));
            } else {
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ id: this.lastID, name, age }));
            }
        });
        stmt.finalize();
    });
}

module.exports = createUser;