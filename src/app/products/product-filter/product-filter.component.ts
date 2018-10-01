import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../category.service';
import {Subject} from 'rxjs/index';
import 'rxjs/add/operator/takeUntil';




@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit, OnDestroy {

  categories: any;
  private ngUnsubscribe: Subject<any> = new Subject();


  constructor(private service: CategoryService) {

  }

  ngOnInit() {
     this.service.getCategories().takeUntil(this.ngUnsubscribe).subscribe(data => this.categories = data);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }



}
