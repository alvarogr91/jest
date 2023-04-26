import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

const dialogRefMock = {
    close: () => { }
};

describe('ConfirmationDialog', () => {
    let component: ConfirmationDialogComponent;
    let fixture: ComponentFixture<ConfirmationDialogComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ConfirmationDialogComponent
            ],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: { } },
                { provide: MatDialogRef, useValue: dialogRefMock },
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmationDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // 40.- Tests al dialog
    it('should ConfirmationDialogComponent be created', () => {
        expect(component).toBeTruthy();
    });

    it('should onConfirm send true', () => {
        const service = TestBed.inject(MatDialogRef);
        const dialogSpy = jest.spyOn(service, 'close');
        component.onConfirm();
        expect(dialogSpy).toHaveBeenCalledWith(true);
    });

    it('should onDismiss send false', () => {
        const service = TestBed.inject(MatDialogRef);
        const dialogSpy = jest.spyOn(service, 'close');
        component.onDismiss();
        expect(dialogSpy).toHaveBeenCalledWith(false);
    });

});