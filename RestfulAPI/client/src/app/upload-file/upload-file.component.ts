import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { GlobalService } from "../shared/global.service";
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [GlobalService]
})
export class UploadFileComponent implements OnInit {

  formFile : FormGroup;

  imageURL : string = 'assets/images/background.jpg';

  libraryImg = [];


  private info : any = {
    'file' : '',
    'name' : '',
  }

  constructor(
    private formBuilder : FormBuilder,
    private globalService : GlobalService,
  ) { }

  ngOnInit() {
    this.dataForm();
  }

  dataForm(){
    this.formFile = this.formBuilder.group({
      file: this.formBuilder.control(null,Validators.required),
      name: this.formBuilder.control(null,Validators.required),
    })
  }



  showImage(event){
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend  = () => {
      this.imageURL = reader.result;
    }
    reader.readAsDataURL(file);
  }

  uploadFile(data){
    let file = this.formFile.get('file').value[0];
    let formData:FormData = new FormData();
    formData.append('file', file, file.name);
    this.globalService.uploadImage(formData)
        .subscribe(
          data => {
            console.log(data);
            if(data.success === false){
              console.log(data);
            }else{
              console.log(data);
            }
          },
          error => {
            console.log('Upload file error :'+ error);
          }
        )
  }

}
