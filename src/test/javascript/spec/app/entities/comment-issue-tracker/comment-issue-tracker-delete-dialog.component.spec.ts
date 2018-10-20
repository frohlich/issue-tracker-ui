/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IssueTrackerTestModule } from '../../../test.module';
import { CommentIssueTrackerDeleteDialogComponent } from 'app/entities/comment-issue-tracker/comment-issue-tracker-delete-dialog.component';
import { CommentIssueTrackerService } from 'app/entities/comment-issue-tracker/comment-issue-tracker.service';

describe('Component Tests', () => {
    describe('CommentIssueTracker Management Delete Component', () => {
        let comp: CommentIssueTrackerDeleteDialogComponent;
        let fixture: ComponentFixture<CommentIssueTrackerDeleteDialogComponent>;
        let service: CommentIssueTrackerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [CommentIssueTrackerDeleteDialogComponent]
            })
                .overrideTemplate(CommentIssueTrackerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CommentIssueTrackerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentIssueTrackerService);
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
