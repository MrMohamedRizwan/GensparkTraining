import {
  NgChartsModule,
  init_ng2_charts
} from "./chunk-5LZSTPBB.js";
import {
  ProgressService,
  init_ProgressService
} from "./chunk-WV4OT4TN.js";
import {
  CalenderComponent,
  WorkoutLogService,
  init_WorkoutLogService,
  init_calender_component
} from "./chunk-GP3YQA3W.js";
import {
  FormsModule,
  ReactiveFormsModule,
  init_forms
} from "./chunk-4BOFPGSM.js";
import {
  Router,
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
  Component,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_esm,
  init_tslib_es6,
  of,
  throwError
} from "./chunk-X6QY723D.js";

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
            #heightInput="ngModel"
          />
          <div
            class="text-danger small mt-1"
            *ngIf="heightData.length && height < heightData[heightData.length - 1] && heightInput.touched"
          >
            <i class="bi bi-exclamation-circle-fill"></i>
            Height must be greater than or equal to your previous entry ({{
            heightData[heightData.length - 1] }} cm).
          </div>
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
          [disabled]="!isFormValid || submitting() || !canUploadProgress()"
        >
          {{ submitting() ? 'Submitting...' : 'Submit Progress' }}
        </button>
      </div>
      <div
        *ngIf="!canUploadProgress()"
        class="alert alert-warning mt-3 text-center"
      >
        <strong>You can only upload progress once every 5 days.</strong><br />
        Last uploaded on: {{ lastUploadedDate | date:'mediumDate' }}
      </div>
    </div>
  </div>

  <br /><br />

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
      lastUploadedDate;
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
          this.lastUploadedDate = this.progressList[this.progressList.length - 1].uploadedAt;
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
      canUploadProgress() {
        if (!this.lastUploadedDate)
          return true;
        const lastDate = new Date(this.lastUploadedDate);
        const today = /* @__PURE__ */ new Date();
        const diffTime = today.getTime() - lastDate.getTime();
        const diffDays = diffTime / (1e3 * 3600 * 24);
        return diffDays > 5;
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
      get isFormValid() {
        if (!this.selectedFile || this.height <= 0 || this.weight <= 0)
          return false;
        if (this.heightData.length > 0) {
          const lastHeight = this.heightData[this.heightData.length - 1];
          if (this.height < lastHeight)
            return false;
        }
        return true;
      }
      onSubmit() {
        if (!this.isFormValid)
          return;
        const formData = new FormData();
        formData.append("imageFile", this.selectedFile);
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
        standalone: true,
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
    init_ProgressService();
    init_router();
    init_esm();
    init_common();
    init_forms();
    init_ng2_charts();
    init_calender_component();
    init_WorkoutLogService();
    describe("Progress Component", () => {
      let component;
      let fixture;
      const mockProgressService = {
        getAllProgress: jasmine.createSpy("getAllProgress"),
        createProgress: jasmine.createSpy("createProgress")
      };
      const mockWorkoutLogService = {
        getWorkoutLog: jasmine.createSpy("getWorkoutLog").and.returnValue(of([])),
        getWorkoutLogByid: jasmine.createSpy("getWorkoutLogByid").and.returnValue(of({}))
      };
      const mockRouter = {
        navigate: jasmine.createSpy("navigate")
      };
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [
            Progress,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NgChartsModule,
            CalenderComponent
          ],
          providers: [
            { provide: ProgressService, useValue: mockProgressService },
            { provide: WorkoutLogService, useValue: mockWorkoutLogService },
            { provide: Router, useValue: mockRouter }
          ]
        }).compileComponents();
        fixture = TestBed.createComponent(Progress);
        component = fixture.componentInstance;
      }));
      beforeEach(() => {
        mockProgressService.getAllProgress.calls.reset();
        mockProgressService.createProgress.calls.reset();
        mockRouter.navigate.calls.reset();
      });
      it("should create component", () => {
        expect(component).toBeTruthy();
      });
      it("should load progress data and update chart", fakeAsync(() => {
        const mockData = [
          {
            uploadedAt: (/* @__PURE__ */ new Date("2025-07-01T10:00:00Z")).toISOString(),
            height: 170,
            weight: 65
          },
          {
            uploadedAt: (/* @__PURE__ */ new Date("2025-07-06T10:00:00Z")).toISOString(),
            height: 171,
            weight: 66
          }
        ];
        mockProgressService.getAllProgress.and.returnValue(of({ $values: mockData }));
        fixture.detectChanges();
        tick();
        expect(component.progressList.length).toBe(2);
        expect(component.lineChartLabels.length).toBe(2);
        expect(component.lineChartData[0].data).toEqual([170, 171]);
        expect(component.lineChartData[1].data).toEqual([65, 66]);
      }));
      it("should handle invalid form states correctly", () => {
        component.height = 0;
        component.weight = 60;
        component.selectedFile = new File([], "test.png");
        expect(component.isFormValid).toBeFalse();
        component.height = 170;
        component.weight = 0;
        expect(component.isFormValid).toBeFalse();
        component.height = 170;
        component.weight = 60;
        component.selectedFile = null;
        expect(component.isFormValid).toBeFalse();
      });
      it("should detect lower height compared to last entry as invalid", () => {
        component.selectedFile = new File([], "test.png");
        component.height = 160;
        component.weight = 60;
        component.heightData = [165];
        expect(component.isFormValid).toBeFalse();
      });
      it("should pass validation for valid form", () => {
        component.selectedFile = new File([], "test.png");
        component.height = 170;
        component.weight = 60;
        component.heightData = [160];
        expect(component.isFormValid).toBeTrue();
      });
      it("should calculate canUploadProgress based on days", () => {
        component.lastUploadedDate = null;
        expect(component.canUploadProgress()).toBeTrue();
        const sixDaysAgo = /* @__PURE__ */ new Date();
        sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
        component.lastUploadedDate = sixDaysAgo.toISOString();
        expect(component.canUploadProgress()).toBeTrue();
        const yesterday = /* @__PURE__ */ new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        component.lastUploadedDate = yesterday.toISOString();
        expect(component.canUploadProgress()).toBeFalse();
      });
      it("should show error on failed upload", fakeAsync(() => {
        spyOn(window, "alert");
        component.selectedFile = new File(["img"], "file.png");
        component.height = 170;
        component.weight = 60;
        component.heightData = [160];
        mockProgressService.createProgress.and.returnValue(throwError(() => new Error("fail")));
        component.onSubmit();
        tick();
        expect(window.alert).toHaveBeenCalledWith("Upload failed");
        expect(component.loading).toBeFalse();
      }));
    });
  }
});
export default require_progress_spec();
//# sourceMappingURL=spec-app-component-client-progress-progress.spec.js.map
