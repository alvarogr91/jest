import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavComponent } from "./nav.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from "@angular/router";

class ComponentRoutingTest {

}

describe('NavComponent', () => {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([
                { path: 'home', component: ComponentRoutingTest },
                { path: 'cart', component: ComponentRoutingTest }
            ])],
            declarations: [NavComponent],
            schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should NavComponent be created', () => {
        expect(component).toBeTruthy();
    });

    describe('navTo()', () => {
        it('should navTo navigate to route', () => {
            const router = TestBed.inject(Router);
            const spy = jest.spyOn(router, 'navigate');
            component.navTo('home');
            expect(spy).toHaveBeenCalledWith(['/home']);
        });
    });
});