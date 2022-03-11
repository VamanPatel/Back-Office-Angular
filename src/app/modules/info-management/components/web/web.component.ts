import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { InfoManagementService } from '../../services/info-management.service';

@Component({
  selector: 'app-web',
  templateUrl: './web.component.html',
  styleUrls: ['./web.component.css']
})
export class WebComponent implements OnInit {

  loadButton = false;
  topHeaderButton = false;
  tbillButton = false;
  bondButton = false;
  shareButton = false;
  mutualFundButton = false;
  yourMoneyButton = false;
  aboutUsButton = false;
  howItWorkButton = false;
  someFeatureButton = false;
  aboutSeedButton = false;
  footerButton = false;
  clientWordButton = false;

  testimoneyList = [];

  imageURL: string | ArrayBuffer;

  viewerOpen = false;


  formArray = ['contentDetail', 'topHeader', 'tbillBanner', 'bondBanner', 'shareBanner' , 'mutualFundBanner',
              'yourMoneyBanner', 'aboutUsBanner', 'howItWorkBanner', 'someFeatureBanner', 'aboutSeedBanner',
               'footerBanner', 'clientWordBanner'];
  postObject: any = {};
  topHeaderImage: string | ArrayBuffer = 'assets/cust_details/dollar.png';
  tBillImage: string | ArrayBuffer = 'assets/cust_details/dollar.png';
  bondImage: string | ArrayBuffer = 'assets/cust_details/dollar.png';
  shareImage: string | ArrayBuffer = 'assets/cust_details/dollar.png';
  mutualFundImage: string | ArrayBuffer = 'assets/cust_details/dollar.png';
  yourMoneyImage: string | ArrayBuffer = 'assets/cust_details/dollar.png';
  aboutUsImage: string | ArrayBuffer = 'assets/cust_details/dollar.png';
  aboutSeedImage: string | ArrayBuffer = 'assets/cust_details/dollar.png';
  clientWordImage: string | ArrayBuffer = 'assets/cust_details/dollar.png';
  footerImage: string | ArrayBuffer = 'assets/cust_details/dollar.png';

  bigVideo = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/mw2rxFUNLxQ?controls=0');
  smallVideo1 = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/mw2rxFUNLxQ?controls=0');
  smallVideo2 = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/mw2rxFUNLxQ?controls=0');

  // this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/mw2rxFUNLxQ?controls=0');

  testimoneyContentOne: any;
  testimoneyContentTwo: any;
  testimoneyContentThree: any;
  testimoneyContentFour: any;

  imageUrl: string | ArrayBuffer;
  file: File;
  topHeaderUrl: any;

  contentDetail = this.fb.group({
    homeNumber: [''],
    homeEmail: [''],
  });

  topHeader = this.fb.group({
    headerTitle: [''],
    SubTitle: [''],
    // headerImage: [''],
    imageBrowser: [''],
    ButtonText: [''],
  });

  tbillBanner = this.fb.group({
    headerTitle: [''],
    SubTitle: [''],
    // headerImage: [''],
    imageBrowser: [''],
    ButtonText: [''],
  });

  bondBanner = this.fb.group({
    headerTitle: [''],
    SubTitle: [''],
    // headerImage: [''],
    imageBrowser: [''],
    ButtonText: [''],
  });

  mutualFundBanner = this.fb.group({
    headerTitle: [''],
    SubTitle: [''],
    // headerImage: [''],
    imageBrowser: [''],
    ButtonText: [''],
  });

  shareBanner = this.fb.group({
    headerTitle: [''],
    SubTitle: [''],
    // headerImage: [''],
    imageBrowser: [''],
    ButtonText: [''],
  });

  yourMoneyBanner = this.fb.group({
    headerTitle: [''],
    SubTitle: [''],
    // headerImage: [''],
    imageBrowser: [''],
    headerSecond: [''],
    paragraphContent: [''],
    ButtonText: [''],
  });

  aboutUsBanner = this.fb.group({
    headerTitle: [''],
    SubTitle: [''],
    // headerImage: [''],
    imageBrowser: [''],
    headerSecond: [''],
    paragraphContent: [''],
    ButtonText: [''],
  });

  howItWorkBanner = this.fb.group({
    headerTitle: [''],
    SubTitle: [''],
    bigVideo: [''],
    smallVideoOne: [''],
    smallVideoTwo: [''],
  });

  someFeatureBanner = this.fb.group({
    headerTitle: [''],
    SubTitle: [''],
    SubTitleOne: [''],
    paragraphOne: [''],
    SubTitleTwo: [''],
    paragraphTwo: [''],
    SubTitleThree: [''],
    paragraphThree: [''],
    SubTitleFour: [''],
    paragraphFour: ['']
  });

  aboutSeedBanner = this.fb.group({
    headerTitle: [''],
    SubTitle: [''],
    // headerImage: [''],
    imageBrowser: [''],
    SubTextOne: [''],
    SubTextTwo: [''],
    SubTextThree: [''],
    SubTextFour: ['']
  });

  clientWordBanner = this.fb.group({
    headerTitle: [''],
    SubTitle: [''],
    // headerImage: [''],
    imageBrowser: [''],
    TestimonyOne: [''],
    TestimonyTwo: [''],
    TestimonyThree: [''],
    TestimonyFour: ['']
  });

  footerBanner = this.fb.group({
    SubTitle: [''],
    // headerImage: [''],
    imageBrowser: [''],
    SubHeadPrivacy: [''],
    SubTextPrivacy: [''],
    SubHeadCondition: [''],
    SubTextCondition: [''],
    SubHeadBochure: [''],
    SubTextBochure: [''],
  });

  constructor(
    private fb: FormBuilder,
    public infoManagementService: InfoManagementService,
    public toastr: ToastrManager,
    private domSanitizer: DomSanitizer,
    private ngxLoader: NgxUiLoaderService,
  ) { }

  ngOnInit(): void {
    this.getTestimonyList();
    this.getContent();
  }

  getContent(): void{
    if (this.postObject){
      this.ngxLoader.start();
      const params = {type: 'WEB'};
      this.infoManagementService.getWebDetail(params).subscribe((res: any) => {
        if (res.status === 200) {
          // this.toastr.successToastr('Image Uploaded successfully.', 'Success!', {animate: 'slideFromRight'});
          if (res.body.info){
            const resBody = res.body.info;
            if (resBody.contentDetail) {
              const contentDetail = JSON.parse(res.body.info.contentDetail);
              this.contentDetail.patchValue(
                {
                  homeNumber: contentDetail.homeNumber,
                  homeEmail: contentDetail.homeEmail
                }
              );
            }
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
            if (resBody.yourMoneyBanner) {
              const yourMoneyBanner = JSON.parse(res.body.info.yourMoneyBanner);
              this.yourMoneyImage = yourMoneyBanner.headerImage || this.yourMoneyImage;
              this.yourMoneyBanner.patchValue(
                {
                  headerTitle: yourMoneyBanner.headerTitle,
                  SubTitle: yourMoneyBanner.SubTitle,
                  imageBrowser: yourMoneyBanner.imageBrowser,
                  headerSecond: yourMoneyBanner.headerSecond,
                  paragraphContent: yourMoneyBanner.paragraphContent,
                  ButtonText: yourMoneyBanner.ButtonText,
                  // headerImage: yourMoneyBanner.headerImage
                }
              );
            }
            if (resBody.aboutUsBanner) {
              const aboutUsBanner = JSON.parse(res.body.info.aboutUsBanner);
              this.aboutUsImage = aboutUsBanner.headerImage || this.aboutUsImage;
              this.aboutUsBanner.patchValue(
                {
                  headerTitle: aboutUsBanner.headerTitle,
                  SubTitle: aboutUsBanner.SubTitle,
                  imageBrowser: aboutUsBanner.imageBrowser,
                  headerSecond: aboutUsBanner.headerSecond,
                  paragraphContent: aboutUsBanner.paragraphContent,
                  ButtonText: aboutUsBanner.ButtonText,
                  // headerImage: aboutUsBanner.headerImage
                }
              );
            }
            if (resBody.howItWorkBanner) {
              const howItWorkBanner = JSON.parse(res.body.info.howItWorkBanner);
              this.bigVideo = this.domSanitizer.bypassSecurityTrustResourceUrl(howItWorkBanner.bigVideo || this.bigVideo);
              this.smallVideo1 = this.domSanitizer.bypassSecurityTrustResourceUrl(howItWorkBanner.smallVideoOne || this.smallVideo1);
              this.smallVideo2 = this.domSanitizer.bypassSecurityTrustResourceUrl(howItWorkBanner.smallVideoTwo || this.smallVideo2);
              this.howItWorkBanner.patchValue(
                {
                  headerTitle: howItWorkBanner.headerTitle,
                  SubTitle: howItWorkBanner.SubTitle,
                  bigVideo: howItWorkBanner.bigVideo,
                  smallVideoOne: howItWorkBanner.smallVideoOne,
                  smallVideoTwo: howItWorkBanner.smallVideoTwo,
                }
              );
            }
            if (resBody.someFeatureBanner) {
              const someFeatureBanner = JSON.parse(res.body.info.someFeatureBanner);
              this.someFeatureBanner.patchValue(
                {
                  headerTitle: someFeatureBanner.headerTitle,
                  SubTitle: someFeatureBanner.SubTitle,
                  SubTitleOne: someFeatureBanner.SubTitleOne,
                  paragraphOne: someFeatureBanner.paragraphOne,
                  SubTitleTwo: someFeatureBanner.SubTitleTwo,
                  paragraphTwo: someFeatureBanner.paragraphTwo,
                  SubTitleThree: someFeatureBanner.SubTitleThree,
                  paragraphThree: someFeatureBanner.paragraphThree,
                  SubTitleFour: someFeatureBanner.SubTitleFour,
                  paragraphFour: someFeatureBanner.paragraphFour
                }
              );
            }
            if (resBody.aboutSeedBanner) {
              const aboutSeedBanner = JSON.parse(res.body.info.aboutSeedBanner);
              this.aboutSeedImage = aboutSeedBanner.headerImage || this.aboutSeedImage;
              this.aboutSeedBanner.patchValue(
                {
                  headerTitle: aboutSeedBanner.headerTitle,
                  SubTitle: aboutSeedBanner.SubTitle,
                  // headerImage: aboutSeedBanner.headerImage,
                  imageBrowser: aboutSeedBanner.imageBrowser,
                  SubTextOne: aboutSeedBanner.SubTextOne,
                  SubTextTwo: aboutSeedBanner.SubTextTwo,
                  SubTextThree: aboutSeedBanner.SubTextThree,
                  SubTextFour: aboutSeedBanner.SubTextFour
                }
              );
            }
            if (resBody.footerBanner) {
              const footerBanner = JSON.parse(res.body.info.footerBanner);
              this.footerImage = footerBanner.headerImage || this.footerImage;
              this.footerBanner.patchValue(
                {
                  SubTitle: footerBanner.SubTitle,
                  imageBrowser: footerBanner.imageBrowser,
                  SubHeadPrivacy: footerBanner.SubHeadPrivacy,
                  SubTextPrivacy: footerBanner.SubTextPrivacy,
                  SubHeadCondition: footerBanner.SubHeadCondition,
                  SubTextCondition: footerBanner.SubTextCondition,
                  SubHeadBochure: footerBanner.SubHeadBochure,
                  SubTextBochure: footerBanner.SubTextBochure,
                }
              );
            }
            if (resBody.clientWordBanner) {
              const clientWordBanner = JSON.parse(res.body.info.clientWordBanner);
              this.clientWordImage = clientWordBanner.headerImage || this.tBillImage;
              // this.topHeader.value.headerImage = clientWordBanner.headerImage;
              this.clientWordBanner.patchValue(
                {
                  headerTitle: clientWordBanner.headerTitle,
                  SubTitle: clientWordBanner.SubTitle,
                  imageBrowser: clientWordBanner.imageBrowser,
                  TestimonyOne: clientWordBanner.TestimonyOne,
                  TestimonyTwo: clientWordBanner.TestimonyTwo,
                  TestimonyThree: clientWordBanner.TestimonyThree,
                  TestimonyFour: clientWordBanner.TestimonyFour
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

  getTestimonyList(): void {
    this.infoManagementService.getTestimonyList().subscribe((res: any) => {
      if (res.status === 200) {
        if (res.body && res.body.total > 0){
          this.testimoneyList = res.body.data;
        }

      } else {
        this.loadButton = false;
        this.toastr.errorToastr('Error while saving data.', 'Error', { animate: 'slideFromRight' });
      }
    }, err => {
      this.ngxLoader.stop();
      this.loadButton = false;
      this.toastr.errorToastr(err.error.error, 'Error', { animate: 'slideFromRight' });
    });
  }

  onOptionsSelected(selectedId, category): void{
    console.log(selectedId);
    if (selectedId){
      this.infoManagementService.getTestimonyById(selectedId).subscribe((res: any) => {
        if (res.status === 200) {
          if (category === 'TestimonyOne')
          {
            this.testimoneyContentOne = res.body;
          }
          if (category === 'TestimonyTwo')
          {
            this.testimoneyContentTwo = res.body;
          }
          if (category === 'TestimonyThree')
          {
            this.testimoneyContentThree = res.body;
          }
          if (category === 'TestimonyFour')
          {
            this.testimoneyContentFour = res.body;
          }

        } else {
          this.loadButton = false;
          this.toastr.errorToastr('Error while saving data.', 'Error', { animate: 'slideFromRight' });
        }
      }, err => {
        this.ngxLoader.stop();
        this.loadButton = false;
        this.toastr.errorToastr(err.error.error, 'Error', { animate: 'slideFromRight' });
      });
    }
  }

  saveContent(): void{
    this.loadButton = true;
    this.ngxLoader.start();
    this.formArray.forEach((e: any) => {
      if (e === 'contentDetail'){
        if (this.contentDetail.status === 'VALID'){
          this.postObject[e] = JSON.stringify(this.contentDetail.value);
        }
      }
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

      if (e === 'yourMoneyBanner'){
        if (this.yourMoneyBanner.status === 'VALID'){
          this.yourMoneyBanner.value.headerImage = this.yourMoneyImage;
          this.postObject[e] = JSON.stringify(this.yourMoneyBanner.value);
        }
      }

      if (e === 'aboutUsBanner'){
        if (this.aboutUsBanner.status === 'VALID'){
          this.aboutUsBanner.value.headerImage = this.aboutUsImage;
          this.postObject[e] = JSON.stringify(this.aboutUsBanner.value);
        }
      }

      if (e === 'howItWorkBanner'){
        if (this.howItWorkBanner.status === 'VALID'){
          this.postObject[e] = JSON.stringify(this.howItWorkBanner.value);
        }
      }

      if (e === 'someFeatureBanner'){
        if (this.someFeatureBanner.status === 'VALID'){
          this.postObject[e] = JSON.stringify(this.someFeatureBanner.value);
        }
      }

      if (e === 'aboutSeedBanner'){
        if (this.aboutSeedBanner.status === 'VALID'){
          this.aboutSeedBanner.value.headerImage = this.aboutSeedImage;
          this.postObject[e] = JSON.stringify(this.aboutSeedBanner.value);
        }
      }

      if (e === 'footerBanner'){
        if (this.footerBanner.status === 'VALID'){
          this.footerBanner.value.headerImage = this.footerImage;
          this.postObject[e] = JSON.stringify(this.footerBanner.value);
        }
      }

      if (e === 'clientWordBanner'){
        if (this.clientWordBanner.status === 'VALID'){
          this.clientWordBanner.value.testimoneyContentOne = this.testimoneyContentOne;
          this.clientWordBanner.value.testimoneyContentTwo = this.testimoneyContentTwo;
          this.clientWordBanner.value.testimoneyContentThree = this.testimoneyContentThree;
          this.clientWordBanner.value.testimoneyContentThree = this.testimoneyContentThree;
          this.clientWordBanner.value.headerImage = this.clientWordImage;
          this.postObject[e] = JSON.stringify(this.clientWordBanner.value);
        }
      }
    });

    if (this.postObject){
      const params = {type: 'WEB'};
      const data = {
        info: this.postObject
      };
      // console.log(data);
      this.infoManagementService.putWebDetail(data, params).subscribe((res: any) => {
        this.loadButton = false;
        this.ngxLoader.stop();
        if (res.status === 200) {
          this.toastr.successToastr('Data Saved Successfully.', 'Success!', {animate: 'slideFromRight'});

        } else {
          this.loadButton = false;
          this.toastr.errorToastr('Error while saving data.', 'Error', {animate: 'slideFromRight'});
        }
      }, err => {
        this.ngxLoader.stop();
        this.loadButton = false;
        this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
      });
    }

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
    if (category === 'yourMoneyBanner'){
      this.viewerOpen = true;
      this.imageURL = this.yourMoneyImage;
    }
    if (category === 'aboutUsBanner'){
      this.viewerOpen = true;
      this.imageURL = this.aboutUsImage;
    }
    if (category === 'aboutSeedBanner'){
      this.viewerOpen = true;
      this.imageURL = this.aboutSeedImage;
    }
    if (category === 'footerBanner'){
      this.viewerOpen = true;
      this.imageURL = this.footerImage;
    }
    if (category === 'clientWordBanner'){
      this.viewerOpen = true;
      this.imageURL = this.clientWordImage;
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
          this.topHeader.value.imageBrowser = file.name;
          this.imageUpload(file, 'headerImage');
        }

        if (category === 'tbillBanner') {
          this.tbillButton = true;
          // this.tBillImage = reader.result;
          this.tbillBanner.patchValue({
            imageBrowser: file.name
          });
          this.tbillBanner.value.imageBrowser = file.name;
          this.imageUpload(file, 'tbillBanner');
        }
        if (category === 'bondBanner') {
          this.bondButton = true;
          // this.bondImage = reader.result;
          this.bondBanner.patchValue({
            imageBrowser: file.name
          });
          this.bondBanner.value.imageBrowser = file.name;
          this.imageUpload(file, 'bondBanner');
        }
        if (category === 'shareBanner') {
          this.shareButton = true;
          // this.shareImage = reader.result;
          this.shareBanner.patchValue({
            imageBrowser: file.name
          });
          this.shareBanner.value.imageBrowser = file.name;
          this.imageUpload(file, 'shareBanner');
        }
        if (category === 'mutualFundBanner') {
          this.mutualFundButton = true;
          // this.mutualFundImage = reader.result;
          this.mutualFundBanner.patchValue({
            imageBrowser: file.name
          });
          this.mutualFundBanner.value.imageBrowser = file.name;
          this.imageUpload(file, 'mutualFundBanner');
        }
        if (category === 'yourMoneyBanner') {
          this.yourMoneyButton = true;
          // this.yourMoneyImage = reader.result;
          this.yourMoneyBanner.patchValue({
            imageBrowser: file.name
          });
          this.yourMoneyBanner.value.imageBrowser = file.name;
          this.imageUpload(file, 'yourMoneyBanner');
        }
        if (category === 'aboutUsBanner') {
          this.aboutUsButton = true;
          // this.aboutUsImage = reader.result;
          this.aboutUsBanner.patchValue({
            imageBrowser: file.name
          });
          this.aboutUsBanner.value.imageBrowser = file.name;
          this.imageUpload(file, 'aboutUsBanner');
        }
        if (category === 'aboutSeedBanner') {
          this.aboutSeedButton = true;
          // this.aboutSeedImage = reader.result;
          this.aboutSeedBanner.patchValue({
            imageBrowser: file.name
          });
          this.aboutSeedBanner.value.imageBrowser = file.name;
          this.imageUpload(file, 'aboutSeedBanner');
        }
        if (category === 'footerBanner') {
          this.footerButton = true;
          // this.footerImage = reader.result;
          this.footerBanner.patchValue({
            imageBrowser: file.name
          });
          this.footerBanner.value.imageBrowser = file.name;
          this.imageUpload(file, 'footerBanner');
        }
        if (category === 'clientWordBanner') {
          this.clientWordButton = true;
          this.clientWordBanner.patchValue({
            imageBrowser: file.name
          });
          this.clientWordBanner.value.imageBrowser = file.name;
          this.imageUpload(file, 'clientWordBanner');
        }
      };

    }

  }

  imageUpload(file , category?): any {
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
            // this.shareBanner.value.headerImage = res.body.url;
            this.shareImage = res.body.url;
          }
          if (category === 'mutualFundBanner') {
            this.mutualFundButton = false;
            // this.mutualFundBanner.value.headerImage = res.body.url;
            this.mutualFundImage = res.body.url;
          }
          if (category === 'yourMoneyBanner') {
            this.yourMoneyButton = false;
            // this.yourMoneyBanner.value.headerImage = res.body.url;
            this.yourMoneyImage = res.body.url;
          }
          if (category === 'aboutUsBanner') {
            this.aboutUsButton = false;
            // this.aboutUsBanner.value.headerImage = res.body.url;
            this.aboutUsImage = res.body.url;
          }
          if (category === 'aboutSeedBanner') {
            this.aboutSeedButton = false;
            // this.aboutSeedBanner.value.headerImage = res.body.url;
            this.aboutSeedImage = res.body.url;
          }
          if (category === 'footerBanner') {
            this.footerButton = false;
            // this.footerBanner.value.headerImage = res.body.url;
            this.footerImage = res.body.url;
          }
          if (category === 'clientWordBanner') {
            this.clientWordButton = false;
            this.clientWordImage = res.body.url;
          }

        } else {
          this.toastr.errorToastr('Error while uploading image', 'Error', {animate: 'slideFromRight'});
        }
      }, err => {
        this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
      });

    }

  }

  uploadVideo(category): any{
    if (category === 'bigVideo'){
      this.bigVideo = this.domSanitizer.bypassSecurityTrustResourceUrl(this.howItWorkBanner.value.bigVideo);
    }
    if (category === 'smallVideoOne'){
      this.smallVideo1 = this.domSanitizer.bypassSecurityTrustResourceUrl(this.howItWorkBanner.value.smallVideoOne);
    }
    if (category === 'smallVideoTwo'){
      this.smallVideo2 = this.domSanitizer.bypassSecurityTrustResourceUrl(this.howItWorkBanner.value.smallVideoTwo);
    }
  }

  resetForm(): any{
    this.getContent();
  }

  deleteImage(category): void{
    if (category === 'headerImage') {
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
    if (category === 'yourMoneyBanner') {
      this.yourMoneyBanner.value.headerImage = '';
      this.yourMoneyImage = 'assets/cust_details/dollar.png';
      this.yourMoneyBanner.patchValue({
        imageBrowser: ''
      });
      this.yourMoneyBanner.value.imageBrowser = '';
    }
    if (category === 'aboutUsBanner') {
      this.aboutUsBanner.value.headerImage = '';
      this.aboutUsImage = 'assets/cust_details/dollar.png';
      this.aboutUsBanner.patchValue({
        imageBrowser: ''
      });
      this.aboutUsBanner.value.imageBrowser = '';
    }
    if (category === 'aboutSeedBanner') {
      this.aboutSeedBanner.value.headerImage = '';
      this.aboutSeedImage = 'assets/cust_details/dollar.png';
      this.aboutSeedBanner.patchValue({
        imageBrowser: ''
      });
      this.aboutSeedBanner.value.imageBrowser = '';
    }
    if (category === 'footerBanner') {
      this.footerBanner.value.headerImage = '';
      this.footerImage = 'assets/cust_details/dollar.png';
      this.footerBanner.patchValue({
        imageBrowser: ''
      });
      this.footerBanner.value.imageBrowser = '';
    }
    if (category === 'clientWordBanner') {
      this.clientWordBanner.value.headerImage = '';
      this.clientWordImage = 'assets/cust_details/dollar.png';
      this.clientWordBanner.patchValue({
        imageBrowser: ''
      });
      this.clientWordBanner.value.imageBrowser = '';
    }
  }

  deleteVideo(category): void{
    if (category === 'bigVideo'){
      this.bigVideo = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/mw2rxFUNLxQ?controls=0');
      this.howItWorkBanner.patchValue({
        bigVideo: ''
      });
    }
    if (category === 'smallVideo1'){
      this.smallVideo1 = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/mw2rxFUNLxQ?controls=0');
      this.howItWorkBanner.patchValue({
        smallVideoOne: ''
      });
    }
    if (category === 'smallVideo2'){
      this.smallVideo2 = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/mw2rxFUNLxQ?controls=0');
      this.howItWorkBanner.patchValue({
        smallVideoTwo: ''
      });
    }
  }


}
