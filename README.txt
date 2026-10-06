TUBEWORX LIVE, LOCAL PROTOTYPE

QUICK START
1. Extract the entire Tubeworx_Live folder onto your Windows computer.
2. Double-click "Tubeworx Live.hta". Keep logo.png, styles.css, app.js,
   connector.js, data.js and fonts.css in the same folder. Keep the
   accompanying fonts/ subfolder too.
3. If Windows displays an unknown-publisher warning, follow your company
   policy. Never bypass a block or change security policy to run this file.

SHARED FOLDER AND FUTURE UPDATES
- For a trial with colleagues, put one master Tubeworx_Live folder in a
  company network share that they can read, and give them a shortcut to the
  HTA file on that share. All users then open the same code and data snapshot.
- If you have permission to maintain that folder, you can replace the files
  there with an updated version. Users see the new version next time they
  close and reopen the application. No per-computer reinstall is required.
- Agree on a short update window so nobody opens the app while its files are
  being replaced. Preserve a copy of the previous working version.
- Themes and bookings are stored separately on each computer. Colleagues
  cannot see each other's draft bookings.
- The shared-drive arrangement does not run code when nobody has the app open.
  It also does not make data live or synchronise personal schedule drafts.
- Some company Windows policies block HTA files on network shares or show
  security warnings. If this occurs, IT approval is required, not a workaround.

WHAT IS REAL IN THIS VERSION
- Data is drawn from the supplied Excel exports at the time this
  prototype was assembled. It does NOT update itself from Accentis.
- The app opens on the CEO Dashboard. Overview, CEO Dashboard, KPIs, Sales,
  Quotes, Enquiries, Production Live, Scheduling, Dispatch, Inventory &
  Purchase Orders, Maintenance, Database and Settings
  show available report fields only. The blue/white layout and monthly
  column charts follow the supplied v16 Sales Dashboard reference.
- Bundled local WOFF fonts from the supplied dashboard reproduce its
  Rajdhani body, Chakra Petch headings/KPI values and JetBrains Mono
  annotations. fonts.css and the fonts/ folder must stay beside the app.
  These font files come from the user-supplied HTML and contain OFL
  licence links in their metadata (https://openfontlicense.org/).
- Monthly chart numbers are attached to their own bars, rather than a
  fixed label line above the chart.
- KPI panels for monthly intake, invoicing, segmented DIFOT and calls show
  an explicit awaiting-data state. The supplied August files give one month
  of NCR results, late customer dispatches and late purchase orders. The
  latter two are late-only lists and cannot yield a delivery percentage.
- Sales monthly chart uses the sales-order ship date and total ex GST.
  Quote and enquiry charts use their report dates. These are exported
  records, so historical coverage is limited to each export's filter.
- Inventory & Purchase Orders shows overdue P/Os, last memos and internal
  comments; it hides the automated search message. Comments mentioning
  sales orders are free text and are not a reliable order link. Sales,
  Quotes and Enquiries also show report memos on attention cards and lists.
- The outstanding dispatch queue is inferred from undelivered sales value.
  Actual September dispatches show their dispatched date and promised ship
  date from the separate Dispatch list (2).xlsx export. The reported on-time
  dispatch percentage is 57 of 80, or 71.3% in that partial-month example.
  A completed dispatch record alone does not prove delivery in full.
- Production DIFOT displays an empty percentage because the August DIFOT
  report lists late dispatches only. True DIFOT also needs all eligible
  deliveries and evidence that each order was delivered in full. Never
  interpret the sample on-time dispatch percentage as DIFOT.
- Maintenance currently identifies work orders whose item code begins MAINT.
- R1-R20 route summary information is available for a small subset of work
  orders. It cannot establish the current active production stage. That
  requires the planned one-record-per-operation Accentis lookup.
- Scheduling ranks sales orders by their promised ship date when a matching
  sales order is in the export, falling back to the production due date. Its
  bender plan records machine, tooling code, date, start time and planned
  hours, and rejects overlapping bookings for the same machine. These
  bookings are drafts on this computer only. The supplied exports have no
  tooling-to-part mapping, so tooling codes are entered manually. The app
  does not write to Accentis or share drafts. Local storage can be disabled
  by policy, in which case drafts last only while the app remains open.
- Production Live shows locally booked hours by machine for the next five
  workdays. Its provisional 8-hour slot and what-if estimate use only
  bookings on this computer and assumed weekday availability. Enter the
  proposed order's processing hours, setup time, tooling code, daily machine
  hours and required finish date to test its indicative finish date. The
  test never saves a booking or updates Accentis. A saved booking must
  reference an existing work order.
- Real lead times need all open operations, their remaining work and assigned
  bender, machine hours and downtime, tooling and changeovers, job priority,
  and one central schedule shared by all planners.
- Scheduling now shows the existing board and priority queue. Selecting a
  work order opens the capacity what-if and local booking in Production Live.
- Settings offers white and blue, dark and pink themes, saved on this computer.
  Pink uses the supplied #ff6699 swatch. Dark mode uses consistent contrast
  for charts, details, forms, lists, scheduling, and data-source inventory.
- Database shows the supplied source files, rows loaded for each dataset,
  and the status of the future import, live sync and shared storage. It is
  currently an inventory and roadmap, not a working database manager. It
  cannot import Excel files, run a sync or grant access in this prototype.
- The Excel exports have different date ranges; the current snapshot must
  not be presented as a complete 12-month historical database.
- Every record list shares explicit column widths across headings and rows,
  with horizontal scrolling for wide lists.
- The supplied exports include customer names, quotes and values. Limit who
  can read the folder and do not post it publicly or email it externally.

FUTURE ACCENTIS CONNECTION
- connector.js is the single data boundary. The application pages consume
  the same structures exposed by data.js. The future central connector must
  serve those structures from Accentis JSON Search IDs and report a true
  last-refreshed time. Its meta.databaseConnected and meta.lastSync fields
  feed the Database page status. It must validate all writes server-side.
- For the historical import, export 12 months of each relevant report once,
  use stable Accentis IDs to deduplicate, record each file's date coverage,
  and reconcile totals. Then keep the central database current with filtered
  API reads. A network share alone cannot run automatic background sync.
- Field contract for ship dates: orders[].id is the sales order number,
  orders[].ship is the promised ship date, workOrders[].salesOrderId joins
  the job to its sales order, dispatches[].salesOrderId joins a dispatch to
  that sales order, dispatches[].date is the actual dispatch date and
  dispatches[].ship is the promised ship date on the dispatch. Dates are
  YYYY-MM-DD. For real DIFOT, add the agreed eligible-order denominator and
  delivered-in-full or ordered-versus-delivered quantities at line level.
  For bender planning, add the approved part-number tooling mapping and the
  operation-level routing lookup to identify the current production stage.
- Optional future monthly KPI contract: kpis.monthly.intake and
  kpis.monthly.invoicing are objects keyed by YYYY-MM with values ex GST;
  kpis.monthly.difot has nonAsd, asd and tier1 objects with percentages;
  ncrCount, ncrCost, purchasing, purchasingLate and lateDispatches use month-to-value
  objects; calls is an array of {person, month, count}. Empty or missing
  series stay labelled awaiting data rather than being estimated.
- Do NOT put an API key, password or write permissions in this HTA, its
  JavaScript files or a shared network drive folder. They are visible to
  everyone who can open the app. A private centrally hosted connector or
  service is needed for safe multi-user live data and shared schedule edits.
- Editing the app on a shared drive does not install that service. Get
  approval from your network administrator when ready for the live phase.

DEVELOPMENT
- app.js contains the navigation, views and business calculations.
- styles.css owns the visual design. logo.png is the fixed brand asset.
  Its final "v0.9 visual polish" section is appearance only and can be
  deleted to return to the previous look. The HTA engine ignores flex gap,
  so spacing there uses margins. Type and charts step up from 1680px and
  2200px wide windows for large screens and TVs.
- connector.js loads the source. data.js is a generated report snapshot.
- To regenerate the snapshot from the supplied exports, run the
  accompanying build_snapshot.py from its parent folder with the exports in
  upload/. This does not retrieve any live Accentis records.
- Keep a versioned backup, change and test locally, then copy the verified
  files into the approved master shared folder.

Compatibility: This uses the same Windows HTML Application (HTA) technology
as the Hello World test. It is a prototype, not a secure replacement for a
managed web application. HTA execution has broad local permissions.
