import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';
import { Tournament } from '../../models/tournament.model';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {
  tournament: Tournament | null = null;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private tournamentService: TournamentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const tournamentId = parseInt(id, 10);
      
      // Get tournament by ID
      this.tournamentService.getTournamentById(tournamentId).subscribe(
        (tournament: Tournament | undefined) => {
          if (tournament) {
            this.tournament = tournament;
            this.tournamentService.selectTournament(tournament);
          }
          this.loading = false;
        }
      );
    }
  }

  getStatusClass(): string {
    if (!this.tournament) return '';
    
    switch (this.tournament.status) {
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
}
