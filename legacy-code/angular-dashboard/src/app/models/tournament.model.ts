export interface Tournament {
  id: number;
  name: string;
  game: string;
  startDate: Date;
  endDate: Date;
  status: 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED';
  prizePool: number;
  participants: number;
  maxParticipants: number;
}
