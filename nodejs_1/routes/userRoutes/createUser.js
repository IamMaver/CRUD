const { parse } = require('querystring');
const users = require('../../data'); // Правильный путь к data.js

let currentId = 1;

function createUser(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const data = parse(body);
        const { name, age } = data;

        const newUser = { id: currentId++, name, age };
        users.push(newUser);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
    });
}

module.exports = createUser;