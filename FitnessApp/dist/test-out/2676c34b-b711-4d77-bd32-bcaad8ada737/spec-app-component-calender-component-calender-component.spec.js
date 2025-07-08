import {
  CalenderComponent,
  init_calender_component
} from "./chunk-AYFVKCGO.js";
import "./chunk-W25TYQ46.js";
import "./chunk-OSO6IUH2.js";
import "./chunk-XSFPB7SI.js";
import "./chunk-62KLJIS4.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-U4LD2BTV.js";

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
