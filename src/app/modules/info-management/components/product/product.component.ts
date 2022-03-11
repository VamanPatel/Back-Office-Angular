import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { InfoManagementService } from '../../services/info-management.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  active = 1;
  public Editor = ClassicEditor;
  public T_BILL_EditorData = '';
  public BOND_EditorData = '';
  public MUTUAL_FUND_EditorData = '';
  public SHARE_EditorData = '';
  loadButton: boolean;
  defaultConfig = {
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'insertTable',
        '|',
        'imageUpload',
        '|',
        'undo',
        'redo'
      ]
    },
    table: {
      contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
    },
    language: 'en',
    removePlugins: ['CKFinderUploadAdapter', 'CKFinder', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed'],
  };
  constructor(
    public infoManagementService: InfoManagementService,
    public toastr: ToastrManager,
    private ngxLoader: NgxUiLoaderService,
  ) {
    this.ngxLoader.stop();
  }
  ngOnInit(): void {
    this.getProductInfo('T_BILL');
   
  }

  editorFuntion(type): void {
    if ( type == 'T_BILL') {
      var editorDetail = this.T_BILL_EditorData;
    }
    if ( type == 'BOND') {
      var editorDetail = this.BOND_EditorData;
    }
    if ( type == 'MUTUAL_FUND') {
      var editorDetail = this.MUTUAL_FUND_EditorData;
    }
    if ( type == 'SHARE') {
      var editorDetail = this.SHARE_EditorData;
    }
    const data = {
      detail :  editorDetail
    };
    const params = {
      type
    };
    this.loadButton = true;
    this.infoManagementService.putProductDetail(data, params).subscribe((res: any) => {
      this.loadButton = false;
      if (res.status === 200){
        this.toastr.successToastr('Info has been saved', 'Success!', {animate: 'slideFromRight'});
      }
      else {
        console.log('error');
      }
    },
    err => {
      this.loadButton = false;
      this.toastr.errorToastr(err.error.error, 'Error', {animate: 'slideFromRight'});
    } );
  }
  resetData(type): void{
    if ( type == 'T_BILL') {      
      this.getProductInfo('T_BILL');
    }
    if ( type == 'BOND') {      
      this.getProductInfo('BOND');
    }
    if ( type == 'MUTUAL_FUND') {
      this.getProductInfo('MUTUAL_FUND');
    }
    if ( type == 'SHARE') {
      this.getProductInfo('SHARE');
    }
  }
  getProductInfo(type): void{
    this.ngxLoader.start();
    const params = {
      type
    };
    this.infoManagementService.getProductDetail(params).subscribe((res: any) => {
      this.ngxLoader.stop();
      if (res.status === 200){       
        if ( type == 'T_BILL') {
          this.T_BILL_EditorData = res.body.detail;
        }
        if ( type == 'BOND') {          
          this.BOND_EditorData = res.body.detail;
        }
        if ( type == 'MUTUAL_FUND') {
          this.MUTUAL_FUND_EditorData = res.body.detail;
        }
        if ( type == 'SHARE') {
          this.SHARE_EditorData = res.body.detail;
        }       
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