import { Component, OnInit } from "@angular/core";
import { VideoService } from "../../service/video.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-playvideo",
  templateUrl: "./playvideo.component.html",
  styleUrls: ["./playvideo.component.css"]
})
export class PlayvideoComponent implements OnInit {
  public videos: any;
  public video: any;
  public query = {
    sort: { createdAt: -1 },
    limit: 12,
    page: 1,
    filter: {},
    select: {}
  };
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private videoService: VideoService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit() {
    const queryParams = this.activeRoute.snapshot.queryParams;
    const routeParams = this.activeRoute.snapshot.params;
    this.getVideo(routeParams.id);
  }

  getVideo(id) {
    this.videoService.getVideo(id).subscribe(
      data => {
        this.video = data;
        this.query.filter["tags"] = this.video.tags;
        this.getRelatedVideos(this.query);
      },
      err => {
        console.log(err);
      }
    );
  }

  getRelatedVideos(query) {
    this.videoService.getVideos(query).subscribe(
      data => {
        this.videos = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  playCurrent(id) {
    this.router.navigate(["playvideo/" + id]);
  }

  next(page) {
    this.query.page = page;
    this.getRelatedVideos(this.query);
  }

  previous(page) {
    this.query.page = page;
    this.getRelatedVideos(this.query);
  }

  onPlayerReady(event) {
    console.log(event);
  }
}
