import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {UiService} from '../../../services/ui.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UtilsService} from '../../../services/utils.service';

import {MatDialog} from '@angular/material/dialog';
import {Select} from '../../../interfaces/select';
import {GENDERS} from '../../../core/utils/app-data';
import {RegistrationModel} from './registration.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  userModelObj: RegistrationModel = new RegistrationModel();
  public dataForm !: FormGroup;
  isLoading = false;

  isHiddenPass = true;
  isHiddenConPass = true;

  // Static Data
  genders: Select[] = GENDERS;

  constructor(
    public userService: UserService,
    private uiService: UiService,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    public utilsService: UtilsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.spinner.hide();
    this.dataForm = this.fb.group({
      phoneNo: [null, Validators.required],
      email: [null, [Validators.email]],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      fullName: [null, Validators.required],
      gender: [null, Validators.required],
      agree: [true, Validators.required],
    });
  }

  onSubmitForm(){
    if (this.dataForm.invalid) {
      this.dataForm.markAllAsTouched();
      this.uiService.warn('Please complete all the required field');
      return;
    }

    if (this.dataForm.value.password !== this.dataForm.value.confirmPassword) {
      this.uiService.warn('Password and confirm password not matched');
      return;
    }

    // if (this.dataForm.value.phoneNo.length === 10) {
    //   this.dataForm.get('phoneNo').setErrors({invalid: true});
    //   this.uiService.warn('Please enter a valid 11 digit phone no');
    //   return;
    // }

    if (this.dataForm.value.password.length < 6) {
      this.uiService.warn('Password must be at lest 6 characters!');
      return;
    }

    // this.isLoading = true;
    // this.spinner.show();
    
    this.userModelObj.phoneNo = this.dataForm.value.phoneNo;
    this.userModelObj.email = this.dataForm.value.email;
    this.userModelObj.password = this.dataForm.value.password;
    this.userModelObj.confirmPassword = this.dataForm.value.confirmPassword;
    this.userModelObj.fullName = this.dataForm.value.fullName;
    this.userModelObj.gender = this.dataForm.value.gender;
    // this.userModelObj.agree = this.dataForm.value.agree;

    console.log('userModelObj: ', this.userModelObj);
  }
  /**
   * HTTP REQ HANDLE
   */
   ngOnDestroy() {

  }
}
