import {
  CalenderComponent,
  init_calender_component
} from "./chunk-5IJN6PEQ.js";
import "./chunk-6YDZZKHI.js";
import "./chunk-VDQ734U5.js";
import "./chunk-35V5GIMJ.js";
import "./chunk-UDVGPYPD.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-I33ILCKL.js";

// src/app/component/calender-component/calender-component.spec.ts
var require_calender_component_spec = __commonJS({
  "src/app/component/calender-component/calender-component.spec.ts"(exports) {
    init_testing();
    init_calender_component();
    describe("CalenderComponent", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [CalenderComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(CalenderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_calender_component_spec();
//# sourceMappingURL=spec-app-component-calender-component-calender-component.spec.js.map
