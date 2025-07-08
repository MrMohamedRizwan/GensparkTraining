import {
  HubConnectionBuilder,
  LogLevel,
  init_esm
} from "./chunk-KUTXVGKE.js";
import {
  CommonModule,
  init_common
} from "./chunk-UDVGPYPD.js";
import {
  ChangeDetectorRef,
  Component,
  NgZone,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6,
  signal
} from "./chunk-I33ILCKL.js";

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

export {
  Notification,
  init_notification3 as init_notification
};
//# sourceMappingURL=chunk-DHAXCDGX.js.map
