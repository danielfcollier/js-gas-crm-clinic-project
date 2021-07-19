/**
 * Gets a list of people in the user's contacts.
 */
function getConnections() {
  var people = People.People.Connections.list('people/me', {
    personFields: 'names,emailAddresses,phoneNumbers'
  });
  Logger.log('Connections: %s', JSON.stringify(people, null, 2));
}

/**
 * Gets the person information for any Google Account.
 * @param {string} accountId The account ID.
 */
function getAccount() {
  const accountId = "C046w198k";
  var people = People.People.get('people/' + accountId, {
    personFields: 'names,emailAddresses'
  });
  Logger.log('Public Profile: %s', JSON.stringify(people, null, 2));
}