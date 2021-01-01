import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state';
import { ProductPageActions} from '../state/actions';


@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

  errorMessage: string;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
  
    this.store.dispatch(ProductPageActions.loadProducts());

    this.selectedProduct$ = this.store.select(getCurrentProduct)
    this.products$ = this.store.select(getProducts);
    this.displayCode$=this.store.select(getShowProductCode)
    this.errorMessage$ = this.store.select(getError);
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.inilializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductPageActions.setCurrentProduct({ currentProductId: product.id }))
  }
}
