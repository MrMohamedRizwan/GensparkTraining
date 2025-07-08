import {
  CaochSidebar,
  init_caoch_sidebar
} from "./chunk-NS2XMN27.js";
import {
  RouterTestingModule,
  init_testing as init_testing2
} from "./chunk-JRE6BCIQ.js";
import "./chunk-JORF2EMQ.js";
import {
  RouterOutlet,
  init_router
} from "./chunk-XZQZQLJQ.js";
import "./chunk-VOWP6SJ3.js";
import "./chunk-E5G6P5QB.js";
import "./chunk-G6SPFJGI.js";
import {
  TestBed,
  init_testing
} from "./chunk-M6CJ4AGH.js";
import {
  Component,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-X6QY723D.js";

// angular:jit:template:src/app/component/layout/coach-layout/coach-layout.html
var coach_layout_default;
var init_coach_layout = __esm({
  "angular:jit:template:src/app/component/layout/coach-layout/coach-layout.html"() {
    coach_layout_default = '<div class="container-fluid">\n  <div class="row">\n    <!-- Sidebar (fixed width) -->\n    <div\n      class="col-md-3 col-lg-2 bg-light min-vh-100 p-0 shadow"\n      style="width: max-content"\n    >\n      <app-caoch-sidebar></app-caoch-sidebar>\n    </div>\n\n    <!-- Page content (remaining space) -->\n    <div\n      class="col p-4"\n      style="\n        max-height: calc(95vh);\n        overflow-y: auto;\n        scrollbar-width: 1px;\n        -ms-overflow-style: none;\n      "\n    >\n      <router-outlet></router-outlet>\n    </div>\n  </div>\n</div>\n';
  }
});

// angular:jit:style:src/app/component/layout/coach-layout/coach-layout.css
var coach_layout_default2;
var init_coach_layout2 = __esm({
  "angular:jit:style:src/app/component/layout/coach-layout/coach-layout.css"() {
    coach_layout_default2 = "/* src/app/component/layout/coach-layout/coach-layout.css */\n/*# sourceMappingURL=coach-layout.css.map */\n";
  }
});

// src/app/component/layout/coach-layout/coach-layout.ts
var CoachLayout;
var init_coach_layout3 = __esm({
  "src/app/component/layout/coach-layout/coach-layout.ts"() {
    "use strict";
    init_tslib_es6();
    init_coach_layout();
    init_coach_layout2();
    init_core();
    init_caoch_sidebar();
    init_router();
    CoachLayout = class CoachLayout2 {
    };
    CoachLayout = __decorate([
      Component({
        selector: "app-coach-layout",
        imports: [CaochSidebar, RouterOutlet],
        template: coach_layout_default,
        styles: [coach_layout_default2]
      })
    ], CoachLayout);
  }
});

// src/app/component/layout/coach-layout/coach-layout.spec.ts
var require_coach_layout_spec = __commonJS({
  "src/app/component/layout/coach-layout/coach-layout.spec.ts"(exports) {
    init_tslib_es6();
    init_testing();
    init_coach_layout3();
    init_testing2();
    init_core();
    var MockCaochSidebar = class MockCaochSidebar {
    };
    MockCaochSidebar = __decorate([
      Component({
        selector: "app-caoch-sidebar",
        standalone: true,
        template: "<p>Sidebar Stub</p>"
      })
    ], MockCaochSidebar);
    describe("CoachLayout", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [CoachLayout, MockCaochSidebar, RouterTestingModule]
        }).compileComponents();
        fixture = TestBed.createComponent(CoachLayout);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create the CoachLayout component", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_coach_layout_spec();
//# sourceMappingURL=spec-app-component-layout-coach-layout-coach-layout.spec.js.map
