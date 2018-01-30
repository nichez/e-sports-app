import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Dota2Team } from '../dota2team.model'
import { Dota2Service } from '../dota2.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-dota2-list',
  templateUrl: './dota2-list.component.html',
  styleUrls: ['./dota2-list.component.css']
})
export class Dota2ListComponent implements OnInit, OnDestroy {
  dota2teams: Dota2Team[];
  subscription: Subscription;

  constructor(private dota2Service: Dota2Service,
              private dataStorageService: DataStorageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.dota2Service.dota2teamsChanged
      .subscribe(
        (dota2teams: Dota2Team[]) => {
          this.dota2teams = dota2teams;
        }
      );
    this.dota2teams = this.dota2Service.getDota2Teams();
    this.dataStorageService.getDota2Teams();
  }

  onNewDota2Team() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
