// *****************************************************************************************
function getDaysWithNotBookedConsultations() {
    const dayNumber = (new Date()).getDay();
    const isNotCheckDay = !(dayNumber === 2 || dayNumber === 5);

    if (isNotCheckDay) {
        Logger.log("Not a calendar check day for the secretary!");
        return true;
    }
    Logger.log("Secretary's calendar check day!");

    const emailBodyPart1 = `<b>Bom dia Débora,</b>
    <br><br>
    Parece que as seguintes marcações não estão na agenda, verifica e inclui por favor:
    <br><br>`;

    const emailBodyPart2 = `<br>
    Este é um email automático para acompanhar os agendamentos.
    <br><br>
    Atenciosamente,<br>
    Daniel.
    <br><br>`;

    const myCalendarId = "drageisa.com.br_ut2d8artjkssec20dh0gvkp650@group.calendar.google.com";
    const dataBulk = dataExtraction_extratDatafromCrmSheet(option = 2);

    const today = new Date();
    let eventTitles = [];
    for (i = 0; i <= 28; i++) {
        const checkDate = incrementDate(today, i);
        const events = CalendarApp.getCalendarById(myCalendarId).getEventsForDay(checkDate);
        events.forEach(event => {
            const eventTitle = event.getTitle().toLowerCase();;
            eventTitles.push(eventTitle);
        });
    }

    const dataFiltered = dataBulk
        .filter(isDateInNext28days)
        .filter(dataRow => dataRow[crm.CRMStatus - 1] !== "Cancelada")
        .filter(dataRow => dataRow[crm.FullName - 1] !== "Daniel Collier");

    const message = dataFiltered
        .filter(dataRow => {
            const customerName = dataRow[crm.FullName - 1].toLowerCase();
            return eventTitles.filter(eventTitle => (eventTitle.search(customerName) !== (-1))).length === 0;
        })
        .reduce(getMissingPaymentActionsMessage, "");

    if (message !== "") {
        const email = "consulta@drageisa.com.br";
        const subject = '[Agenda] Incluir Agendamento';

        MailApp.sendEmail(email, subject, '', { htmlBody: emailBodyPart1 + message + emailBodyPart2 });
    }

    return true;


    function isDateInNext28days(dataRow) {
        if (dataRow[crm.ConsultationDate - 1] === "") { return false; }

        const isDateValid = (dataRow[crm.ConsultationDate - 1].getTime() <= incrementDate(today, 28).getTime()) &&
            (dataRow[crm.ConsultationDate - 1].getTime() > today.getTime());
        return isDateValid;
    }
}
    // *****************************************************************************************