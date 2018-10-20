/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IssueTrackerTestModule } from '../../../test.module';
import { CommitIssueTrackerUpdateComponent } from 'app/entities/commit-issue-tracker/commit-issue-tracker-update.component';
import { CommitIssueTrackerService } from 'app/entities/commit-issue-tracker/commit-issue-tracker.service';
import { CommitIssueTracker } from 'app/shared/model/commit-issue-tracker.model';

describe('Component Tests', () => {
    describe('CommitIssueTracker Management Update Component', () => {
        let comp: CommitIssueTrackerUpdateComponent;
        let fixture: ComponentFixture<CommitIssueTrackerUpdateComponent>;
        let service: CommitIssueTrackerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [CommitIssueTrackerUpdateComponent]
            })
                .overrideTemplate(CommitIssueTrackerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CommitIssueTrackerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommitIssueTrackerService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CommitIssueTracker(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.commit = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CommitIssueTracker();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.commit = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
