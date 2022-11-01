import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderserviceService } from 'src/app/services/orderservice.service';
import { bookObj, imgObj } from '../models/model';

@UntilDestroy()
@Component({
  selector: 'app-finishedprojects',
  templateUrl: './finishedprojects.component.html',
  styleUrls: ['./finishedprojects.component.css']
})
export class FinishedprojectsComponent implements OnInit {

  finishedList: bookObj[] = []
  imageList: imgObj[] = [];
  constructor(private orderService: OrderserviceService, private storage: AngularFireStorage, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getAllFinishedProjects();
    this.getImages();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }
  getAllFinishedProjects() {
    this.orderService.allFinishedProjects().pipe(untilDestroyed(this)).subscribe({
      next: ((res) => {
        this.finishedList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      }),
      error: (error) => { console.log(error) }
    });
  }
  getImages() {
    const ref = this.storage.ref('/images/books/');
    ref.listAll().pipe(untilDestroyed(this)).subscribe((data) => {
      for (let i = 0; i < data.items.length; i++) {
        let name = data.items[i].name;
        let newref = this.storage.ref('/images/books/' + data.items[i].name);
        newref.getDownloadURL().pipe(untilDestroyed(this)).subscribe(
          (res) => {
            this.imageList.push({
              name: name, url: res
            });
          }
        );
      }
    })
  }
}
