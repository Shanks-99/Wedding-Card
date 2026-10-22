// Central place for the invitation's wording and schedule.
// Placeholder values — tell Lovable the real details to swap them in.

export const eventDetails = {
  groom: {
    name: "Lt. Umer",
    fullName: "Lt. Umer",
    parents: "Mr. & Mrs. Rana Muhammad Ahsan",
    credential: "Pakistan Navy",
  },
  bride: {
    name: "Dr. Momina",
    parents: "Mr. & Mrs. Ahmed", // placeholder — real family name to be confirmed
    credential: "MBBS",
  },
  // Placeholder date & time (PKT)
  dateIso: "2027-02-14T18:00:00+05:00",
  dateLabel: "Sunday, 14 February 2027",
  timeLabel: "6:00 PM",
  // Placeholder venue
  venueName: "Grand Marina Banquet",
  venueAddress: "Clifton, Karachi",
  mapsQuery: "Clifton, Karachi",
  familyName: "Rana",
  timeline: [
    { time: "5:30 PM", title: "Guests Arrival", note: "Tea & refreshments" },
    { time: "6:00 PM", title: "Nikkah Ceremony", note: "The solemn vow" },
    { time: "7:30 PM", title: "Dinner", note: "A feast in your honour" },
    { time: "9:00 PM", title: "Dua & Farewell", note: "Blessings for the couple" },
  ],
  calendarLink:
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + encodeURIComponent("Nikkah Ceremony — Lt. Umer & Dr. Momina") +
    "&dates=20270214T130000Z/20270214T160000Z" +
    "&details=" + encodeURIComponent("Nikkah ceremony of Lt. Umer & Dr. Momina") +
    "&location=" + encodeURIComponent("Grand Marina Banquet, Clifton, Karachi"),
  mapsLink: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Clifton, Karachi"),
} as const;
