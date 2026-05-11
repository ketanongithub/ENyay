import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { BreadcrumbsComponent } from '@shared/components/breadcrumbs/breadcrumbs.component';

/**
 * Lightweight placeholder for the Family Contacts directory. Family contact
 * data lives inside each InmateRecord today (audioContact / videoContact);
 * this page is a forward-looking stub so the sidebar nav has somewhere to
 * land while the dedicated cross-inmate contacts grid is being designed.
 */
@Component({
    standalone: true,
    selector: 'app-family-contacts',
    imports: [RouterLink, PageHeaderComponent, BreadcrumbsComponent],
    animations: [appModuleAnimation()],
    template: `
        <div [@routerTransition]>
            <app-breadcrumbs
                [trail]="[
                    { label: 'Admin', link: ['/app/admin/dashboard'], icon: 'fas fa-home' },
                    { label: 'Inmate Management', link: ['/app/admin/inmate-management'] },
                    { label: 'Family Contacts' }
                ]"></app-breadcrumbs>

            <app-page-header
                title="Family Contacts"
                subtitle="Authorised audio &amp; video call contacts across all inmates">
                <a class="btn btn-default" [routerLink]="['/app/admin/inmate-management']">
                    <i class="fas fa-arrow-left"></i> Back to inmates
                </a>
            </app-page-header>

            <section class="content px-2 pb-3">
                <div class="container-fluid">
                    <div class="empty-state">
                        <i class="fas fa-address-book"></i>
                        <h4>Family Contacts directory — coming soon</h4>
                        <p>
                            For now, audio and video call contacts are managed inside each inmate's
                            profile. Open an inmate from the
                            <a [routerLink]="['/app/admin/inmate-management']">Inmate List</a>
                            and switch to the <strong>Audio Call</strong> or
                            <strong>Video Call</strong> tab to maintain their family contact details.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    `,
    styles: [
        `
            .empty-state {
                background: #fff;
                border-radius: 12px;
                padding: 3rem 2rem;
                text-align: center;
                box-shadow: 0 1px 3px rgba(20, 30, 70, 0.04);
            }
            .empty-state i {
                font-size: 3rem;
                color: #1a73e8;
                margin-bottom: 1rem;
            }
            .empty-state h4 {
                color: #1a3c7a;
                font-weight: 600;
                margin-bottom: 0.5rem;
            }
            .empty-state p {
                color: #6c7480;
                max-width: 560px;
                margin: 0 auto;
            }
            .empty-state a {
                color: #1a73e8;
                text-decoration: none;
                font-weight: 500;
            }
            .empty-state a:hover {
                text-decoration: underline;
            }
        `,
    ],
})
export class FamilyContactsComponent {}
