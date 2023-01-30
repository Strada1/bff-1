const { connectBase } = require('./connect');
const { app } = require('./routes');

const PORT = 4500;

connectBase();

app.listen(PORT, () => console.log(`Запускаю сервер с портом ${PORT}`));
