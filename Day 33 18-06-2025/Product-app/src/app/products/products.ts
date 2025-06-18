import { Component, Host, HostListener, OnInit } from '@angular/core';
import { Product } from "../product/product";
import { FormsModule } from '@angular/forms';
import { debounce, debounceTime, distinctUntilChanged, Subject, switchMap, tap } from 'rxjs';
import { ProductModel } from '../models/product';
import { ProductService } from '../services/products.services';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-products',
  imports: [Product,FormsModule,CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  products:ProductModel[]=[];
  cartCount:number =0;
  searchString:string="";
  searchSubject = new Subject<string>();
  loading:boolean = false;
  limit= 5;
  skip= 0;
  total=0;
  constructor(private productService:ProductService,private router: Router){

  }
  trackById(index: number, item: any): any {
  return item.id;
}
  handleSearchProducts(){
    // console.log(this.searchString)
    this.searchSubject.next(this.searchString);
  }

  viewProduct(id: number) {
    console.log(`Navigating to product with id: ${id}`);
  this.router.navigate(['/products', id]);  // Navigate to `/products/:id`
}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      {
        next:(data:any)=>{
         this.products = data.products as ProductModel[];
        },
        error:(err)=>{},
        complete:()=>{}
      }
    )
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(()=>this.loading=true),
      switchMap(query=>this.productService.searchProducts(query,this.limit,this.skip)),
      tap(()=>this.loading=false)).subscribe({
        next:(data:any)=>
          {
            this.products = data.products as ProductModel[];
            this.total = data.total;
          }
        });
        console.log(this.products);

  }
  @HostListener('window:scroll', [])
  onScroll():void 
  {
    // console.log("Scroll event detected");
    const scrollPosition=window.innerHeight + window.scrollY;
    const threshold= document.body.offsetHeight - 100;
    // console.log(`Scroll Position: ${scrollPosition}, Threshold: ${threshold}`);
    if(scrollPosition>=threshold && this.products.length<this.total &&this.loading===false)
    {
      console.log("Loading more products");
      this.loadMore();
    }
  }
  loadMore()
  {
    console.log("Loading more products");
    this.loading=true;
    this.skip+=this.limit;
    setTimeout(() => {
      this.productService.searchProducts(this.searchString, this.limit, this.skip)
      .subscribe({
        next: (data: any) => {
        this.products = [...this.products, ...data.products];
        this.loading = false;
        }
      });
    }, 400);

  }

}