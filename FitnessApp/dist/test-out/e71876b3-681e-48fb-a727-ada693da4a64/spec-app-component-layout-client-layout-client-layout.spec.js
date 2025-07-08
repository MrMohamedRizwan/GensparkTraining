import {
  ClientSidebar,
  init_client_sidebar
} from "./chunk-S3QMBXQW.js";
import "./chunk-GOPKSOE6.js";
import {
  RouterOutlet,
  init_router
} from "./chunk-6YDZZKHI.js";
import "./chunk-VDQ734U5.js";
import "./chunk-35V5GIMJ.js";
import "./chunk-UDVGPYPD.js";
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
} from "./chunk-I33ILCKL.js";

// angular:jit:template:src/app/component/layout/client-layout/client-layout.html
var client_layout_default;
var init_client_layout = __esm({
  "angular:jit:template:src/app/component/layout/client-layout/client-layout.html"() {
    client_layout_default = '<div class="container-fluid">\n  <div class="row">\n    <!-- Sidebar (fixed width) -->\n    <!-- Sidebar (fixed width) -->\n    <!-- Sidebar (left) -->\n    <div\n      class="col-md-3 col-lg-2 bg-light min-vh-100 p-0 shadow"\n      style="width: max-content"\n    >\n      <app-client-sidebar></app-client-sidebar>\n    </div>\n\n    <!-- Page content (right) -->\n    <div\n      class="col p-4"\n      style="\n        max-height: calc(95vh);\n        overflow-y: auto;\n        scrollbar-width: 1px;\n        -ms-overflow-style: none;\n      "\n    >\n      <router-outlet></router-outlet>\n    </div>\n  </div>\n</div>\n';
  }
});

// angular:jit:style:src/app/component/layout/client-layout/client-layout.css
var client_layout_default2;
var init_client_layout2 = __esm({
  "angular:jit:style:src/app/component/layout/client-layout/client-layout.css"() {
    client_layout_default2 = "/* src/app/component/layout/client-layout/client-layout.css */\n/*# sourceMappingURL=client-layout.css.map */\n";
  }
});

// src/app/component/layout/client-layout/client-layout.ts
var ClientLayout;
var init_client_layout3 = __esm({
  "src/app/component/layout/client-layout/client-layout.ts"() {
    "use strict";
    init_tslib_es6();
    init_client_layout();
    init_client_layout2();
    init_core();
    init_client_sidebar();
    init_router();
    ClientLayout = class ClientLayout2 {
    };
    ClientLayout = __decorate([
      Component({
        selector: "app-client-layout",
        imports: [ClientSidebar, RouterOutlet],
        template: client_layout_default,
        styles: [client_layout_default2]
      })
    ], ClientLayout);
  }
});

// src/app/component/layout/client-layout/client-layout.spec.ts
var require_client_layout_spec = __commonJS({
  "src/app/component/layout/client-layout/client-layout.spec.ts"(exports) {
    init_testing();
    init_client_layout3();
    describe("ClientLayout", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ClientLayout]
        }).compileComponents();
        fixture = TestBed.createComponent(ClientLayout);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_client_layout_spec();
//# sourceMappingURL=spec-app-component-layout-client-layout-client-layout.spec.js.map
