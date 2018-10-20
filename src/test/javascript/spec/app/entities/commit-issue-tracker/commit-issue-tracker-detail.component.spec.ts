/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IssueTrackerTestModule } from '../../../test.module';
import { CommitIssueTrackerDetailComponent } from 'app/entities/commit-issue-tracker/commit-issue-tracker-detail.component';
import { CommitIssueTracker } from 'app/shared/model/commit-issue-tracker.model';

describe('Component Tests', () => {
    describe('CommitIssueTracker Management Detail Component', () => {
        let comp: CommitIssueTrackerDetailComponent;
        let fixture: ComponentFixture<CommitIssueTrackerDetailComponent>;
        const route = ({ data: of({ commit: new CommitIssueTracker(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [CommitIssueTrackerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CommitIssueTrackerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CommitIssueTrackerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.commit).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
