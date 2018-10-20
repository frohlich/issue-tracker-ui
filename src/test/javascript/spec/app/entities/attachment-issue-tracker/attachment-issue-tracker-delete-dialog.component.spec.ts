/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IssueTrackerTestModule } from '../../../test.module';
import { AttachmentIssueTrackerDeleteDialogComponent } from 'app/entities/attachment-issue-tracker/attachment-issue-tracker-delete-dialog.component';
import { AttachmentIssueTrackerService } from 'app/entities/attachment-issue-tracker/attachment-issue-tracker.service';

describe('Component Tests', () => {
    describe('AttachmentIssueTracker Management Delete Component', () => {
        let comp: AttachmentIssueTrackerDeleteDialogComponent;
        let fixture: ComponentFixture<AttachmentIssueTrackerDeleteDialogComponent>;
        let service: AttachmentIssueTrackerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [AttachmentIssueTrackerDeleteDialogComponent]
            })
                .overrideTemplate(AttachmentIssueTrackerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AttachmentIssueTrackerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttachmentIssueTrackerService);
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
