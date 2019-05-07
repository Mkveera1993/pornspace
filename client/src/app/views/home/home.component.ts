import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../service/video.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public videos: any;
  public query = {
    sort: {createdAt: -1},
    limit: 12,
    page: 1,
    filter: {},
    select: {}
  };
  constructor(private videoService: VideoService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.getVideos(this.query);
  }


  getVideos(query) {
    this.spinner.show();
    this.videoService.getVideos(query).subscribe(data => {
      this.videos = data;
      this.spinner.hide();
    }, err => {
      console.log(err);
    });
  }

  next(page) {
    this.query.page = page;
    this.getVideos(this.query);
  }

  previous(page) {
    this.query.page = page;
    this.getVideos(this.query);
  }

}
