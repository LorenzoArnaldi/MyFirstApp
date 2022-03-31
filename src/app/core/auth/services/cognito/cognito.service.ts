import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoUser } from '@aws-amplify/auth';
import { AuthClass } from '@aws-amplify/auth/lib-esm/Auth';
import Amplify from '@aws-amplify/core';
import { CognitoUserSession, UserData } from 'amazon-cognito-identity-js';
import { AmplifyService } from 'aws-amplify-angular';
import { UserSessionService } from 'src/app/core/user-session/service/user-session.service';
import { environment } from 'src/environments/environment';

import { LoginModel } from '../../models/login/login.models';

@Injectable({
  providedIn: 'root',
})
export class CognitoAuthService {
  // private userToChangePassword: CognitoUser;
  private auth: AuthClass;

  constructor(
    private amplifyService: AmplifyService,
    private router: Router,
    private userSessionService: UserSessionService
  ) {
    Amplify.configure({
      Auth: {
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: environment.cognitoAuth.identityPoolId,

        // REQUIRED - Amazon Cognito Region
        region: environment.cognitoAuth.region,

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region
        // Required only if it's different from Amazon Cognito Region
        // identityPoolRegion: 'XX-XXXX-X',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: environment.cognitoAuth.userPoolId,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: environment.cognitoAuth.userPoolClientId,

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        // mandatorySignIn: false,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        // cookieStorage: {
        //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //   domain: '.yourdomain.com',
        //   // OPTIONAL - Cookie path
        //   path: '/',
        //   // OPTIONAL - Cookie expiration in days
        //   expires: 365,
        //   // OPTIONAL - Cookie secure flag
        //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        //   secure: true
        // },

        // OPTIONAL - customized storage object
        // storage: new MyStorage(),

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_PASSWORD_AUTH',

        oauth: {
          domain: environment.cognitoAuth.oauth.domain,
          // scope: environment.cognito.oauth.scope,
          redirectSignIn: environment.cognitoAuth.oauth.redirectSignIn,
          redirectSignOut: environment.cognitoAuth.oauth.redirectSignOut,
          responseType: environment.cognitoAuth.oauth.responseType,
        },
      },
    });
    this.auth = this.amplifyService.auth() as AuthClass;
  }

  public federatedLogin() {
    this.auth.federatedSignIn().then((res: any) => console.log(res));
  }

  public logout() {
    this.amplifyService
      .auth()
      .signOut()
      .then(() => {
        // this.router.navigate([APP_ROUTE_LOGIN_PATH]);
      });
  }

  public isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.auth.currentSession().then(
        (userSession: CognitoUserSession) => {
          console.log('USER SESSION', userSession);
          this.setToken(userSession);
          resolve(true);
        },
        (error: Error) => {
          console.info('Acquire token failed:', error);
          resolve(false);
        }
      );
    });
  }

  private setToken(userSession: CognitoUserSession) {
    const idTokenDecoded = userSession.getIdToken().decodePayload();
    const email: string = idTokenDecoded['email'];
    let username: string = idTokenDecoded['cognito:username'];
    console.log('USER SESSION RES', userSession);
    // if (username.startsWith('eneladfs_ENELINT\\')) {
    // 	const parts = username.split('\\');
    // 	parts[1] = parts[1].toLowerCase();
    // 	username = parts.join('\\');
    // }

    // const userData: UserData = {}

    this.userSessionService.setSessionData(userSession);
    // this.userSessionService.setUserSession({
    // 		username,
    // 		email,
    // 		idToken: 	 userSession.getIdToken().getJwtToken(),
    // 		accessToken: userSession.getAccessToken().getJwtToken(),
    // 		expiresOn: null // TODO
    // 	}
    // );
  }
}
