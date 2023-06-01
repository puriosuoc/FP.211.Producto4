import {EventEmitter, Injectable} from "@angular/core";
import {Firestore, collection, collectionData, doc, setDoc, updateDoc} from '@angular/fire/firestore';
import {Song} from "./song";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  protected playing: Song | null = null;
  public readonly playEvent: EventEmitter<Song> = new EventEmitter<Song>();
  selectedSong: Song | null = null;
  protected songs: Subject<Song[]>;

  protected getDatabaseSongs(): Observable<Song[]> {
    const songRef = collection(this.firestore, 'songs');
    return collectionData(songRef, {idField: 'id'}) as Observable<Song[]>;
  }

  constructor(private firestore: Firestore) {
    this.songs = new Subject<Song[]>();
    this.getDatabaseSongs().subscribe((songs: Song[]) => this.songs.next(songs))
  }

  updateSong(song: Song, selectIdSong: string) {
    if (selectIdSong) {
      const songRef = doc(collection(this.firestore, 'songs'), selectIdSong);
      return updateDoc(songRef, {  ...this.selectedSong });
    } else {
      return Promise.reject('Invalid song ID');
    }
  }

  getSongs(): Subject<Song[]>{
  return this.songs;
  }

  selected(song: Song): Song {
    this.playing = song;
    this.playEvent.emit(song);
    this.selectedSong = song;
    return this.playing;
  }

  getPlayingSong(): Song | null {
    return this.playing;
  }
}

