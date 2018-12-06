import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of, forkJoin } from 'rxjs';
import { map, tap, mergeMap } from 'rxjs/operators';
import { ProjectIssueTracker } from 'app/shared/model/project-issue-tracker.model';
import { ProjectIssueTrackerService } from './project-issue-tracker.service';
import { ProjectIssueTrackerComponent } from './project-issue-tracker.component';
import { ProjectIssueTrackerDetailComponent } from './project-issue-tracker-detail.component';
import { ProjectIssueTrackerUpdateComponent } from './project-issue-tracker-update.component';
import { ProjectIssueTrackerDeletePopupComponent } from './project-issue-tracker-delete-dialog.component';
import { IProjectIssueTracker } from 'app/shared/model/project-issue-tracker.model';
import { IssueIssueTrackerService } from '../issue-issue-tracker/issue-issue-tracker.service';

@Injectable({ providedIn: 'root' })
export class ProjectIssueTrackerResolve implements Resolve<IProjectIssueTracker> {
    constructor(private service: ProjectIssueTrackerService, private issueService: IssueIssueTrackerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                map((project: HttpResponse<ProjectIssueTracker>) => project.body),
                mergeMap(p =>
                    this.issueService.findByProjectId(p.id).pipe(
                        map(issues => {
                            p.issues = issues.body;
                            return p;
                        })
                    )
                )
            );
        }
        return of(new ProjectIssueTracker());
    }
}

export const projectRoute: Routes = [
    {
        path: 'project-issue-tracker',
        component: ProjectIssueTrackerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projetos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'project-issue-tracker/:id/view',
        component: ProjectIssueTrackerDetailComponent,
        resolve: {
            project: ProjectIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projetos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'project-issue-tracker/new',
        component: ProjectIssueTrackerUpdateComponent,
        resolve: {
            project: ProjectIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projetos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'project-issue-tracker/:id/edit',
        component: ProjectIssueTrackerUpdateComponent,
        resolve: {
            project: ProjectIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projetos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const projectPopupRoute: Routes = [
    {
        path: 'project-issue-tracker/:id/delete',
        component: ProjectIssueTrackerDeletePopupComponent,
        resolve: {
            project: ProjectIssueTrackerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Projetos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
