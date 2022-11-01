import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookUploadService } from 'src/app/services/book-upload.service';
import { bookObj } from '../../models/model';
import { UntilDestroy,untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  customerReq: bookObj[] = [];
  constructor(private route:ActivatedRoute,private bookService:BookUploadService) {}

  ngOnInit(): void {
    this.getAllRequest();
  }
  getAllRequest() {
    this.bookService.getAllPublishReq().pipe(untilDestroyed(this)).subscribe(
      {
        next:(res=>{
          this.customerReq=res.map(
            (e:any)=>{
              const data=e.payload.doc.data();
              data.id=e.payload.doc.id;
              return data;
            }
          )
        }),
        error:(error=>{console.log(error)})
      }
    );
  }

}
