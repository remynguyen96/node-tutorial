import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
////////////////////
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { AuthGuard } from "./shared/auth.guard";
const routes : Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AppComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'blogs',
        loadChildren: 'app/blogs/blogs.module#BlogsModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'categories',
        loadChildren: 'app/categories/categories.module#CategoriesModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'youtube',
        loadChildren: 'app/youtube/youtube.module#YoutubeModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'advertise',
        loadChildren: 'app/advertise/advertise.module#AdvertiseModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'animation',
        loadChildren: 'app/animation/animation.module#AnimationModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'upload-file',
        component: UploadFileComponent,
        // canActivate: [AuthGuard],

    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{ preloadingStrategy : PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
