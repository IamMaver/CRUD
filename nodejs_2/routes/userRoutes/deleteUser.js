const db = require('../../database');

function deleteUser(req, res) {
    const userId = parseInt(req.url.split('/')[2]);

    const stmt = db.prepare("DELETE FROM users WHERE id = ?");
    stmt.run(userId, function (err) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Failed to delete user' }));
        } else if (this.changes > 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `User with ID ${userId} deleted` }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `User with ID ${userId} not found` }));
        }
    });
    stmt.finalize();
}

module.exports = deleteUser;