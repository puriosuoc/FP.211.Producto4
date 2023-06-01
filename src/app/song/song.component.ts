import { Component, Input, OnInit } from '@angular/core';
import { Song } from '../song';
import { SongService } from "../song.service";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  selectedSong: Song | null = null;
  selectIdSong: string | null = null;

  tittleControl = new FormControl('');
  artistControl = new FormControl('');
  subtittleControl = new FormControl('');
  discControl = new FormControl('');
  yearControl = new FormControl('');
  styleControl = new FormControl('');

  constructor(protected songService: SongService) {}

  ngOnInit() {
    this.songService.playEvent.subscribe((song: Song) => {
      this.selectedSong = song;
      this.selectIdSong = song?.id ?? null;

      this.tittleControl.setValue(song?.tittle || '');
      this.artistControl.setValue(song?.artist || '');
      this.subtittleControl.setValue(song?.subtittle || '');
      this.discControl.setValue(song?.disc || '');
      this.yearControl.setValue(song?.year || '');
      this.styleControl.setValue(song?.style || '');
    });
  }

  Submit() {
    console.log("Modificando: " + this.selectedSong?.id);
    const updatedSong: Song = {
      //id: this.selectedSong?.id || '',
      tittle: this.tittleControl.value ?? '',
      artist: this.artistControl.value ?? '',
      subtittle: this.subtittleControl.value ?? '',
      disc: this.discControl.value ?? '',
      year: this.yearControl.value ?? '',
      style: this.styleControl.value ?? '',
      image: this.selectedSong?.image || '',
      url: this.selectedSong?.url || '',
    };

    this.songService.updateSong(updatedSong, this.selectIdSong ?? "")
        .then(() => {
          console.log('Canción actualizada en la base de datos');
          console.log('Canción', this.selectedSong);
        })
        .catch((error) => {
          console.error('Error al actualizar la canción:', error);
        });

  }
}

