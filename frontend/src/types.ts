export type CalendarEvent = {
  id?: string;
  title: string;
  note: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  days: number;
  duration: number; //duration in minutes
  location: string; //duration in minutes
  organizer: {
    email: string;
  };
  concerned: string;
  links: Array<string>;
  downloadCSV: boolean;
};

export type EventType = {
  [startDate: string]: {
    [startTime: string]: CalendarEvent;
  };
};
