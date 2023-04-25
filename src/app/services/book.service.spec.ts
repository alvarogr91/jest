import { TestBed } from "@angular/core/testing";
import { BookService } from "./book.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../models/book.model";
import { environment } from "../../environments/environment";

// 33.- Test a un servicio con peticiones API
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
        amount: 2
	}];

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
    });

    it('should service be created', () => {
        expect(service).toBeTruthy();
    });

    it('getBooks should return a list of books and makes a GET call', () => {
        service.getBooks().subscribe((res: Book[]) => {
            expect(res).toEqual(bookList);
        });

        const req = httpMock.expectOne(environment.API_REST_URL + `/book`);
        expect(req.request.method).toBe('GET');
        // Flush simula que una petición se ha hecho y que nos devuelva un observable del parámetro que le pasemos
        req.flush(bookList);
    });

});