import { Component, OnInit, Inject, ViewChildren, ChangeDetectorRef, ViewRef, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { interval, Subject } from 'rxjs';
import { BookingService } from 'src/app/booking/services/booking.service';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { VerifyOTPAlertComponent } from '../verify-otpalert/verify-otpalert.component';
import { BookingModel } from '../booking/models/booking.model';
import { Router, ActivatedRoute } from '@angular/router';
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

export interface Entry {
  created: Date;
  id: string;
}

export interface TimeSpan {
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-otp-process-modal',
  templateUrl: './otp-process-modal.component.html',
  styleUrls: ['./otp-process-modal.component.scss']
})
export class OtpProcessModalComponent implements OnInit {

  get bookingModel(): BookingModel | undefined { return this.bookingService.bookingModel };

  public interval: any;
  private destroyed$ = new Subject();
  newId!: string;

  entries: Entry[] = [];

  form: FormGroup;
  formInput = ['', '', '', '', '', ''];
  @ViewChildren('formRow') rows: any;

  cellPhone: string | undefined = '';;
  cellPhoneToVerify!: boolean;

  min: number = 0;
  secs: number = 4;

  configu: CountdownConfig = { leftTime: 10, notify: [2, 5] };
  notify = '';
  isShow = false;
  //otp!: '';
 phone!:string;

  otp!: string;
  verify: any;

  credential: any = {};

  constructor(
    private ngZone: NgZone,
    private router: Router,
    public _activedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef,
    public dialogRef: MatDialogRef<OtpProcessModalComponent>,
    public bookingService: BookingService,
    @Inject(MAT_DIALOG_DATA) public data: { phone: string }
  ) {
    this.form = this.toFormGroup(this.formInput);
  }

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  getmodel() {
    let data = this.bookingService.bookingModel.patient?.phone
  }

  toFormGroup(elements: any[]) {
    const group: any = {};

    // const group: any = this.otp;

    elements.forEach((key: string | number) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  keyUpEvent(event: { keyCode: number; which: number; }, index: number) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }

  }


  ngOnInit(): void {
    // Abro la data que tengo almacenada en el local storage
    this.verify = this.bookingService.loadData(); 
    //muestro el objeto almacenado en el local storage 
    console.log('object :>> ', this.bookingService.bookingModel);
  }

  onOtpChange(otp: string){
    this.otp = otp;
  }

  handleClick() {
    console.log(this.otp);
    // credential me trae el numero almacenado en el local storage 
    //let cellPhone: any;
    this.cellPhone = this.bookingService.bookingModel.patient?.phone
    // trae el otp que escribio el usuario en pantalla
    let otp = this.otp;
    //const body = {cellPhone, otp}
    //console.log('phone', body);

    console.log(this.cellPhone);

    //Verifico que las variables no sean nulas
    if(this.cellPhone && otp){
      //llamo al servicio y le paso el body
      this.bookingService.checkOtpCode(this.cellPhone, otp).subscribe(res => {
        //si todo salio bien
        console.log(res);
        //enviame a la ruta relativa
        this.ngZone.run(() => {
          this.router.navigate(['../pagar'], { relativeTo: this._activedRoute });
        })
      })
    }
  }

  openDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    let phone = this.phone;
   // phone = this.bookingService.bookingModel.patient?.phone
    dialogConfig.data = phone;
    this.dialog.open(VerifyOTPAlertComponent, {data: {phone: '50489854230'}});
  }

  handleEvent(e: CountdownEvent) {
    this.notify = e.action.toUpperCase();
    if (e.action === 'notify') {
      this.notify += ` - ${e.left} ms`;
    }
    console.log('Notify', e);
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  addEntry() {
    this.entries.push({
      created: new Date(),
      id: this.newId
    });
    this.newId = '';
  }

  onClickNO(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close();
   // console.log(this.form.value);
    // this.bookingService.checkOtpCode().subscribe(res => {
    //   res = this.formInput;
    //   console.log(res);
    //   this.bookingService.saveData();
    //   this.dialogRef.close();
    // })
  }

  sendOTP() {
    this.bookingService.sendOtp().subscribe(res => {
      console.log('otp', res);
    })
  }

  // verifyOTP(){
  //   this.bookingService.checkOtpCode().subscribe(res => {
  //     res=this.formInput;
  //     console.log(res);
  //   })
  // }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.next();

  }

}
