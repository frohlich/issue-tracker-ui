/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IssueTrackerTestModule } from '../../../test.module';
import { ProjectIssueTrackerUpdateComponent } from 'app/entities/project-issue-tracker/project-issue-tracker-update.component';
import { ProjectIssueTrackerService } from 'app/entities/project-issue-tracker/project-issue-tracker.service';
import { ProjectIssueTracker } from 'app/shared/model/project-issue-tracker.model';

describe('Component Tests', () => {
    describe('ProjectIssueTracker Management Update Component', () => {
        let comp: ProjectIssueTrackerUpdateComponent;
        let fixture: ComponentFixture<ProjectIssueTrackerUpdateComponent>;
        let service: ProjectIssueTrackerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [ProjectIssueTrackerUpdateComponent]
            })
                .overrideTemplate(ProjectIssueTrackerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProjectIssueTrackerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectIssueTrackerService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProjectIssueTracker(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.project = entity;
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
                    const entity = new ProjectIssueTracker();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.project = entity;
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
