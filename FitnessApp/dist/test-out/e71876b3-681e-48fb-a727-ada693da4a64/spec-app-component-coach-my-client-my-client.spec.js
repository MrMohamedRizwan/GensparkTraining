import {
  CoachService,
  init_CoachService
} from "./chunk-FFXPDL7I.js";
import {
  FormsModule,
  init_forms
} from "./chunk-GOPKSOE6.js";
import {
  Router,
  init_router
} from "./chunk-6YDZZKHI.js";
import "./chunk-VDQ734U5.js";
import "./chunk-35V5GIMJ.js";
import {
  CommonModule,
  init_common
} from "./chunk-UDVGPYPD.js";
import {
  ChangeDetectorRef,
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

// angular:jit:template:src/app/component/coach/my-client/my-client.html
var my_client_default;
var init_my_client = __esm({
  "angular:jit:template:src/app/component/coach/my-client/my-client.html"() {
    my_client_default = `<div class="container py-4">
  <h2 class="mb-3">My Clients</h2>
  <p class="text-muted">Manage and track your clients' progress</p>

  <div class="card shadow-sm mb-4">
    <div
      class="card-header d-flex flex-column flex-md-row justify-content-between align-items-center"
    >
      <div>
        <h5 class="mb-1">Clients Overview</h5>
        <small class="text-muted"
          >Total: {{ filteredClients.length }} clients</small
        >
      </div>
      <div class="input-group mt-3 mt-md-0" style="max-width: 300px">
        <span class="input-group-text"><i class="bi bi-search"></i></span>
        <input
          type="text"
          [(ngModel)]="searchTerm"
          (ngModelChange)="filterClients()"
          class="form-control"
          placeholder="Search clients..."
        />
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-striped mb-0 text-center align-middle">
        <thead class="table-light">
          <tr>
            <th class="text-center align-middle">Name</th>
            <th class="text-center align-middle">Email</th>
            <th class="text-center align-middle">Staus</th>
            <th class="text-center align-middle">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            *ngFor="let client of paginatedClients"
            class="text-center align-middle"
          >
            <td class="text-center align-middle">{{ client.name }}</td>
            <td class="text-center align-middle">{{ client.email }}</td>
            <td class="text-center align-middle">
              <span
                [ngClass]="{
                  'badge bg-danger': client.status === 'Unassigned',
                  'badge bg-warning text-dark': client.status === 'Not Completed',
                  'badge bg-success': client.status === 'Completed',
                  'badge  bg-warning text-dark': client.status === 'On Progress',
                  'badge bg-secondary': client.status === 'Not Started'
                }"
                style="
                  font-size: 1rem;
                  padding: 0.5em 1em;
                  border-radius: 1em;
                  letter-spacing: 0.5px;
                  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
                "
              >
                {{ client.status }}
              </span>
            </td>
            <td class="text-center align-middle">
              <button
                (click)="showDetails(client); $event.stopPropagation()"
                class="btn btn-sm btn-outline-primary me-2"
              >
                View
              </button>

              <button
                [disabled]="client.status === 'Not Started' || client.status === 'On Progress'"
                class="btn btn-sm btn-success"
                (click)="goToAssignPlan(client.id)"
              >
                Assign Plan
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-footer d-flex justify-content-between align-items-center">
      <small class="text-muted">
        Showing {{ startIndex + 1 }} to {{ endIndex }} of {{
        filteredClients.length }} clients
      </small>
      <div>
        <button
          class="btn btn-outline-secondary btn-sm me-2"
          (click)="prevPage()"
          [disabled]="currentPage === 1"
        >
          <i class="bi bi-chevron-left"></i> Previous
        </button>
        <button
          class="btn btn-outline-secondary btn-sm"
          (click)="nextPage()"
          [disabled]="currentPage === totalPages"
        >
          Next <i class="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</div>
`;
  }
});

// angular:jit:style:src/app/component/coach/my-client/my-client.css
var my_client_default2;
var init_my_client2 = __esm({
  "angular:jit:style:src/app/component/coach/my-client/my-client.css"() {
    my_client_default2 = "/* src/app/component/coach/my-client/my-client.css */\n/*# sourceMappingURL=my-client.css.map */\n";
  }
});

// src/app/component/coach/my-client/my-client.ts
var MyClient;
var init_my_client3 = __esm({
  "src/app/component/coach/my-client/my-client.ts"() {
    "use strict";
    init_tslib_es6();
    init_my_client();
    init_my_client2();
    init_core();
    init_CoachService();
    init_forms();
    init_common();
    init_router();
    MyClient = class MyClient2 {
      clientService;
      router;
      cdr;
      searchTerm = "";
      currentPage = 1;
      itemsPerPage = 8;
      clients = [];
      filteredClients = [];
      paginatedClients = [];
      constructor(clientService, router, cdr) {
        this.clientService = clientService;
        this.router = router;
        this.cdr = cdr;
      }
      showDetails(details) {
        this.router.navigate(["/client-details", details.id]);
      }
      ngOnInit() {
        this.loadClients();
      }
      goToAssignPlan(clientId) {
        this.router.navigate(["/assign-plan", clientId]);
      }
      loadClients() {
        this.clientService.getClientsList().subscribe({
          next: (res) => {
            console.log("Fetched clients:", this.clients);
            this.clients = res.items.$values;
            this.filterClients();
            this.cdr.detectChanges();
            console.log("Fetched clients:", this.clients);
          },
          error: (err) => {
            console.error("Error fetching clients:", err);
          }
        });
      }
      filterClients() {
        this.filteredClients = this.clients.filter((client) => client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || client.email.toLowerCase().includes(this.searchTerm.toLowerCase()));
        this.currentPage = 1;
        this.paginateClients();
      }
      paginateClients() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        this.paginatedClients = this.filteredClients.slice(startIndex, startIndex + this.itemsPerPage);
      }
      nextPage() {
        const totalPages = Math.ceil(this.filteredClients.length / this.itemsPerPage);
        if (this.currentPage < totalPages) {
          this.currentPage++;
          this.paginateClients();
        }
      }
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.paginateClients();
        }
      }
      get startIndex() {
        return (this.currentPage - 1) * this.itemsPerPage;
      }
      get endIndex() {
        return Math.min(this.startIndex + this.itemsPerPage, this.filteredClients.length);
      }
      get totalPages() {
        return Math.ceil(this.filteredClients.length / this.itemsPerPage);
      }
      static ctorParameters = () => [
        { type: CoachService },
        { type: Router },
        { type: ChangeDetectorRef }
      ];
    };
    MyClient = __decorate([
      Component({
        selector: "app-my-client",
        imports: [FormsModule, CommonModule],
        template: my_client_default,
        standalone: true,
        styles: [my_client_default2]
      })
    ], MyClient);
  }
});

// src/app/component/coach/my-client/my-client.spec.ts
var require_my_client_spec = __commonJS({
  "src/app/component/coach/my-client/my-client.spec.ts"(exports) {
    init_testing();
    init_my_client3();
    describe("MyClient", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [MyClient]
        }).compileComponents();
        fixture = TestBed.createComponent(MyClient);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_my_client_spec();
//# sourceMappingURL=spec-app-component-coach-my-client-my-client.spec.js.map
