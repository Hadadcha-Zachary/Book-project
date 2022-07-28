import { Component, OnInit } from '@angular/core';
import Book from '../../model/Book';

const serverLocation = 'http://localhost:3000';

export const NEW_PAGE_MESSAGE_TYPE = 'NEW_PAGE_MESSAGE_TYPE';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  newPageWindow: any;
  book?: Book;

  ngOnInit() {
    window.addEventListener("message", this.handleMessage.bind(this), false);
    this.loadBook().then(async (rawBook: any) => {
      const book = await rawBook.json();
      this.book = new Book(book.pages);
    });
  }

  async loadBook() {
    return await fetch(serverLocation + '/book');
  }

  openNewPageEditor() {
    if (this.newPageWindow) {
      return; // Si une page est déjà en train d'être ajoutée, on ne fait rien
    }

    let windowFeatures = "popup";
    this.newPageWindow = window.open("/new", "_blank", windowFeatures);

    // Détection de la fermeture de la popup
    this.newPageWindow.addEventListener('beforeunload', () => {
      this.newPageWindow = null;
    });
  }

  handleMessage(message: any) {
    if (message.data.type === NEW_PAGE_MESSAGE_TYPE) {
      // Envoyer la page au serveur
      fetch(serverLocation + '/add-new-page', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          page: message.data.content
        })
      }).then(async (response) => {
        // Recharger le livre
        const updatedBook: any = await response.json();
        this.book = new Book(updatedBook.pages);
      });
    }
  }
}
