import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../category.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TitleValidators} from '../../validators/title.validators';
import {LoginService} from '../../services/login.service';
import {ActivatedRoute, Params, Router} from '@angular/router';







@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {


  categories: any;
  form: FormGroup;
  basicPath = '';
  editMode = false;
  id: number;






  constructor(private categoryservice: CategoryService,
              private titleValidator: TitleValidators,
              private loginService: LoginService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.categoryservice.getCategories().subscribe(data => {this.categories = data} );
    this.basicPath = this.loginService.getimagePath();
    this.onInit();
  }

  private onInit() {



    this.form = new FormGroup({
      title: new FormControl('',
          [Validators.required], [this.titleValidator.shouldBeUnique.bind(this.titleValidator)]),
      price: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      categories: new FormControl('', TitleValidators.categoryCheck),
      imageUrl: new FormControl('', Validators.required)
    });

    this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
        });

    if (this.editMode) {

      let product = null;

       this.categoryservice.getOneProduct(this.id).subscribe( data => {
          product = data,
          this.form.patchValue({
            title: product.title,
            price: product.price,
            imageUrl: product.imageUrl,
            categories: product.categories
          });
        });



    }




  }





  onSubmit() {
    if (this.editMode) {
      this.categoryservice.updateProduct(this.id, this.form.value).subscribe(data => {});
      this.router.navigate(['/admin/products']);
    } else {
       this.categoryservice.saveProducts(this.form.value).subscribe(data => {});
      this.router.navigate(['/admin/products']);
    }

  }

  onDelete() {
    if (!confirm('Are you sure you want to delete this Product?')) return;

        this.categoryservice.deleteProduct(this.id).subscribe(data => {});
        this.router.navigate(['/admin/products']);

  }


   get title() {
    return this.form.get('title');
}

  get image() {
    return this.form.get('imageUrl');
  }

  get price() {
    return this.form.get('price');
  }

  get category() {
    return this.form.get('categories');
  }







}
