import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';
import { PlyrModule } from 'ngx-plyr';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdsenseModule } from 'ng2-adsense';


import {VideoService} from '../app/service/video.service'

import { AppComponent } from './app.component';
import { NavComponent } from './views/nav/nav.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { UploadvideoComponent } from './views/uploadvideo/uploadvideo.component';
import { ListvideosComponent } from './views/listvideos/listvideos.component';
import { PlayvideoComponent } from './views/playvideo/playvideo.component';


import { ToMinPipe } from './pipes/to-min.pipe';
import { ToMbPipe } from './pipes/to-mb.pipe';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'uploadvideo', component: UploadvideoComponent },
  { path: 'listvideos', component: ListvideosComponent },
  { path: 'playvideo/:id', component: PlayvideoComponent },


];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    UploadvideoComponent,
    ListvideosComponent,
    PlayvideoComponent,
    ToMinPipe,ToMbPipe
    
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatVideoModule,
    PlyrModule,
    VgCoreModule,
    VgControlsModule,
    VgBufferingModule,
    VgOverlayPlayModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7640562161899788',
      adSlot: 7259870550,
    })
  ],
  providers: [VideoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
