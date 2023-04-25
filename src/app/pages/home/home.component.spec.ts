import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BookService } from "../../services/book.service";
import { of } from "rxjs";

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

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
            declarations: [HomeComponent],
            providers: [BookService],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should component be created', () => {
        expect(component).toBeTruthy();
    });

    // 27.- Test a suscripciones (subscribe, observable)
    it('getBooks() get books from subscription', () => {
        const bookService = fixture.debugElement.injector.get(BookService);
        const spy = jest.spyOn(bookService, 'getBooks').mockReturnValueOnce(of(bookList));
        component.getBooks();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(component.listBook.length).toBe(1);
        expect(component.listBook).toEqual(bookList);
    });
});