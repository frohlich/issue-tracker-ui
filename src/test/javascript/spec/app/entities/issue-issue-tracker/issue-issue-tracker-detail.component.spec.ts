/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IssueTrackerTestModule } from '../../../test.module';
import { IssueIssueTrackerDetailComponent } from 'app/entities/issue-issue-tracker/issue-issue-tracker-detail.component';
import { IssueIssueTracker } from 'app/shared/model/issue-issue-tracker.model';

describe('Component Tests', () => {
    describe('IssueIssueTracker Management Detail Component', () => {
        let comp: IssueIssueTrackerDetailComponent;
        let fixture: ComponentFixture<IssueIssueTrackerDetailComponent>;
        const route = ({ data: of({ issue: new IssueIssueTracker(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [IssueIssueTrackerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(IssueIssueTrackerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(IssueIssueTrackerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.issue).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
