/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IssueTrackerTestModule } from '../../../test.module';
import { IssueHistoryIssueTrackerUpdateComponent } from 'app/entities/issue-history-issue-tracker/issue-history-issue-tracker-update.component';
import { IssueHistoryIssueTrackerService } from 'app/entities/issue-history-issue-tracker/issue-history-issue-tracker.service';
import { IssueHistoryIssueTracker } from 'app/shared/model/issue-history-issue-tracker.model';

describe('Component Tests', () => {
    describe('IssueHistoryIssueTracker Management Update Component', () => {
        let comp: IssueHistoryIssueTrackerUpdateComponent;
        let fixture: ComponentFixture<IssueHistoryIssueTrackerUpdateComponent>;
        let service: IssueHistoryIssueTrackerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [IssueHistoryIssueTrackerUpdateComponent]
            })
                .overrideTemplate(IssueHistoryIssueTrackerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(IssueHistoryIssueTrackerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IssueHistoryIssueTrackerService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new IssueHistoryIssueTracker(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.issueHistory = entity;
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
                    const entity = new IssueHistoryIssueTracker();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.issueHistory = entity;
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
