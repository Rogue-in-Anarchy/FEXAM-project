import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
})
export class PermissionsPage {

  constructor(
    private readonly router: Router,
  ) { }

  back(){
    this.router.navigate(['home'])
  }

  allow(){
    console.log('examining');
    this.router.navigate(['examiner']);
    console.log('examining');
  }

}
