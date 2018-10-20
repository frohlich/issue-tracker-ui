/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IssueTrackerTestModule } from '../../../test.module';
import { CommentIssueTrackerUpdateComponent } from 'app/entities/comment-issue-tracker/comment-issue-tracker-update.component';
import { CommentIssueTrackerService } from 'app/entities/comment-issue-tracker/comment-issue-tracker.service';
import { CommentIssueTracker } from 'app/shared/model/comment-issue-tracker.model';

describe('Component Tests', () => {
    describe('CommentIssueTracker Management Update Component', () => {
        let comp: CommentIssueTrackerUpdateComponent;
        let fixture: ComponentFixture<CommentIssueTrackerUpdateComponent>;
        let service: CommentIssueTrackerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [CommentIssueTrackerUpdateComponent]
            })
                .overrideTemplate(CommentIssueTrackerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CommentIssueTrackerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CommentIssueTrackerService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CommentIssueTracker(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.comment = entity;
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
                    const entity = new CommentIssueTracker();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.comment = entity;
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
