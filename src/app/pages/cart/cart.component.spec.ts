import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CartComponent } from "./cart.component";
import { BookService } from "../../services/book.service";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "src/app/models/book.model";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { of } from "rxjs";

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
            imports: [HttpClientTestingModule, MatDialogModule],
            declarations: [CartComponent],
            providers: [BookService, {
                provide: MatDialog, useValue: {
                    open: () => {
                        return {
                            afterClosed: () => { return of(true) }
                        }
                    }
                }
            }],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        })
    });

    // Test instantiation
    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(BookService);
        fixture.detectChanges();
        // Agregamos esta llamada al servicio porque aparece en ngOnInit:
        jest.spyOn(service, 'getBooksFromCart').mockImplementation(() => bookList);
    });

    afterEach(() => {
        fixture.destroy();
        jest.resetAllMocks();
        localStorage.clear();
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
        const spy = jest.spyOn(service, 'updateAmountBook').mockImplementation(() => []);
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
        const spy = jest.spyOn(service, 'updateAmountBook').mockImplementation(() => []);
        const spy2 = jest.spyOn(component, 'getTotalPrice').mockImplementation(() => 0);
        expect(book.amount).toBe(3);
        component.onInputNumberChange(action, book);
        expect(book.amount).toBe(2);
        expect(spy).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    // 25.- Test a métodos privados
    describe('onClearBooks()', () => {
        // const spy = jest.spyOn(service, 'removeBooksFromCart').mockImplementation(() => null);
        // const spy2 = jest.spyOn(component as any, '_clearListCartBook')
        // component.listCartBook = bookList;
        // component.onClearBooks();
        // expect(component.listCartBook.length).toBe(0);
        // expect(spy).toHaveBeenCalled();
        // expect(spy2).toHaveBeenCalled();
        // component.listCartBook = [];
        // component.onClearBooks();
        // expect(spy).toHaveBeenCalled();
        // expect(spy2).toHaveBeenCalled();

        // 38.- Usando MatDialog
        // 39.- Adaptando tests en CartComponent
        it('should open dialog', () => {
            localStorage.setItem('listCartBook', JSON.stringify(bookList));
            component.listCartBook = JSON.parse(JSON.stringify(localStorage.getItem('listCartBook')));
            component.onClearBooks();
            expect(component.listCartBook).toBeTruthy();
        });
        it('should NOT open dialog', () => {
            localStorage.setItem('listCartBook', '');
            component.listCartBook = JSON.parse(JSON.stringify(localStorage.getItem('listCartBook')));
            component.onClearBooks();
            expect(component.listCartBook).not.toBeTruthy();
        });
    });

    it('_clearListCartBook works', () => {
        const spy = jest.spyOn(service, 'removeBooksFromCart').mockImplementation(() => null);
        component.listCartBook = bookList;
        component['_clearListCartBook']();
        expect(component.listCartBook.length).toBe(0);
        expect(spy).toHaveBeenCalled();
    });

    // 29.- xit, xdescribe, fit, fdescribe, it.only, describe.only
    // xit hace que nos saltemos un test en concreto
    // xdescribe hace que nos saltemos todos los tests dentro de un describe
    // fit hace que solamente se lancen los tests de un it en concreto
    // it.only hace lo mismo que fit
    // fdescribe hace que solamente se lancen los tests de un describe concreto
    // describe.only hace lo mismo que fdescribe
});