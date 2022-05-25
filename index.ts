import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import rateLimit from 'express-rate-limit';

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(json());

app.get('/', (req, res) => res.send('hello world'))

app.listen(3001, '0.0.0.0', () => {
	console.log('Listening on port http://localhost:3001');
});
