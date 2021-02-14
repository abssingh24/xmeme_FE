import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meme } from './models/meme.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  // baseURL: string = "http://localhost:8081/memes";

  constructor(
    private http: HttpClient
  ) { }

  fetchLatestMemes(){
    return this.http.get(environment.backEnd_url);
  }

  postMeme(meme: Meme){
    return this.http.post(environment.backEnd_url, meme);
  }

}
