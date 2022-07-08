import express, { Request, Response } from 'express';
import 'dotenv/config';
import config from 'config';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.send('Projeto iniciado');
});

const acesso = {
	PORT_APP: config.get<number>('PORT_APP'),
	PORT: config.get<number>('PORT'),
};

app.listen(acesso.PORT || acesso.PORT_APP, async () => {
	console.log(`listening on ${acesso.PORT}`);
});
