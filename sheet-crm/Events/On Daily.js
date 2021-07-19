// *****************************************************************************************
function onDaily() {

    // Automated: Calendar Verifications
    getDaysWithNotBookedConsultations();
    getCanceledConsultationsInCalendar();

    // Automated: Verification Routines
    putPaymentStatus();
    putCancellationsRight();
    patchCustomersFromCrmSheetToDatabase();

    // Manual Actions: Remainders
    postRemainderToVerifyPaymentTransactions();
    postRemainderForMissingConfirmations();
    postConsultationRemaindersForSecretary();
    postPaymentRemaindersForSecretary();
    postPaymentRemaindersForManager();

    // Should be Automated...
    getRowsToDelete();

    // Analytics Routines
    patchFinanceBoard();

    // Auxiliary Routines
    patchBlockCalendarEvents();

}
// *****************************************************************************************