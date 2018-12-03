import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProjectIssueTracker } from 'app/shared/model/project-issue-tracker.model';

@Component({
    selector: 'jhi-project-issue-tracker-detail',
    templateUrl: './project-issue-tracker-detail.component.html'
})
export class ProjectIssueTrackerDetailComponent implements OnInit {
    project: IProjectIssueTracker;

    page;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ project }) => {
            this.project = project;
            console.log('DATA', project);
        });
    }

    previousState() {
        window.history.back();
    }

    suspend() {
        alert('suspender');
    }

    reset() {
        this.page = 0;
        // this.projects = [];
        // this.loadAll();
    }
}
