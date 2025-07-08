import {
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
  init_esm
} from "./chunk-OACQ6NIV.js";
import {
  Injectable,
  NgZone,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6,
  signal
} from "./chunk-37HPC2LK.js";

// src/app/services/NotificationService.ts
var NotificationService;
var init_NotificationService = __esm({
  "src/app/services/NotificationService.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_esm();
    NotificationService = class NotificationService2 {
      ngZone;
      connection;
      currentClientId = "";
      // Use WritableSignal instead of Signal
      notification = signal(null);
      constructor(ngZone) {
        this.ngZone = ngZone;
        this.extractClientIdFromToken();
        if (this.currentClientId) {
          this.startConnection();
          this.joinCoachGroup(this.currentClientId);
        }
      }
      extractClientIdFromToken() {
        const userItem = localStorage.getItem("user");
        console.log("\u{1F4E6} Raw user item from localStorage:", userItem);
        if (!userItem)
          return;
        try {
          const parsedUser = JSON.parse(userItem);
          const jwt = parsedUser?.token;
          if (!jwt) {
            console.warn("\u26A0\uFE0F No token found in parsed user object.");
            return;
          }
          const payloadBase64 = jwt.split(".")[1];
          const decodedPayload = atob(payloadBase64);
          const payload = JSON.parse(decodedPayload);
          this.currentClientId = payload.UserId || payload.clientId || payload.sub || "";
          console.log("\u2705 Extracted clientId:", this.currentClientId);
        } catch (e) {
          console.error("\u274C Failed to parse or decode token:", e);
        }
      }
      joinCoachGroup(coachId) {
        if (this.connection && this.connection.state === HubConnectionState.Connected) {
          this.connection.invoke("JoinCoachGroup", coachId).then(() => console.log("\u2705 Joined coach group:", coachId)).catch((err) => console.error("\u274C Failed to join coach group:", err));
        }
      }
      startConnection() {
        this.connection = new HubConnectionBuilder().withUrl("http://localhost:5002/notificationHub", {
          withCredentials: true
        }).withAutomaticReconnect([0, 2e3, 5e3, 1e4]).configureLogging(LogLevel.Information).build();
        this.connection.on("ProgressUploaded", (data) => {
          this.ngZone.run(() => {
            console.log("\u{1F4E5} Progress uploaded notification received:", data);
            this.notification.set({
              message: data.clientName,
              assignedOn: "",
              workoutPlanId: "",
              dietPlanId: ""
            });
          });
        });
        this.connection.start().then(() => this.connection.invoke("Subscribe", this.currentClientId)).catch((err) => console.error("\u274C SignalR connection or subscription failed:", err));
        this.connection.on("ReceivePlanAssignmentNotification", (data) => {
          this.ngZone.run(() => {
            this.notification.set({
              message: data.message,
              assignedOn: new Date(data.assignedOn).toLocaleString(),
              workoutPlanId: data.workoutPlanId,
              dietPlanId: data.dietPlanId
            });
          });
        });
      }
      stopConnection() {
        if (this.connection) {
          this.connection.stop();
        }
      }
      static ctorParameters = () => [
        { type: NgZone }
      ];
    };
    NotificationService = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], NotificationService);
  }
});

export {
  NotificationService,
  init_NotificationService
};
//# sourceMappingURL=chunk-KAUKIRM2.js.map
