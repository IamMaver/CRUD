const users = require('../../data');

function getUser(req, res) {
    const userId = parseInt(req.url.split('/')[2]); // Получаем ID пользователя из URL

    const user = users.find(user => user.id === userId);
    if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `User with ID ${userId} not found` }));
    }
}

module.exports = getUser;