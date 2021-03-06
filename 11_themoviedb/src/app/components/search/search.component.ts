import { Component, Input } from '@angular/core';
import { TheMovieDbApiService } from './../../providers/the-movie-db-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  search = '';
  loading: boolean;
  @Input() index;
  constructor(
              public _mtvshows: TheMovieDbApiService,
              private router: ActivatedRoute,
              private route: Router) {
    this.router.params.subscribe( params => {
      if ( params['text'] ) {
        this.search = params['text'];
        this.searchMovie();
      }
    });
  }
  searchMovie() {
    this.loading = true;
    if (this.search.length === 0) {
      return;
    }
    this._mtvshows.searchMovie( this.search ).subscribe(res => this.loading = false);
  }

  viewResultDetails(id: number) {
    this.route.navigate(['/movie', id, 'search', this.search]);
  }

  clearSearch() {
    this.search = '';
  }
}
