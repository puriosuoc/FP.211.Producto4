import {Component, Input, OnInit} from '@angular/core';
import { Song } from '../song';
import { SONGS } from '../mock-songs';
import {SongService} from "../song.service";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})

export class SongComponent implements OnInit {

  selectedSong: Song | null = null;

  constructor(protected songService: SongService) {}

  ngOnInit() {
    this.songService.playEvent.subscribe((song: Song) => {
      this.selectedSong = song;
    });
  }


}


