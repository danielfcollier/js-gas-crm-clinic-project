function patchBlockCalendarEvents() {
    const today = new Date();
    const checkDate = incrementDate(today, 7);
    const myCalendarId = "drageisa.com.br_ut2d8artjkssec20dh0gvkp650@group.calendar.google.com";
    
    const events = CalendarApp.getCalendarById(myCalendarId).getEventsForDay(checkDate);
  
    events.forEach(event => {
      const eventTitle = event.getTitle().toLowerCase();
      const isOnlineConsultationAvailable = /disponível/i.test(eventTitle) && 
        (/meet/i.test(eventTitle) || /online/i.test(eventTitle)) && event.getColor()!==CalendarApp.EventColor.YELLOW;
      if (isOnlineConsultationAvailable) {
        event.setTitle("Bloqueado").setColor(CalendarApp.EventColor.GRAY);
        Logger.log(`${formatDate(checkDate)} ${eventTitle} > ${isOnlineConsultationAvailable} > bloquear!`)
      }
    });
  }
  