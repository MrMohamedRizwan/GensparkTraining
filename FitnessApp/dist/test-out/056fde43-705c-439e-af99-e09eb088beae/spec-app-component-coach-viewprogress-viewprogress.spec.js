import {
  NgChartsModule,
  init_ng2_charts
} from "./chunk-5LZSTPBB.js";
import {
  ProgressService,
  init_ProgressService
} from "./chunk-WV4OT4TN.js";
import {
  ActivatedRoute,
  init_router
} from "./chunk-XZQZQLJQ.js";
import "./chunk-VOWP6SJ3.js";
import "./chunk-E5G6P5QB.js";
import {
  CommonModule,
  init_common
} from "./chunk-G6SPFJGI.js";
import {
  TestBed,
  fakeAsync,
  init_testing,
  tick
} from "./chunk-M6CJ4AGH.js";
import {
  ChangeDetectorRef,
  Component,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_esm,
  init_tslib_es6,
  of,
  signal
} from "./chunk-X6QY723D.js";

// angular:jit:template:src/app/component/coach/viewprogress/viewprogress.html
var viewprogress_default;
var init_viewprogress = __esm({
  "angular:jit:template:src/app/component/coach/viewprogress/viewprogress.html"() {
    viewprogress_default = `<div class="container py-5">
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
      <div class="card h-100 shadow-sm border-0">
        <div class="card-header fw-bold">
          \u{1F525} Calories Intake vs Burnt (Line)
        </div>
        <div class="card-body">
          <canvas
            baseChart
            [data]="calorieLineChartData"
            [type]="'line'"
            class="w-100"
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
              [src]="\`https://fitnessdbbucket.s3.ap-south-1.amazonaws.com/\${img.imagePath}\`"
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
  }
});

// angular:jit:style:src/app/component/coach/viewprogress/viewprogress.css
var viewprogress_default2;
var init_viewprogress2 = __esm({
  "angular:jit:style:src/app/component/coach/viewprogress/viewprogress.css"() {
    viewprogress_default2 = "/* src/app/component/coach/viewprogress/viewprogress.css */\n.card-img-top {\n  height: 200px;\n  object-fit: contain;\n  border-bottom: 1px solid #ddd;\n}\ncanvas {\n  max-width: 100%;\n}\n/*# sourceMappingURL=viewprogress.css.map */\n";
  }
});

// src/app/component/coach/viewprogress/viewprogress.ts
var Viewprogress;
var init_viewprogress3 = __esm({
  "src/app/component/coach/viewprogress/viewprogress.ts"() {
    "use strict";
    init_tslib_es6();
    init_viewprogress();
    init_viewprogress2();
    init_common();
    init_core();
    init_ng2_charts();
    init_router();
    init_ProgressService();
    Viewprogress = class Viewprogress2 {
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
        this.clientId = this.route.snapshot.paramMap.get("clientId");
        this.progressService.getAllProgressOfClient(this.clientId).subscribe({
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
          labels: filteredAssigns.map((a) => a.assignedDate ? new Date(a.assignedDate).toLocaleDateString() : ""),
          datasets: [
            {
              label: "Calories Intake",
              data: filteredAssigns.map((a) => a.caloriesIntake),
              backgroundColor: "orange"
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
        const calorieMap = {};
        for (const assign of assigns) {
          const rawDates = assign.submittedOn?.$values;
          if (!Array.isArray(rawDates))
            continue;
          for (const entry of rawDates) {
            const isoDate = entry.date;
            const intake = Number(entry.caloriesIntake || 0);
            const burnt = Number(entry.caloriesBurnt || 0);
            const dateKey = new Date(isoDate).toLocaleDateString();
            if (!calorieMap[dateKey]) {
              calorieMap[dateKey] = { intake: 0, burnt: 0 };
            }
            calorieMap[dateKey].intake += intake;
            calorieMap[dateKey].burnt += burnt;
          }
        }
        console.table(calorieMap);
        const sortedDates = Object.keys(calorieMap).sort(
          (a, b) => new Date(b).getTime() - new Date(a).getTime()
          // 🔁 descending order
        ).reverse();
        const labels = [];
        const intakeData = [];
        const burntData = [];
        for (const date of sortedDates) {
          labels.push(date);
          intakeData.push(calorieMap[date].intake);
          burntData.push(calorieMap[date].burnt);
        }
        this.calorieLineChartData = {
          labels,
          datasets: [
            {
              data: intakeData,
              label: "Calories Intake",
              borderColor: "orange",
              fill: false,
              tension: 0.3,
              pointBackgroundColor: "orange"
            },
            {
              data: burntData,
              label: "Calories Burnt",
              borderColor: "red",
              fill: false,
              tension: 0.3,
              pointBackgroundColor: "red"
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
    Viewprogress = __decorate([
      Component({
        selector: "app-viewprogress",
        standalone: true,
        imports: [CommonModule, NgChartsModule],
        template: viewprogress_default,
        styles: [viewprogress_default2]
      })
    ], Viewprogress);
  }
});

// src/app/component/coach/viewprogress/viewprogress.spec.ts
var require_viewprogress_spec = __commonJS({
  "src/app/component/coach/viewprogress/viewprogress.spec.ts"(exports) {
    init_testing();
    init_testing();
    init_viewprogress3();
    init_router();
    init_esm();
    init_ProgressService();
    init_ng2_charts();
    init_common();
    describe("Viewprogress", () => {
      let component;
      let fixture;
      const dummyProgressImages = {
        $values: [
          { uploadedAt: /* @__PURE__ */ new Date(), weight: 70, height: 175 },
          { uploadedAt: /* @__PURE__ */ new Date(), weight: 72, height: 176 }
        ]
      };
      const dummyGraphData = {
        assignments: {
          $values: [
            {
              assignedDate: (/* @__PURE__ */ new Date()).toISOString(),
              caloriesIntake: 2100,
              caloriesBurnt: 1800,
              progressPercentage: 80,
              submittedOn: {
                $values: [
                  {
                    date: (/* @__PURE__ */ new Date()).toISOString(),
                    caloriesIntake: 500,
                    caloriesBurnt: 600
                  }
                ]
              }
            }
          ]
        }
      };
      const mockProgressService = {
        getAllProgressOfClient: jasmine.createSpy("getAllProgressOfClient").and.returnValue(of(dummyProgressImages)),
        getProgressGraph: jasmine.createSpy("getProgressGraph").and.returnValue(of(dummyGraphData))
      };
      const mockActivatedRoute = {
        snapshot: {
          paramMap: {
            get: () => "mock-client-id"
          }
        }
      };
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Viewprogress, NgChartsModule, CommonModule],
          providers: [
            { provide: ProgressService, useValue: mockProgressService },
            { provide: ActivatedRoute, useValue: mockActivatedRoute }
          ]
        }).compileComponents();
        fixture = TestBed.createComponent(Viewprogress);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should load progress data and setup charts", fakeAsync(() => {
        fixture.detectChanges();
        tick();
        expect(mockProgressService.getAllProgressOfClient).toHaveBeenCalledWith("mock-client-id");
        expect(mockProgressService.getProgressGraph).toHaveBeenCalledWith("mock-client-id");
        expect(component.weightHeightChartData.labels?.length).toBe(2);
        expect(component.weightHeightChartData.datasets[0].label).toBe("Weight (kg)");
        expect(component.planProgressChartData.datasets[0].data).toEqual([80]);
        expect(component.caloriesChartData.datasets.length).toBe(2);
        expect(component.caloriesChartData.datasets[0].label).toBe("Calories Intake");
        expect(component.calorieLineChartData.datasets[1].data).toEqual([600]);
      }));
    });
  }
});
export default require_viewprogress_spec();
//# sourceMappingURL=spec-app-component-coach-viewprogress-viewprogress.spec.js.map
