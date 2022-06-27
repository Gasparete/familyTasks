import { Timestamp } from '@angular/fire/firestore';
import { DataService, Note } from './../services/data.service';
import { Component, Input } from '@angular/core';
import { AlertController } from '@ionic/angular';

class UserQuantidade {
  usuario: string;
  quantidade: number;

  constructor(usuario: string, quantidade: number) {
    this.usuario = usuario;
    this.quantidade = quantidade;
  }
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  listaUsuarioQuantidades = [];
  users = [];
  notes = [];

  constructor(private dataService: DataService, private alertCtrl: AlertController) {
    this.dataService.getNotes().subscribe(res => {
      this.listaUsuarioQuantidades.splice(0);
      this.notes = res;
      this.notes.forEach(note => {
        this.users.push(note.usuario);
      });
      this.users = [...new Set(this.users)];
      this.users.forEach(user => {
        let qtde = 0;
        this.notes.forEach(note => {
          if (user === note.usuario && note.status) {
            console.log(note.status);
            qtde++;
          }
        });
        const userQuantidade = new UserQuantidade(user, qtde);
        this.listaUsuarioQuantidades.push(userQuantidade);
      });
    });
  }
}
