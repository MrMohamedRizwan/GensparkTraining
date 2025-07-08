import {
  ClientSidebar,
  init_client_sidebar
} from "./chunk-D43LAUTR.js";
import {
  RouterTestingModule,
  init_testing as init_testing2
} from "./chunk-DYW5WUMX.js";
import "./chunk-NRX6JDFW.js";
import "./chunk-LSR6FNYD.js";
import {
  RouterOutlet,
  init_router
} from "./chunk-SQRW4F3F.js";
import "./chunk-6HTEWQEL.js";
import "./chunk-OOMFGBQ3.js";
import "./chunk-SIQSKX7W.js";
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
} from "./chunk-SLZOMOAS.js";

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
    init_tslib_es6();
    init_testing();
    init_client_layout3();
    init_testing2();
    init_core();
    var MockClientSidebar = class MockClientSidebar {
    };
    MockClientSidebar = __decorate([
      Component({
        selector: "app-client-sidebar",
        standalone: true,
        template: "<p>Client Sidebar Stub</p>"
      })
    ], MockClientSidebar);
    describe("ClientLayout", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ClientLayout, MockClientSidebar, RouterTestingModule]
        }).compileComponents();
        fixture = TestBed.createComponent(ClientLayout);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create the ClientLayout component", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_client_layout_spec();
//# sourceMappingURL=spec-app-component-layout-client-layout-client-layout.spec.js.map
