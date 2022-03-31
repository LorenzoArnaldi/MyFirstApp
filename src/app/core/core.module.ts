import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Oauth2Guard } from './auth/guards/oauth2.guard';
import { AuthGuardService } from './auth/guards/auth-guard.service';
import { environment } from 'src/environments/environment';
import { AmplifyModules, AmplifyService } from 'aws-amplify-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import Interactions from '@aws-amplify/interactions';
import Auth from '@aws-amplify/auth';
import { ApiPrefixInterceptor } from './http/interceptors/api-mma.interceptor';

export const httpInterceptors = [
  ApiPrefixInterceptor,
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    
  ],
  providers: [
    ...httpInterceptors,
    Oauth2Guard,
    AuthGuardService,
    {
      provide: AmplifyService,
			useFactory: () => AmplifyModules({ Auth, Storage, Interactions })
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    }
  ],
  exports: []
})
export class CoreModule {}
