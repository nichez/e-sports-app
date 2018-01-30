import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { TeamService } from '../team.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {
  id: number;
  editMode = false;
  teamForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private teamService: TeamService,
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
      this.teamService.updateTeam(this.id, this.teamForm.value);
    } else {
      this.teamService.addTeam(this.teamForm.value);
       this.dataStorageService.storeTeams()
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
    }
    this.onCancel();
  }

  onAddPlayer() {
    (<FormArray>this.teamForm.get('players')).push(
      new FormGroup({
        'playerName': new FormControl(null, Validators.required),
        'playerCountry': new FormControl(null, Validators.required)
      })
    );
  }

  onDeletePlayer(index: number) {
    (<FormArray>this.teamForm.get('players')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getControls() {
    return (<FormArray>this.teamForm.get('players')).controls;
  }

  private initForm() {
    let teamName = '';
    let teamImagePath = '';
    let teamCountry = '';
    let teamPlayers = new FormArray([]);

    if (this.editMode) {
      const team = this.teamService.getTeam(this.id);
      teamName = team.name;
      teamImagePath = team.imagePath;
      teamCountry = team.country;

      if (team['players']) {
        for (let player of team.players) {
          teamPlayers.push(
            new FormGroup({
              'playerName': new FormControl(player.playerName, Validators.required),
              'playerCountry': new FormControl(player.playerCountry, Validators.required)
            })
          );
        }
      }
    }

    this.teamForm = new FormGroup({
      'name': new FormControl(teamName, Validators.required),
      'imagePath': new FormControl(teamImagePath, Validators.required),
      'country': new FormControl(teamCountry, Validators.required),
      'players': teamPlayers
    });
  }

}
