const db = require('../../database');

function listUsers(req, res) {
    db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Failed to retrieve users' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(rows));
        }
    });
}

module.exports = listUsers;