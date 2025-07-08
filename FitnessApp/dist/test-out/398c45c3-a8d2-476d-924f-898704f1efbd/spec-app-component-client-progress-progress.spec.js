import {
  NgChartsModule,
  init_ng2_charts
} from "./chunk-TEU5MUL7.js";
import {
  ProgressService,
  init_ProgressService
} from "./chunk-SBEUZF6H.js";
import {
  CalenderComponent,
  init_calender_component
} from "./chunk-QX67IRQS.js";
import {
  FormsModule,
  ReactiveFormsModule,
  init_forms
} from "./chunk-H7E76R4F.js";
import {
  Router,
  init_router
} from "./chunk-CS3TLFNS.js";
import "./chunk-SUCX6BSB.js";
import "./chunk-HNAQOUEP.js";
import {
  CommonModule,
  init_common
} from "./chunk-5K4RIAN4.js";
import {
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_testing,
  init_tslib_es6
} from "./chunk-NGZCFPTA.js";

// angular:jit:template:src/app/component/client/progress/progress.html
var progress_default;
var init_progress = __esm({
  "angular:jit:template:src/app/component/client/progress/progress.html"() {
    progress_default = `<div class="container py-5">
  <!-- Header -->
  <div class="text-center mb-5">
    <h2 class="fw-bold">Track Your Progress</h2>
    <p class="text-muted">
      Upload your photo and body stats to track progress.
    </p>
  </div>

  <!-- Chart Section -->
  <!-- <div class="card shadow-sm mb-5">
    <div class="card-header bg-white">
      <h5 class="mb-0">Progress Overview</h5>
    </div>
    <div class="card-body">
      <canvas
        baseChart
        [datasets]="lineChartData"
        [labels]="lineChartLabels"
        [options]="lineChartOptions"
        [legend]="lineChartLegend"
        [type]="lineChartType"
      ></canvas>
    </div>
  </div> -->

  <!-- Progress Cards -->
  <!-- <div class="mb-5">
    <h4 class="mb-4">Recent Progress</h4>
    <div class="row g-4">
      <div *ngFor="let progress of progressList" class="col-md-4">
        <div class="card h-100 shadow-sm border">
          <img
            [src]="'http://localhost:5002/' + progress.imagePath"
            class="card-img-top"
            alt="Progress Image"
          />
          <div class="card-body">
            <p><strong>Height:</strong> {{ progress.height }} cm</p>
            <p><strong>Weight:</strong> {{ progress.weight }} kg</p>
            <p class="text-muted mb-0">
              <small
                >Uploaded: {{ progress.uploadedAt | date: 'mediumDate' }}</small
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div> -->

  <!-- Upload Form -->
  <div class="card shadow-sm">
    <div class="card-header bg-white">
      <h5 class="mb-0">Upload New Progress</h5>
    </div>
    <div class="card-body">
      <!-- File Upload -->
      <div class="mb-4">
        <label class="form-label fw-semibold">Progress Photo</label>
        <div
          class="border border-2 border-secondary rounded p-4 text-center position-relative"
          style="cursor: pointer"
        >
          <input
            type="file"
            accept="image/*"
            class="position-absolute top-0 start-0 w-100 h-100 opacity-0"
            (change)="onFileSelected($event)"
          />
          <div *ngIf="selectedFile; else noFile">
            <img
              [src]="selectedFilePreview"
              class="img-fluid rounded mb-2"
              style="max-height: 200px"
              *ngIf="selectedFilePreview"
            />
            <p class="fw-medium mb-0">{{ selectedFile.name }}</p>
            <small class="text-muted">Click to change image</small>
          </div>
          <ng-template #noFile>
            <p class="text-muted">Click to upload or drag and drop</p>
            <small class="text-secondary">PNG, JPG, up to 10MB</small>
          </ng-template>
        </div>
      </div>

      <!-- Inputs -->
      <div class="row g-3 mb-4">
        <div class="col-md-6">
          <label class="form-label">Height (cm)</label>
          <input
            type="number"
            class="form-control"
            [(ngModel)]="height"
            placeholder="e.g. 170"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">Weight (kg)</label>
          <input
            type="number"
            class="form-control"
            [(ngModel)]="weight"
            placeholder="e.g. 65"
          />
        </div>
      </div>

      <!-- Submit -->
      <div>
        <button
          class="btn btn-primary w-100"
          (click)="onSubmit()"
          [disabled]="submitting()"
        >
          {{ submitting() ? 'Submitting...' : 'Submit Progress' }}
        </button>
      </div>
    </div>
  </div>
  <br />
  <br />
  <app-calender-component [clientId]="this.clientId"></app-calender-component>
</div>
`;
  }
});

// angular:jit:style:src/app/component/client/progress/progress.css
var progress_default2;
var init_progress2 = __esm({
  "angular:jit:style:src/app/component/client/progress/progress.css"() {
    progress_default2 = "/* src/app/component/client/progress/progress.css */\ncanvas {\n  display: block;\n  width: 100% !important;\n  height: 300px !important;\n}\n/*# sourceMappingURL=progress.css.map */\n";
  }
});

// src/app/component/client/progress/progress.ts
var Progress;
var init_progress3 = __esm({
  "src/app/component/client/progress/progress.ts"() {
    "use strict";
    init_tslib_es6();
    init_progress();
    init_progress2();
    init_core();
    init_ProgressService();
    init_common();
    init_forms();
    init_ng2_charts();
    init_calender_component();
    init_router();
    Progress = class Progress2 {
      progressService;
      router;
      clientId = "my";
      progressList = [];
      selectedFile = null;
      selectedFilePreview = null;
      height = 0;
      weight = 0;
      loading = false;
      // Chart.js config
      lineChartLabels = [];
      heightData = [];
      weightData = [];
      lineChartData = [
        { data: this.heightData, label: "Height (cm)" },
        { data: this.weightData, label: "Weight (kg)" }
      ];
      lineChartOptions = {
        responsive: true
      };
      lineChartType = "line";
      lineChartLegend = true;
      constructor(progressService, router) {
        this.progressService = progressService;
        this.router = router;
      }
      ngOnInit() {
        this.loadProgressData();
      }
      loadProgressData() {
        this.progressService.getAllProgress().subscribe((res) => {
          this.progressList = res?.$values || [];
          this.lineChartLabels = this.progressList.map((p) => new Date(p.uploadedAt).toLocaleDateString());
          this.heightData = this.progressList.map((p) => p.height);
          this.weightData = this.progressList.map((p) => p.weight);
          this.lineChartData = [
            { data: this.heightData, label: "Height (cm)" },
            { data: this.weightData, label: "Weight (kg)" }
          ];
          this.lineChartData = [...this.lineChartData];
          this.lineChartLabels = [...this.lineChartLabels];
        });
      }
      onFileSelected(event) {
        const file = event.target.files[0];
        if (file) {
          this.selectedFile = file;
          const reader = new FileReader();
          reader.onload = (e) => {
            this.selectedFilePreview = e.target?.result;
          };
          reader.readAsDataURL(file);
        }
      }
      submitting() {
        return this.loading;
      }
      onSubmit() {
        if (!this.selectedFile || !this.height || !this.weight)
          return;
        const formData = new FormData();
        formData.append("imageFile", this.selectedFile);
        if (this.heightData.length > 0) {
          const lastHeight = this.heightData[this.heightData.length - 1];
          if (this.height < lastHeight) {
            alert("Height cannot be less than the previous entry.");
            this.loading = false;
            return;
          }
        }
        formData.append("height", this.height.toString());
        formData.append("weight", this.weight.toString());
        this.loading = true;
        this.progressService.createProgress(formData).subscribe({
          next: () => {
            this.height = 0;
            this.weight = 0;
            this.selectedFile = null;
            this.selectedFilePreview = null;
            this.loadProgressData();
            this.loading = false;
            this.router.navigate(["stats-analytics"]);
          },
          error: () => {
            this.loading = false;
            alert("Upload failed");
          }
        });
      }
      static ctorParameters = () => [
        { type: ProgressService },
        { type: Router }
      ];
    };
    Progress = __decorate([
      Component({
        selector: "app-progress",
        imports: [
          CommonModule,
          ReactiveFormsModule,
          FormsModule,
          NgChartsModule,
          CalenderComponent
        ],
        template: progress_default,
        styles: [progress_default2]
      })
    ], Progress);
  }
});

// src/app/component/client/progress/progress.spec.ts
var require_progress_spec = __commonJS({
  "src/app/component/client/progress/progress.spec.ts"(exports) {
    init_testing();
    init_progress3();
    describe("Progress", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Progress]
        }).compileComponents();
        fixture = TestBed.createComponent(Progress);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_progress_spec();
//# sourceMappingURL=spec-app-component-client-progress-progress.spec.js.map
