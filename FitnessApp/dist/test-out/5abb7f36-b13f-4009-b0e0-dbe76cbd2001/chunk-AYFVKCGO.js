import {
  Router,
  init_router
} from "./chunk-W25TYQ46.js";
import {
  HttpClient,
  init_http
} from "./chunk-XSFPB7SI.js";
import {
  CommonModule,
  init_common
} from "./chunk-62KLJIS4.js";
import {
  ChangeDetectorRef,
  Component,
  Injectable,
  Input,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6,
  inject
} from "./chunk-U4LD2BTV.js";

// angular:jit:template:src/app/component/calender-component/calender-component.html
var calender_component_default;
var init_calender_component = __esm({
  "angular:jit:template:src/app/component/calender-component/calender-component.html"() {
    calender_component_default = `<div class="calendar-container">
  <!-- Header with week navigation -->
  <div class="header d-flex justify-content-between align-items-center my-3">
    <button class="btn btn-outline-primary btn-sm" (click)="goToPreviousWeek()">
      &#8592; Prev
    </button>
    <h4 class="mb-0">
      {{ currentWeekDates[0] | date: 'MMM d' }} - {{ currentWeekDates[6] | date:
      'MMM d, yyyy' }}
    </h4>
    <button class="btn btn-outline-primary btn-sm" (click)="goToNextWeek()">
      Next &#8594;
    </button>
  </div>

  <!-- Days of the current week -->
  <div class="row text-center font-weight-bold mb-2">
    <div class="col" *ngFor="let day of daysOfWeek">{{ day }}</div>
  </div>

  <div class="row text-center">
    <div
      class="col border m-1 p-2 rounded"
      *ngFor="let date of currentWeekDates"
      (click)="onDateClick(date)"
      style="cursor: pointer"
      [ngClass]="{
        'bg-success text-white': hasWorkoutEntry(date),
        'bg-light': !hasWorkoutEntry(date)
      }"
    >
      <div class="day-number">
        {{ date.getDate() }}
        <i
          *ngIf="hasWorkoutEntry(date)"
          class="bi bi-lightning-charge-fill ms-1"
          style="color: orange"
        ></i>
      </div>
    </div>
  </div>

  <!-- Workout Log Modal -->
  <div
    class="modal fade"
    id="workoutLogModal"
    tabindex="-1"
    aria-labelledby="workoutLogModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="workoutLogModalLabel">
            Workout Logs - {{ selectedDate | date: 'mediumDate' }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div
            *ngIf="selectedWorkoutLogs.length === 0"
            class="text-center text-muted py-3"
          >
            <i class="bi bi-exclamation-circle fs-3"></i>
            <p class="mt-2">No workout logs available for this date.</p>
          </div>

          <div
            *ngFor="let log of selectedWorkoutLogs"
            class="card mb-4 shadow-sm border-0"
          >
            <div class="card-body">
              <h5 class="card-title text-primary">
                Workout Summary
                <span class="badge bg-light text-dark float-end"
                  >{{ log.date | date: 'medium' }}</span
                >
              </h5>

              <p class="mb-1">
                <strong>Total Exercises:</strong> {{ log.totalExercises }}
              </p>
              <p class="mb-1 text-success">
                <strong>Calories Burnt:</strong> {{ log.caloriesBurnt }} kcal
              </p>
              <p class="mb-3 text-primary">
                <strong>Calories Consumed:</strong> {{ log.caloriesTaken }} kcal
              </p>

              <div *ngIf="log.exerciseJSON" class="mt-3">
                <h6 class="text-secondary">Exercises Performed</h6>
                <div
                  *ngFor="let ex of parseJSON(log.exerciseJSON)"
                  class="border-start border-3 ps-3 mb-3"
                >
                  <p class="mb-1"><strong>{{ ex.name }}</strong></p>
                  <small class="text-muted">
                    Sets: {{ ex.sets }}, Reps: {{ ex.reps }}, Rest: {{
                    ex.restSeconds }}s, Calories: {{ ex.calories }} kcal
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;
  }
});

// angular:jit:style:src/app/component/calender-component/calender-component.css
var calender_component_default2;
var init_calender_component2 = __esm({
  "angular:jit:style:src/app/component/calender-component/calender-component.css"() {
    calender_component_default2 = "/* src/app/component/calender-component/calender-component.css */\n.calendar-container {\n  max-width: 600px;\n  margin: 0 auto;\n  padding: 16px;\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  font-family: sans-serif;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-weight: bold;\n  margin-bottom: 16px;\n}\n.week-row {\n  display: flex;\n  justify-content: space-between;\n}\n.day-cell {\n  flex: 1;\n  text-align: center;\n  padding: 12px 0;\n  cursor: pointer;\n  border-radius: 8px;\n  transition: background 0.2s ease;\n}\n.day-cell:hover {\n  background-color: #f0f8ff;\n}\n.day-name {\n  font-size: 14px;\n  color: #666;\n}\n.day-number {\n  font-size: 18px;\n  font-weight: 600;\n  position: relative;\n}\n.entry-icon {\n  position: absolute;\n  font-size: 14px;\n  right: 12px;\n  top: 0px;\n}\n.card {\n  border-radius: 12px;\n}\n.card-body {\n  padding: 1rem;\n}\n.card-title {\n  font-weight: 600;\n}\nbutton.btn-sm {\n  min-width: 120px;\n}\n.client-progress {\n  padding: 0 150px;\n}\n.card-title {\n  font-size: 1.1rem;\n  font-weight: 600;\n}\n.badge {\n  font-size: 0.9rem;\n}\n/*# sourceMappingURL=calender-component.css.map */\n";
  }
});

// src/app/services/WorkoutLogService.ts
var WorkoutLogService;
var init_WorkoutLogService = __esm({
  "src/app/services/WorkoutLogService.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_http();
    init_router();
    WorkoutLogService = class WorkoutLogService2 {
      router;
      http = inject(HttpClient);
      constructor(router) {
        this.router = router;
      }
      getWorkoutLog(clientId) {
        const token = this.getToken();
        return this.http.get(`http://localhost:5002/api/v1/Workout/client/${clientId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      getWorkoutLogByid(id) {
        const token = this.getToken();
        return this.http.get(`http://localhost:5002/api/v1/Workout/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      getToken() {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user)?.token : null;
      }
      static ctorParameters = () => [
        { type: Router }
      ];
    };
    WorkoutLogService = __decorate([
      Injectable()
    ], WorkoutLogService);
  }
});

// src/app/component/calender-component/calender-component.ts
var CalenderComponent;
var init_calender_component3 = __esm({
  "src/app/component/calender-component/calender-component.ts"() {
    "use strict";
    init_tslib_es6();
    init_calender_component();
    init_calender_component2();
    init_common();
    init_core();
    init_WorkoutLogService();
    CalenderComponent = class CalenderComponent2 {
      workoutLogService;
      cdRef;
      parseJSON(json) {
        try {
          return JSON.parse(json);
        } catch (error) {
          console.error("\u274C Failed to parse exerciseJSON:", error);
          return [];
        }
      }
      clientId;
      constructor(workoutLogService, cdRef) {
        this.workoutLogService = workoutLogService;
        this.cdRef = cdRef;
      }
      currentDate = /* @__PURE__ */ new Date();
      // represents the current month/year
      daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      workoutLogs = [];
      workoutDates = [];
      // ISO dates with workouts
      workoutIds = {};
      daysInMonth = [];
      selectedDate = null;
      selectedWorkoutLogs = [];
      ngOnInit() {
        this.setMonthDays();
        this.getWorkoutLogsOfClient();
        this.setCurrentWeek();
      }
      setMonthDays() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const totalDays = lastDay.getDate();
        this.daysInMonth = Array.from({ length: totalDays }, (_, i) => {
          return new Date(year, month, i + 1);
        });
      }
      getWorkoutLogsOfClient() {
        this.workoutLogService.getWorkoutLog(this.clientId).subscribe({
          next: (res) => {
            this.workoutLogs = res.$values || [];
            this.workoutIds = this.workoutLogs.reduce((acc, log) => {
              const date = log.date ? log.date.split("T")[0] : null;
              if (date) {
                if (!acc[date])
                  acc[date] = [];
                acc[date].push(log.id);
              }
              return acc;
            }, {});
            this.workoutDates = Object.keys(this.workoutIds);
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
      goToPreviousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.setMonthDays();
      }
      goToNextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.setMonthDays();
      }
      hasWorkoutEntry(date) {
        const iso = date.toISOString().split("T")[0];
        return this.workoutDates.includes(iso);
      }
      onDateClick(date) {
        this.selectedDate = date;
        const isoDate = date.toISOString().split("T")[0];
        const workoutIdsForDate = this.workoutIds?.[isoDate] || [];
        this.selectedWorkoutLogs = [];
        if (workoutIdsForDate.length > 0) {
          let pending = workoutIdsForDate.length;
          for (const wId of workoutIdsForDate) {
            this.workoutLogService.getWorkoutLogByid(wId).subscribe({
              next: (res) => {
                this.selectedWorkoutLogs.push(res);
                this.cdRef.detectChanges();
                pending--;
                if (pending === 0)
                  this.openModal();
              },
              error: (err) => {
                console.error(err);
                pending--;
                if (pending === 0)
                  this.openModal();
              }
            });
          }
        } else {
          this.openModal();
        }
      }
      openModal() {
        const modalElement = document.getElementById("workoutLogModal");
        if (modalElement) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        }
      }
      currentWeekDates = [];
      setCurrentWeek() {
        const startOfWeek = this.getStartOfWeek(this.currentDate);
        this.currentWeekDates = Array.from({ length: 7 }, (_, i) => {
          const d = new Date(startOfWeek);
          d.setDate(d.getDate() + i);
          return d;
        });
      }
      getStartOfWeek(date) {
        const day = date.getDay();
        const diff = date.getDate() - day;
        return new Date(date.getFullYear(), date.getMonth(), diff);
      }
      goToPreviousWeek() {
        this.currentDate.setDate(this.currentDate.getDate() - 7);
        this.setCurrentWeek();
      }
      goToNextWeek() {
        this.currentDate.setDate(this.currentDate.getDate() + 7);
        this.setCurrentWeek();
      }
      getMonthYear() {
        return this.currentDate.toLocaleString("default", {
          month: "long",
          year: "numeric"
        });
      }
      static ctorParameters = () => [
        { type: WorkoutLogService },
        { type: ChangeDetectorRef }
      ];
      static propDecorators = {
        clientId: [{ type: Input }]
      };
    };
    CalenderComponent = __decorate([
      Component({
        selector: "app-calender-component",
        standalone: true,
        imports: [CommonModule],
        template: calender_component_default,
        styles: [calender_component_default2]
      })
    ], CalenderComponent);
  }
});

export {
  CalenderComponent,
  init_calender_component3 as init_calender_component
};
//# sourceMappingURL=chunk-AYFVKCGO.js.map
