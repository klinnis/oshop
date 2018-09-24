import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Injectable} from '@angular/core';
import {CategoryService} from '../category.service';


@Injectable()
export class TitleValidators {

    res: any;

    constructor(private categoryService: CategoryService) {

    }

    static categoryCheck(control: AbstractControl): ValidationErrors | null {

        if (control.value === 'Choose Category') {
            return {categoryCheck: true};
        } else {
            return null;
        }
    }


    shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null>  {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                this.categoryService.getProductNames(control.value).subscribe(res => {
                    this.res = res;
                    if (this.res != 'Not') {
                        resolve({shouldBeUnique: true});
                    } else {
                        resolve(null);
                    }

                });



            }, 3000);



        });

    }

}