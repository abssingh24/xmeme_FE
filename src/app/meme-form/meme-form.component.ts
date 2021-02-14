import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Meme } from '../models/meme.model';
import { MemeService } from '../meme.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-meme-form',
  templateUrl: './meme-form.component.html',
  styleUrls: ['./meme-form.component.scss']
})
export class MemeFormComponent implements OnInit {

  @Output() memePostEvent = new EventEmitter<any>();

  memPostLabel: string = "Post your Meme here ...";
  errMsg = "";

  memeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    caption: new FormControl(''),
    url: new FormControl('', Validators.required)
  });

  constructor(
    private memeService : MemeService
  ) { }

  ngOnInit(): void {
  }

  submitMemeForm(){
    if(this.memeForm.valid){
      let meme = new Meme();
      meme.name =  this.memeForm.controls['name'].value;
      meme.caption = this.memeForm.controls['caption'].value;
      meme.url = this.memeForm.controls['url'].value;
      this.memeService.postMeme(meme).subscribe((resp:any) => {
        console.log("post resp", resp);
        this.formSubmitSuccess();
        this.memePostEvent.emit(resp.id);
      }, err => {
        console.log("post error", err)
      })
    } else {
      if(this.memeForm.controls['name'].invalid){
        this.errMsg = 'Please enter name';
      }else if(this.memeForm.controls['url'].invalid){
        this.errMsg = 'Please enter Meme Url';
      }
    }
  }

  formSubmitSuccess(){
    this.errMsg = '';
    this.memeForm.reset();
  }

}
