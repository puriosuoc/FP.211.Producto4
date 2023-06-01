import {EventEmitter, Injectable} from '@angular/core';
import {Song} from "./song";
import {SONGS} from "./mock-songs";

@Injectable({
  providedIn: 'root'
})
export class SongService extends EventEmitter{
  protected songs: Song[] = SONGS;
  protected playing: Song | null = null;
  public readonly playEvent: EventEmitter<Song> = new EventEmitter<Song>();


  play(song: Song): Song {
    this.playing = song;
    this.playEvent.emit(song);
    return this.playing;
  }

  getPlayingSong(): Song | null {
    return this.playing;
  }

  getSongs(): Song[] {
    return this.songs;
  }

}

