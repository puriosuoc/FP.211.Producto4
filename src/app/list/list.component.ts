import { Component, OnInit, } from '@angular/core';
import { Song } from '../song';
import {SongService} from "../song.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  public songs: Song[];
  selectedSong: Song | undefined;
  searchTittle: string = '';
  searchStyle: string = '';
  searchTerm: string = '';

  constructor(protected songService: SongService) {
    this.songs = [];
  }

  ngOnInit() {
    this.songs = this.songService.getSongs();
  }

  onSelect(song: Song): void {
    this.selectedSong = song;
    this.songService.play(song);
  }

}
