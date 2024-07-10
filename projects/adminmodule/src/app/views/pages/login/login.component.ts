import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {IconSetService} from '@coreui/icons-angular';
import {
  brandSet, cilApplicationsSettings, cilArrowRight,
  cilBank, cilColumns,
  cilFolder, cilGroup,
  cilInput, cilLayers,
  cilListNumbered,
  cilLockLocked, cilMenu, cilMoney,
  cilPaperPlane, cilPen, cilSettings, cilShortText, cilSpeedometer, cilStorage, cilTask, cilTransfer,
  cilUser, cilX
} from '@coreui/icons';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {GlobalMessage} from "../../../globals/global.message";
import {SessionService} from "../../../globals/sessionstorage";
import { CommonService } from 'projects/marksheet/src/app/globals/common.service';
import { Captchimage, eazylogin } from '../../../globals/global-api';
import { Ireq_input } from '../../../models/request';
import { EncryptData, encryptUsingAES256 } from '../../../globals/encryptdata';
import { Ires_logindataeazy } from '../../../models/response';


/** passwords must match - custom validator */
export class PasswordValidators {
    static confirmPassword(control: AbstractControl): ValidationErrors | null {
        const password = control.get("password");
        const confirm = control.get("confirmPassword");
        if (password?.valid && password?.value === confirm?.value) {
            confirm?.setErrors(null);
            return null;
        }
        confirm?.setErrors({passwordMismatch: true});
        return {passwordMismatch: true};
    }
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    submitted = false;
    loginForm!: FormGroup;
    loginControls!: string[];

    public server_captcha: string = '';

  server_captcha_image : any;
  server_captcha_image_id : any;

  login_resp!: Ires_logindataeazy;

    constructor(
        private router: Router,
        public iconSet: IconSetService,
        private formBuilder: FormBuilder,
        private loginservice: LoginService,
        private globalmessage: GlobalMessage,
        private sessionservice: SessionService,
        private commonService: CommonService
    ) {
        iconSet.icons = {
            cilListNumbered, cilPaperPlane, cilBank,cilFolder,cilColumns,cilSettings,
          cilMoney,cilShortText,cilLayers,cilGroup,cilApplicationsSettings,cilPen,
          cilMenu,cilTask,cilArrowRight,cilSpeedometer,cilStorage,cilTransfer,
            cilLockLocked, cilUser, cilInput,cilX, ...brandSet
        };

        this.createForm();
        this.GetCaptcha();
        this.GetCaptchaImage()
    }


    createForm() {
        this.loginForm = this.formBuilder.group(
            {
                aadhaar: ["", [Validators.required,]],
                // Validators.minLength(this.loginservice.formRules.aadhaarMin),
                // Validators.maxLength(this.loginservice.formRules.aadhaarMax)

                user_pwd: ["", [Validators.required]],
                captcha: ["", [Validators.required]],
            },
        );
        this.loginControls = Object.keys(this.loginForm.controls);
    }

    captcha_fld() {
        this.loginForm.controls['captcha'];
    }

    GetCaptcha() {
        this.loginservice.GetCaptcha().subscribe((response) => {
            if (response == null) {
                return;
            }
            this.server_captcha = response.data;
        });
    }

  GetCaptchaImage() {
    this.commonService.Post_json_withouttoken(Captchimage,"").subscribe((response) => {
      if (response == null) {
        return;
      }
      this.server_captcha_image = response.image;
      this.server_captcha_image_id = response.id;

      // this.server_captcha_image = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${response.image}`);
      console.log('imageresponse',this.server_captcha_image)

      console.log('idresponse',this.server_captcha_image_id)

      // this.captcha_image = this.server_captcha_image.map((x:any) =>
      //   this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${x.image}`));
      // console.log('kkksasa',this.captcha_image)
    });
  }


    loginme() {

      let jsonin = {
        aadhaar: this.loginForm.controls['aadhaar'].value,
        user_pwd: this.loginForm.controls['user_pwd'].value,
        // captcha : this.loginForm.controls['captcha'].value,
        Valuesdata: this.loginForm.controls['captcha'].value,
        Application: "STAFF",
        Id: this.server_captcha_image_id,
      };
      // console.log('Input', jsonin)
      let input_json : Ireq_input = {
        Input : encryptUsingAES256(jsonin)
    };

      this.submitted = true;
      this.commonService.Post_json_withouttoken(eazylogin,input_json).subscribe((response) => {

       this.login_resp = response.data
       if (this.login_resp.Token.length <= 0) {
        this.GetCaptchaImage()
        return;
        }

      this.sessionservice.SaveData('aadhaar', EncryptData(String(this.login_resp.Aadhaar)));
        // this.sessionservice.SaveData('UserRole', response.data.UserRole);
        // this.sessionservice.SaveData('UserName', response.data.User_Name);
      this.sessionservice.SaveData('token', this.login_resp.Token);

        this.router.navigate(['/finyear']);
      }, error => {
        this.GetCaptchaImage();
      });
    }
}


