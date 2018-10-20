/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IssueTrackerTestModule } from '../../../test.module';
import { IssueHistoryIssueTrackerDeleteDialogComponent } from 'app/entities/issue-history-issue-tracker/issue-history-issue-tracker-delete-dialog.component';
import { IssueHistoryIssueTrackerService } from 'app/entities/issue-history-issue-tracker/issue-history-issue-tracker.service';

describe('Component Tests', () => {
    describe('IssueHistoryIssueTracker Management Delete Component', () => {
        let comp: IssueHistoryIssueTrackerDeleteDialogComponent;
        let fixture: ComponentFixture<IssueHistoryIssueTrackerDeleteDialogComponent>;
        let service: IssueHistoryIssueTrackerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [IssueHistoryIssueTrackerDeleteDialogComponent]
            })
                .overrideTemplate(IssueHistoryIssueTrackerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IssueHistoryIssueTrackerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IssueHistoryIssueTrackerService);
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
