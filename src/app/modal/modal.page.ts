import { updateDoc } from '@angular/fire/firestore';
import { ModalController, ToastController } from '@ionic/angular';
import { DataService, Note } from './../services/data.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string;
  note: Note = null;
  constructor(private dataService: DataService, private modalCtrl: ModalController, private toastCtrl: ToastController ) { }

  ngOnInit() {
    this.dataService.getNoteById(this.id).subscribe(res => {
      this.note = res;
    });
  }

  async updateStatusNote(statusValue: boolean){
    this.dataService.updateStatusNote(statusValue, this.note);
      const toast = await this.toastCtrl.create({
          message: 'Status atualizado!',
          duration: 1000
      });
      toast.present();
      this.closeWindow();
}

  async updateNote(){
      this.dataService.updateNote(this.note);
      const toast = await this.toastCtrl.create({
          message: 'Tarefa atualizada!.',
          duration: 1000
      });
      toast.present();
      this.closeWindow();
  }

  async deleteNote(){
    await this.dataService.deleteNote(this.note);
    this.closeWindow();
  }

  closeWindow(){
    this.modalCtrl.dismiss();
  }

}
