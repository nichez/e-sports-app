import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-team-start',
  templateUrl: './team-start.component.html',
  styleUrls: ['./team-start.component.css']
})
export class TeamStartComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onStream() {
    this.router.navigate(['csgo'], {relativeTo: this.route});
  }

}
