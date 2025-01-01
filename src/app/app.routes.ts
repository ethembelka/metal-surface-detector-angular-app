import { Routes } from '@angular/router';
import { HomePageComponent } from './component/home-page/home-page.component';
import { ReportPageComponent } from './component/report-page/report-page.component';
import { ViewCameraComponent } from './component/view-camera/view-camera.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'report', component: ReportPageComponent },
    {path: 'view-camera', component: ViewCameraComponent}
];
