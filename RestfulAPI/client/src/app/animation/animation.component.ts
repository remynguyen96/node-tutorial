import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  AnimationEntryMetadata,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';


import { Router, NavigationCancel, NavigationEnd, NavigationStart } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pairwise';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GlobalServiceAnimation } from './global.service';

import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/media';
import 'tinymce/plugins/image';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/colorpicker';

declare var tinymce: any;
@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss'],
  animations:[
    trigger('flyinOut',[
      state('in', style({transform : 'translateX(0%)'})),
      transition(':enter',[
        animate(450,keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 0.4, transform: 'translateX(30px)', offset: 0.4}),
          style({opacity: 1, transform: 'translateX(0)', offset: 1}),
        ]))
      ]),
      transition(':leave',[
        animate(450,keyframes([
          style({opacity: 1, transform: 'translateX(0)', offset: 0}),
          style({opacity: 0.4, transform: 'translateX(30px)', offset: 0.4}),
          style({opacity: 0, transform: 'translateX(100%)', offset: 1}),
        ]))
      ]),
    ]),

    trigger('shrinkOut', [
      state('in', style({height: '*'})),
      transition('* => void', [
        style({height: '*'}),
        animate(450, style({height: 0}))
      ]),
      transition('void => *', [
        style({height: '0'}),
        animate(450, style({height: '*'}))
      ])
    ]),


    trigger('flyInOut2', [
    state('in', style({opacity: 1, transform: 'translateX(0)'})),
    transition('void => *', [
      style({ opacity: 0,transform: 'translateX(-100%)'}),
      animate('0.5s 1000ms ease-in')
    ]),
    transition('* => void', [
      animate('0.2s 1000ms ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
  ])
  ]
})
export class AnimationComponent implements OnInit, AfterViewInit, OnDestroy {

  loading : boolean = false;

  mailContent : string;

  // private dataMail : FormGroup;

  dataMail : any = {
    email : '',
    subject : '',
    content : '',
  };

  editor;

  constructor(
    private router : Router,
    private formBuilder : FormBuilder,
    private globalServiceAnimation : GlobalServiceAnimation,
  ) { }

  ngOnInit() {
    // this.infomationMail();
    // this.router.events.filter(event => event instanceof NavigationStart)
    this.router.events.pairwise()
                .subscribe(event =>{
                  // console.log(event);
                  if(event instanceof  NavigationEnd ){
                    this.loading = true;
                  }
                })
  }

  ngAfterViewInit(){
    tinymce.init({
      selector: '#Email',
      plugins: ['link image preview', 'paste', 'table','textcolor colorpicker','media'],
      skin_url: 'assets/skins/lightgray',
      toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      toolbar2: 'print preview media | forecolor backcolor emoticons ',
      height: '300',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          this.dataMail.content = editor.getContent();
        });
      },
    });
  }


  ngOnDestroy(){
    tinymce.remove(this.editor);
  }

  // infomationMail(){
  //   this.dataMail = this.formBuilder.group({
  //     subject : this.formBuilder.control(null,Validators.required),
  //     content : this.formBuilder.control(null,Validators.required),
  //   })
  // }


  sendMail(infomation){
    this.globalServiceAnimation.mailContact(infomation).subscribe(
      result => {
        Materialize.toast(result.success, 2500,'notiSuccess rounded');
      },
      error =>  Materialize.toast(error, 2500,'notiError')
    )
  }

}
