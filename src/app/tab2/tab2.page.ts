import { ModalPage } from './../modal/modal.page';
import { DataService } from './../services/data.service';
import { Component, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  notes = [];

  constructor(private dataService: DataService, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.dataService.getNotes().subscribe(res => {
      this.notes = res;
    });
  }

  async updateStatusNote(note){
    await this.dataService.updateStatusNote(false, note);
  }

  async openNote(note) {
    const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: { id: note.id }
    });
    modal.present();
  }

}
