import { ReturnStatement } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { TestimonialService } from '../../services/testimonial-management.service';
@Component({
  selector: 'app-add-testimony',
  templateUrl: './add-testimony.component.html',
  styleUrls: ['./add-testimony.component.css']
})
export class AddTestimonyComponent implements OnInit {
  form = this.fb.group({    
    username: ['', [ Validators.required]],
    occupation: ['', [Validators.required]],
    testimony:  ['', [Validators.required]],
    imageUrl: [''],
    //show:['', [Validators.required]],
  });
  url: any = "";
  uploadedImage: any = "";
  tsetimonyShowToggle = true;
  isError = false;
  isChecked : boolean = true;
  loadButton: boolean;
  imageUploadBtn: boolean;
  constructor(
    public testimonialService: TestimonialService,
    public toastr: ToastrManager,
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder,
    private router: Router,
  ) { 
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
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

  addTestimonial(){
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
        //imageUrl: this.uploadedImage     
        imageUrl: this.uploadedImage,
      };
     
      this.testimonialService.addTestimonial(testimonialData).subscribe((res: any) => {
        this.loadButton = false;
        console.log(res);
        if (res.status === 201){
          this.toastr.successToastr(' Testimonial has been added.', 'Success!', {animate: 'slideFromRight'});  
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
  refresh(): void {
    window.location.reload();
  }
  
  

}
