import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { ProductModel } from "../models/product";

@Injectable()
export class ProductService{
    private http = inject(HttpClient);

    searchProducts(query: string, limit: number, skip: number) {
        const q = encodeURIComponent(query);
        return this.http.get<any>(`https://dummyjson.com/products/search?q=${q}&limit=${limit}&skip=${skip}`);
    }
    getAllProducts():Observable<any[]>{
        return this.http.get<any[]>('https://dummyjson.com/products');
    }
    getProductById(id: number) {
  return this.http.get<ProductModel>(`https://dummyjson.com/products/${id}`);
}

}