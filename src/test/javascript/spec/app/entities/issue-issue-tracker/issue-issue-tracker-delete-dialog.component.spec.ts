/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IssueTrackerTestModule } from '../../../test.module';
import { IssueIssueTrackerDeleteDialogComponent } from 'app/entities/issue-issue-tracker/issue-issue-tracker-delete-dialog.component';
import { IssueIssueTrackerService } from 'app/entities/issue-issue-tracker/issue-issue-tracker.service';

describe('Component Tests', () => {
    describe('IssueIssueTracker Management Delete Component', () => {
        let comp: IssueIssueTrackerDeleteDialogComponent;
        let fixture: ComponentFixture<IssueIssueTrackerDeleteDialogComponent>;
        let service: IssueIssueTrackerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [IssueIssueTrackerDeleteDialogComponent]
            })
                .overrideTemplate(IssueIssueTrackerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IssueIssueTrackerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IssueIssueTrackerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
