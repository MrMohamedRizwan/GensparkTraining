import {
  ToastComponent,
  init_toast
} from "./chunk-4J3OMAOK.js";
import {
  HubConnectionBuilder,
  LogLevel,
  init_esm as init_esm2
} from "./chunk-QNEFQSJ7.js";
import {
  UserService,
  init_UserService
} from "./chunk-3AX3DUUA.js";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  init_forms
} from "./chunk-LSR6FNYD.js";
import {
  DomSanitizer,
  Router,
  RouterLink,
  RouterOutlet,
  init_platform_browser,
  init_router
} from "./chunk-SQRW4F3F.js";
import "./chunk-6HTEWQEL.js";
import "./chunk-OOMFGBQ3.js";
import {
  CommonModule,
  NgIf,
  init_common
} from "./chunk-SIQSKX7W.js";
import {
  ToastService,
  init_ToastService
} from "./chunk-JLLZQTVX.js";
import {
  ANIMATION_MODULE_TYPE,
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver$1,
  DOCUMENT,
  Directive,
  ElementRef,
  FactoryTarget,
  HostBinding,
  HostListener,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  NgModule,
  NgZone,
  RendererFactory2,
  RuntimeError,
  SecurityContext,
  Subject,
  TestBed,
  ViewEncapsulation,
  __async,
  __commonJS,
  __decorate,
  __esm,
  __spreadProps,
  __spreadValues,
  core_exports,
  init_core,
  init_esm,
  init_testing,
  init_tslib_es6,
  inject,
  makeEnvironmentProviders,
  provideZonelessChangeDetection,
  signal,
  ɵɵngDeclareClassMetadata,
  ɵɵngDeclareComponent,
  ɵɵngDeclareDirective,
  ɵɵngDeclareFactory,
  ɵɵngDeclareInjectable,
  ɵɵngDeclareInjector,
  ɵɵngDeclareNgModule
} from "./chunk-SLZOMOAS.js";

// angular:jit:template:src/app/app.html
var app_default;
var init_app = __esm({
  "angular:jit:template:src/app/app.html"() {
    app_default = '<!-- <app-toast\n[title]="toast?.title"\n[message]="toast?.message"\n[type]="toast?.type"\n[visible]="toast?.visible"\n/>\n<app-login-componet></app-login-componet> -->\n<!-- <app-notification></app-notification> -->\n<router-outlet></router-outlet>\n<app-toast\n  [title]="toast.title"\n  [message]="toast.message"\n  [type]="toast.type"\n  [visible]="toast.visible"\n></app-toast>\n';
  }
});

// angular:jit:style:src/app/app.css
var app_default2;
var init_app2 = __esm({
  "angular:jit:style:src/app/app.css"() {
    app_default2 = "/* src/app/app.css */\n/*# sourceMappingURL=app.css.map */\n";
  }
});

// angular:jit:template:src/app/component/login-componet/login-componet.html
var login_componet_default;
var init_login_componet = __esm({
  "angular:jit:template:src/app/component/login-componet/login-componet.html"() {
    login_componet_default = `<div class="container vh-100 d-flex align-items-center justify-content-center">
  <div class="row w-100">
    <!-- Left Component -->
    <div
      class="col-lg-6 d-none d-lg-flex align-items-center justify-content-center"
      style="
        background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%);
        min-height: 100vh;
        border-top-left-radius: 12rem;
        border-bottom-left-radius: 12rem;
      "
    >
      <div class="text-white p-5 w-100" style="max-width: 420px">
        <h2 class="fw-bold mb-4" style="letter-spacing: 1px">
          Welcome to <span style="color: #ffd700">FitTracker</span>
        </h2>
        <p class="fs-5 mb-4" style="opacity: 0.95">
          Start your fitness journey with vibrant tools and a supportive
          community.
        </p>
        <ul class="list-unstyled mb-4">
          <li class="mb-3 d-flex align-items-center">
            <span class="me-3" style="font-size: 1.5rem; color: #ffd700"
              ><i class="bi bi-bar-chart-fill"></i
            ></span>
            <span>Personalized workout plans</span>
          </li>
          <li class="mb-3 d-flex align-items-center">
            <span class="me-3" style="font-size: 1.5rem; color: #ffd700"
              ><i class="bi bi-graph-up-arrow"></i
            ></span>
            <span>Progress tracking & analytics</span>
          </li>
          <li class="mb-3 d-flex align-items-center">
            <span class="me-3" style="font-size: 1.5rem; color: #ffd700"
              ><i class="bi bi-people-fill"></i
            ></span>
            <span>Expert coaching & community</span>
          </li>
          <li class="mb-3 d-flex align-items-center">
            <span class="me-3" style="font-size: 1.5rem; color: #ffd700"
              ><i class="bi bi-heart-fill"></i
            ></span>
            <span>Wellness tips & motivation</span>
          </li>
        </ul>
        <div class="text-center mt-4"></div>
      </div>
    </div>
    <!-- Right Component -->
    <div class="col-lg-6 d-flex justify-content-center align-items-center">
      <div
        class="card p-4 shadow"
        style="min-width: 350px; max-width: 400px; width: 100%"
      >
        <h3 class="text-center mb-3">Login</h3>

        <!-- \u2705 Alert messages -->
        <div
          *ngIf="successMessage"
          class="alert alert-success d-flex align-items-center"
          role="alert"
        >
          <i class="bi bi-check-circle-fill me-2"></i> {{ successMessage }}
        </div>
        <div
          *ngIf="errorMessage"
          class="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <i class="bi bi-exclamation-triangle-fill me-2"></i> {{ errorMessage
          }}
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="handleLogin()">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              id="username"
              class="form-control"
              type="text"
              formControlName="username"
              placeholder="Enter username"
            />
            <div
              class="text-danger small mt-1"
              *ngIf="loginForm.get('username')?.touched && loginForm.get('username')?.errors?.['required']"
            >
              <i class="bi bi-exclamation-circle-fill"></i> Please enter your
              username.
            </div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              class="form-control"
              type="password"
              formControlName="password"
              placeholder="Enter password"
            />
            <div
              class="text-danger small mt-1"
              *ngIf="loginForm.get('password')?.touched && loginForm.get('password')?.errors?.['required']"
            >
              <i class="bi bi-exclamation-circle-fill"></i> Please enter your
              password.
            </div>
          </div>

          <button
            class="btn w-100"
            style="
              background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%);
              border: none;
              color: #fff;
            "
            type="submit"
            [disabled]="loginForm.invalid"
          >
            Login
          </button>

          <div class="mt-3 text-center">
            <span>New user?</span>
            <a routerLink="/signup" class="ms-1">Sign up here</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
`;
  }
});

// angular:jit:style:src/app/component/login-componet/login-componet.css
var login_componet_default2;
var init_login_componet2 = __esm({
  "angular:jit:style:src/app/component/login-componet/login-componet.css"() {
    login_componet_default2 = "/* src/app/component/login-componet/login-componet.css */\n/*# sourceMappingURL=login-componet.css.map */\n";
  }
});

// src/app/models/userLoginModel.ts
var UserLoginModel;
var init_userLoginModel = __esm({
  "src/app/models/userLoginModel.ts"() {
    "use strict";
    UserLoginModel = class {
      username;
      password;
      constructor(username = "", password = "") {
        this.username = username;
        this.password = password;
      }
    };
  }
});

// node_modules/@angular/animations/fesm2022/private_export-B_vy_9K7.mjs
function trigger(name, definitions) {
  return { type: AnimationMetadataType.Trigger, name, definitions, options: {} };
}
function animate(timings, styles = null) {
  return { type: AnimationMetadataType.Animate, styles, timings };
}
function sequence(steps, options = null) {
  return { type: AnimationMetadataType.Sequence, steps, options };
}
function style(tokens) {
  return { type: AnimationMetadataType.Style, styles: tokens, offset: null };
}
function state(name, styles, options) {
  return { type: AnimationMetadataType.State, name, styles, options };
}
function transition(stateChangeExpr, steps, options = null) {
  return { type: AnimationMetadataType.Transition, expr: stateChangeExpr, animation: steps, options };
}
var AnimationMetadataType;
var init_private_export_B_vy_9K7 = __esm({
  "node_modules/@angular/animations/fesm2022/private_export-B_vy_9K7.mjs"() {
    "use strict";
    (function(AnimationMetadataType2) {
      AnimationMetadataType2[AnimationMetadataType2["State"] = 0] = "State";
      AnimationMetadataType2[AnimationMetadataType2["Transition"] = 1] = "Transition";
      AnimationMetadataType2[AnimationMetadataType2["Sequence"] = 2] = "Sequence";
      AnimationMetadataType2[AnimationMetadataType2["Group"] = 3] = "Group";
      AnimationMetadataType2[AnimationMetadataType2["Animate"] = 4] = "Animate";
      AnimationMetadataType2[AnimationMetadataType2["Keyframes"] = 5] = "Keyframes";
      AnimationMetadataType2[AnimationMetadataType2["Style"] = 6] = "Style";
      AnimationMetadataType2[AnimationMetadataType2["Trigger"] = 7] = "Trigger";
      AnimationMetadataType2[AnimationMetadataType2["Reference"] = 8] = "Reference";
      AnimationMetadataType2[AnimationMetadataType2["AnimateChild"] = 9] = "AnimateChild";
      AnimationMetadataType2[AnimationMetadataType2["AnimateRef"] = 10] = "AnimateRef";
      AnimationMetadataType2[AnimationMetadataType2["Query"] = 11] = "Query";
      AnimationMetadataType2[AnimationMetadataType2["Stagger"] = 12] = "Stagger";
    })(AnimationMetadataType || (AnimationMetadataType = {}));
  }
});

// node_modules/@angular/animations/fesm2022/animations.mjs
function issueAnimationCommand(renderer, element, id, command, args) {
  renderer.setProperty(element, `@@${id}:${command}`, args);
}
function unwrapAnimationRenderer(renderer) {
  const type = renderer.\u0275type;
  if (type === 0) {
    return renderer;
  } else if (type === 1) {
    return renderer.animationRenderer;
  }
  return null;
}
function isAnimationRenderer(renderer) {
  const type = renderer.\u0275type;
  return type === 0 || type === 1;
}
var AnimationBuilder, AnimationFactory, BrowserAnimationBuilder, BrowserAnimationFactory, RendererAnimationPlayer;
var init_animations = __esm({
  "node_modules/@angular/animations/fesm2022/animations.mjs"() {
    "use strict";
    init_common();
    init_core();
    init_core();
    init_private_export_B_vy_9K7();
    init_private_export_B_vy_9K7();
    AnimationBuilder = class _AnimationBuilder {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.0.3", ngImport: core_exports, type: _AnimationBuilder, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.3", ngImport: core_exports, type: _AnimationBuilder, providedIn: "root", useFactory: () => inject(BrowserAnimationBuilder) });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.3", ngImport: core_exports, type: AnimationBuilder, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root", useFactory: () => inject(BrowserAnimationBuilder) }]
    }] });
    AnimationFactory = class {
    };
    BrowserAnimationBuilder = class _BrowserAnimationBuilder extends AnimationBuilder {
      animationModuleType = inject(ANIMATION_MODULE_TYPE, { optional: true });
      _nextAnimationId = 0;
      _renderer;
      constructor(rootRenderer, doc) {
        super();
        const typeData = {
          id: "0",
          encapsulation: ViewEncapsulation.None,
          styles: [],
          data: { animation: [] }
        };
        this._renderer = rootRenderer.createRenderer(doc.body, typeData);
        if (this.animationModuleType === null && !isAnimationRenderer(this._renderer)) {
          throw new RuntimeError(3600, (typeof ngDevMode === "undefined" || ngDevMode) && "Angular detected that the `AnimationBuilder` was injected, but animation support was not enabled. Please make sure that you enable animations in your application by calling `provideAnimations()` or `provideAnimationsAsync()` function.");
        }
      }
      build(animation2) {
        const id = this._nextAnimationId;
        this._nextAnimationId++;
        const entry = Array.isArray(animation2) ? sequence(animation2) : animation2;
        issueAnimationCommand(this._renderer, null, id, "register", [entry]);
        return new BrowserAnimationFactory(id, this._renderer);
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.0.3", ngImport: core_exports, type: _BrowserAnimationBuilder, deps: [{ token: RendererFactory2 }, { token: DOCUMENT }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.0.3", ngImport: core_exports, type: _BrowserAnimationBuilder, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.0.3", ngImport: core_exports, type: BrowserAnimationBuilder, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }], ctorParameters: () => [{ type: RendererFactory2 }, { type: Document, decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }] }] });
    BrowserAnimationFactory = class extends AnimationFactory {
      _id;
      _renderer;
      constructor(_id, _renderer) {
        super();
        this._id = _id;
        this._renderer = _renderer;
      }
      create(element, options) {
        return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
      }
    };
    RendererAnimationPlayer = class {
      id;
      element;
      _renderer;
      parentPlayer = null;
      _started = false;
      constructor(id, element, options, _renderer) {
        this.id = id;
        this.element = element;
        this._renderer = _renderer;
        this._command("create", options);
      }
      _listen(eventName, callback) {
        return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
      }
      _command(command, ...args) {
        issueAnimationCommand(this._renderer, this.element, this.id, command, args);
      }
      onDone(fn) {
        this._listen("done", fn);
      }
      onStart(fn) {
        this._listen("start", fn);
      }
      onDestroy(fn) {
        this._listen("destroy", fn);
      }
      init() {
        this._command("init");
      }
      hasStarted() {
        return this._started;
      }
      play() {
        this._command("play");
        this._started = true;
      }
      pause() {
        this._command("pause");
      }
      restart() {
        this._command("restart");
      }
      finish() {
        this._command("finish");
      }
      destroy() {
        this._command("destroy");
      }
      reset() {
        this._command("reset");
        this._started = false;
      }
      setPosition(p) {
        this._command("setPosition", p);
      }
      getPosition() {
        return unwrapAnimationRenderer(this._renderer)?.engine?.players[this.id]?.getPosition() ?? 0;
      }
      totalTime = 0;
    };
  }
});

// node_modules/ngx-toastr/fesm2022/ngx-toastr.mjs
var ToastContainerDirective, ComponentPortal, BasePortalHost, ToastRef, ToastPackage, DefaultNoComponentGlobalConfig, TOAST_CONFIG, DomPortalHost, OverlayContainer, OverlayRef, Overlay, ToastrService, Toast, DefaultGlobalConfig, provideToastr, ToastrModule, ToastrComponentlessModule, ToastNoAnimation, DefaultNoAnimationsGlobalConfig, ToastNoAnimationModule;
var init_ngx_toastr = __esm({
  "node_modules/ngx-toastr/fesm2022/ngx-toastr.mjs"() {
    "use strict";
    init_core();
    init_core();
    init_animations();
    init_common();
    init_esm();
    init_platform_browser();
    ToastContainerDirective = class _ToastContainerDirective {
      el;
      constructor(el) {
        this.el = el;
      }
      getContainerElement() {
        return this.el.nativeElement;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: _ToastContainerDirective, deps: [{ token: ElementRef }], target: FactoryTarget.Directive });
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "16.0.1", type: _ToastContainerDirective, isStandalone: true, selector: "[toastContainer]", exportAs: ["toastContainer"], ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: ToastContainerDirective, decorators: [{
      type: Directive,
      args: [{
        selector: "[toastContainer]",
        exportAs: "toastContainer",
        standalone: true
      }]
    }], ctorParameters: function() {
      return [{ type: ElementRef }];
    } });
    ComponentPortal = class {
      _attachedHost;
      /** The type of the component that will be instantiated for attachment. */
      component;
      /**
       * [Optional] Where the attached component should live in Angular's *logical* component tree.
       * This is different from where the component *renders*, which is determined by the PortalHost.
       * The origin necessary when the host is outside of the Angular application context.
       */
      viewContainerRef;
      /** Injector used for the instantiation of the component. */
      injector;
      constructor(component, injector) {
        this.component = component;
        this.injector = injector;
      }
      /** Attach this portal to a host. */
      attach(host, newestOnTop) {
        this._attachedHost = host;
        return host.attach(this, newestOnTop);
      }
      /** Detach this portal from its host */
      detach() {
        const host = this._attachedHost;
        if (host) {
          this._attachedHost = void 0;
          return host.detach();
        }
      }
      /** Whether this portal is attached to a host. */
      get isAttached() {
        return this._attachedHost != null;
      }
      /**
       * Sets the PortalHost reference without performing `attach()`. This is used directly by
       * the PortalHost when it is performing an `attach()` or `detach()`.
       */
      setAttachedHost(host) {
        this._attachedHost = host;
      }
    };
    BasePortalHost = class {
      /** The portal currently attached to the host. */
      _attachedPortal;
      /** A function that will permanently dispose this host. */
      _disposeFn;
      attach(portal, newestOnTop) {
        this._attachedPortal = portal;
        return this.attachComponentPortal(portal, newestOnTop);
      }
      detach() {
        if (this._attachedPortal) {
          this._attachedPortal.setAttachedHost();
        }
        this._attachedPortal = void 0;
        if (this._disposeFn) {
          this._disposeFn();
          this._disposeFn = void 0;
        }
      }
      setDisposeFn(fn) {
        this._disposeFn = fn;
      }
    };
    ToastRef = class {
      _overlayRef;
      /** The instance of component opened into the toast. */
      componentInstance;
      /** Count of duplicates of this toast */
      duplicatesCount = 0;
      /** Subject for notifying the user that the toast has finished closing. */
      _afterClosed = new Subject();
      /** triggered when toast is activated */
      _activate = new Subject();
      /** notifies the toast that it should close before the timeout */
      _manualClose = new Subject();
      /** notifies the toast that it should reset the timeouts */
      _resetTimeout = new Subject();
      /** notifies the toast that it should count a duplicate toast */
      _countDuplicate = new Subject();
      constructor(_overlayRef) {
        this._overlayRef = _overlayRef;
      }
      manualClose() {
        this._manualClose.next();
        this._manualClose.complete();
      }
      manualClosed() {
        return this._manualClose.asObservable();
      }
      timeoutReset() {
        return this._resetTimeout.asObservable();
      }
      countDuplicate() {
        return this._countDuplicate.asObservable();
      }
      /**
       * Close the toast.
       */
      close() {
        this._overlayRef.detach();
        this._afterClosed.next();
        this._manualClose.next();
        this._afterClosed.complete();
        this._manualClose.complete();
        this._activate.complete();
        this._resetTimeout.complete();
        this._countDuplicate.complete();
      }
      /** Gets an observable that is notified when the toast is finished closing. */
      afterClosed() {
        return this._afterClosed.asObservable();
      }
      isInactive() {
        return this._activate.isStopped;
      }
      activate() {
        this._activate.next();
        this._activate.complete();
      }
      /** Gets an observable that is notified when the toast has started opening. */
      afterActivate() {
        return this._activate.asObservable();
      }
      /** Reset the toast timouts and count duplicates */
      onDuplicate(resetTimeout, countDuplicate) {
        if (resetTimeout) {
          this._resetTimeout.next();
        }
        if (countDuplicate) {
          this._countDuplicate.next(++this.duplicatesCount);
        }
      }
    };
    ToastPackage = class {
      toastId;
      config;
      message;
      title;
      toastType;
      toastRef;
      _onTap = new Subject();
      _onAction = new Subject();
      constructor(toastId, config, message, title, toastType, toastRef) {
        this.toastId = toastId;
        this.config = config;
        this.message = message;
        this.title = title;
        this.toastType = toastType;
        this.toastRef = toastRef;
        this.toastRef.afterClosed().subscribe(() => {
          this._onAction.complete();
          this._onTap.complete();
        });
      }
      /** Fired on click */
      triggerTap() {
        this._onTap.next();
        if (this.config.tapToDismiss) {
          this._onTap.complete();
        }
      }
      onTap() {
        return this._onTap.asObservable();
      }
      /** available for use in custom toast */
      triggerAction(action) {
        this._onAction.next(action);
      }
      onAction() {
        return this._onAction.asObservable();
      }
    };
    DefaultNoComponentGlobalConfig = {
      maxOpened: 0,
      autoDismiss: false,
      newestOnTop: true,
      preventDuplicates: false,
      countDuplicates: false,
      resetTimeoutOnDuplicate: false,
      includeTitleDuplicates: false,
      iconClasses: {
        error: "toast-error",
        info: "toast-info",
        success: "toast-success",
        warning: "toast-warning"
      },
      // Individual
      closeButton: false,
      disableTimeOut: false,
      timeOut: 5e3,
      extendedTimeOut: 1e3,
      enableHtml: false,
      progressBar: false,
      toastClass: "ngx-toastr",
      positionClass: "toast-top-right",
      titleClass: "toast-title",
      messageClass: "toast-message",
      easing: "ease-in",
      easeTime: 300,
      tapToDismiss: true,
      onActivateTick: false,
      progressAnimation: "decreasing"
    };
    TOAST_CONFIG = new InjectionToken("ToastConfig");
    DomPortalHost = class extends BasePortalHost {
      _hostDomElement;
      _componentFactoryResolver;
      _appRef;
      constructor(_hostDomElement, _componentFactoryResolver, _appRef) {
        super();
        this._hostDomElement = _hostDomElement;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
      }
      /**
       * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
       * @param portal Portal to be attached
       */
      attachComponentPortal(portal, newestOnTop) {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        let componentRef;
        componentRef = componentFactory.create(portal.injector);
        this._appRef.attachView(componentRef.hostView);
        this.setDisposeFn(() => {
          this._appRef.detachView(componentRef.hostView);
          componentRef.destroy();
        });
        if (newestOnTop) {
          this._hostDomElement.insertBefore(this._getComponentRootNode(componentRef), this._hostDomElement.firstChild);
        } else {
          this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        }
        return componentRef;
      }
      /** Gets the root HTMLElement for an instantiated component. */
      _getComponentRootNode(componentRef) {
        return componentRef.hostView.rootNodes[0];
      }
    };
    OverlayContainer = class _OverlayContainer {
      _document = inject(DOCUMENT);
      _containerElement;
      ngOnDestroy() {
        if (this._containerElement && this._containerElement.parentNode) {
          this._containerElement.parentNode.removeChild(this._containerElement);
        }
      }
      /**
       * This method returns the overlay container element. It will lazily
       * create the element the first time  it is called to facilitate using
       * the container in non-browser environments.
       * @returns the container element
       */
      getContainerElement() {
        if (!this._containerElement) {
          this._createContainer();
        }
        return this._containerElement;
      }
      /**
       * Create the overlay container element, which is simply a div
       * with the 'cdk-overlay-container' class on the document body
       * and 'aria-live="polite"'
       */
      _createContainer() {
        const container = this._document.createElement("div");
        container.classList.add("overlay-container");
        container.setAttribute("aria-live", "polite");
        this._document.body.appendChild(container);
        this._containerElement = container;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: _OverlayContainer, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: _OverlayContainer, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: OverlayContainer, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }] });
    OverlayRef = class {
      _portalHost;
      constructor(_portalHost) {
        this._portalHost = _portalHost;
      }
      attach(portal, newestOnTop = true) {
        return this._portalHost.attach(portal, newestOnTop);
      }
      /**
       * Detaches an overlay from a portal.
       * @returns Resolves when the overlay has been detached.
       */
      detach() {
        return this._portalHost.detach();
      }
    };
    Overlay = class _Overlay {
      _overlayContainer = inject(OverlayContainer);
      _componentFactoryResolver = inject(ComponentFactoryResolver$1);
      _appRef = inject(ApplicationRef);
      _document = inject(DOCUMENT);
      // Namespace panes by overlay container
      _paneElements = /* @__PURE__ */ new Map();
      /**
       * Creates an overlay.
       * @returns A reference to the created overlay.
       */
      create(positionClass, overlayContainer) {
        return this._createOverlayRef(this.getPaneElement(positionClass, overlayContainer));
      }
      getPaneElement(positionClass = "", overlayContainer) {
        if (!this._paneElements.get(overlayContainer)) {
          this._paneElements.set(overlayContainer, {});
        }
        if (!this._paneElements.get(overlayContainer)[positionClass]) {
          this._paneElements.get(overlayContainer)[positionClass] = this._createPaneElement(positionClass, overlayContainer);
        }
        return this._paneElements.get(overlayContainer)[positionClass];
      }
      /**
       * Creates the DOM element for an overlay and appends it to the overlay container.
       * @returns Newly-created pane element
       */
      _createPaneElement(positionClass, overlayContainer) {
        const pane = this._document.createElement("div");
        pane.id = "toast-container";
        pane.classList.add(positionClass);
        pane.classList.add("toast-container");
        if (!overlayContainer) {
          this._overlayContainer.getContainerElement().appendChild(pane);
        } else {
          overlayContainer.getContainerElement().appendChild(pane);
        }
        return pane;
      }
      /**
       * Create a DomPortalHost into which the overlay content can be loaded.
       * @param pane The DOM element to turn into a portal host.
       * @returns A portal host for the given DOM element.
       */
      _createPortalHost(pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef);
      }
      /**
       * Creates an OverlayRef for an overlay in the given DOM element.
       * @param pane DOM element for the overlay
       */
      _createOverlayRef(pane) {
        return new OverlayRef(this._createPortalHost(pane));
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: _Overlay, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: _Overlay, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: Overlay, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }] });
    ToastrService = class _ToastrService {
      overlay;
      _injector;
      sanitizer;
      ngZone;
      toastrConfig;
      currentlyActive = 0;
      toasts = [];
      overlayContainer;
      previousToastMessage;
      index = 0;
      constructor(token, overlay, _injector, sanitizer, ngZone) {
        this.overlay = overlay;
        this._injector = _injector;
        this.sanitizer = sanitizer;
        this.ngZone = ngZone;
        this.toastrConfig = __spreadValues(__spreadValues({}, token.default), token.config);
        if (token.config.iconClasses) {
          this.toastrConfig.iconClasses = __spreadValues(__spreadValues({}, token.default.iconClasses), token.config.iconClasses);
        }
      }
      /** show toast */
      show(message, title, override = {}, type = "") {
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
      }
      /** show successful toast */
      success(message, title, override = {}) {
        const type = this.toastrConfig.iconClasses.success || "";
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
      }
      /** show error toast */
      error(message, title, override = {}) {
        const type = this.toastrConfig.iconClasses.error || "";
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
      }
      /** show info toast */
      info(message, title, override = {}) {
        const type = this.toastrConfig.iconClasses.info || "";
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
      }
      /** show warning toast */
      warning(message, title, override = {}) {
        const type = this.toastrConfig.iconClasses.warning || "";
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
      }
      /**
       * Remove all or a single toast by id
       */
      clear(toastId) {
        for (const toast of this.toasts) {
          if (toastId !== void 0) {
            if (toast.toastId === toastId) {
              toast.toastRef.manualClose();
              return;
            }
          } else {
            toast.toastRef.manualClose();
          }
        }
      }
      /**
       * Remove and destroy a single toast by id
       */
      remove(toastId) {
        const found = this._findToast(toastId);
        if (!found) {
          return false;
        }
        found.activeToast.toastRef.close();
        this.toasts.splice(found.index, 1);
        this.currentlyActive = this.currentlyActive - 1;
        if (!this.toastrConfig.maxOpened || !this.toasts.length) {
          return false;
        }
        if (this.currentlyActive < this.toastrConfig.maxOpened && this.toasts[this.currentlyActive]) {
          const p = this.toasts[this.currentlyActive].toastRef;
          if (!p.isInactive()) {
            this.currentlyActive = this.currentlyActive + 1;
            p.activate();
          }
        }
        return true;
      }
      /**
       * Determines if toast message is already shown
       */
      findDuplicate(title = "", message = "", resetOnDuplicate, countDuplicates) {
        const { includeTitleDuplicates } = this.toastrConfig;
        for (const toast of this.toasts) {
          const hasDuplicateTitle = includeTitleDuplicates && toast.title === title;
          if ((!includeTitleDuplicates || hasDuplicateTitle) && toast.message === message) {
            toast.toastRef.onDuplicate(resetOnDuplicate, countDuplicates);
            return toast;
          }
        }
        return null;
      }
      /** create a clone of global config and apply individual settings */
      applyConfig(override = {}) {
        return __spreadValues(__spreadValues({}, this.toastrConfig), override);
      }
      /**
       * Find toast object by id
       */
      _findToast(toastId) {
        for (let i = 0; i < this.toasts.length; i++) {
          if (this.toasts[i].toastId === toastId) {
            return { index: i, activeToast: this.toasts[i] };
          }
        }
        return null;
      }
      /**
       * Determines the need to run inside angular's zone then builds the toast
       */
      _preBuildNotification(toastType, message, title, config) {
        if (config.onActivateTick) {
          return this.ngZone.run(() => this._buildNotification(toastType, message, title, config));
        }
        return this._buildNotification(toastType, message, title, config);
      }
      /**
       * Creates and attaches toast data to component
       * returns the active toast, or in case preventDuplicates is enabled the original/non-duplicate active toast.
       */
      _buildNotification(toastType, message, title, config) {
        if (!config.toastComponent) {
          throw new Error("toastComponent required");
        }
        const duplicate = this.findDuplicate(title, message, this.toastrConfig.resetTimeoutOnDuplicate && config.timeOut > 0, this.toastrConfig.countDuplicates);
        if ((this.toastrConfig.includeTitleDuplicates && title || message) && this.toastrConfig.preventDuplicates && duplicate !== null) {
          return duplicate;
        }
        this.previousToastMessage = message;
        let keepInactive = false;
        if (this.toastrConfig.maxOpened && this.currentlyActive >= this.toastrConfig.maxOpened) {
          keepInactive = true;
          if (this.toastrConfig.autoDismiss) {
            this.clear(this.toasts[0].toastId);
          }
        }
        const overlayRef = this.overlay.create(config.positionClass, this.overlayContainer);
        this.index = this.index + 1;
        let sanitizedMessage = message;
        if (message && config.enableHtml) {
          sanitizedMessage = this.sanitizer.sanitize(SecurityContext.HTML, message);
        }
        const toastRef = new ToastRef(overlayRef);
        const toastPackage = new ToastPackage(this.index, config, sanitizedMessage, title, toastType, toastRef);
        const providers = [{ provide: ToastPackage, useValue: toastPackage }];
        const toastInjector = Injector.create({ providers, parent: this._injector });
        const component = new ComponentPortal(config.toastComponent, toastInjector);
        const portal = overlayRef.attach(component, config.newestOnTop);
        toastRef.componentInstance = portal.instance;
        const ins = {
          toastId: this.index,
          title: title || "",
          message: message || "",
          toastRef,
          onShown: toastRef.afterActivate(),
          onHidden: toastRef.afterClosed(),
          onTap: toastPackage.onTap(),
          onAction: toastPackage.onAction(),
          portal
        };
        if (!keepInactive) {
          this.currentlyActive = this.currentlyActive + 1;
          setTimeout(() => {
            ins.toastRef.activate();
          });
        }
        this.toasts.push(ins);
        return ins;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: _ToastrService, deps: [{ token: TOAST_CONFIG }, { token: Overlay }, { token: Injector }, { token: DomSanitizer }, { token: NgZone }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: _ToastrService, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: ToastrService, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }], ctorParameters: function() {
      return [{ type: void 0, decorators: [{
        type: Inject,
        args: [TOAST_CONFIG]
      }] }, { type: Overlay }, { type: Injector }, { type: DomSanitizer }, { type: NgZone }];
    } });
    Toast = class _Toast {
      toastrService;
      toastPackage;
      ngZone;
      message;
      title;
      options;
      duplicatesCount;
      originalTimeout;
      /** width of progress bar */
      width = -1;
      /** a combination of toast type and options.toastClass */
      toastClasses = "";
      /** controls animation */
      state;
      /** hides component when waiting to be displayed */
      get displayStyle() {
        if (this.state.value === "inactive") {
          return "none";
        }
        return;
      }
      timeout;
      intervalId;
      hideTime;
      sub;
      sub1;
      sub2;
      sub3;
      constructor(toastrService, toastPackage, ngZone) {
        this.toastrService = toastrService;
        this.toastPackage = toastPackage;
        this.ngZone = ngZone;
        this.message = toastPackage.message;
        this.title = toastPackage.title;
        this.options = toastPackage.config;
        this.originalTimeout = toastPackage.config.timeOut;
        this.toastClasses = `${toastPackage.toastType} ${toastPackage.config.toastClass}`;
        this.sub = toastPackage.toastRef.afterActivate().subscribe(() => {
          this.activateToast();
        });
        this.sub1 = toastPackage.toastRef.manualClosed().subscribe(() => {
          this.remove();
        });
        this.sub2 = toastPackage.toastRef.timeoutReset().subscribe(() => {
          this.resetTimeout();
        });
        this.sub3 = toastPackage.toastRef.countDuplicate().subscribe((count) => {
          this.duplicatesCount = count;
        });
        this.state = {
          value: "inactive",
          params: {
            easeTime: this.toastPackage.config.easeTime,
            easing: "ease-in"
          }
        };
      }
      ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
        this.sub3.unsubscribe();
        clearInterval(this.intervalId);
        clearTimeout(this.timeout);
      }
      /**
       * activates toast and sets timeout
       */
      activateToast() {
        this.state = __spreadProps(__spreadValues({}, this.state), { value: "active" });
        if (!(this.options.disableTimeOut === true || this.options.disableTimeOut === "timeOut") && this.options.timeOut) {
          this.outsideTimeout(() => this.remove(), this.options.timeOut);
          this.hideTime = (/* @__PURE__ */ new Date()).getTime() + this.options.timeOut;
          if (this.options.progressBar) {
            this.outsideInterval(() => this.updateProgress(), 10);
          }
        }
      }
      /**
       * updates progress bar width
       */
      updateProgress() {
        if (this.width === 0 || this.width === 100 || !this.options.timeOut) {
          return;
        }
        const now = (/* @__PURE__ */ new Date()).getTime();
        const remaining = this.hideTime - now;
        this.width = remaining / this.options.timeOut * 100;
        if (this.options.progressAnimation === "increasing") {
          this.width = 100 - this.width;
        }
        if (this.width <= 0) {
          this.width = 0;
        }
        if (this.width >= 100) {
          this.width = 100;
        }
      }
      resetTimeout() {
        clearTimeout(this.timeout);
        clearInterval(this.intervalId);
        this.state = __spreadProps(__spreadValues({}, this.state), { value: "active" });
        this.outsideTimeout(() => this.remove(), this.originalTimeout);
        this.options.timeOut = this.originalTimeout;
        this.hideTime = (/* @__PURE__ */ new Date()).getTime() + (this.options.timeOut || 0);
        this.width = -1;
        if (this.options.progressBar) {
          this.outsideInterval(() => this.updateProgress(), 10);
        }
      }
      /**
       * tells toastrService to remove this toast after animation time
       */
      remove() {
        if (this.state.value === "removed") {
          return;
        }
        clearTimeout(this.timeout);
        this.state = __spreadProps(__spreadValues({}, this.state), { value: "removed" });
        this.outsideTimeout(() => this.toastrService.remove(this.toastPackage.toastId), +this.toastPackage.config.easeTime);
      }
      tapToast() {
        if (this.state.value === "removed") {
          return;
        }
        this.toastPackage.triggerTap();
        if (this.options.tapToDismiss) {
          this.remove();
        }
      }
      stickAround() {
        if (this.state.value === "removed") {
          return;
        }
        if (this.options.disableTimeOut !== "extendedTimeOut") {
          clearTimeout(this.timeout);
          this.options.timeOut = 0;
          this.hideTime = 0;
          clearInterval(this.intervalId);
          this.width = 0;
        }
      }
      delayedHideToast() {
        if (this.options.disableTimeOut === true || this.options.disableTimeOut === "extendedTimeOut" || this.options.extendedTimeOut === 0 || this.state.value === "removed") {
          return;
        }
        this.outsideTimeout(() => this.remove(), this.options.extendedTimeOut);
        this.options.timeOut = this.options.extendedTimeOut;
        this.hideTime = (/* @__PURE__ */ new Date()).getTime() + (this.options.timeOut || 0);
        this.width = -1;
        if (this.options.progressBar) {
          this.outsideInterval(() => this.updateProgress(), 10);
        }
      }
      outsideTimeout(func, timeout) {
        if (this.ngZone) {
          this.ngZone.runOutsideAngular(() => this.timeout = setTimeout(() => this.runInsideAngular(func), timeout));
        } else {
          this.timeout = setTimeout(() => func(), timeout);
        }
      }
      outsideInterval(func, timeout) {
        if (this.ngZone) {
          this.ngZone.runOutsideAngular(() => this.intervalId = setInterval(() => this.runInsideAngular(func), timeout));
        } else {
          this.intervalId = setInterval(() => func(), timeout);
        }
      }
      runInsideAngular(func) {
        if (this.ngZone) {
          this.ngZone.run(() => func());
        } else {
          func();
        }
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: _Toast, deps: [{ token: ToastrService }, { token: ToastPackage }, { token: NgZone }], target: FactoryTarget.Component });
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "16.0.1", type: _Toast, isStandalone: true, selector: "[toast-component]", host: { listeners: { "click": "tapToast()", "mouseenter": "stickAround()", "mouseleave": "delayedHideToast()" }, properties: { "class": "this.toastClasses", "@flyInOut": "this.state", "style.display": "this.displayStyle" } }, ngImport: core_exports, template: `
  <button *ngIf="options.closeButton" (click)="remove()" type="button" class="toast-close-button" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <div *ngIf="title" [class]="options.titleClass" [attr.aria-label]="title">
    {{ title }} <ng-container *ngIf="duplicatesCount">[{{ duplicatesCount + 1 }}]</ng-container>
  </div>
  <div *ngIf="message && options.enableHtml" role="alert"
    [class]="options.messageClass" [innerHTML]="message">
  </div>
  <div *ngIf="message && !options.enableHtml" role="alert"
    [class]="options.messageClass" [attr.aria-label]="message">
    {{ message }}
  </div>
  <div *ngIf="options.progressBar">
    <div class="toast-progress" [style.width]="width + '%'"></div>
  </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
        trigger("flyInOut", [
          state("inactive", style({ opacity: 0 })),
          state("active", style({ opacity: 1 })),
          state("removed", style({ opacity: 0 })),
          transition("inactive => active", animate("{{ easeTime }}ms {{ easing }}")),
          transition("active => removed", animate("{{ easeTime }}ms {{ easing }}"))
        ])
      ] });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: Toast, decorators: [{
      type: Component,
      args: [{
        selector: "[toast-component]",
        template: `
  <button *ngIf="options.closeButton" (click)="remove()" type="button" class="toast-close-button" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <div *ngIf="title" [class]="options.titleClass" [attr.aria-label]="title">
    {{ title }} <ng-container *ngIf="duplicatesCount">[{{ duplicatesCount + 1 }}]</ng-container>
  </div>
  <div *ngIf="message && options.enableHtml" role="alert"
    [class]="options.messageClass" [innerHTML]="message">
  </div>
  <div *ngIf="message && !options.enableHtml" role="alert"
    [class]="options.messageClass" [attr.aria-label]="message">
    {{ message }}
  </div>
  <div *ngIf="options.progressBar">
    <div class="toast-progress" [style.width]="width + '%'"></div>
  </div>
  `,
        animations: [
          trigger("flyInOut", [
            state("inactive", style({ opacity: 0 })),
            state("active", style({ opacity: 1 })),
            state("removed", style({ opacity: 0 })),
            transition("inactive => active", animate("{{ easeTime }}ms {{ easing }}")),
            transition("active => removed", animate("{{ easeTime }}ms {{ easing }}"))
          ])
        ],
        preserveWhitespaces: false,
        standalone: true,
        imports: [NgIf]
      }]
    }], ctorParameters: function() {
      return [{ type: ToastrService }, { type: ToastPackage }, { type: NgZone }];
    }, propDecorators: { toastClasses: [{
      type: HostBinding,
      args: ["class"]
    }], state: [{
      type: HostBinding,
      args: ["@flyInOut"]
    }], displayStyle: [{
      type: HostBinding,
      args: ["style.display"]
    }], tapToast: [{
      type: HostListener,
      args: ["click"]
    }], stickAround: [{
      type: HostListener,
      args: ["mouseenter"]
    }], delayedHideToast: [{
      type: HostListener,
      args: ["mouseleave"]
    }] } });
    DefaultGlobalConfig = __spreadProps(__spreadValues({}, DefaultNoComponentGlobalConfig), {
      toastComponent: Toast
    });
    provideToastr = (config = {}) => {
      const providers = [
        {
          provide: TOAST_CONFIG,
          useValue: {
            default: DefaultGlobalConfig,
            config
          }
        }
      ];
      return makeEnvironmentProviders(providers);
    };
    ToastrModule = class _ToastrModule {
      static forRoot(config = {}) {
        return {
          ngModule: _ToastrModule,
          providers: [provideToastr(config)]
        };
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: _ToastrModule, deps: [], target: FactoryTarget.NgModule });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.1", ngImport: core_exports, type: _ToastrModule, imports: [Toast], exports: [Toast] });
      static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: _ToastrModule });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: ToastrModule, decorators: [{
      type: NgModule,
      args: [{
        imports: [Toast],
        exports: [Toast]
      }]
    }] });
    ToastrComponentlessModule = class _ToastrComponentlessModule {
      static forRoot(config = {}) {
        return {
          ngModule: ToastrModule,
          providers: [
            {
              provide: TOAST_CONFIG,
              useValue: {
                default: DefaultNoComponentGlobalConfig,
                config
              }
            }
          ]
        };
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: _ToastrComponentlessModule, deps: [], target: FactoryTarget.NgModule });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.1", ngImport: core_exports, type: _ToastrComponentlessModule });
      static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: _ToastrComponentlessModule });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: ToastrComponentlessModule, decorators: [{
      type: NgModule,
      args: [{}]
    }] });
    ToastNoAnimation = class _ToastNoAnimation {
      toastrService;
      toastPackage;
      appRef;
      message;
      title;
      options;
      duplicatesCount;
      originalTimeout;
      /** width of progress bar */
      width = -1;
      /** a combination of toast type and options.toastClass */
      toastClasses = "";
      /** hides component when waiting to be displayed */
      get displayStyle() {
        if (this.state === "inactive") {
          return "none";
        }
      }
      /** controls animation */
      state = "inactive";
      timeout;
      intervalId;
      hideTime;
      sub;
      sub1;
      sub2;
      sub3;
      constructor(toastrService, toastPackage, appRef) {
        this.toastrService = toastrService;
        this.toastPackage = toastPackage;
        this.appRef = appRef;
        this.message = toastPackage.message;
        this.title = toastPackage.title;
        this.options = toastPackage.config;
        this.originalTimeout = toastPackage.config.timeOut;
        this.toastClasses = `${toastPackage.toastType} ${toastPackage.config.toastClass}`;
        this.sub = toastPackage.toastRef.afterActivate().subscribe(() => {
          this.activateToast();
        });
        this.sub1 = toastPackage.toastRef.manualClosed().subscribe(() => {
          this.remove();
        });
        this.sub2 = toastPackage.toastRef.timeoutReset().subscribe(() => {
          this.resetTimeout();
        });
        this.sub3 = toastPackage.toastRef.countDuplicate().subscribe((count) => {
          this.duplicatesCount = count;
        });
      }
      ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
        this.sub3.unsubscribe();
        clearInterval(this.intervalId);
        clearTimeout(this.timeout);
      }
      /**
       * activates toast and sets timeout
       */
      activateToast() {
        this.state = "active";
        if (!(this.options.disableTimeOut === true || this.options.disableTimeOut === "timeOut") && this.options.timeOut) {
          this.timeout = setTimeout(() => {
            this.remove();
          }, this.options.timeOut);
          this.hideTime = (/* @__PURE__ */ new Date()).getTime() + this.options.timeOut;
          if (this.options.progressBar) {
            this.intervalId = setInterval(() => this.updateProgress(), 10);
          }
        }
        if (this.options.onActivateTick) {
          this.appRef.tick();
        }
      }
      /**
       * updates progress bar width
       */
      updateProgress() {
        if (this.width === 0 || this.width === 100 || !this.options.timeOut) {
          return;
        }
        const now = (/* @__PURE__ */ new Date()).getTime();
        const remaining = this.hideTime - now;
        this.width = remaining / this.options.timeOut * 100;
        if (this.options.progressAnimation === "increasing") {
          this.width = 100 - this.width;
        }
        if (this.width <= 0) {
          this.width = 0;
        }
        if (this.width >= 100) {
          this.width = 100;
        }
      }
      resetTimeout() {
        clearTimeout(this.timeout);
        clearInterval(this.intervalId);
        this.state = "active";
        this.options.timeOut = this.originalTimeout;
        this.timeout = setTimeout(() => this.remove(), this.originalTimeout);
        this.hideTime = (/* @__PURE__ */ new Date()).getTime() + (this.originalTimeout || 0);
        this.width = -1;
        if (this.options.progressBar) {
          this.intervalId = setInterval(() => this.updateProgress(), 10);
        }
      }
      /**
       * tells toastrService to remove this toast after animation time
       */
      remove() {
        if (this.state === "removed") {
          return;
        }
        clearTimeout(this.timeout);
        this.state = "removed";
        this.timeout = setTimeout(() => this.toastrService.remove(this.toastPackage.toastId));
      }
      tapToast() {
        if (this.state === "removed") {
          return;
        }
        this.toastPackage.triggerTap();
        if (this.options.tapToDismiss) {
          this.remove();
        }
      }
      stickAround() {
        if (this.state === "removed") {
          return;
        }
        clearTimeout(this.timeout);
        this.options.timeOut = 0;
        this.hideTime = 0;
        clearInterval(this.intervalId);
        this.width = 0;
      }
      delayedHideToast() {
        if (this.options.disableTimeOut === true || this.options.disableTimeOut === "extendedTimeOut" || this.options.extendedTimeOut === 0 || this.state === "removed") {
          return;
        }
        this.timeout = setTimeout(() => this.remove(), this.options.extendedTimeOut);
        this.options.timeOut = this.options.extendedTimeOut;
        this.hideTime = (/* @__PURE__ */ new Date()).getTime() + (this.options.timeOut || 0);
        this.width = -1;
        if (this.options.progressBar) {
          this.intervalId = setInterval(() => this.updateProgress(), 10);
        }
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: _ToastNoAnimation, deps: [{ token: ToastrService }, { token: ToastPackage }, { token: ApplicationRef }], target: FactoryTarget.Component });
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "16.0.1", type: _ToastNoAnimation, isStandalone: true, selector: "[toast-component]", host: { listeners: { "click": "tapToast()", "mouseenter": "stickAround()", "mouseleave": "delayedHideToast()" }, properties: { "class": "this.toastClasses", "style.display": "this.displayStyle" } }, ngImport: core_exports, template: `
  <button *ngIf="options.closeButton" (click)="remove()" type="button" class="toast-close-button" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <div *ngIf="title" [class]="options.titleClass" [attr.aria-label]="title">
    {{ title }} <ng-container *ngIf="duplicatesCount">[{{ duplicatesCount + 1 }}]</ng-container>
  </div>
  <div *ngIf="message && options.enableHtml" role="alert"
    [class]="options.messageClass" [innerHTML]="message">
  </div>
  <div *ngIf="message && !options.enableHtml" role="alert"
    [class]="options.messageClass" [attr.aria-label]="message">
    {{ message }}
  </div>
  <div *ngIf="options.progressBar">
    <div class="toast-progress" [style.width]="width + '%'"></div>
  </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: ToastNoAnimation, decorators: [{
      type: Component,
      args: [{
        selector: "[toast-component]",
        template: `
  <button *ngIf="options.closeButton" (click)="remove()" type="button" class="toast-close-button" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <div *ngIf="title" [class]="options.titleClass" [attr.aria-label]="title">
    {{ title }} <ng-container *ngIf="duplicatesCount">[{{ duplicatesCount + 1 }}]</ng-container>
  </div>
  <div *ngIf="message && options.enableHtml" role="alert"
    [class]="options.messageClass" [innerHTML]="message">
  </div>
  <div *ngIf="message && !options.enableHtml" role="alert"
    [class]="options.messageClass" [attr.aria-label]="message">
    {{ message }}
  </div>
  <div *ngIf="options.progressBar">
    <div class="toast-progress" [style.width]="width + '%'"></div>
  </div>
  `,
        standalone: true,
        imports: [NgIf]
      }]
    }], ctorParameters: function() {
      return [{ type: ToastrService }, { type: ToastPackage }, { type: ApplicationRef }];
    }, propDecorators: { toastClasses: [{
      type: HostBinding,
      args: ["class"]
    }], displayStyle: [{
      type: HostBinding,
      args: ["style.display"]
    }], tapToast: [{
      type: HostListener,
      args: ["click"]
    }], stickAround: [{
      type: HostListener,
      args: ["mouseenter"]
    }], delayedHideToast: [{
      type: HostListener,
      args: ["mouseleave"]
    }] } });
    DefaultNoAnimationsGlobalConfig = __spreadProps(__spreadValues({}, DefaultNoComponentGlobalConfig), {
      toastComponent: ToastNoAnimation
    });
    ToastNoAnimationModule = class _ToastNoAnimationModule {
      static forRoot(config = {}) {
        return {
          ngModule: _ToastNoAnimationModule,
          providers: [
            {
              provide: TOAST_CONFIG,
              useValue: {
                default: DefaultNoAnimationsGlobalConfig,
                config
              }
            }
          ]
        };
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: _ToastNoAnimationModule, deps: [], target: FactoryTarget.NgModule });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "16.0.1", ngImport: core_exports, type: _ToastNoAnimationModule, imports: [ToastNoAnimation], exports: [ToastNoAnimation] });
      static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: _ToastNoAnimationModule });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.1", ngImport: core_exports, type: ToastNoAnimationModule, decorators: [{
      type: NgModule,
      args: [{
        imports: [ToastNoAnimation],
        exports: [ToastNoAnimation]
      }]
    }] });
  }
});

// src/app/component/login-componet/login-componet.ts
var LoginComponet;
var init_login_componet3 = __esm({
  "src/app/component/login-componet/login-componet.ts"() {
    "use strict";
    init_tslib_es6();
    init_login_componet();
    init_login_componet2();
    init_common();
    init_core();
    init_forms();
    init_userLoginModel();
    init_UserService();
    init_router();
    init_ToastService();
    init_ngx_toastr();
    LoginComponet = class LoginComponet2 {
      userService;
      router;
      toastService;
      toastr;
      user = new UserLoginModel();
      loginForm;
      // Alert state
      successMessage = null;
      errorMessage = null;
      constructor(userService, router, toastService, toastr) {
        this.userService = userService;
        this.router = router;
        this.toastService = toastService;
        this.toastr = toastr;
        this.loginForm = new FormGroup({
          username: new FormControl("cbum@gmail.com", Validators.required),
          password: new FormControl("root@123", [Validators.required])
        });
      }
      handleLogin() {
        this.userService.validateUser(this.loginForm.value).subscribe({
          next: () => {
            this.toastService.showToast("Login Successful", "You have been logged in.", "success");
          },
          error: (errMessage) => {
            this.toastService.showToast("Login Failed", errMessage, "error");
          }
        });
      }
      static ctorParameters = () => [
        { type: UserService },
        { type: Router },
        { type: ToastService },
        { type: ToastrService }
      ];
    };
    LoginComponet = __decorate([
      Component({
        selector: "app-login-componet",
        imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
        template: login_componet_default,
        styles: [login_componet_default2]
      })
    ], LoginComponet);
  }
});

// angular:jit:template:src/app/component/notification/notification.html
var notification_default;
var init_notification = __esm({
  "angular:jit:template:src/app/component/notification/notification.html"() {
    notification_default = '<div class="container py-4">\n  <h3 class="mb-3">Client Notifications</h3>\n\n  <!-- If a notification is available -->\n  <div *ngIf="notification() as notification; else noNotification">\n    <div class="alert alert-success" role="alert">\n      <h5 class="alert-heading">New Plan Assigned!</h5>\n      <p>{{ notification.message }}</p>\n      <hr />\n      <p class="mb-0">\n        <strong>Assigned On:</strong> {{ notification.assignedOn }}\n      </p>\n      <p class="mb-0">\n        <strong>Workout Plan ID:</strong> {{ notification.workoutPlanId }}\n      </p>\n      <p class="mb-0">\n        <strong>Diet Plan ID:</strong> {{ notification.dietPlanId }}\n      </p>\n    </div>\n  </div>\n\n  <!-- If no notification is yet received -->\n  <ng-template #noNotification>\n    <div class="alert alert-secondary" role="alert">\n      No plan assignment notifications yet.\n    </div>\n  </ng-template>\n</div>\n';
  }
});

// angular:jit:style:src/app/component/notification/notification.css
var notification_default2;
var init_notification2 = __esm({
  "angular:jit:style:src/app/component/notification/notification.css"() {
    notification_default2 = "/* src/app/component/notification/notification.css */\n#notification {\n  background-color: #f8f9fa;\n  padding: 10px;\n  border: 1px solid #ccc;\n  max-width: 400px;\n  margin-top: 20px;\n}\n/*# sourceMappingURL=notification.css.map */\n";
  }
});

// src/app/component/notification/notification.ts
var Notification;
var init_notification3 = __esm({
  "src/app/component/notification/notification.ts"() {
    "use strict";
    init_tslib_es6();
    init_notification();
    init_notification2();
    init_common();
    init_core();
    init_esm2();
    init_core();
    Notification = class Notification2 {
      cdr;
      ngZone;
      notification = signal(null);
      connection;
      currentClientId = "0197939c-bd3c-7404-81ab-1aab11a7f268";
      constructor(cdr, ngZone) {
        this.cdr = cdr;
        this.ngZone = ngZone;
      }
      ngOnInit() {
        this.start();
      }
      start() {
        this.connection = new HubConnectionBuilder().withUrl("http://localhost:5002/notificationHub", {
          withCredentials: true
        }).withAutomaticReconnect([0, 2e3, 5e3, 1e4]).configureLogging(LogLevel.Information).build();
        this.connection.start().then(() => {
          console.log("Connected to SignalR hub.");
          return this.connection.invoke("Subscribe", this.currentClientId);
        }).then(() => {
          console.log("Joined group for client:", this.currentClientId);
        }).catch((err) => {
          console.error("SignalR connection or group join failed:", err);
        });
        this.connection.on("ReceivePlanAssignmentNotification", (data) => {
          this.ngZone.run(() => {
            console.log("Received notification: \u263A\uFE0F", data);
            this.notification.set({
              message: data.message,
              assignedOn: new Date(data.assignedOn).toLocaleString(),
              workoutPlanId: data.workoutPlanId,
              dietPlanId: data.dietPlanId
            });
            console.log("Notification set:", this.notification);
          });
        });
      }
      ngOnDestroy() {
        if (this.connection) {
          this.connection.stop();
        }
      }
      static ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: NgZone }
      ];
    };
    Notification = __decorate([
      Component({
        selector: "app-notification",
        standalone: true,
        imports: [CommonModule],
        template: notification_default,
        styles: [notification_default2]
      })
    ], Notification);
  }
});

// src/app/app.ts
var App;
var init_app3 = __esm({
  "src/app/app.ts"() {
    "use strict";
    init_tslib_es6();
    init_app();
    init_app2();
    init_core();
    init_router();
    init_login_componet3();
    init_notification3();
    init_toast();
    init_ToastService();
    App = class App2 {
      toastService;
      toast = { title: "", message: "", type: "info", visible: false };
      constructor(toastService) {
        this.toastService = toastService;
        this.toastService.toast$.subscribe((data) => this.toast = data);
      }
      title = "FitnessApp";
      static ctorParameters = () => [
        { type: ToastService }
      ];
    };
    App = __decorate([
      Component({
        selector: "app-root",
        standalone: true,
        imports: [RouterOutlet, LoginComponet, Notification, ToastComponent],
        template: app_default,
        styles: [app_default2]
      })
    ], App);
  }
});

// src/app/app.spec.ts
var require_app_spec = __commonJS({
  "src/app/app.spec.ts"(exports) {
    init_core();
    init_testing();
    init_app3();
    describe("App", () => {
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [App],
          providers: [provideZonelessChangeDetection()]
        }).compileComponents();
      }));
      it("should create the app", () => {
        const fixture = TestBed.createComponent(App);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
      });
    });
  }
});
export default require_app_spec();
/*! Bundled license information:

@angular/animations/fesm2022/private_export-B_vy_9K7.mjs:
@angular/animations/fesm2022/animations.mjs:
  (**
   * @license Angular v20.0.3
   * (c) 2010-2025 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=spec-app-app.spec.js.map
