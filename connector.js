/* Data boundary for Tubeworx Live.
   This version reads the bundled report snapshot. A future secure, central
   service can replace this implementation without changing any page code.
   The snapshot/API contract is described in README.txt. In particular:
   orders[].ship is the promised sales-order ship date, dispatches[].ship is
   the promised dispatch ship date, dispatches[].date is actual dispatch date,
   and workOrders[].salesOrderId links work orders to the customer promise.
   Never embed an Accentis API key here: this file is sent to every user. */
window.TW_CONNECTOR = {
  load: function (done) {
    done(window.TW_SNAPSHOT || null);
  }
};
