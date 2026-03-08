import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tournament } from '../models/tournament.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private tournamentsSubject = new BehaviorSubject<Tournament[]>([]);
  public tournaments$ = this.tournamentsSubject.asObservable();

  private selectedTournamentSubject = new BehaviorSubject<Tournament | null>(null);
  public selectedTournament$ = this.selectedTournamentSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTournaments();
  }

  loadTournaments(): void {
    // Mock data for demo - replace with actual API call
    const mockTournaments: Tournament[] = [
      {
        id: 1,
        name: 'Spring Championship 2024',
        game: 'League of Legends',
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-04-15'),
        status: 'UPCOMING',
        prizePool: 50000,
        participants: 32,
        maxParticipants: 64
      },
      {
        id: 2,
        name: 'Summer Invitational',
        game: 'Valorant',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-03-10'),
        status: 'IN_PROGRESS',
        prizePool: 100000,
        participants: 16,
        maxParticipants: 16
      },
      {
        id: 3,
        name: 'Winter Cup 2024',
        game: 'Counter-Strike 2',
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-15'),
        status: 'COMPLETED',
        prizePool: 75000,
        participants: 24,
        maxParticipants: 24
      }
    ];

    this.tournamentsSubject.next(mockTournaments);
  }

  selectTournament(tournament: Tournament): void {
    this.selectedTournamentSubject.next(tournament);
  }

  getTournamentById(id: number): Observable<Tournament | undefined> {
    return new Observable(observer => {
      const tournament = this.tournamentsSubject.value.find(t => t.id === id);
      observer.next(tournament);
      observer.complete();
    });
  }

  getUpcoming(): Tournament[] {
    return this.tournamentsSubject.value.filter(t => t.status === 'UPCOMING');
  }

  getActive(): Tournament[] {
    return this.tournamentsSubject.value.filter(t => t.status === 'IN_PROGRESS');
  }
}
