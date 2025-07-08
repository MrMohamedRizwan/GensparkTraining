import {
  Quotes,
  init_quotes
} from "./chunk-UJ6PKW34.js";
import {
  ClientService,
  init_ClientService
} from "./chunk-4Z5BNEWW.js";
import {
  ProgressService,
  init_ProgressService
} from "./chunk-UP4ZRNAE.js";
import {
  PlanAssignmentService,
  init_PlanAssignmentService
} from "./chunk-QZNSCWCC.js";
import {
  HubConnectionBuilder,
  LogLevel,
  init_esm
} from "./chunk-SAK4XA3C.js";
import {
  Router,
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
  Injectable,
  NgZone,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  effect,
  init_core,
  init_testing,
  init_tslib_es6,
  signal
} from "./chunk-U4LD2BTV.js";

// angular:jit:template:src/app/component/client/client-dashboard/client-dashboard.html
var client_dashboard_default;
var init_client_dashboard = __esm({
  "angular:jit:template:src/app/component/client/client-dashboard/client-dashboard.html"() {
    client_dashboard_default = `<div class="container min-vh-100 d-flex">
  <!-- Main content -->
  <main class="flex-grow-1 p-4">
    <div class="container">
      <!-- Welcome and Quote -->
      <div class="mb-5">
        <h1 class="h3 fw-bold text-dark mb-2">
          Welcome back, {{ this.client().name }}!
        </h1>
        <p class="text-muted">Here's your fitness overview for today.</p>
        <div class="alert alert-primary fw-medium fst-italic">
          <app-quotes></app-quotes>
        </div>
      </div>

      <!-- Dashboard Cards -->
      <div class="row g-4 mb-5">
        <!-- Diet Plan -->
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <h5 class="card-title mb-0">Current Diet Plan</h5>
                <i class="bi bi-journal-text text-info fs-4"></i>
              </div>

              <ng-container *ngIf="dietPlans().length > 0">
                <h6 class="fw-semibold text-dark">
                  {{ dietPlans()[0].dietPlanTitle }}
                </h6>
                <p class="text-muted small mb-2">
                  Assigned on: {{ dietPlans()[0].assignedOn | date: 'mediumDate'
                  }}
                </p>
                <div class="d-flex justify-content-between small mb-1">
                  <span>Status</span>
                  <span>{{ dietPlans()[0].status }}</span>
                </div>
                <div class="mb-2">
                  <div class="d-flex justify-content-between small mb-1">
                    <span>Progress</span>
                    <span>{{ dietPlans()[0].progressPercentage }}%</span>
                  </div>
                  <div class="progress" style="height: 6px">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      [style.width.%]="dietPlans()[0].progressPercentage"
                      [attr.aria-valuenow]="dietPlans()[0].progressPercentage"
                      attr.aria-valuemin="0"
                      attr.aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div class="mt-3">
                  <button
                    *ngIf="dietPlans()[0].status === 'Completed'"
                    class="btn btn-outline-success btn-lg w-100 d-flex align-items-center justify-content-center"
                  >
                    <i class="bi bi-bar-chart-fill me-2"></i>
                    View Progress
                  </button>
                  <button
                    *ngIf="dietPlans()[0].status === 'On Progress'"
                    class="btn btn-success btn-lg w-100 d-flex align-items-center justify-content-center"
                    (click)="showDietDetails(dietPlans()[0]); $event.stopPropagation()"
                  >
                    <i class="bi bi-play-circle-fill me-2"></i>
                    Continue Diet
                  </button>
                  <button
                    *ngIf="dietPlans()[0].status === 'Not Started'"
                    class="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
                    (click)="acceptPlan(dietPlans()[0],0); $event.stopPropagation()"
                    (click)="dietPlans()[0].status = 'On Progress'; acceptPlan(dietPlans()[0],1); $event.stopPropagation()"
                  >
                    <i class="bi bi-check-circle-fill me-2"></i>
                    Accept Diet Plan
                  </button>
                </div>
              </ng-container>

              <div *ngIf="dietPlans().length === 0" class="text-muted small">
                No diet plan assigned yet.
              </div>
            </div>
          </div>
        </div>

        <!-- Workout Plan -->
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <h5 class="card-title mb-0">Current Workout</h5>
                <i class="bi bi-activity text-primary fs-4"></i>
              </div>

              <ng-container *ngIf="workoutPlans().length > 0">
                <h6 class="fw-semibold text-dark">
                  {{ workoutPlans()[0].workoutPlanTitle }}
                </h6>
                <p class="text-muted small mb-2">
                  Assigned on: {{ workoutPlans()[0].assignedOn | date:
                  'mediumDate' }}
                </p>
                <div class="d-flex justify-content-between small mb-1">
                  <span>Status</span>
                  <span>{{ workoutPlans()[0].status }}</span>
                </div>
                <div class="mb-2">
                  <div class="d-flex justify-content-between small mb-1">
                    <span>Progress</span>
                    <span>{{ workoutPlans()[0].progressPercentage }}%</span>
                  </div>
                  <div class="progress" style="height: 6px">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      [style.width.%]="workoutPlans()[0].progressPercentage"
                      [attr.aria-valuenow]="workoutPlans()[0].progressPercentage"
                      attr.aria-valuemin="0"
                      attr.aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div class="mt-3">
                  <button
                    *ngIf="dietPlans()[0].status === 'Completed'"
                    class="btn btn-outline-primary btn-lg w-100 d-flex align-items-center justify-content-center"
                  >
                    <i class="bi bi-bar-chart-fill me-2"></i>
                    View Progress
                  </button>
                  <button
                    *ngIf="dietPlans()[0].status === 'On Progress'"
                    class="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
                    (click)="showWorkoutDetails(dietPlans()[0]); $event.stopPropagation()"
                  >
                    <i class="bi bi-play-circle-fill me-2"></i>
                    Continue Workout
                  </button>
                  <button
                    *ngIf="dietPlans()[0].status === 'Not Started'"
                    class="btn btn-primary btn-lg w-100 d-flex align-items-center justify-content-center"
                    (click)="acceptPlan(dietPlans()[0],1); $event.stopPropagation()"
                    (click)="dietPlans()[0].status = 'On Progress'; acceptPlan(dietPlans()[0],1); $event.stopPropagation()"
                  >
                    <i class="bi bi-check-circle-fill me-2"></i>
                    Accept Workout Plan
                  </button>
                </div>
              </ng-container>

              <div *ngIf="workoutPlans().length === 0" class="text-muted small">
                No workout plan assigned yet.
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Summary -->
        <div class="col-md-6 col-lg-4">
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <h5 class="card-title mb-0">Progress Summary</h5>
                <i class="bi bi-graph-up-arrow text-success fs-4"></i>
              </div>
              <ul class="list-group list-group-flush small">
                <li class="list-group-item d-flex justify-content-between px-0">
                  <span>Height</span>
                  <span class="fw-semibold">{{ this.client().height }} cm</span>
                </li>
                <li class="list-group-item d-flex justify-content-between px-0">
                  <span>Current Weight</span>
                  <span class="fw-semibold">{{ this.client().weight }} kg</span>
                </li>
                <li class="list-group-item d-flex justify-content-between px-0">
                  <span>Goal Weight</span>
                  <span class="fw-semibold">{{ this.client().goal }} </span>
                </li>
              </ul>
              <div
                class="border-top pt-2 mt-2 text-success d-flex justify-content-between small fw-semibold"
              >
                <span *ngIf="this.weightChange != null"> Progress </span>
                <span *ngIf="this.weightChange != null">
                  {{ this.weightChange }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title mb-3">Recent Notifications</h5>

          <ng-container
            *ngIf="progressList && progressList.length > 0; else noActivity"
          >
            <ul class="list-group list-group-flush">
              <li
                *ngFor="let activity of progressList"
                class="list-group-item d-flex align-items-center"
              >
                <i class="bi bi-clock-history text-primary me-3 fs-5"></i>
                <span class="fw-medium">{{ activity }}</span>
              </li>
            </ul>
          </ng-container>
          <ng-template #noActivity>
            <div class="text-muted small">No recent activity.</div>
          </ng-template>
        </div>
      </div>
    </div>
  </main>
</div>
`;
  }
});

// angular:jit:style:src/app/component/client/client-dashboard/client-dashboard.css
var client_dashboard_default2;
var init_client_dashboard2 = __esm({
  "angular:jit:style:src/app/component/client/client-dashboard/client-dashboard.css"() {
    client_dashboard_default2 = "/* src/app/component/client/client-dashboard/client-dashboard.css */\n/*# sourceMappingURL=client-dashboard.css.map */\n";
  }
});

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
      startConnection() {
        this.connection = new HubConnectionBuilder().withUrl("http://localhost:5002/notificationHub", {
          withCredentials: true
        }).withAutomaticReconnect([0, 2e3, 5e3, 1e4]).configureLogging(LogLevel.Information).build();
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

// src/app/component/client/client-dashboard/client-dashboard.ts
var ClientDashboard;
var init_client_dashboard3 = __esm({
  "src/app/component/client/client-dashboard/client-dashboard.ts"() {
    "use strict";
    init_tslib_es6();
    init_client_dashboard();
    init_client_dashboard2();
    init_core();
    init_quotes();
    init_PlanAssignmentService();
    init_router();
    init_ClientService();
    init_common();
    init_NotificationService();
    init_ProgressService();
    ClientDashboard = class ClientDashboard2 {
      clientService;
      planAssignmentService;
      progressSevice;
      router;
      notificationService;
      cdr;
      notificationList = [];
      constructor(clientService, planAssignmentService, progressSevice, router, notificationService, cdr) {
        this.clientService = clientService;
        this.planAssignmentService = planAssignmentService;
        this.progressSevice = progressSevice;
        this.router = router;
        this.notificationService = notificationService;
        this.cdr = cdr;
        effect(() => {
          const notification = this.notificationService.notification();
          if (notification) {
            setTimeout(() => {
              this.notificationList.push(notification.message);
              this.progressList = [notification.message, ...this.progressList];
              this.cdr.detectChanges();
            });
          }
        });
      }
      signalRNotification() {
        console.log("Signal R");
      }
      clientId = null;
      progressList = ["Welcome"];
      ngAfterViewInit() {
        const now = /* @__PURE__ */ new Date();
        console.log("Current time:", now.toLocaleTimeString());
        if (now.getHours() === 10) {
          this.progressList = ["Drink water", ...this.progressList];
          this.cdr.detectChanges();
        }
      }
      clientDetails;
      client = signal(null);
      allPlans = signal([]);
      workoutPlans = signal([]);
      dietPlans = signal([]);
      weightChange;
      user = {
        name: "Rizwan",
        height: 175,
        currentWeight: 72,
        goalWeight: 68
      };
      selectedWorkoutDetails = null;
      showWorkoutDetails(details) {
        this.selectedWorkoutDetails = details;
        console.log("Workout Details:", details);
        this.router.navigate([
          "/client-workout-plan",
          details.workoutPlanID,
          details.planAssignmentId
        ]);
      }
      selectedDietDetails = null;
      showDietDetails(details) {
        this.selectedDietDetails = details;
        console.log("Diet Details:", details);
        this.router.navigate([
          "/client-diet-plan",
          details.dietPlanId,
          details.planAssignmentId
        ]);
      }
      acceptPlan(details, val) {
        console.log(details.planAssignmentId);
        const payload = {
          PlanAssignmentID: details.planAssignmentId,
          status: "On Progress"
        };
        this.planAssignmentService.AcceptPlan(payload).subscribe({
          next: (res) => {
            console.log(`${res} Response`);
            if (val == 1) {
              sessionStorage.setItem("WorkoutPlanAssignment", JSON.stringify({
                PlanAssignmentID: details.planAssignmentId,
                WorkoutPlanID: details.workoutPlanID
              }));
            } else {
              sessionStorage.setItem("DietPlanAssignment", JSON.stringify({
                DietPlanAssignmentID: details.planAssignmentId,
                DietPlanID: details.dietPlanId
              }));
            }
          }
        });
      }
      getProgresss() {
        this.progressSevice.getAllProgress().subscribe((res) => {
          this.weightChange = res.$values[0].weightChangeSummary;
          console.log(this.weightChange);
        });
      }
      ngOnInit() {
        this.getProgresss();
        this.signalRNotification();
        this.clientService.getMyDetails().subscribe({
          next: (res) => {
            const clientData = res.message;
            if (!clientData) {
              console.error("\u274C No client data found");
              return;
            }
            console.log(clientData);
            this.client.set(clientData);
            this.clientDetails = clientData;
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error("\u274C Error fetching client data:", err);
          }
        });
        this.getAssignedPlans();
      }
      ngOnDestroy() {
        this.notificationService.stopConnection();
      }
      getAssignedPlans() {
        this.planAssignmentService.getPlans().subscribe({
          next: (res) => {
            const plans = "$values" in res ? res.$values : [];
            this.allPlans.set(plans);
            const sortedByDate = plans.filter((p) => p.assignedOn).sort((a, b) => new Date(b.assignedOn).getTime() - new Date(a.assignedOn).getTime());
            const latestWorkoutPlan = sortedByDate.find((p) => p.workoutPlanTitle && p.workoutPlanTitle !== "Not Assigned");
            const latestDietPlan = sortedByDate.find((p) => p.dietPlanTitle && p.dietPlanTitle !== "Not Assigned");
            this.workoutPlans.set(latestWorkoutPlan ? [latestWorkoutPlan] : []);
            this.dietPlans.set(latestDietPlan ? [latestDietPlan] : []);
          },
          error: (err) => {
            console.error("\u274C Failed to fetch plans:", err);
            this.allPlans.set([]);
            this.workoutPlans.set([]);
            this.dietPlans.set([]);
          }
        });
      }
      static ctorParameters = () => [
        { type: ClientService },
        { type: PlanAssignmentService },
        { type: ProgressService },
        { type: Router },
        { type: NotificationService },
        { type: ChangeDetectorRef }
      ];
    };
    ClientDashboard = __decorate([
      Component({
        selector: "app-client-dashboard",
        standalone: true,
        imports: [Quotes, CommonModule],
        template: client_dashboard_default,
        styles: [client_dashboard_default2]
      })
    ], ClientDashboard);
  }
});

// src/app/component/client/client-dashboard/client-dashboard.spec.ts
var require_client_dashboard_spec = __commonJS({
  "src/app/component/client/client-dashboard/client-dashboard.spec.ts"(exports) {
    init_testing();
    init_client_dashboard3();
    describe("ClientDashboard", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ClientDashboard]
        }).compileComponents();
        fixture = TestBed.createComponent(ClientDashboard);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_client_dashboard_spec();
//# sourceMappingURL=spec-app-component-client-client-dashboard-client-dashboard.spec.js.map
