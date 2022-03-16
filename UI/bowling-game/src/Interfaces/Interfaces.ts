export interface Roll extends IContestant {
  PinsKnocked: number;
}

export interface IContestant {
  contestantName: string;
}

export interface IFrame {
  turn1: number;
  turn2: number;
}

export interface IContestantInfo {
  contestantName: string;
  pinsLeft: number;
}

export interface Leader extends IContestant {
  Score: number;
  ScoreFrame: number;
}

export interface ICurrentPlayingContestant {
  index: number;
  rolls: any[];
  numberOfTimesPlayed: number;
  remainingPins: number;
  contestantName?: string;
}
