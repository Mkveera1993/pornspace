import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class VideoService {

  constructor(private http: HttpClient) { }
 
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
 
    formdata.append('file', file);
 
    const req = new HttpRequest('POST', '/api/videos/upload', formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
 
  }

  createVideo(data){      
    return this.http.post('/api/videos', data).map(res => res);
  }

  getVideos(params){
    var query={
      queryString:params?JSON.stringify(params):""
    }
    return this.http.get('/api/videos',{params:query}).map(res => res);
  }

  getVideo(id){
    return this.http.get('/api/videos/'+id).map(res => res);
  }

}
