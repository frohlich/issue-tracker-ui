/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IssueTrackerTestModule } from '../../../test.module';
import { ProjectIssueTrackerDeleteDialogComponent } from 'app/entities/project-issue-tracker/project-issue-tracker-delete-dialog.component';
import { ProjectIssueTrackerService } from 'app/entities/project-issue-tracker/project-issue-tracker.service';

describe('Component Tests', () => {
    describe('ProjectIssueTracker Management Delete Component', () => {
        let comp: ProjectIssueTrackerDeleteDialogComponent;
        let fixture: ComponentFixture<ProjectIssueTrackerDeleteDialogComponent>;
        let service: ProjectIssueTrackerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [ProjectIssueTrackerDeleteDialogComponent]
            })
                .overrideTemplate(ProjectIssueTrackerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProjectIssueTrackerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectIssueTrackerService);
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
