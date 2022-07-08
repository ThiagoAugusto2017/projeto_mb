import express, {Request, Response} from 'express';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.send('Projeto iniciado');
});

const port = 3333;

app.listen(port, async () => {
	console.log(`listening on ${port}`);
});
