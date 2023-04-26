import { TestBed } from "@angular/core/testing";
import { BookService } from "./book.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../models/book.model";
import { environment } from "../../environments/environment";
import swal from 'sweetalert2';

describe('BookService', () => {
    let service: BookService;
    let httpMock: HttpTestingController;

    const bookList = [{
        id: "1",
        name: "Book 1",
        author: "Author name 1",
        isbn: "165464576456",
        description: "Book Description 1",
        photoUrl: "/assets/img/book.png",
        price: 8,
        amount: 1
    }];

    const book: Book = {
        id: "1",
        name: "Book 1",
        author: "Author name 1",
        isbn: "165464576456",
        description: "Book Description 1",
        photoUrl: "/assets/img/book.png",
        price: 8
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [BookService],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        })
    });

    beforeEach(() => {
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify() // Esto hace que no haya peticiones pendientes entre tests
        jest.resetAllMocks();
        localStorage.clear();
    });

    it('should service be created', () => {
        expect(service).toBeTruthy();
    });

    // 33.- Test a un servicio con peticiones API
    it('getBooks should return a list of books and makes a GET call', () => {
        service.getBooks().subscribe((res: Book[]) => {
            expect(res).toEqual(bookList);
        });

        const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
        expect(req.request.method).toBe('GET');
        // Flush simula que una petición se ha hecho y que nos devuelva un observable del parámetro que le pasemos
        req.flush(bookList);
    });

    // 34.- Finalizando BookService
    describe('getBooksFromCart()', () => {
        it('should getBooksFromCart return an empty array if localStorage is empty', () => {
            const bookList = service.getBooksFromCart();
            expect(bookList.length).toBe(0);
        });
    
        it('should getBooksFromCart return an array of books if it exists in localStorage', () => {
            // OJO: esto podemos hacerlo porque hemos seteado un mock del localStorage en el archivo setup-jest.ts mediante Object.defineProperty
            localStorage.setItem('listCartBook', JSON.stringify(bookList));
            const newBookList = service.getBooksFromCart();
            expect(newBookList.length).toBe(1);
        });
    });
    
    describe('removeBooksFromCart()', () => {
        it('removeBooksFromCart should set listCartBook as empty string in localStorage', () => {
            const toastMock = {
                fire: () => null
            } as any;
        
            const toastMockSpy = jest.spyOn(swal, 'mixin').mockImplementation(() => {
                return toastMock;
            });
            service.addBookToCart(book);
            let newBookList = service.getBooksFromCart();
            expect(toastMockSpy).toHaveBeenCalledTimes(1);
            expect(newBookList.length).toBe(1);
            service.removeBooksFromCart();
            expect(localStorage.getItem('listCartBook')).toBe('');
        });
    });

    describe('addBookToCart()', () => {
        it('should addBookToCart create a list with the book', () => {
            const toastMock = {
                fire: () => null
            } as any;
        
            const toastMockSpy = jest.spyOn(swal, 'mixin').mockImplementation(() => {
                return toastMock;
            });
    
            let newBookList = service.getBooksFromCart();
            expect(newBookList.length).toBe(0);
            
            service.addBookToCart(book);
            newBookList = service.getBooksFromCart();
            expect(newBookList.length).toBe(1);
            expect(toastMockSpy).toHaveBeenCalledTimes(1);
        });
    
        it('should addBookToCart add a new book if localStorage is NOT empty', () => {
            const toastMock = {
                fire: () => null
            } as any;
        
            const toastMockSpy = jest.spyOn(swal, 'mixin').mockImplementation(() => {
                return toastMock;
            });
            localStorage.setItem('listCartBook', JSON.stringify([bookList]));
            service.addBookToCart(book);
            expect(book.amount).toBe(1);
            
            expect(toastMockSpy).toHaveBeenCalled();
        });

        it('should addBookToCart add a new book to the existing one', () => {
            const toastMock = {
                fire: () => null
            } as any;

            const toastMockSpy = jest.spyOn(swal, 'mixin').mockImplementation(() => {
                return toastMock;
            });

            localStorage.setItem('listCartBook', JSON.stringify([book, book]));
            service.addBookToCart(book);

            expect(toastMockSpy).toHaveBeenCalled();
        });
    });

    describe('updateAmountBook', () => {
        it('should add a new book', () => {
            let bookList = service.getBooksFromCart();
            localStorage.setItem('listCartBook', JSON.stringify([book]));
            bookList = service.getBooksFromCart();
            service.updateAmountBook(book);
            expect(bookList.length).toBe(1);
        }); 
        it('should remove a book', () => {
            const book2: Book = {
                id: "1",
                name: "Book 1",
                author: "Author name 1",
                isbn: "165464576456",
                description: "Book Description 1",
                photoUrl: "/assets/img/book.png",
                price: 8,
                amount: 0
            };
            let bookList = service.getBooksFromCart();
            localStorage.setItem('listCartBook', JSON.stringify([book]));
            bookList = service.getBooksFromCart();
            service.updateAmountBook(book2);
            bookList = service.getBooksFromCart();
            expect(bookList.length).toBe(0);
        }); 
    });
});