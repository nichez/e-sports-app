import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Dota2Service } from '../dota2.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-dota2-edit',
  templateUrl: './dota2-edit.component.html',
  styleUrls: ['./dota2-edit.component.css']
})
export class Dota2EditComponent implements OnInit {
  id: number;
  editMode = false;
  dota2Form: FormGroup;

  constructor(private route: ActivatedRoute,
              private dota2Service: Dota2Service,
              private dataStorageService: DataStorageService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.dota2Service.updateDota2Team(this.id, this.dota2Form.value);
    } else {
      this.dota2Service.addDota2Team(this.dota2Form.value);
       this.dataStorageService.storeDota2Teams()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
    }
    this.onCancel();
  }

  onAddPlayer() {
    (<FormArray>this.dota2Form.get('players')).push(
      new FormGroup({
        'playerName': new FormControl(null, Validators.required),
        'playerCountry': new FormControl(null, Validators.required)
      })
    );
  }

  onDeletePlayer(index: number) {
    (<FormArray>this.dota2Form.get('players')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getControls() {
    return (<FormArray>this.dota2Form.get('players')).controls;
  }

  private initForm() {
    let dota2teamName = '';
    let dota2teamImagePath = '';
    let dota2teamCountry = '';
    let dota2teamPlayers = new FormArray([]);

    if (this.editMode) {
      const dota2team = this.dota2Service.getDota2Team(this.id);
      dota2teamName = dota2team.name;
      dota2teamImagePath = dota2team.imagePath;
      dota2teamCountry = dota2team.country;

      if (dota2team['players']) {
        for (let player of dota2team.players) {
          dota2teamPlayers.push(
            new FormGroup({
              'playerName': new FormControl(player.playerName, Validators.required),
              'playerCountry': new FormControl(player.playerCountry, Validators.required)
            })
          );
        }
      }
    }

    this.dota2Form = new FormGroup({
      'name': new FormControl(dota2teamName, Validators.required),
      'imagePath': new FormControl(dota2teamImagePath, Validators.required),
      'country': new FormControl(dota2teamCountry, Validators.required),
      'players': dota2teamPlayers
    });
  }

}
