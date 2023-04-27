import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormComponent } from "./form.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe('FormComponent', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [FormComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should FormComponent be created', () => {
        expect(component).toBeTruthy();
    });

    describe('instanceForm()', () => {
        it('should name be required', () => {
            const name = component.form.get('name');
            name?.setValue('');
            expect(name?.valid).toBe(false);
        });

        it('should name field be invalid with more than 5 chars', () => {
            const name = component.form.get('name');
            name?.setValue('test name');
            expect(name?.valid).toBe(false);
        });

        it('should name field be valid with less than 5 chars', () => {
            const name = component.form.get('name');
            name?.setValue('name');
            expect(name?.valid).toBe(true);
        });

        it('should email be required', () => {
            const email = component.form.get('email');
            email?.setValue('');
            expect(email?.valid).toBe(false);
        });

        it('should email be valid', () => {
            const email = component.form.get('email');
            email?.setValue('test@');
            expect(email?.valid).toBe(false);
            email?.setValue('test@test.com');
            expect(email?.valid).toBe(true);
        });

        it('should email be valid', () => {
            const name = component.form.get('name');
            const email = component.form.get('email');
            name?.setValue('Jack');
            email?.setValue('test@test.com');
            expect(component.form.valid).toBe(true);
        });
    });

});