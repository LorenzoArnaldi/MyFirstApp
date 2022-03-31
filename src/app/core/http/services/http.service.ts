import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Injector, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPrefixInterceptor } from '../interceptors/api-mma.interceptor';
import { CacheInterceptor } from '../interceptors/cache.interceptor';



// (see https://github.com/Microsoft/TypeScript/issues/13897)
declare module '@angular/common/http' {
  // Augment HttpClient with the added configuration methods from HttpService, to allow in-place replacement of
  // HttpClient with HttpService using dependency injection
  export interface HttpClient {
    /**
     * Enables caching for this request.
     * @param maxAge Forces request to be made and updates cache entry.
     * @param forceUpdate Forces request to be made and updates cache entry.
     * @return The new instance.
     */
    cache(maxAge?: number, forceUpdate?: boolean): HttpClient;

    /**
     * Enables loader for this request.
     * @return The new instance.
     */
    loader(): HttpClient;

    /**
     * Skips default error handler for this request.
     * @return The new instance.
     */
    skipErrorHandler(): HttpClient;

    /**
     * Do not use API prefix for this request.
     * @return The new instance.
     */
    disableApiPrefix(): HttpClient;
  }
}

// From @angular/common/http/src/interceptor: allows to chain interceptors
class HttpInterceptorHandler implements HttpHandler {
  constructor(
    private next: HttpHandler,
    private interceptor: HttpInterceptor
  ) {
  }

  handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(request, this.next);
  }
}

/**
 * Allows to override default dynamic interceptors that can be disabled with the HttpService extension.
 * Except for very specific needs, you should better configure these interceptors directly in the constructor below
 * for better readability.
 *
 * For static interceptors that should always be enabled (like ApiPrefixInterceptor), use the standard
 * HTTP_INTERCEPTORS token.
 */
export const HTTP_DYNAMIC_INTERCEPTORS = new InjectionToken<HttpInterceptor>(
  'HTTP_DYNAMIC_INTERCEPTORS'
);

/**
 * Extends HttpClient with per request configuration using dynamic interceptors.
 */
@Injectable()
export class HttpService extends HttpClient {
  constructor(
    private httpHandler: HttpHandler,
    private injector: Injector,
    @Optional()
    @Inject(HTTP_DYNAMIC_INTERCEPTORS)
    private interceptors: HttpInterceptor[] = null
  ) {
    super(httpHandler);

    if (!this.interceptors) {
      // Configure default interceptors that can be disabled here
      this.interceptors = [
        this.injector.get(ApiPrefixInterceptor),
        this.injector.get(ErrorHandlerInterceptor)
      ];
    }
  }

  override cache(maxAge?: number, forceUpdate?: boolean): HttpClient {
    const cacheInterceptor = this.injector
      .get(CacheInterceptor)
      .configure({ maxAge, update: forceUpdate });
    return this.addInterceptor(cacheInterceptor);
  }

  override loader(): HttpClient {
    const loaderInterceptor = this.injector.get(LoaderHttpInterceptor);
    return this.addInterceptor(loaderInterceptor);
  }

  override skipErrorHandler(): HttpClient {
    return this.removeInterceptor(ErrorHandlerInterceptor);
  }

  override disableApiPrefix(): HttpClient {
    return this.removeInterceptor(ApiPrefixInterceptor);
  }

  // Override the original method to wire interceptors when triggering the request.
  override request(method?: any, url?: any, options?: any): any {
    const handler = this.interceptors.reduceRight(
      (next, interceptor) => new HttpInterceptorHandler(next, interceptor),
      this.httpHandler
    );
    return new HttpClient(handler).request(method, url, options);
  }

  private removeInterceptor(interceptorType: any): HttpService {
    return new HttpService(
      this.httpHandler,
      this.injector,
      this.interceptors.filter(i => !(i instanceof interceptorType))
    );
  }

  private addInterceptor(interceptor: HttpInterceptor): HttpService {
    return new HttpService(
      this.httpHandler,
      this.injector,
      this.interceptors.concat([interceptor])
    );
  }
}

function LoaderHttpInterceptor(LoaderHttpInterceptor: any) {
  throw new Error('Function not implemented.');
}

function ErrorHandlerInterceptor(ErrorHandlerInterceptor: any): HttpInterceptor {
  throw new Error('Function not implemented.');
}

