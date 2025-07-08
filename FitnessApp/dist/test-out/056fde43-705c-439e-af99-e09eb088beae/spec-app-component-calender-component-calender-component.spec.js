import {
  CalenderComponent,
  WorkoutLogService,
  init_WorkoutLogService,
  init_calender_component
} from "./chunk-GP3YQA3W.js";
import "./chunk-XZQZQLJQ.js";
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
  __async,
  __commonJS,
  init_core,
  init_esm,
  of,
  throwError
} from "./chunk-X6QY723D.js";

// src/app/component/calender-component/calender-component.spec.ts
var require_calender_component_spec = __commonJS({
  "src/app/component/calender-component/calender-component.spec.ts"(exports) {
    init_testing();
    init_calender_component();
    init_WorkoutLogService();
    init_esm();
    init_core();
    init_common();
    describe("CalenderComponent", () => {
      let component;
      let fixture;
      const dummyWorkoutLogs = {
        $values: [
          { id: "1", date: "2025-07-05T00:00:00Z" },
          { id: "2", date: "2025-07-06T00:00:00Z" }
        ]
      };
      const mockWorkoutLogService = {
        getWorkoutLog: jasmine.createSpy("getWorkoutLog"),
        getWorkoutLogByid: jasmine.createSpy("getWorkoutLogByid")
      };
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [CalenderComponent, CommonModule],
          providers: [
            { provide: WorkoutLogService, useValue: mockWorkoutLogService },
            ChangeDetectorRef
          ]
        }).compileComponents();
        fixture = TestBed.createComponent(CalenderComponent);
        component = fixture.componentInstance;
        component.clientId = "client123";
      }));
      beforeEach(() => {
        mockWorkoutLogService.getWorkoutLog.calls.reset();
        mockWorkoutLogService.getWorkoutLogByid.calls.reset();
      });
      it("should create the component", () => {
        expect(component).toBeTruthy();
      });
      it("should call getWorkoutLogsOfClient on ngOnInit", fakeAsync(() => {
        mockWorkoutLogService.getWorkoutLog.and.returnValue(of(dummyWorkoutLogs));
        fixture.detectChanges();
        tick();
        expect(mockWorkoutLogService.getWorkoutLog).toHaveBeenCalledWith("client123");
        expect(component.workoutDates.length).toBe(2);
        expect(Object.keys(component.workoutIds).length).toBe(2);
      }));
      it("should return true from hasWorkoutEntry() if date has logs", fakeAsync(() => {
        mockWorkoutLogService.getWorkoutLog.and.returnValue(of(dummyWorkoutLogs));
        fixture.detectChanges();
        tick();
        const hasLog = component.hasWorkoutEntry(/* @__PURE__ */ new Date("2025-07-06"));
        expect(hasLog).toBeTrue();
      }));
      it("should return false from hasWorkoutEntry() if date has no logs", fakeAsync(() => {
        mockWorkoutLogService.getWorkoutLog.and.returnValue(of(dummyWorkoutLogs));
        fixture.detectChanges();
        tick();
        const hasLog = component.hasWorkoutEntry(/* @__PURE__ */ new Date("2025-07-10"));
        expect(hasLog).toBeFalse();
      }));
      it("should load workout details on date click", fakeAsync(() => {
        mockWorkoutLogService.getWorkoutLog.and.returnValue(of(dummyWorkoutLogs));
        mockWorkoutLogService.getWorkoutLogByid.and.returnValue(of({ id: "1" }));
        fixture.detectChanges();
        tick();
        spyOn(component, "openModal");
        const date = /* @__PURE__ */ new Date("2025-07-05");
        component.onDateClick(date);
        tick();
        expect(mockWorkoutLogService.getWorkoutLogByid).toHaveBeenCalledWith("1");
        expect(component.selectedWorkoutLogs.length).toBeGreaterThan(0);
        expect(component.openModal).toHaveBeenCalled();
      }));
      it("should gracefully handle workoutLogById API failure", fakeAsync(() => {
        mockWorkoutLogService.getWorkoutLog.and.returnValue(of(dummyWorkoutLogs));
        mockWorkoutLogService.getWorkoutLogByid.and.returnValue(throwError(() => "Error"));
        fixture.detectChanges();
        tick();
        spyOn(component, "openModal");
        const date = /* @__PURE__ */ new Date("2025-07-06");
        component.onDateClick(date);
        tick();
        expect(mockWorkoutLogService.getWorkoutLogByid).toHaveBeenCalled();
        expect(component.openModal).toHaveBeenCalled();
      }));
      it("should navigate months correctly", () => {
        const initialMonth = component.currentDate.getMonth();
        component.goToPreviousMonth();
        expect(component.currentDate.getMonth()).toBe(initialMonth - 1);
        component.goToNextMonth();
        expect(component.currentDate.getMonth()).toBe(initialMonth);
      });
      it("should navigate weeks correctly", () => {
        const initialDate = new Date(component.currentDate);
        component.goToNextWeek();
        expect(component.currentDate.getDate()).toBe(initialDate.getDate() + 7);
        component.goToPreviousWeek();
        expect(component.currentDate.getDate()).toBe(initialDate.getDate());
      });
      it("should parse valid JSON correctly", () => {
        const result = component.parseJSON('[{"key": "value"}]');
        expect(result).toEqual([{ key: "value" }]);
      });
      it("should return empty array for invalid JSON", () => {
        const result = component.parseJSON("invalid");
        expect(result).toEqual([]);
      });
    });
  }
});
export default require_calender_component_spec();
//# sourceMappingURL=spec-app-component-calender-component-calender-component.spec.js.map
