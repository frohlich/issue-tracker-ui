/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IssueTrackerTestModule } from '../../../test.module';
import { AttachmentIssueTrackerDetailComponent } from 'app/entities/attachment-issue-tracker/attachment-issue-tracker-detail.component';
import { AttachmentIssueTracker } from 'app/shared/model/attachment-issue-tracker.model';

describe('Component Tests', () => {
    describe('AttachmentIssueTracker Management Detail Component', () => {
        let comp: AttachmentIssueTrackerDetailComponent;
        let fixture: ComponentFixture<AttachmentIssueTrackerDetailComponent>;
        const route = ({ data: of({ attachment: new AttachmentIssueTracker(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IssueTrackerTestModule],
                declarations: [AttachmentIssueTrackerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AttachmentIssueTrackerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AttachmentIssueTrackerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.attachment).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
