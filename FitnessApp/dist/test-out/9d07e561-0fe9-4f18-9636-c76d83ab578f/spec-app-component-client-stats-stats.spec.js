import {
  NgChartsModule,
  init_ng2_charts
} from "./chunk-FH2TQ4YS.js";
import {
  ProgressService,
  init_ProgressService
} from "./chunk-XNXZCJK7.js";
import {
  RouterTestingModule,
  init_testing as init_testing2
} from "./chunk-OHMDPQAH.js";
import "./chunk-64UFXOXL.js";
import {
  ActivatedRoute,
  init_router
} from "./chunk-TAHKWTMY.js";
import "./chunk-K73EO5Y7.js";
import {
  CommonModule,
  init_common
} from "./chunk-2GLLT4WP.js";
import {
  ChangeDetectorRef,
  Component,
  TestBed,
  __decorate,
  init_core,
  init_esm,
  init_testing,
  init_tslib_es6,
  of,
  signal,
  waitForAsync
} from "./chunk-EQ4BJPU7.js";

// src/app/component/client/stats/stats.spec.ts
init_testing();

// src/app/component/client/stats/stats.ts
init_tslib_es6();

// angular:jit:template:src/app/component/client/stats/stats.html
var stats_default = `<div class="container py-5">
  <h2 class="fw-bold text-center mb-5">Client Progress Dashboard</h2>

  <!-- Charts -->
  <div class="row g-4 mb-4">
    <div class="col-md-6">
      <div class="card h-100 shadow-sm border-0">
        <div class="card-header fw-bold">\u{1F4C8} Weight & Height Over Time</div>
        <div class="card-body">
          <canvas
            baseChart
            [data]="weightHeightChartData"
            [type]="'line'"
            class="w-100"
          ></canvas>
        </div>
      </div>
    </div>

    <!-- <div class="col-md-6">
      <div class="card h-100 shadow-sm border-0">
        <div class="card-header fw-bold">\u{1F4CA} Progress Percentage Per Plan</div>
        <div class="card-body">
          <canvas
            baseChart
            [data]="planProgressChartData"
            [type]="'bar'"
            class="w-100"
          ></canvas>
        </div>
      </div>
    </div> -->

    <!-- <div class="col-md-6">
      <div class="card h-100 shadow-sm border-0">
        <div class="card-header fw-bold">\u{1F525} Calories Intake vs Burnt (Bar)</div>
        <div class="card-body">
          <canvas
            baseChart
            [data]="caloriesChartData"
            [type]="'bar'"
            class="w-100"
          ></canvas>
        </div>
      </div>
    </div> -->

    <div class="col-md-6">
      <div class="card h-100 shadow-sm border-0 d-flex align-items-center">
        <div class="card-header fw-bold text-center w-100">
          \u{1F525} Calories Intake vs Burnt
        </div>
        <div
          class="card-body d-flex align-items-center justify-content-center"
          style="width: 350px; height: 350px"
        >
          <canvas
            baseChart
            [data]="calorieLineChartData"
            [type]="'pie'"
            [options]="{ plugins: { legend: { position: 'bottom' } } }"
            style="width: 250px; height: 200px"
          ></canvas>
        </div>
      </div>
    </div>
  </div>

  <!-- Progress Image Gallery -->
  <div class="card shadow-sm border-0 mt-5">
    <div class="card-header fw-bold">\u{1F5BC}\uFE0F Progress Photo Gallery</div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-4 mb-4" *ngFor="let img of proImages()">
          <div class="card h-100 border">
            <!-- img.path -->
            <img
              [src]="'https://media.istockphoto.com/id/1514093059/vector/thumbs-up-hand-emoji-icon-illustration-sign-human-gesture-vector-symbol-emoticon-design.jpg?s=1024x1024&w=is&k=20&c=62OK_K2j-KUFoHMorlUfSnRQuRXbT_lQFnXBUy4LFqY='"
              class="card-img-top"
              alt="Progress"
              style="object-fit: contain; height: 250px"
            />
            <div class="card-body">
              <h6 class="card-title">
                {{ img.uploadedAt | date: 'mediumDate' }}
              </h6>
              <p class="mb-1">
                <span class="badge bg-light text-dark border"
                  >Weight: {{ img.weight }} kg</span
                >
              </p>
              <p>
                <span class="badge bg-light text-dark border"
                  >Height: {{ img.height }} cm</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

// angular:jit:style:src/app/component/client/stats/stats.css
var stats_default2 = "/* src/app/component/client/stats/stats.css */\n/*# sourceMappingURL=stats.css.map */\n";

// src/app/component/client/stats/stats.ts
init_core();
init_router();
init_ProgressService();
init_common();
init_ng2_charts();
var Stats = class Stats2 {
  route;
  progressService;
  cdRef;
  clientId;
  proImages = signal([]);
  assignments = signal([]);
  // Chart Data
  weightHeightChartData = {
    labels: [],
    datasets: []
  };
  planProgressChartData = {
    labels: [],
    datasets: []
  };
  caloriesChartData = {
    labels: [],
    datasets: []
  };
  calorieLineChartData = {
    labels: [],
    datasets: []
  };
  constructor(route, progressService, cdRef) {
    this.route = route;
    this.progressService = progressService;
    this.cdRef = cdRef;
  }
  ngOnInit() {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      const token = user.token;
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        this.clientId = payload.UserId;
        console.log("Decoded UserId (ClientId):", this.clientId);
      }
    }
    this.progressService.getAllProgress().subscribe({
      next: (res) => {
        this.proImages.set(res.$values || []);
        this.setupCharts();
        this.setupCalorieLineChart();
        this.cdRef.detectChanges();
      },
      error: (err) => console.error(err)
    });
    this.progressService.getProgressGraph(this.clientId).subscribe({
      next: (res) => {
        this.assignments.set(res.assignments.$values || []);
        this.setupCharts();
        this.setupCalorieLineChart();
        this.cdRef.detectChanges();
        console.log(res.assignments.$values);
      },
      error: (err) => console.error(err)
    });
  }
  setupCharts() {
    const images = this.proImages();
    const labels = images.map((img) => new Date(img.uploadedAt).toLocaleDateString());
    this.weightHeightChartData = {
      labels,
      datasets: [
        {
          data: images.map((img) => img.weight),
          label: "Weight (kg)",
          borderColor: "blue",
          fill: false
        },
        {
          data: images.map((img) => img.height),
          label: "Height (cm)",
          borderColor: "green",
          fill: false
        }
      ]
    };
    const assigns = this.assignments();
    this.planProgressChartData = {
      labels: assigns.map((_, i) => `Plan ${i + 1}`),
      datasets: [
        {
          label: "Progress %",
          data: assigns.map((a) => a.progressPercentage),
          backgroundColor: "rgba(54, 162, 235, 0.6)"
        }
      ]
    };
    const filteredAssigns = assigns.filter((a) => a.caloriesIntake !== 0 && a.caloriesBurnt !== 0);
    this.caloriesChartData = {
      labels: filteredAssigns.map((_, i) => `Plan ${i + 1}`),
      datasets: [
        {
          label: "Calories Intake",
          data: filteredAssigns.map((a) => a.caloriesIntake)
          // backgroundColor: 'orange',
        },
        {
          label: "Calories Burnt",
          data: filteredAssigns.map((a) => a.caloriesBurnt),
          backgroundColor: "red"
        }
      ]
    };
  }
  setupCalorieLineChart() {
    const assigns = this.assignments();
    const labels = assigns.map((_, i) => `Plan ${i + 1}`);
    const totalCalorieIntake = assigns.reduce((sum, a) => sum + (a.caloriesIntake || 0), 0);
    const calorieIntakeCount = assigns.filter((a) => a.caloriesIntake && a.caloriesIntake !== 0).length;
    const totalcalorieBurnt = assigns.reduce((sum, a) => sum + (a.caloriesBurnt || 0), 0);
    const calorieBurntCount = assigns.filter((a) => a.caloriesBurnt && a.caloriesBurnt !== 0).length;
    this.calorieLineChartData = {
      labels: ["Total Calories Intake", "Total Calories Burnt"],
      datasets: [
        {
          data: [
            totalCalorieIntake / calorieIntakeCount,
            totalcalorieBurnt / calorieBurntCount
          ],
          backgroundColor: ["orange", "red"],
          label: "Calories Distribution"
        }
      ]
    };
  }
  static ctorParameters = () => [
    { type: ActivatedRoute },
    { type: ProgressService },
    { type: ChangeDetectorRef }
  ];
};
Stats = __decorate([
  Component({
    selector: "app-stats",
    imports: [CommonModule, NgChartsModule],
    template: stats_default,
    styles: [stats_default2]
  })
], Stats);

// src/app/component/client/stats/stats.spec.ts
init_ProgressService();
init_esm();
init_testing2();
describe("Stats", () => {
  let component;
  let fixture;
  let progressServiceSpy;
  const mockProgressImages = {
    $values: [
      { uploadedAt: (/* @__PURE__ */ new Date()).toISOString(), weight: 70, height: 175 },
      { uploadedAt: (/* @__PURE__ */ new Date()).toISOString(), weight: 72, height: 176 }
    ]
  };
  const mockAssignments = {
    assignments: {
      $values: [
        {
          progressPercentage: 80,
          caloriesIntake: 1800,
          caloriesBurnt: 1600
        },
        {
          progressPercentage: 90,
          caloriesIntake: 2e3,
          caloriesBurnt: 1900
        }
      ]
    }
  };
  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj("ProgressService", [
      "getAllProgress",
      "getProgressGraph"
    ]);
    TestBed.configureTestingModule({
      imports: [Stats, RouterTestingModule],
      providers: [{ provide: ProgressService, useValue: spy }]
    }).compileComponents();
    progressServiceSpy = TestBed.inject(ProgressService);
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(Stats);
    component = fixture.componentInstance;
    const dummyPayload = btoa(JSON.stringify({ UserId: "test-client-id" }));
    const dummyToken = `header.${dummyPayload}.signature`;
    localStorage.setItem("user", JSON.stringify({ token: dummyToken }));
    progressServiceSpy.getAllProgress.and.returnValue(of(mockProgressImages));
    progressServiceSpy.getProgressGraph.and.returnValue(of(mockAssignments));
    fixture.detectChanges();
  });
  it("should create the component", () => {
    expect(component).toBeTruthy();
  });
  it("should load progress and assignments data", () => {
    expect(component.proImages().length).toBe(2);
    expect(component.assignments().length).toBe(2);
    expect(component.weightHeightChartData.datasets.length).toBe(2);
    expect(component.planProgressChartData.datasets[0].data.length).toBe(2);
    expect(component.calorieLineChartData.datasets[0].data.length).toBe(2);
  });
  it("should correctly decode clientId from token", () => {
    expect(component.clientId).toBe("test-client-id");
  });
});
//# sourceMappingURL=spec-app-component-client-stats-stats.spec.js.map
