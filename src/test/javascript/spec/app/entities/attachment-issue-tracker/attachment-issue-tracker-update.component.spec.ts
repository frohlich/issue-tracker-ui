/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { IssueTrackerTestModule } from '../../../test.module';
import { AttachmentIssueTrackerUpdateComponent } from 'app/entities/attachment-issue-tracker/attachment-issue-tracker-update.component';
import { AttachmentIssueTrackerService } from 'app/entities/attachment-issue-tracker/attachment-issue-tracker.service';
import { AttachmentIssueTracker } from 'app/shared/model/attachment-issue-tracker.model';

describe('Component Tests', () => {
    describe('AttachmentIssueTracker Management Update Component', () => {
        let comp: AttachmentIssueTrackerUpdateComponent;
        let fixture: ComponentFixture<AttachmentIssueTrackerUpdateComponent>;
        let service: AttachmentIssueTrackerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [AttachmentIssueTrackerUpdateComponent]
            })
                .overrideTemplate(AttachmentIssueTrackerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AttachmentIssueTrackerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AttachmentIssueTrackerService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AttachmentIssueTracker(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.attachment = entity;
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
                    const entity = new AttachmentIssueTracker();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.attachment = entity;
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
