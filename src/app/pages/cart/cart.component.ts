import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public listCartBook: Book[] = [{
		id: "1",
		name: "Book 1",
		author: "Author name 1",
		isbn: "165464576456",
		description: "Book Description 1",
		photoUrl: "/assets/img/book.png",
		price: 8,
    amount: 2
	},];
  public totalPrice = 0;
  public Math = Math;

  constructor(
    private readonly _bookService: BookService
  ) { }

  ngOnInit(): void {
    this.listCartBook = this._bookService.getBooksFromCart();
    this.totalPrice = this.getTotalPrice(this.listCartBook);
  }

  public getTotalPrice(listCartBook: Book[]): number {
    let totalPrice = 0;
    listCartBook.forEach((book: any) => {
      totalPrice += book.amount * book.price;
    });
    return totalPrice;
  }

  public onInputNumberChange(action: string, book: Book): void {
    const amount = action === 'plus' ? book.amount && book.amount + 1 : book.amount && book.amount - 1;
    book.amount = Number(amount);
    this.listCartBook = this._bookService.updateAmountBook(book);
    this.totalPrice = this.getTotalPrice(this.listCartBook);
  }

  public onClearBooks(): void {
    if (this.listCartBook && this.listCartBook.length > 0) {
      this._clearListCartBook();
    } else {
       console.log("No books available");
    }
  }

  private _clearListCartBook() {
    this.listCartBook = [];
    this._bookService.removeBooksFromCart();
  }


}
