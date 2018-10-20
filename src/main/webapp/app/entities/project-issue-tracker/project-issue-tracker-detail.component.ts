import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProjectIssueTracker } from 'app/shared/model/project-issue-tracker.model';

@Component({
    selector: 'jhi-project-issue-tracker-detail',
    templateUrl: './project-issue-tracker-detail.component.html'
})
export class ProjectIssueTrackerDetailComponent implements OnInit {
    project: IProjectIssueTracker;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ project }) => {
            this.project = project;
        });
    }

    previousState() {
        window.history.back();
    }
}
