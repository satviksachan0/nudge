export type BeforeDueConfig = {
  daysBefore: number;
};

export type AfterDueConfig = {
  startAfterDays: number;
  repeatEveryDays: number;
  maxOccurrences: number;
};
