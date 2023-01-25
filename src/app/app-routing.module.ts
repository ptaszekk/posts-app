import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AppPaths } from './constants/app.constants';
import { AuthenticationGuard } from './guards/authentication.guard';
import { EditPostComponent } from './components/edit-post/edit-post.component';

const routes: Routes = [
  { path: AppPaths.EMPTY, redirectTo: AppPaths.HOME, pathMatch: "full"},
  { path: AppPaths.HOME, component: HomeComponent },
  { path: AppPaths.LOGIN, component: LoginComponent },
  { path: AppPaths.NEW_POST + '/:id', component: EditPostComponent, canActivate: [ AuthenticationGuard ] },
  { path: AppPaths.NEW_POST, component: EditPostComponent, canActivate: [ AuthenticationGuard ] },
  { path: AppPaths.NO_MATCH, component: HomeComponent, pathMatch: 'full', canActivate: [ AuthenticationGuard ] } ]

@NgModule({
            imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: false }) ],
            exports: [ RouterModule ],
          })
export class AppRoutingModule {
}
