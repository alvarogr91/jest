import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe('XXXXX Component', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;

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
        fixture.detectChanges(); 
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});