import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TournamentService } from '../../services/tournament.service';
import { Tournament } from '../../models/tournament.model';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit, OnDestroy {
  tournaments: Tournament[] = [];
  private subscription?: Subscription;

  constructor(private tournamentService: TournamentService) {}

  ngOnInit(): void {
    this.subscription = this.tournamentService.tournaments$.subscribe(
      tournaments => {
        this.tournaments = tournaments;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'UPCOMING':
        return 'badge-upcoming';
      case 'IN_PROGRESS':
        return 'badge-active';
      case 'COMPLETED':
        return 'badge-completed';
      default:
        return '';
    }
  }

  selectTournament(tournament: Tournament): void {
    this.tournamentService.selectTournament(tournament);
  }
}
