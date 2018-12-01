import { Component, OnInit } from '@angular/core';
import { EntryService } from './../shared/entry.service';
import { element } from '@angular/core/src/render3/instructions';
import { Entry } from './../shared/entry.model';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  public entries: Entry[] = [];
  constructor(
    private entryService: EntryService,
  ) { }

  ngOnInit() {
    this.carregaCategorias();
  }

  public carregaCategorias(): void {
    this.entryService.getAll()
      .subscribe((resp) => {
        this.entries = resp;
      });
  }

  public delete(entry: Entry): void {
    this.entryService.delete(entry.id)
      .subscribe(() => {
        this.entries = this.entries.filter(element => element !== entry);
      }, error => {
        console.log(error);
      });
  }

}
