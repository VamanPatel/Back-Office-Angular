import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { InfoManagementService } from '../../services/info-management.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {

  loadButton = false;
  topHeaderButton = false;
  tbillButton = false;
  bondButton = false;
  shareButton = false;
  mutualFundButton = false;

  imageURL: string | ArrayBuffer;

  viewerOpen = false;

  formArray = ['topHeader', 'tbillBanner', 'bondBanner', 'mutualFundBanner', 'shareBanner'];
  postObject: any = {};

  topHeaderImage: string | ArrayBuffer = 'assets/cust_details/dollar.png';
  tBillImage: string | ArrayBuffer = 'assets/cust_details/dollar.png';
  bondImage: string | ArrayBuffer = 'assets/cust_details/dollar.png';
  shareImage: string | ArrayBuffer = 'assets/cust_details/dollar.png';
  mutualFundImage: string | ArrayBuffer = 'assets/cust_details/dollar.png';


  topHeaderUrl: any;

  topHeader = this.fb.group({
    headerTitle: [''],
    SubTitle: [''],
    headerImage: [''],
    imageBrowser: [''],
    ButtonText: [''],
  });

  tbillBanner = this.fb.group({
    headerTitle: [''],
    SubTitle: [''],
    headerImage: [''],
    imageBrowser: [''],
    ButtonText: [''],
  });

  bondBanner = this.fb.group({
    headerTitle: [''],
    SubTitle: [''],
    headerImage: [''],
    imageBrowser: [''],
    ButtonText: [''],
  });

  mutualFundBanner = this.fb.group({
    headerTitle: [''],
    SubTitle: [''],
    headerImage: [''],
    imageBrowser: [''],
    ButtonText: [''],
  });

  shareBanner = this.fb.group({
    headerTitle: [''],
    SubTitle: [''],
    headerImage: [''],
    imageBrowser: [''],
    ButtonText: [''],
  });


  constructor(
    private fb: FormBuilder,
    public infoManagementService: InfoManagementService,
    public toastr: ToastrManager,
    private ngxLoader: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.getContent();
  }

  viewerOpenFunction(category): any{
    if (category === 'topHeader'){
      this.viewerOpen = true;
      this.imageURL = this.topHeaderImage;
    }
    if (category === 'tbillBanner'){
      this.viewerOpen = true;
      this.imageURL = this.tBillImage;
    }
    if (category === 'bondBanner'){
      this.viewerOpen = true;
      this.imageURL = this.bondImage;
    }
    if (category === 'mutualFundBanner'){
      this.viewerOpen = true;
      this.imageURL = this.mutualFundImage;
    }
    if (category === 'shareBanner'){
      this.viewerOpen = true;
      this.imageURL = this.shareImage;
    }
  }

  getContent(): void{
    if (this.postObject){
      this.ngxLoader.start();
      const params = {type: 'MOBILE'};
      this.infoManagementService.getWebDetail(params).subscribe((res: any) => {
        if (res.status === 200) {
          // this.toastr.successToastr('Image Uploaded successfully.', 'Success!', {animate: 'slideFromRight'});
          if (res.body.info){
            const resBody = res.body.info;
            if (resBody.topHeader) {
              const topBody = JSON.parse(res.body.info.topHeader);
              this.topHeaderImage = topBody.headerImage || this.topHeaderImage;
              // this.topHeader.value.headerImage = topBody.headerImage;
              this.topHeader.patchValue(
                {
                  headerTitle: topBody.headerTitle,
                  SubTitle: topBody.SubTitle,
                  imageBrowser: topBody.imageBrowser,
                  ButtonText: topBody.ButtonText,
                  // headerImage: topBody.headerImage
                }
              );
            }
            if (resBody.tbillBanner) {
              const tbillBanner = JSON.parse(res.body.info.tbillBanner);
              this.tBillImage = tbillBanner.headerImage || this.tBillImage;
              // this.topHeader.value.headerImage = tbillBanner.headerImage;
              this.tbillBanner.patchValue(
                {
                  headerTitle: tbillBanner.headerTitle,
                  SubTitle: tbillBanner.SubTitle,
                  imageBrowser: tbillBanner.imageBrowser,
                  ButtonText: tbillBanner.ButtonText
                }
              );
            }
            if (resBody.bondBanner) {
              const bondBanner = JSON.parse(res.body.info.bondBanner);
              this.bondImage = bondBanner.headerImage || this.bondImage;
              this.bondBanner.patchValue(
                {
                  headerTitle: bondBanner.headerTitle,
                  SubTitle: bondBanner.SubTitle,
                  imageBrowser: bondBanner.imageBrowser,
                  ButtonText: bondBanner.ButtonText,
                  // headerImage: bondBanner.headerImage
                }
              );
            }
            if (resBody.mutualFundBanner) {
              const mutualFundBanner = JSON.parse(res.body.info.mutualFundBanner);
              this.mutualFundImage = mutualFundBanner.headerImage || this.mutualFundImage;
              this.mutualFundBanner.patchValue(
                {
                  headerTitle: mutualFundBanner.headerTitle,
                  SubTitle: mutualFundBanner.SubTitle,
                  imageBrowser: mutualFundBanner.imageBrowser,
                  ButtonText: mutualFundBanner.ButtonText,
                  // headerImage: mutualFundBanner.headerImage
                }
              );
            }
            if (resBody.shareBanner) {
              const shareBanner = JSON.parse(res.body.info.shareBanner);
              this.shareImage = shareBanner.headerImage || this.shareImage;
              this.shareBanner.patchValue(
                {
                  headerTitle: shareBanner.headerTitle,
                  SubTitle: shareBanner.SubTitle,
                  imageBrowser: shareBanner.imageBrowser,
                  ButtonText: shareBanner.ButtonText,
                  // headerImage: shareBanner.headerImage
                }
              );
            }

            this.ngxLoader.stop();
          }

        } else {
          this.loadButton = false;
          this.ngxLoader.stop();
          this.toastr.errorToastr('Error while getting data', 'Error', {animate: 'slideFromRight'});
        }
      }, err => {
        this.loadButton = false;
        this.ngxLoader.stop();
        this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
      });
    }

  }

  saveContent(): void{
    this.loadButton = true;
    this.ngxLoader.start();
    this.formArray.forEach((e: any) => {

      if (e === 'topHeader'){
        if (this.topHeader.status === 'VALID'){
          this.topHeader.value.headerImage = this.topHeaderImage;
          this.postObject[e] = JSON.stringify(this.topHeader.value);
        }
      }

      if (e === 'tbillBanner'){
        if (this.tbillBanner.status === 'VALID'){
          this.tbillBanner.value.headerImage = this.tBillImage;
          this.postObject[e] = JSON.stringify(this.tbillBanner.value);
        }
      }

      if (e === 'bondBanner'){
        if (this.bondBanner.status === 'VALID'){
          this.bondBanner.value.headerImage = this.bondImage;
          this.postObject[e] = JSON.stringify(this.bondBanner.value);
        }
      }

      if (e === 'mutualFundBanner'){
        if (this.mutualFundBanner.status === 'VALID'){
          this.mutualFundBanner.value.headerImage = this.mutualFundImage;
          this.postObject[e] = JSON.stringify(this.mutualFundBanner.value);
        }
      }

      if (e === 'shareBanner'){
        if (this.shareBanner.status === 'VALID'){
          this.shareBanner.value.headerImage = this.shareImage;
          this.postObject[e] = JSON.stringify(this.shareBanner.value);
        }
      }

    });

    if (this.postObject){
      const params = {type: 'MOBILE'};
      const data = {
        info: this.postObject
      };
      this.infoManagementService.putWebDetail(data, params).subscribe((res: any) => {
        this.loadButton = false;
        this.ngxLoader.stop();
        if (res.status === 200) {
          this.toastr.successToastr('Data saved successfully.', 'Success!', {animate: 'slideFromRight'});

        } else {
          this.loadButton = false;
          this.toastr.errorToastr('Error while saving data', 'Error', {animate: 'slideFromRight'});
        }
      }, err => {
        this.ngxLoader.stop();
        this.loadButton = false;
        this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
      });
    }

  }

  readURL(event, category): any {
    const file = event.currentTarget.files[0];
    if (file) {
      // this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (category === 'headerImage') {
          this.topHeaderButton = true;
          // this.topHeaderImage = reader.result;
          this.topHeader.patchValue({
            imageBrowser: file.name
          });
          this.imageUpload(file, 'headerImage');
        }

        if (category === 'tbillBanner') {
          this.tbillButton = true;
          // this.tBillImage = reader.result;
          this.tbillBanner.patchValue({
            imageBrowser: file.name
          });
          this.imageUpload(file, 'tbillBanner');
        }
        if (category === 'bondBanner') {
          this.bondButton = true;
          // this.bondImage = reader.result;
          this.bondBanner.patchValue({
            imageBrowser: file.name
          });
          this.imageUpload(file, 'bondBanner');
        }
        if (category === 'shareBanner') {
          this.shareButton = true;
          // this.shareImage = reader.result;
          this.shareBanner.patchValue({
            imageBrowser: file.name
          });
          this.imageUpload(file, 'shareBanner');
        }
        if (category === 'mutualFundBanner') {
          this.mutualFundButton = true;
          // this.mutualFundImage = reader.result;
          this.mutualFundBanner.patchValue({
            imageBrowser: file.name
          });
          this.imageUpload(file, 'mutualFundBanner');
        }
      };

    }

  }

  imageUpload(file , category): any {
    if (file) {

      const formData = new FormData();

      formData.append('image', file);
      formData.append('type', 'mobile');
      this.infoManagementService.uploadImageWeb(formData).subscribe((res: any) => {
        if (res.status === 200) {
          this.toastr.successToastr('Image Uploaded successfully.', 'Success!', { animate: 'slideFromRight' });
          if (category === 'headerImage') {
            this.topHeaderButton = false;
            // this.topHeader.value.headerImage = res.body.url;
            this.topHeaderImage = res.body.url;
          }
          if (category === 'tbillBanner') {
            this.tbillButton = false;
            // this.tbillBanner.value.headerImage = res.body.url;
            this.tBillImage = res.body.url;
          }
          if (category === 'bondBanner') {
            this.bondButton = false;
            // this.bondBanner.value.headerImage = res.body.url;
            this.bondImage = res.body.url;
          }
          if (category === 'shareBanner') {
            this.shareButton = false;
            this.shareImage = res.body.url;
            // this.shareBanner.value.headerImage = res.body.url;
          }
          if (category === 'mutualFundBanner') {
            this.mutualFundButton = false;
            this.mutualFundImage = res.body.url;
            // this.mutualFundBanner.value.headerImage = res.body.url;
          }

        } else {
          this.toastr.errorToastr('Error while uploading image', 'Error', {animate: 'slideFromRight'});
        }
      }, err => {
        this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
      });

    }

  }

  deleteImage(category): any{
    if (category === 'headerImage') {
      // this.topHeaderUrl = res.body.url;
      this.topHeader.value.headerImage = '';
      this.topHeaderImage = 'assets/cust_details/dollar.png';
      this.topHeader.patchValue({
        imageBrowser: ''
      });
    }
    if (category === 'tbillBanner') {
      this.tbillBanner.value.headerImage = '';
      this.tBillImage = 'assets/cust_details/dollar.png';
      this.tbillBanner.patchValue({
        imageBrowser: ''
      });
      this.tbillBanner.value.imageBrowser = '';
    }
    if (category === 'bondBanner') {
      this.bondBanner.value.headerImage = '';
      this.bondImage = 'assets/cust_details/dollar.png';
      this.bondBanner.patchValue({
        imageBrowser: ''
      });
      this.bondBanner.value.imageBrowser = '';
    }
    if (category === 'shareBanner') {
      this.shareBanner.value.headerImage = '';
      this.shareImage = 'assets/cust_details/dollar.png';
      this.shareBanner.patchValue({
        imageBrowser: ''
      });
      this.shareBanner.value.imageBrowser = '';
    }
    if (category === 'mutualFundBanner') {
      this.mutualFundBanner.value.headerImage = '';
      this.mutualFundImage = 'assets/cust_details/dollar.png';
      this.mutualFundBanner.patchValue({
        imageBrowser: ''
      });
      this.mutualFundBanner.value.imageBrowser = '';
    }
  }

  resetForm(): any{
    this.getContent();
  }

}
