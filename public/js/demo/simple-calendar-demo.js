$(".calendar-container").simpleCalendar({

  displayYear:true,
  // displays events
  displayEvent: true,

  // event dates
  events: [
    // generate new event after tomorrow for one hour
    {
      startDate: new Date(new Date().setHours(new Date().getHours() + 24)).toDateString(),
      endDate: new Date(new Date().setHours(new Date().getHours() + 25)).toISOString(),
      summary: 'Visit of the Eiffel Tower'
    },
    // generate new event for yesterday at noon
    {
      startDate: new Date(new Date().setHours(new Date().getHours() - new Date().getHours() - 12, 0)).toISOString(),
      endDate: new Date(new Date().setHours(new Date().getHours() - new Date().getHours() - 11)).getTime(),
      summary: 'Restaurant'
    },
    // generate new event for the last two days
    {
      startDate: new Date(new Date().setHours(new Date().getHours() - 48)).toISOString(),
      endDate: new Date(new Date().setHours(new Date().getHours() - 24)).getTime(),
      summary: 'Visit of the Louvre'
    }
  ],

  // disable showing event details
  disableEventDetails: false,

  // disable showing empty date details
  disableEmptyDetails: true 

});