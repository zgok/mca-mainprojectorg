import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { OrderserviceService } from 'src/app/services/orderservice.service';
import { bookObj, imgObj } from '../models/model';

@UntilDestroy()
@Component({
  selector: 'app-unfinishedprojects',
  templateUrl: './unfinishedprojects.component.html',
  styleUrls: ['./unfinishedprojects.component.css']
})
export class UnfinishedprojectsComponent implements OnInit {

  unfinishedList:bookObj[]=[]
  imageList:imgObj[]=[];

  constructor(private orderService:OrderserviceService,private storage:AngularFireStorage) { }

  ngOnInit(): void {
    this.getAllUnFinishedProjects();
    this.getImages();
  }
  getAllUnFinishedProjects(){
    this.orderService.allUnFinishedProjects().pipe(untilDestroyed(this)).subscribe({
      next:((res)=>{
        this.unfinishedList=res.map((e:any)=>{
          const data=e.payload.doc.data();
          data.id=e.payload.doc.id;
          return data;
        })
      }),
      error:(error)=>{console.log(error)}
    });
  }
  getImages(){
    const ref = this.storage.ref('/images/books/');
    ref.listAll().pipe(untilDestroyed(this)).subscribe((data) => {
      for (let i = 0; i < data.items.length; i++) {
        let name = data.items[i].name;
        let newref = this.storage.ref('/images/books/' + data.items[i].name);
        newref.getDownloadURL().subscribe(
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
