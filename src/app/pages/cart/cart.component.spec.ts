import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartComponent } from "./cart.component";
import { BookService } from "../../services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";

const bookList: Book[] = [
    {
        name: 'Name',
        author: 'Author',
        isbn: 'isbn',
        price: 15,
        amount: 2
    },
    {
        name: 'Name',
        author: 'Author',
        isbn: 'isbn',
        price: 20,
        amount: 1
    },
    {
        name: 'Name',
        author: 'Author',
        isbn: 'isbn',
        price: 8,
        amount: 7
    }
]

describe('Cart Component', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    let service: BookService;

    // Test configuration
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            declarations: [ CartComponent ],
            providers: [ BookService ],
            schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
        })
    });

    // Test instantiation
    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(BookService);
        fixture.detectChanges(); 
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // 23.- Test a métodos con return
    it('getTotalPrice should return an amount', () => {
        const totalPrice = component.getTotalPrice(bookList);
        expect(totalPrice).toBeGreaterThan(0);
    });

    // 24.- Test a métodos sin return (uso de spyOn)
    it('onInputNumberChange increases correctly', () => {
        const action = 'plus';
        const book: Book = bookList[0];
        const spy = jest.spyOn(service, 'updateAmountBook').mockImplementation(() => [] );
        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation(() => 0);
        expect(book.amount).toBe(2);
        component.onInputNumberChange(action, book);
        expect(book.amount).toBe(3);
        expect(spy).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    it('onInputNumberChange decreases correctly', () => {
        const action = 'minus';
        const book: Book = bookList[0];
        const spy = jest.spyOn(service, 'updateAmountBook').mockImplementation(() => [] );
        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation(() => 0);
        expect(book.amount).toBe(3);
        component.onInputNumberChange(action, book);
        expect(book.amount).toBe(2);
        expect(spy).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });
});