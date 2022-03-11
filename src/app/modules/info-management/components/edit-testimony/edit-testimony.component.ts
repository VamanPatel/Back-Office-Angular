import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ActivatedRoute, Router } from '@angular/router';
import { TestimonialService } from '../../services/testimonial-management.service';

@Component({
  selector: 'app-edit-testimony',
  templateUrl: './edit-testimony.component.html',
  styleUrls: ['./edit-testimony.component.css']
})
export class EditTestimonyComponent implements OnInit {

  testimonial: any = undefined;
  isError = false;
  form: FormGroup;
  url: any = "";
  uploadedImage: any = "";
  tsetimonyShowToggle = true; 
  isChecked : boolean = true;
  loadButton: boolean;
  imageUploadBtn: boolean;
  testimonyId: any;

  constructor(
    public testimonialService: TestimonialService,
    public toastr: ToastrManager,
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
      this.route.params.subscribe(params => {
        this.testimonyId = params['id'];   
      });
  }

  ngOnInit(): void {
    this.getTestimonial();
  }

  getTestimonial(): void{
    this.ngxLoader.start();
    const params = {      
    };
    this.testimonialService.getTestimonialDetail(params, this.testimonyId ).subscribe((res: any) => {
      this.ngxLoader.stop();
      if (res.status === 200){    
        
        console.log(res.body);  
       
       
        this.testimonial = res.body;  
        console.log(this.testimonial.show); 
        console.log('----'); 
        this.form = this.fb.group({
          id: [res.body.id, [ Validators.required]],
          username: [res.body.username, [ Validators.required]],
          occupation: [res.body.occupation, [Validators.required]],
          testimony:  [res.body.testimony, [Validators.required]],
          show: [res.body.show, [Validators.required]],
          imageUrl: [res.body.imageUrl.split('/').pop()],
        });
        this.uploadedImage = res.body.imageUrl;
                   
      }
      else {
      }
    },
    err => {
      this.ngxLoader.stop();
        this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
      } 
    );
  }

  uploadImage(){
    if(this.url == ""){
      this.toastr.errorToastr('Please select an image to upload.', 'Error', {animate: 'slideFromRight'});
      return;
    }
    const formData = new FormData();
    formData.append('image', this.url);
    formData.append('type', 'testimony');
    this.imageUploadBtn = true;
    this.testimonialService.uploadImage(formData).subscribe((res: any) => {
      this.imageUploadBtn = false;
      if (res.status === 200){    
        console.log(res); 
        this.uploadedImage = res.body.url; 
        this.toastr.successToastr('Image uploaded successfully.', 'Success!', {animate: 'slideFromRight'});
                      
      } else {

      }
    },
    err => {
        this.imageUploadBtn = false;
        this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
      } 
    );
  }

  onFileChange(event){
    this.url = event.currentTarget.files[0] ; 
    const file = event.currentTarget.files[0];
    if(this.url == ""){
      this.toastr.errorToastr('Please select an image to upload.', 'Error', {animate: 'slideFromRight'});
      return;
    }
    const formData = new FormData();
    formData.append('image', this.url);
    formData.append('type', 'testimony');

    this.form.patchValue({
      imageUrl: file.name
    });
    this.form.value.imageUrl = file.name;
    console.log(file.name);

    this.imageUploadBtn = true;
    this.testimonialService.uploadImage(formData).subscribe((res: any) => {
      this.imageUploadBtn = false;
      if (res.status === 200){    
       
        this.uploadedImage = res.body.url; 
        this.toastr.successToastr('Image uploaded successfully.', 'Success!', {animate: 'slideFromRight'});
                      
      } else {

      }
    },
    err => {
        this.imageUploadBtn = false;
        this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
      } 
    );
  }

  updateTestimonial(){
    if (this.form.status === 'INVALID') {
      this.isError = true;
    }
    console.log(this.form.status);
    //alert(this.form.status);
    if (this.form.status === 'VALID') {
      this.loadButton = true;
     
      const testimonialData = {
        username: this.form.value.username,
        occupation: this.form.value.occupation,
        testimony: this.form.value.testimony,
        show: this.isChecked,   
        imageUrl: this.uploadedImage ,
        //imageUrl: this.form.value.imageUrl,  
      };
     
      this.testimonialService.updateTestimony(this.testimonyId, testimonialData).subscribe((res: any) => {
        this.loadButton = false;
        console.log(res);
        if (res.status === 200){
          this.toastr.successToastr(' Testimonial has been updated.', 'Success!', {animate: 'slideFromRight'});  
          this.router.navigate(['info-management/testimonies']);
        }
        else {          
         
        }
      },
      err => {
        this.loadButton = false;
        this.toastr.errorToastr('There was an error adding the data.', 'Error', {animate: 'slideFromRight'});
       
        
      } );

    }   

  }
  get controls(): any{
    return this.form.controls;
  }
  refresh() {
    this.getTestimonial()
  }
  
  

}
