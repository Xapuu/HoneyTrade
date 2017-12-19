import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  status

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(res => {
      console.log(res.status)
      this.status = res.status
    })
  }

}
