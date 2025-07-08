import {
  CoachService,
  init_CoachService
} from "./chunk-FFXPDL7I.js";
import {
  NgChartsModule,
  init_ng2_charts
} from "./chunk-VBQQPNUH.js";
import "./chunk-6YDZZKHI.js";
import "./chunk-VDQ734U5.js";
import "./chunk-35V5GIMJ.js";
import {
  CommonModule,
  init_common
} from "./chunk-UDVGPYPD.js";
import {
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_testing,
  init_tslib_es6,
  signal
} from "./chunk-I33ILCKL.js";

// angular:jit:template:src/app/component/coach/coach-dashboard/coach-dashboard.html
var coach_dashboard_default;
var init_coach_dashboard = __esm({
  "angular:jit:template:src/app/component/coach/coach-dashboard/coach-dashboard.html"() {
    coach_dashboard_default = `<div class="container py-5">
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h2 class="fw-bold">Coach Dashboard</h2>
    <!-- <button class="btn btn-outline-primary btn-sm">Settings</button> -->
  </div>
  <!-- Overview Cards -->
  <div class="row g-4 mb-5">
    <div
      class="col-12 col-sm-6 col-lg-4"
      *ngFor="let card of [
                { label: 'Total Clients', value: totalClients(), icon: 'bi-people', color: 'primary' },
                { label: 'Workout Plans', value: activeWorkoutPlans(), icon: 'bi-bar-chart', color: 'success' },
                { label: 'Diet Plans', value: activeDietPlans(), icon: 'bi-egg-fried', color: 'info' },
            ]"
    >
      <div class="card h-100 shadow border-0">
        <div class="card-body d-flex align-items-center">
          <div class="me-3">
            <span
              class="bg-{{ card.color }} bg-opacity-10 text-{{ card.color }} rounded-circle d-flex align-items-center justify-content-center"
              style="width: 48px; height: 48px"
            >
              <i class="bi {{ card.icon }} fs-3"></i>
            </span>
          </div>
          <div>
            <div class="text-muted small">{{ card.label }}</div>
            <div class="fw-bold fs-4">{{ card.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Chart and Progress Section -->
  <div class="row g-4 mb-5">
    <div class="col-lg-7">
      <div class="card shadow border-0 h-100">
        <div class="card-body">
          <h5 class="card-title mb-3">Workout Plans Assigned (Weekly)</h5>
          <canvas
            baseChart
            [data]="barChartData"
            [options]="barChartOptions"
            chartType="bar"
            height="120"
          ></canvas>
        </div>
      </div>
    </div>
    <div class="col-lg-5">
      <div
        class="card shadow border-0 d-flex justify-content-center align-items-center"
        style="height: 99%; width: 99%"
      >
        <canvas
          baseChart
          [data]="{ labels: pieChartLabels, datasets: [{ data: pieChartData }] }"
          [options]="pieChartOptions"
          [type]="'pie'"
          style="height: 100px; width: 100%"
        ></canvas>
      </div>
    </div>
  </div>

  <!-- Recent Activities -->
  <div class="card shadow border-0 mb-4">
    <div class="card-body">
      <h5 class="card-title mb-3">Recent Activities</h5>
      <ul class="list-group list-group-flush">
        <li
          class="list-group-item px-0"
          *ngFor="let activity of recentActivities"
        >
          <i class="bi bi-clock-history me-2 text-primary"></i>{{ activity }}
        </li>
      </ul>
    </div>
  </div>
</div>
`;
  }
});

// angular:jit:style:src/app/component/coach/coach-dashboard/coach-dashboard.css
var coach_dashboard_default2;
var init_coach_dashboard2 = __esm({
  "angular:jit:style:src/app/component/coach/coach-dashboard/coach-dashboard.css"() {
    coach_dashboard_default2 = "/* src/app/component/coach/coach-dashboard/coach-dashboard.css */\n/*# sourceMappingURL=coach-dashboard.css.map */\n";
  }
});

// src/app/component/coach/coach-dashboard/coach-dashboard.ts
var CoachDashboard;
var init_coach_dashboard3 = __esm({
  "src/app/component/coach/coach-dashboard/coach-dashboard.ts"() {
    "use strict";
    init_tslib_es6();
    init_coach_dashboard();
    init_coach_dashboard2();
    init_common();
    init_core();
    init_ng2_charts();
    init_CoachService();
    CoachDashboard = class CoachDashboard2 {
      coachService;
      // Signals
      totalClients = signal(0);
      activeWorkoutPlans = signal(0);
      activeDietPlans = signal(0);
      completedPlans = signal(0);
      clientPro = signal([]);
      // clients with status
      // Bar chart for plan assignment trends
      barChartData = {
        labels: [],
        datasets: []
      };
      barChartOptions = {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: "Number of Plans" }
          },
          x: {
            title: { display: true, text: "Days" }
          }
        },
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Weekly Plan Assignments" }
        }
      };
      // Optional pie chart (client status)
      pieChartLabels = [];
      pieChartData = [];
      pieChartOptions = {
        responsive: true,
        plugins: {
          legend: { position: "bottom" },
          title: { display: true, text: "Client Status Distribution" }
        }
      };
      pieChartType = "pie";
      // Static dummy activity & progress
      recentActivities = [
        "Welcome"
        // 'Assigned "Strength Plan" to John Doe',
        // 'Sarah completed Week 2 of "HIIT Program"',
        // 'Mike uploaded progress photo',
        // 'Lisa updated weight tracking',
      ];
      clientProgress = [
        { name: "John Doe", progress: 75 },
        { name: "Sarah Smith", progress: 50 },
        { name: "Mike Brown", progress: 30 },
        { name: "Lisa Ray", progress: 90 }
      ];
      constructor(coachService) {
        this.coachService = coachService;
      }
      ngOnInit() {
        this.fetchClientData();
        this.fetchWorkoutAndDietPlans();
        this.fetchAssignedPlansChart();
      }
      fetchClientData() {
        this.coachService.getClientsList().subscribe({
          next: (res) => {
            const clients = res.items?.$values ?? [];
            this.totalClients.set(clients.length);
            this.clientPro.set(clients);
            const statusCounts = clients.reduce((acc, c) => {
              acc[c.status] = (acc[c.status] || 0) + 1;
              return acc;
            }, {});
            this.pieChartLabels = Object.keys(statusCounts);
            this.pieChartData = Object.values(statusCounts);
          },
          error: (err) => {
            console.error("Failed to fetch clients:", err);
          }
        });
      }
      fetchWorkoutAndDietPlans() {
        this.coachService.getWorkouts().subscribe({
          next: (res) => {
            this.activeWorkoutPlans.set(res.items?.$values?.length ?? 0);
          },
          error: (err) => console.error("Workout plans fetch error:", err)
        });
        this.coachService.getDiets().subscribe({
          next: (res) => {
            this.activeDietPlans.set(res.items?.$values?.length ?? 0);
          },
          error: (err) => console.error("Diet plans fetch error:", err)
        });
      }
      fetchAssignedPlansChart() {
        this.coachService.getAssignedPlansChart().subscribe({
          next: (res) => {
            let labels = res.labels?.$values ?? [];
            if (labels.length > 7) {
              labels = labels.slice(-7);
            }
            const formattedLabels = labels.map((dateStr) => {
              const date = new Date(dateStr);
              const day = date.getDate();
              const month = date.toLocaleString("en-US", { month: "short" });
              return `${day} ${month}`;
            });
            const datasets = res.datasets?.$values?.map((ds) => {
              const data = ds.data?.$values ?? [];
              const slicedData = data.length > 7 ? data.slice(-7) : data;
              return {
                label: ds.label,
                data: slicedData,
                backgroundColor: ds.label === "Workout Plans Assigned" ? "#0d6efd" : "#20c997",
                borderRadius: 6
              };
            }) ?? [];
            this.barChartData = { labels: formattedLabels, datasets };
          },
          error: (err) => {
            console.error("Error fetching assigned plans chart:", err);
          }
        });
      }
      static ctorParameters = () => [
        { type: CoachService }
      ];
    };
    CoachDashboard = __decorate([
      Component({
        selector: "app-coach-dashboard",
        standalone: true,
        imports: [CommonModule, NgChartsModule],
        template: coach_dashboard_default,
        styles: [coach_dashboard_default2]
      })
    ], CoachDashboard);
  }
});

// src/app/component/coach/coach-dashboard/coach-dashboard.spec.ts
var require_coach_dashboard_spec = __commonJS({
  "src/app/component/coach/coach-dashboard/coach-dashboard.spec.ts"(exports) {
    init_testing();
    init_coach_dashboard3();
    describe("CoachDashboard", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [CoachDashboard]
        }).compileComponents();
        fixture = TestBed.createComponent(CoachDashboard);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_coach_dashboard_spec();
//# sourceMappingURL=spec-app-component-coach-coach-dashboard-coach-dashboard.spec.js.map
