import { Timestamp } from '@angular/fire/firestore';
import { ModalPage } from './../modal/modal.page';
import { DataService } from './../services/data.service';
import { Component, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  notes = [];

  constructor(private dataService: DataService, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.dataService.getNotes().subscribe(res => {
      this.notes = res;
    });
  }

  async updateStatusNote(note){
    await this.dataService.updateStatusNote(true, note);
  }

  async deleteNote(note){
    await this.dataService.deleteNote(note);
  }

  async openNote(note) {
    const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: { id: note.id }
    });
    modal.present();
  }

  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Criar uma nova tarefa',
      inputs: [
        {
          name: 'title',
          placeholder: 'Descrição da tarefa',
          type: 'text'
        },
        {
          name: 'text',
          placeholder: 'Detalhes',
          type: 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Adicionar',
          handler: (res) => {
            this.dataService.addNote({title: res.title
              , text: res.text
              , status: false
              , dtCriacao: Timestamp.now()
              , dtFim: Timestamp.now()
              , usuario: 'vitor'
            });
          }
        }
      ]
    });
    await alert.present();
  }

}
