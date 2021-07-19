// *****************************************************************************************
function getCanceledConsultationsInCalendar() {
    const dayNumber = (new Date()).getDay();
    const isNotCheckDay = !(dayNumber === 2 || dayNumber === 5);

    if (isNotCheckDay) {
        Logger.log("Not a calendar check day for the secretary!");
        return true;
    }
    Logger.log("Secretary's calendar check day!");

    const emailBodyPart1 = `<b>Bom dia Débora,</b>
    <br><br>
    Verifica por favor, parece que as consultas foram canceladas no sistema, mas ainda estão na agenda:
    <br><br>`;

    const emailBodyPart2 = `<br>
    Este é um email automático para acompanhar os agendamentos.
    <br><br>
    Atenciosamente,<br>
    Daniel.
    <br><br>`;

    const myCalendarId = "drageisa.com.br_ut2d8artjkssec20dh0gvkp650@group.calendar.google.com";
    const dataBulk = dataExtraction_extratDatafromCrmSheet(option = 2);

    const dataFiltered = dataBulk
        .filter(dataRow => dataRow[crm.CRMStatus - 1] === "Cancelada")
        .filter(dataRow => dataRow[crm.ConsultationDate - 1] !== "")
        .filter(dataRow => dataRow[crm.FullName - 1] !== "Daniel Collier");

    const message = dataFiltered
        .filter(dataRow => {
            const customerName = dataRow[crm.FullName - 1].toLowerCase();
            const checkDate = incrementHours(dataRow[crm.ConsultationDate - 1]);

            const events = CalendarApp.getCalendarById(myCalendarId).getEventsForDay(checkDate);
            const eventsProperties = events.map(event => [event.getTitle().toLowerCase(), event.getColor()]);

            return eventsProperties.filter(event => (event[0].search(customerName) !== (-1) && event[1] !== CalendarApp.EventColor.RED)).length > 0;
        })
        .reduce(getMissingPaymentActionsMessage, "");

    if (message !== "") {
        const email = "consulta@drageisa.com.br";
        const subject = '[Agenda] Cancelar Marcações';

        MailApp.sendEmail(email, subject, '', { htmlBody: emailBodyPart1 + message + emailBodyPart2 });
    }

    return true;

}
  // *****************************************************************************************