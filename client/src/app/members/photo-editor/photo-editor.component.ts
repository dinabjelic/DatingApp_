import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/members';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() member:Member;
  uploader: FileUploader;
  hasBaseDropzoneOver=false;
  baseUrl= 'https://localhost:5001/api/';
  user:User;
  
  constructor(private accountService:AccountService, private memberService:MembersService) 
  {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user=>this.user=user);  
      //uzeli uzera iz observablea i pohranili ga u user varijablu
  }

  ngOnInit(): void {
    this.initializeUploader();
  }


  //trebamo hasBaseDropZone provideati s metodom da mozemo setovati dropZonu unutar template-a
   
  fileOverBase(e:any){ //kao parametar uzima event  i 3.dio pisanja
     this.hasBaseDropzoneOver=e;

  }


  deletePhoto(photoId:number){

    this.memberService.deletePhoto(photoId).subscribe(()=>{
      this.member.photos= this.member.photos.filter(x=>x.id !== photoId); //refresha sve 
    })
  }

   //1.smo ovo poceli pisat 
  initializeUploader(){
    this.uploader= new FileUploader({
      url: this.baseUrl + 'users/add-photo', 
      authToken: 'Bearer ' +this.user.token, //za ovaj token smo morali uzet usera iz observablea
      isHTML5:true, 
      allowedFileType: ['image'], 
      removeAfterUpload: true, //da li zelimo ukloniti iz dropZone nakon uploada
      autoUpload:false, //user ce morat sam kliknut dugmic
      maxFileSize:10*1024*1024

    });


    //moramo dodati jos jedan dio kofiguracije i to je 2.dio pisanja 
    this.uploader.onAfterAddingFile=(file) =>{  //file je parametar a ovo je funkcija
      file.withCredentials=false;


      //sta cemo uraditi kad je file uploaded.Nakon sto je konfiguracija setovana  i 4.dio pisanja
      this.uploader.onSuccessItem=(item, response,status,headers)=>{
        if(response){
          const photo:Photo= JSON.parse(response);
          this.member.photos.push(photo); //dodat cemo sliku u array
      
          //nakon sto smo uploadali sliku moramo je refreshat odmah 
          if(photo.isMain){
            this.member.photoUrl= photo.url, 
            this.accountService.setCurrentUser(this.user)
          }
        }
      }

    } 




  }

}
