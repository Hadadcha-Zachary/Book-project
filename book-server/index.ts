import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import cors from 'cors';
import Page from './src/model/Page';
import Book from './src/model/Book';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

const bookFile = path.resolve(__dirname, 'book.json');

const getBook = (): Book => {
  const data = fs.readFileSync(bookFile);
  return new Book(JSON.parse(data.toString()).pages);
};

const saveBook = (bookPages: Array<Page>): any => {
  fs.writeFileSync(bookFile, JSON.stringify({
    pages: bookPages
  }));
};

app.get('/book', (req, res) => {
  res.send(getBook());
});

app.post('/add-new-page', (req, res) => {
  const book: Book = getBook();
  book.pages.push(new Page(req.body.page)); // AJout de la page au livre
  saveBook(book.pages); // Sauvegarde du livre
  res.send(getBook()); // On retourne le contenu mis à jour
});

app.listen(port, () => {
  console.log(`Serveur de gestion du livre en cours sur le port ${port}`)
})
