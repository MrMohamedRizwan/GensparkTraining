import {
  CommonModule,
  init_common
} from "./chunk-SIQSKX7W.js";
import {
  Component,
  Input,
  ViewChild,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-SLZOMOAS.js";

// angular:jit:template:src/app/component/toast/toast.html
var toast_default;
var init_toast = __esm({
  "angular:jit:template:src/app/component/toast/toast.html"() {
    toast_default = '<div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1080;">\n  <div\n    #toastRef\n    [ngClass]="toastClasses"\n    role="alert"\n    aria-live="assertive"\n    aria-atomic="true"\n  >\n    <div class="d-flex">\n      <div class="toast-body">\n        <strong class="me-2">{{ title }}</strong> {{ message }}\n      </div>\n      <button\n        type="button"\n        class="btn-close btn-close-white me-2 m-auto"\n        aria-label="Close"\n        (click)="visible = false"\n      ></button>\n    </div>\n  </div>\n</div>\n';
  }
});

// src/app/component/toast/toast.ts
var ToastComponent;
var init_toast2 = __esm({
  "src/app/component/toast/toast.ts"() {
    "use strict";
    init_tslib_es6();
    init_toast();
    init_common();
    init_core();
    ToastComponent = class ToastComponent2 {
      title = "";
      message = "";
      type = "info";
      visible = false;
      toastRef;
      bsToast;
      get toastClasses() {
        const base = "toast text-white border-0 fade";
        const types = {
          success: "bg-success",
          error: "bg-danger",
          info: "bg-primary"
        };
        return `${base} ${types[this.type]}`;
      }
      ngAfterViewInit() {
        if (this.toastRef?.nativeElement) {
          this.bsToast = new bootstrap.Toast(this.toastRef.nativeElement, { delay: 3e3 });
        }
      }
      ngOnChanges(changes) {
        if (changes["visible"] && this.visible && this.bsToast) {
          this.bsToast.show();
        }
      }
      static propDecorators = {
        title: [{ type: Input }],
        message: [{ type: Input }],
        type: [{ type: Input }],
        visible: [{ type: Input }],
        toastRef: [{ type: ViewChild, args: ["toastRef", { static: false }] }]
      };
    };
    ToastComponent = __decorate([
      Component({
        selector: "app-toast",
        standalone: true,
        imports: [CommonModule],
        template: toast_default
      })
    ], ToastComponent);
  }
});

export {
  ToastComponent,
  init_toast2 as init_toast
};
//# sourceMappingURL=chunk-4J3OMAOK.js.map
