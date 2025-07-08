import {
  HubConnectionBuilder,
  LogLevel,
  init_esm
} from "./chunk-SAK4XA3C.js";
import {
  LoginComponet,
  init_login_componet
} from "./chunk-CLMDAV4B.js";
import {
  ToastComponent,
  init_toast
} from "./chunk-LRIKAO62.js";
import "./chunk-UWUEIKVM.js";
import "./chunk-VC5DMEMI.js";
import {
  ToastService,
  init_ToastService
} from "./chunk-VAM7ZMGK.js";
import {
  RouterOutlet,
  init_router
} from "./chunk-W25TYQ46.js";
import "./chunk-OSO6IUH2.js";
import "./chunk-XSFPB7SI.js";
import {
  CommonModule,
  init_common
} from "./chunk-62KLJIS4.js";
import {
  ChangeDetectorRef,
  Component,
  NgZone,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_testing,
  init_tslib_es6,
  provideZonelessChangeDetection,
  signal
} from "./chunk-U4LD2BTV.js";

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
    init_esm();
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
    init_login_componet();
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
      it("should render title", () => {
        const fixture = TestBed.createComponent(App);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector("h1")?.textContent).toContain("Hello, FitnessApp");
      });
    });
  }
});
export default require_app_spec();
//# sourceMappingURL=spec-app-app.spec.js.map
