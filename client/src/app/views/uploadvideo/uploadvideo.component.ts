import { Component, OnInit,Pipe, PipeTransform, Inject, LOCALE_ID  } from "@angular/core";
import { HttpResponse, HttpEventType } from "@angular/common/http";
import { VideoService } from "../../service/video.service";
import { ToMinPipe } from '../../pipes/to-min.pipe';
import { ToMbPipe } from "../../pipes/to-mb.pipe";
@Component({
  selector: "app-uploadvideo",
  templateUrl: "./uploadvideo.component.html",
  styleUrls: ["./uploadvideo.component.css"],
  providers:[ToMbPipe,ToMinPipe]
})
export class UploadvideoComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  public video = {
    title: null,
    description: null,
    tags: [],
    size: null,
    length: null,
    source: null,
    meta: null,
    name:null
  };

  constructor(private videoService: VideoService,
    private toMin: ToMinPipe,
    private toMb: ToMbPipe) {}

  ngOnInit() {}

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.video.name=this.selectedFiles[0].name;
    this.getFileInfo(this.selectedFiles[0]);
  }

  addVideo(video) {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);

    this.videoService
      .pushFileToStorage(this.currentFileUpload)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(
            (100 * event.loaded) / event.total
          );
        } else if (event instanceof HttpResponse) {
          video.meta = event.body;
          video.meta = JSON.parse(video.meta);
          video.path=video.meta.key
          this.videoService.createVideo(video).subscribe(
            data => {
              this.video = {
                title: null,
                description: null,
                tags: [],
                size: null,
                length: null,
                source: null,
                meta: null,
                name:null
              };
              document.getElementById("length")["value"]=null;
              document.getElementById("size")["value"]=null;
              alert("upload success");
            },
            err => {
              alert(err);
            }
          );
        }
      });
  }

  

  getFileInfo(file) {
    var parentThis = this;
    var videoEl = document.createElement("video");
    videoEl.preload = "metadata";
    videoEl.onloadedmetadata = function() {
      window.URL.revokeObjectURL(videoEl.src);
      parentThis.video.length = Math.round(videoEl.duration);
      parentThis.video.size = Math.round(file.size / 1000);
      document.getElementById("length")["value"] = parentThis.toMin.transform(parentThis.video.length);
      document.getElementById("size")["value"] = parentThis.toMb.transform(parentThis.video.size);
    };
    videoEl.src = URL.createObjectURL(file);
  }
}
