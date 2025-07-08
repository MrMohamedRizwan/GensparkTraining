import {
  BehaviorSubject,
  Injectable,
  __decorate,
  __esm,
  __spreadProps,
  __spreadValues,
  init_core,
  init_esm,
  init_tslib_es6,
  timer
} from "./chunk-3YOU7Q7G.js";

// src/app/services/ToastService.ts
var ToastService;
var init_ToastService = __esm({
  "src/app/services/ToastService.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_esm();
    ToastService = class ToastService2 {
      toastSubject = new BehaviorSubject({
        title: "",
        message: "",
        type: "",
        visible: false
      });
      toast$ = this.toastSubject.asObservable();
      showToast(title, message, type) {
        this.toastSubject.next({ title, message, type, visible: true });
        timer(1e3).subscribe(() => {
          this.toastSubject.next(__spreadProps(__spreadValues({}, this.toastSubject.value), { visible: false }));
        });
      }
    };
    ToastService = __decorate([
      Injectable({ providedIn: "root" })
    ], ToastService);
  }
});

export {
  ToastService,
  init_ToastService
};
//# sourceMappingURL=chunk-5AEIB2MV.js.map
