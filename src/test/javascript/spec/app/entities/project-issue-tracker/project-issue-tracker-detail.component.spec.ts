/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IssueTrackerTestModule } from '../../../test.module';
import { ProjectIssueTrackerDetailComponent } from 'app/entities/project-issue-tracker/project-issue-tracker-detail.component';
import { ProjectIssueTracker } from 'app/shared/model/project-issue-tracker.model';

describe('Component Tests', () => {
    describe('ProjectIssueTracker Management Detail Component', () => {
        let comp: ProjectIssueTrackerDetailComponent;
        let fixture: ComponentFixture<ProjectIssueTrackerDetailComponent>;
        const route = ({ data: of({ project: new ProjectIssueTracker(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [ProjectIssueTrackerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProjectIssueTrackerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProjectIssueTrackerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.project).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
