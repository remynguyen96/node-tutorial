import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { GlobalService } from "../shared/global.service";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile : any;

  @Input() headerTemplate: TemplateRef<any>;

  constructor(
    private globalService: GlobalService
  ) { }

  ngOnInit() {
    this.profile = JSON.parse(localStorage.getItem('userInfo'));

  }






}
