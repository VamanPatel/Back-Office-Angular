import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TestimonialService } from '../../services/testimonial-management.service';
@Component({
  selector: 'app-testimonies',
  templateUrl: './testimonies.component.html',
  styleUrls: ['./testimonies.component.css']
})
export class TestimoniesComponent implements OnInit {
  testimonials: any = undefined;
  totalCount: any;
  page = 1;
  pageSize = 30;
  totalSize: number;
  showPagination = true;
  isError = false;

  formItems: any = undefined;
  form = this.fb.group({
    id: ['', [ Validators.required]],
    username: ['', [ Validators.required]],
    occupation: ['', [Validators.required]],
    testimony:  ['', [Validators.required]],
    show:['', [Validators.required]],
  });
  SchoolDetailsForm : FormGroup;
 
  constructor(
    public testimonialService: TestimonialService,
    public toastr: ToastrManager,
    private ngxLoader: NgxUiLoaderService,
    private fb: FormBuilder
  ) { 
    this.ngxLoader.stop();
  }

  ngOnInit(): void {
   
    this.getTestimonialList();
  }
  createform()  
  {  
    let arr=[];  
    for(let i=0;i< this.totalSize ;i++)  
    {     
      arr.push(this.BuildFormDynamic(this.testimonials[i])) ;      
    }  
    this.SchoolDetailsForm =  this.fb.group({      
      ClassDetails:this.fb.array(arr)  
    })  
  
    this.formItems = this.SchoolDetailsForm.controls.ClassDetails['controls'];

  }  
  BuildFormDynamic(ClassDatas):FormGroup{  
    return this.fb.group({       
          id:[ClassDatas.id],    
          username:[ClassDatas.username, [ Validators.required]],  
          occupation:[ClassDatas.occupation, [ Validators.required]],  
          testimony :[ClassDatas.testimony, [ Validators.required]]  ,
          imageUrl:[ClassDatas.imageUrl],
          show:[ClassDatas.show],

          
     })  
   } 
   SaveData()    
  {    
    console.log(this.SchoolDetailsForm.value);    
    //pass this data to service and api node/webapi  
  
  } 

  getTestimonialList(): void{
    this.ngxLoader.start();
    const params = {      
    };
    this.testimonialService.getTestimonials(params).subscribe((res: any) => {
      this.ngxLoader.stop();
      if (res.status === 200){    
        //console.log(res);  
        this.totalSize = res.body.total;
        this.testimonials = res.body.data;  
        this.createform()  ;             
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

  deleteTestimony(testimonyId){    
    this.testimonialService.deleteTestimonial(testimonyId).subscribe((res: any) => {
      this.ngxLoader.stop();
      if (res.status === 200){    
        console.log(res);  
        this.getTestimonialList();
        this.toastr.successToastr('Testimonial deleted successfully.', 'Success!', {animate: 'slideFromRight'});  
                      
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
  updateTestimonial($event, testIndex){

    
    

        //console.log($event.target.getAttribute('value'));
        console.log(testIndex);      

        this.ngxLoader.start();    
        var testimonyId = $event.target.getAttribute('value'); 
        const testimonialData = {
          username: this.SchoolDetailsForm.value.ClassDetails[testIndex].username,
          occupation: this.SchoolDetailsForm.value.ClassDetails[testIndex].occupation,
          testimony: this.SchoolDetailsForm.value.ClassDetails[testIndex].testimony,
          show: this.SchoolDetailsForm.value.ClassDetails[testIndex].show,  
          imageUrl: this.SchoolDetailsForm.value.ClassDetails[testIndex].imageUrl,    
        };
        console.log(testimonialData);
        
        this.testimonialService.updateTestimony(testimonyId, testimonialData).subscribe((res: any) => {
          this.ngxLoader.stop();
          if (res.status === 200){    
            console.log(res);  
            this.getTestimonialList();
            this.toastr.successToastr('Testimonial updated successfully.', 'Success!', {animate: 'slideFromRight'});  
                        
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
  

}
