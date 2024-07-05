const db = require('../../database');

function updateUser(req, res) {
    const userId = parseInt(req.url.split('/')[2]);
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

        const stmt = db.prepare("UPDATE users SET name = ?, age = ? WHERE id = ?");
        stmt.run(name, age, userId, function (err) {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Failed to update user' }));
            } else if (this.changes > 0) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ id: userId, name, age }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `User with ID ${userId} not found` }));
            }
        });
        stmt.finalize();
    });
}

module.exports = updateUser;