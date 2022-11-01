import { Component, OnInit,Input } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { imgObj } from '../../models/model';

@UntilDestroy()
@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css']
})
export class RequestCardComponent implements OnInit {

  @Input() publishRequest:any;
  fileList:imgObj[]=[];

  constructor(private storage:AngularFireStorage) { }

  ngOnInit(): void {
    this.imageList();
  }
  imageList(){
    const ref = this.storage.ref('/images/books/');
    ref.listAll().pipe(untilDestroyed(this)).subscribe((data) => {
      for (let i = 0; i < data.items.length; i++) {
        let name = data.items[i].name;
        let newref = this.storage.ref('/images/books/' + data.items[i].name);
        newref.getDownloadURL().subscribe(
          (res) => {
            this.fileList.push({
              name: name, url: res
            });
          }
        );
      }
    })
  }

}
