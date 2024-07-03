import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {IconSetService} from '@coreui/icons-angular';
import {
  cilApplicationsSettings, brandSet,
  cilArrowRight, cilFolder, cilLibraryAdd, cilListNumbered,
  cilGroup, cilLibrary, cilLockLocked, cilMoney, cilPen, cilWallpaper,
  cilInput, cilMenu, cilNotes, cilPaperclip, cilPlus, cilTags,
  cilLayers, cilPaperPlane, cilShortText, cilSpeedometer, cilStorage,
  cilBank, cilDescription, cilDrop, cilTask, cilThumbUp,
  cilColumns, cilTransfer, cilUser, cilVerticalAlignBottom,
  cilSettings,

} from '@coreui/icons';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {LoginService} from "./login.service";
import {GlobalMessage} from "../../../globals/global.message";
import {SessionService} from "../../../globals/sessionstorage";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Ireq_input, Ireq_login, Ires_logindata, Ires_logindataeazy} from "./login.model";
import {RSAHelper} from "../../../globals/rsahelper.service";
import {EncryptData, encryptUsingAES256} from "../../../globals/encryptdata";
import {CommonService} from "../../../globals/common.service";
import {eazylogin, Captchimage, get_menus_coreui} from "../../../globals/global-api";

import {navItems} from "../../../containers/default-layout/_nav"

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
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm!: FormGroup;
  loginControls!: string[];

  public server_captcha: string = '';

  server_captcha_image: any;
  server_captcha_image_id: any;

  login_resp!: Ires_logindataeazy;

  captcha_image!: SafeResourceUrl[];

  menus_resp:any

  javascriptobj:any

  constructor(
    private router: Router,private commonService: CommonService,
    public iconSet: IconSetService, private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private loginservice: LoginService,
    private globalmessage: GlobalMessage,
    private sessionservice: SessionService,
    private rsa: RSAHelper,
  ) {
    iconSet.icons = {
      cilListNumbered, cilPaperPlane, cilBank, cilDrop, cilLibrary, cilTags,cilSettings,
      cilLockLocked, cilUser, cilInput, cilPaperclip, cilPlus, cilVerticalAlignBottom,
      cilFolder, cilColumns, cilWallpaper, cilLibraryAdd, cilNotes, cilThumbUp, cilDescription,
      cilMoney, cilShortText, cilLayers, cilGroup, cilApplicationsSettings, cilPen,
      cilMenu, cilTask, cilArrowRight, cilSpeedometer, cilStorage, cilTransfer,
      ...brandSet
    };

    this.createForm();
    // this.GetCaptcha();
    this.GetCaptchaImage();



    
  }


  ngOnInit(): void {
   
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
    this.commonService.Post_formdata_withouttoken(Captchimage,"").subscribe((response) => {
      if (response == null) {
        return;
      }
      this.server_captcha_image = response.image;
      this.server_captcha_image_id = response.id;

    });
  }

 

  

  loginme() {

    let jsonin: Ireq_login = {
      Aadhaar: this.loginForm.controls['aadhaar'].value,
      User_pwd: this.loginForm.controls['user_pwd'].value,
      Valuesdata: this.loginForm.controls['captcha'].value,
      Application: "MARKSHEET",
      Id: this.server_captcha_image_id,
    };

    let input_json : Ireq_input = {
        Input : encryptUsingAES256(jsonin)
    };

    this.submitted = true;
    this.commonService.Post_json_withouttoken(eazylogin,input_json).subscribe((response) => {
      console.log('ress', response)
      this.login_resp = response.data
      if (this.login_resp.Token.length <= 0) {
        this.GetCaptchaImage()
        return;
      }

      console.log('sss',this.login_resp)
      this.sessionservice.SaveData('aadhaar', EncryptData(String(this.login_resp.Aadhaar)));
      // this.sessionservice.SaveData('userrole', EncryptData(this.login_resp.UserRole));
      // this.sessionservice.SaveData('username', EncryptData(this.login_resp.User_Name));
      this.sessionservice.SaveData('token', this.login_resp.Token);
      this.router.navigate(['/finyear']);

      
    }, error => {
      this.GetCaptchaImage();
    });
  }
}


