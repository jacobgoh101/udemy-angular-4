import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators, ValidatorFn, AbstractControl} from "@angular/forms"
import {Observable} from 'rxjs';
import {resolve} from '../../node_modules/@types/q';

@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']})
export class AppComponent {
  projectForm : FormGroup;
  statusOptions : string[] = ['Stable', 'Critical', 'Finished'];
  forbiddenNames : string[] = ['test', 'Test'];
  forbiddenEmails : string[] = ['test'];

  ngOnInit() : void {
    this.projectForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        this
          .forbiddenNameValidator
          .bind(this)
      ]),
      email: new FormControl(null, [
        Validators.required, Validators.email
      ], [
        this
          .forbiddenEmailValidatorAsync
          .bind(this)
      ]),
      status: new FormControl(this.statusOptions[0])
    });
  }

  onSubmit() {
    console.log(this.projectForm);
  }

  forbiddenNameValidator(control : AbstractControl) : any
  {
    if (this.forbiddenNames.indexOf(control.value) > -1) {
      return {forbiddenName: true}
    }
    return null;
  }

  forbiddenEmailValidatorAsync(control : AbstractControl) : Promise < any > | Observable < any > {
    return new Promise((resolve, reject) => {
      setTimeout(() => {

        if (this.forbiddenEmails.filter(str => control.value.indexOf(str) > -1).length) {
          resolve({forbiddenEmail: true})
        }
        resolve(null);
      }, 2000);
    });
  }
}