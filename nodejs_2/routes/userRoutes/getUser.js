const db = require('../../database');

function getUser(req, res) {
    const userId = parseInt(req.url.split('/')[2]);

    db.get("SELECT * FROM users WHERE id = ?", [userId], (err, row) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Failed to retrieve user' }));
        } else if (row) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(row));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `User with ID ${userId} not found` }));
        }
    });
}

module.exports = getUser;
