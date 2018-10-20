/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IssueTrackerTestModule } from '../../../test.module';
import { IssueIssueTrackerUpdateComponent } from 'app/entities/issue-issue-tracker/issue-issue-tracker-update.component';
import { IssueIssueTrackerService } from 'app/entities/issue-issue-tracker/issue-issue-tracker.service';
import { IssueIssueTracker } from 'app/shared/model/issue-issue-tracker.model';

describe('Component Tests', () => {
    describe('IssueIssueTracker Management Update Component', () => {
        let comp: IssueIssueTrackerUpdateComponent;
        let fixture: ComponentFixture<IssueIssueTrackerUpdateComponent>;
        let service: IssueIssueTrackerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [IssueIssueTrackerUpdateComponent]
            })
                .overrideTemplate(IssueIssueTrackerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IssueIssueTrackerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IssueIssueTrackerService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new IssueIssueTracker(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.issue = entity;
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
                    const entity = new IssueIssueTracker();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.issue = entity;
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
