import Express, { json, response } from 'express';
import cors from 'cors';
import fs from 'fs';

const app = Express();
const port = 3001;

app.use(cors());

const getFile = (fileName) => {
	return new Promise((resolve, reject) => {
		fs.readFile(fileName, 'utf8', (err, data) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(data);
		});
	});
};
const cachedColors = await getFile('./colorSample.json');

// .then((data) => {
// 	const colors = JSON.parse(data);
// 	cachedColors = colors;
// })
// .catch((err) => res.send(err));

const getColor = (color, listOfColors) => {
	const result = listOfColors.filter((item) => {
		return item.color === color;
	});
	return result;
};

const queryColors = (query, listOfColors) => {
	const results = listOfColors.filter((color) => {
		let check = false;
		for (let key in query) {
			if (query[key] === color[key]) {
				check = true;
			} else {
				check = false;
			}
		}
		if (!!check) {
			return color;
		}
	});
	console.log(results);
	return results;
};

app.get('/colors/:color', (req, res) => {
	res.json(getColor(req.params.color, cachedColors.colors));
});

app.get('/colors', (req, res) => {
	res.json(queryColors(req.query, cachedColors.colors));
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
