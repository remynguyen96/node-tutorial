import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../shared/global.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(public globalService : GlobalService) { }

  ngOnInit() {
  }

  logout(e){
    e.preventDefault();
    this.globalService.logout();
  }

}
