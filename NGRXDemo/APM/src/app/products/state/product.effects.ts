import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";
import { ProductService } from "../product.service";
import {ProductApiActions, ProductPageActions} from './actions';

@Injectable()
export class ProductEffects{
    constructor(
        private actions$:Actions,
        private productService:ProductService            
        ){}

    loadProducts$ =  createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductPageActions.loadProducts),
            mergeMap(() => this.productService.getProducts().pipe(

                map(products=> ProductApiActions.loadProductSuccess({ products })),
                catchError(error => of(ProductApiActions.loadProductsFailure({ error })))
            ))
        )
    });
    
    updateProduct$ = createEffect(() =>{
        return this.actions$.pipe(
            ofType(ProductPageActions.updateProduct),
            concatMap(action=> this.productService.updateProduct(action.product).pipe(
                    map(product => ProductApiActions.updateProductSuccess({ product })),
                    catchError(error => of(ProductApiActions.updateProductFailure({ error })))
              )
            )
        )
    });
}