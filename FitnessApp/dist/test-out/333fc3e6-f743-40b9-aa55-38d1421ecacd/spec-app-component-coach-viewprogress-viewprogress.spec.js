import {
  NgChartsModule,
  init_ng2_charts
} from "./chunk-7UV4X67Y.js";
import {
  ProgressService,
  init_ProgressService
} from "./chunk-P6TSOH3Z.js";
import {
  ActivatedRoute,
  init_router
} from "./chunk-X422K7CE.js";
import "./chunk-54TAVEMT.js";
import "./chunk-MWUV55VP.js";
import {
  CommonModule,
  init_common
} from "./chunk-LSLPQO3F.js";
import {
  ChangeDetectorRef,
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_esm,
  init_testing,
  init_tslib_es6,
  of,
  signal,
  throwError
} from "./chunk-54MGAL5N.js";

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
          labels: filteredAssigns.map((_, i) => `Plan ${i + 1}`),
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
        const labels = assigns.map((_, i) => `Plan ${i + 1}`);
        this.calorieLineChartData = {
          labels,
          datasets: [
            {
              data: assigns.map((a) => a.caloriesIntake),
              label: "Calories Intake",
              borderColor: "orange",
              fill: false,
              tension: 0.3,
              pointBackgroundColor: "orange"
            },
            {
              data: assigns.map((a) => a.caloriesBurnt),
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
    init_viewprogress3();
    init_router();
    init_ProgressService();
    init_esm();
    init_common();
    init_ng2_charts();
    describe("Viewprogress Component", () => {
      let component;
      let fixture;
      let mockProgressService;
      const dummyProgressImages = {
        $values: [
          {
            uploadedAt: "2024-07-01T10:00:00Z",
            weight: 72,
            height: 175
          },
          {
            uploadedAt: "2024-07-02T10:00:00Z",
            weight: 71,
            height: 175
          }
        ]
      };
      const dummyGraphData = {
        assignments: {
          $values: [
            {
              progressPercentage: 80,
              caloriesIntake: 2200,
              caloriesBurnt: 500
            },
            {
              progressPercentage: 60,
              caloriesIntake: 2100,
              caloriesBurnt: 600
            }
          ]
        }
      };
      beforeEach(() => __async(null, null, function* () {
        mockProgressService = jasmine.createSpyObj("ProgressService", [
          "getAllProgressOfClient",
          "getProgressGraph"
        ]);
        yield TestBed.configureTestingModule({
          imports: [CommonModule, NgChartsModule],
          providers: [
            { provide: ProgressService, useValue: mockProgressService },
            {
              provide: ActivatedRoute,
              useValue: {
                snapshot: {
                  paramMap: {
                    get: () => "mock-client-id"
                  }
                }
              }
            }
          ]
        }).overrideComponent(Viewprogress, {
          set: {
            imports: [CommonModule, NgChartsModule]
          }
        }).compileComponents();
        fixture = TestBed.createComponent(Viewprogress);
        component = fixture.componentInstance;
      }));
      it("should create the component", () => {
        expect(component).toBeTruthy();
      });
      it("should load progress data and setup charts", () => {
        mockProgressService.getAllProgressOfClient.and.returnValue(of(dummyProgressImages));
        mockProgressService.getProgressGraph.and.returnValue(of(dummyGraphData));
        fixture.detectChanges();
        expect(mockProgressService.getAllProgressOfClient).toHaveBeenCalledWith("mock-client-id");
        expect(mockProgressService.getProgressGraph).toHaveBeenCalledWith("mock-client-id");
        expect(component.weightHeightChartData.labels?.length).toBe(2);
        expect(component.weightHeightChartData.datasets[0].label).toBe("Weight (kg)");
        expect(component.planProgressChartData.datasets[0].data).toEqual([80, 60]);
        expect(component.caloriesChartData.datasets.length).toBe(2);
        expect(component.caloriesChartData.datasets[0].label).toBe("Calories Intake");
        expect(component.calorieLineChartData.datasets[1].data).toEqual([500, 600]);
      });
      it("should handle error from progress API gracefully", () => {
        mockProgressService.getAllProgressOfClient.and.returnValue(throwError(() => new Error("progress error")));
        mockProgressService.getProgressGraph.and.returnValue(throwError(() => new Error("graph error")));
        fixture.detectChanges();
        expect(component.proImages().length).toBe(0);
        expect(component.assignments().length).toBe(0);
      });
    });
  }
});
export default require_viewprogress_spec();
//# sourceMappingURL=spec-app-component-coach-viewprogress-viewprogress.spec.js.map
