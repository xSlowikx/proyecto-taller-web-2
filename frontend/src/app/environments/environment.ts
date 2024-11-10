import {
    MsalGuardConfiguration,
    MsalInterceptorConfiguration,
  } from '@azure/msal-angular';
  import { InteractionType } from '@azure/msal-browser';
  
  const isIE =
    window.navigator.userAgent.indexOf('MSIE ') > -1 ||
    window.navigator.userAgent.indexOf('Trident/') > -1;
  const msalConfiguration: MsalGuardConfiguration = {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
  };
  
  const msalInterceptor: MsalInterceptorConfiguration = {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map([
      ['https://graph.microsoft.com/v1.0/me', ['user.read']],
      ['api://29a7ac7a-7f7e-4611-9b79-f9072ea7a47a', ['user.read']],
      [
        'https://localhost:7039/',
        ['api://29a7ac7a-7f7e-4611-9b79-f9072ea7a47a/User.Read'],
      ],
      [
        'https://api-memosfacturacion-aesa-dev.azurewebsites.net/api/',
        ['api://29a7ac7a-7f7e-4611-9b79-f9072ea7a47a/User.Read'],
      ],
    ]),
  };
  export const ENVIRONMENT = {
    DEVELOPMENT: true,
    TESTING: false,
    PRODUCTION: false,
    API_URL: 'https://localhost:7039/api/',
    // URL_WEB: 'https://app-tarjetaspersonales-aesa-dev.azurewebsites.net/',
    REDIRECT_LOGOUT_URI: 'https://localhost:4200/',
    MSAL_CONFIG: {
      publicClientApp: {
        auth: {
          clientId: '28520cf7-0e55-4d7c-9a79-d6e81a978192',
          authority: 'https://login.microsoftonline.com/circostudio.com',
          redirectUri: '/',
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE, // Set to true for Internet Explorer 11
        },
      },
      msalConfiguration: msalConfiguration,
      msalInterceptor: msalInterceptor,
    },
  };
  