/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IssueTrackerTestModule } from '../../../test.module';
import { CommentIssueTrackerDetailComponent } from 'app/entities/comment-issue-tracker/comment-issue-tracker-detail.component';
import { CommentIssueTracker } from 'app/shared/model/comment-issue-tracker.model';

describe('Component Tests', () => {
    describe('CommentIssueTracker Management Detail Component', () => {
        let comp: CommentIssueTrackerDetailComponent;
        let fixture: ComponentFixture<CommentIssueTrackerDetailComponent>;
        const route = ({ data: of({ comment: new CommentIssueTracker(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [CommentIssueTrackerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CommentIssueTrackerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CommentIssueTrackerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.comment).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
