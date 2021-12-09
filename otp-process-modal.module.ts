import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpProcessModalComponent } from "./otp-process-modal.component";
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CountdownModule } from 'ngx-countdown';
import { NgOtpInputModule } from 'ng-otp-input';
@NgModule({
  declarations: [OtpProcessModalComponent], 
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    CountdownModule,
  ]
})
export class OtpProcessModalModule { }
