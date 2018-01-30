import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { Player } from '../../shared/player.model'
import { ShoppingListService } from '../shopping-list.service';
import {isNumber} from "util";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Player;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getPlayer(index);
          this.slForm.setValue({
            playerName: this.editedItem.playerName,
            playerCountry: this.editedItem.playerCountry
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newPlayer = new Player(value.playerName, value.playerCountry);
    if (this.editMode) {
      this.slService.updatePlayer(this.editedItemIndex, newPlayer);
    } else {
      this.slService.addPlayer(newPlayer);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deletePlayer(this.editedItemIndex);
    this.editMode = false;
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
