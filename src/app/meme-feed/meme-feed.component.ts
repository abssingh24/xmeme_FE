import { Component, OnInit, Input } from '@angular/core';
import { MemeService } from '../meme.service';
import { Meme } from '../models/meme.model';

@Component({
  selector: 'app-meme-feed',
  templateUrl: './meme-feed.component.html',
  styleUrls: ['./meme-feed.component.scss']
})
export class MemeFeedComponent implements OnInit {

  @Input() memePosted: boolean;

  memeList: Array<Meme> = [];

  constructor(
    private memeService : MemeService
  ) { }

  ngOnInit(): void {
    this.fetchLatestMemes();
  }

  ngOnChanges() {
    if(this.memePosted){
      this.fetchLatestMemes();
    }
  }

  fetchLatestMemes(){
    this.memeService.fetchLatestMemes().subscribe((resp: Array<Meme>) => {
      this.memeList = resp;
  });
  }


}
