import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'jhi-dashboard',
    templateUrl: './dashboard.component.html',
    styles: []
})
export class DashboardComponent implements OnInit {
    projects = 0;
    commits = 0;
    users = 0;
    issues = 0;

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.http.get<{ commits: number; projects: number; users: number; issues: number }>('/api/dashboard/statistics').subscribe(data => {
            this.commits = data.commits;
            this.projects = data.projects;
            this.users = data.users;
            this.issues = data.issues;
        });
    }
}
