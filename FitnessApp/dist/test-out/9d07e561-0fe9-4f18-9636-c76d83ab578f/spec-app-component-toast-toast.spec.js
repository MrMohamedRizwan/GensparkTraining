import {
  ToastComponent,
  init_toast
} from "./chunk-I2UP645U.js";
import "./chunk-2GLLT4WP.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-EQ4BJPU7.js";

// src/app/component/toast/toast.spec.ts
var require_toast_spec = __commonJS({
  "src/app/component/toast/toast.spec.ts"(exports) {
    init_testing();
    init_toast();
    describe("Toast", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ToastComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(ToastComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_toast_spec();
//# sourceMappingURL=spec-app-component-toast-toast.spec.js.map
