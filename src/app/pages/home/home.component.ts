import { Component, Inject, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

import { take } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public listBook: Book[] = [];

  constructor(
    public readonly bookService: BookService,
    @Inject(DOCUMENT) private readonly _document: Document,
  ) { }

  ngOnInit(): void {
    this.getBooks();
    this._document.defaultView?.alert('Holi');
  }

  public getBooks(): void {
    this.bookService.getBooks().pipe(take(1)).subscribe((resp: Book[]) => {
      this.listBook = resp;
    });
  }
}
