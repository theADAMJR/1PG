/**
 * An account object.
 * @typedef {Object} Account
 *
 * @property {String} id The ID of the account.
 * @property {String} name The username of the account.
 */
/**
 * A server integration object.
 * @typedef {Object} Integration
 *
 * @property {String} id The integration ID.
 * @property {String} name The integration name.
 * @property {String} type The service which has been integrated.
 * @property {Boolean} enabled Whether the integration is enabled.
 * @property {Boolean} syncing Whether the integration is synced.
 * @property {String} role_id The ID that the integration uses for "subscribers"
 * @property {Number} expire_behavior The behavior of expiring users.
 * @property {Number} expire_grace_period The grace period before expiring subscribers.
 * @property {Object} A discord user object.
 * @property {Account} An account object.
 * @property {String} An ISO8601 TimeStamp of when this integration was last synced.
 */
