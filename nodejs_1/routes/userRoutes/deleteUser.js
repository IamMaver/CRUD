const users = require('../../data');

function deleteUser(req, res) {
    const userId = parseInt(req.url.split('/')[2]); // Получаем ID пользователя из URL

    const index = users.findIndex(user => user.id === userId);
    if (index !== -1) {
        const deletedUser = users.splice(index, 1);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(deletedUser[0]));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `User with ID ${userId} not found` }));
    }
}

module.exports = deleteUser;