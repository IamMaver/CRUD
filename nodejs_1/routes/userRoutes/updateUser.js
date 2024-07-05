const { parse } = require('querystring');
const users = require('../../data');

function updateUser(req, res) {
    const userId = parseInt(req.url.split('/')[2]); // Получаем ID пользователя из URL
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const data = parse(body);
        const { name, age } = data;

        const index = users.findIndex(user => user.id === userId);
        if (index !== -1) {
            users[index] = { id: userId, name, age };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users[index]));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `User with ID ${userId} not found` }));
        }
    });
}

module.exports = updateUser;
