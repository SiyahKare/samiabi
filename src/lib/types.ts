export interface RaceProgram {
  no: number;
  saat: string;
  kosu: number;
  mesafe: number;
  pist: string;
  horses: HorseInProgram[];
}

export interface HorseInProgram {
  isim: string;
  kilo: number;
  jokey: string;
  klv: number;
  son_10_yaris: string;
  handikap: number;
}

export interface PastPerformanceRow {
  tarih: string;
  sehir: string;
  mesafe: number;
  pist: string;
  derece: string;
  siklet: number;
  jokey: string;
  sira: number;
}

export interface PastPerformances {
  [horseName: string]: PastPerformanceRow[];
}

export interface SplitCheckpoint {
  mesafe: number;
  pozisyon: number;
  sure: string; // cumulative time
}

export interface SplitData {
  [horseName: string]: SplitCheckpoint[];
}

export interface AnalysisResult {
  steps: string[];
  paceMap: string;
  raceShape: string;
  scenarios: {
    title: string;
    description: string;
    probability: number;
  }[];
  horses: {
    name: string;
    runningStyle: string;
    strengths: string[];
    risks: string[];
    scenarioFit: string;
    winPercentage: number;
  }[];
  winPercentages: { [horseName: string]: number };
  winnerPool: string[];
  finalDecision: string;
}
