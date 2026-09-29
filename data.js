const ticketData = [
 {id:'TKT-4821',customer:'Amaka Nwosu',account:'CUS-10482',intent:'Failed transfer',priority:'critical',status:'escalated',channel:'In-app',sla:'18m',agent:'T. Ibrahim',risk:'High-value transaction',amount:'₦420,000',updated:'2 min ago',detail:'Customer reports a transfer marked successful by the originating wallet while the beneficiary has not received funds.',timeline:['10:14 — Ticket created from in-app support','10:15 — AI classified as failed transfer / critical','10:16 — Routed to Payments Operations','10:23 — Escalated after SLA risk threshold']},
 {id:'TKT-4817',customer:'David Mensah',account:'CUS-10831',intent:'KYC verification',priority:'high',status:'open',channel:'Email',sla:'31m',agent:'N. Bello',risk:'Verification pending',amount:'—',updated:'7 min ago',detail:'Customer is waiting for identity verification to complete after uploading required documents.',timeline:['10:09 — Ticket created from email','10:10 — AI classified as KYC verification / high','10:11 — Routed to Verification queue']},
 {id:'TKT-4809',customer:'Ifeoma Okeke',account:'CUS-10192',intent:'Refund pending',priority:'high',status:'pending',channel:'Chat',sla:'44m',agent:'J. Adeyemi',risk:'Refund ageing',amount:'₦85,000',updated:'13 min ago',detail:'Merchant refund has been initiated but has not reflected on the customer wallet within expected processing time.',timeline:['10:02 — Ticket created from chat','10:03 — AI classified as refund pending','10:05 — Linked to merchant refund event']},
 {id:'TKT-4804',customer:'Oluwaseun Ajayi',account:'CUS-11902',intent:'Account locked',priority:'medium',status:'open',channel:'In-app',sla:'1h 12m',agent:'K. Yusuf',risk:'Authentication',amount:'—',updated:'18 min ago',detail:'Customer cannot access the account after repeated failed login attempts.',timeline:['09:57 — Ticket created','09:58 — Risk rule attached: authentication','10:01 — Routed to Account Access queue']},
 {id:'TKT-4798',customer:'Zainab Musa',account:'CUS-11542',intent:'Duplicate charge',priority:'medium',status:'escalated',channel:'Phone',sla:'1h 34m',agent:'T. Ibrahim',risk:'Potential duplicate',amount:'₦19,500',updated:'24 min ago',detail:'Customer has identified two debits for the same merchant reference.',timeline:['09:51 — Ticket created by phone','09:53 — Duplicate charge intent detected','09:55 — Escalated to Payments Operations']},
 {id:'TKT-4786',customer:'Daniel Eze',account:'CUS-11145',intent:'Card declined',priority:'low',status:'resolved',channel:'Chat',sla:'—',agent:'M. Joseph',risk:'Resolved',amount:'₦12,500',updated:'41 min ago',detail:'Card transaction was declined due to merchant-side processing issue. Customer confirmed retry succeeded.',timeline:['09:31 — Ticket created','09:34 — Troubleshooting article sent','09:38 — Customer confirmed successful retry','09:40 — Ticket resolved']},
 {id:'TKT-4782',customer:'Grace Eke',account:'CUS-10211',intent:'Missing transaction',priority:'high',status:'open',channel:'In-app',sla:'26m',agent:'N. Bello',risk:'Ledger mismatch',amount:'₦64,000',updated:'46 min ago',detail:'Customer reports a debit without a corresponding transaction entry in the visible history.',timeline:['09:26 — Ticket created','09:27 — AI flagged ledger mismatch','09:29 — Routed to Reconciliation']},
 {id:'TKT-4779',customer:'Femi Adedeji',account:'CUS-10987',intent:'Merchant dispute',priority:'medium',status:'pending',channel:'Email',sla:'2h 04m',agent:'K. Yusuf',risk:'Charge dispute',amount:'₦7,800',updated:'52 min ago',detail:'Customer disputes a merchant charge and has submitted supporting information.',timeline:['09:20 — Ticket created','09:22 — Dispute workflow started','09:25 — Evidence requested']}
];

const customers = [
 {name:'Amaka Nwosu',id:'CUS-10482',tier:'Priority',tickets:5,csat:'4.1',lifetime:'₦8.4m',risk:'High-value transaction currently under escalation.'},
 {name:'David Mensah',id:'CUS-10831',tier:'Standard',tickets:2,csat:'4.8',lifetime:'₦2.1m',risk:''},
 {name:'Ifeoma Okeke',id:'CUS-10192',tier:'Priority',tickets:4,csat:'4.6',lifetime:'₦5.7m',risk:'Refund ageing beyond normal expectation.'},
 {name:'Oluwaseun Ajayi',id:'CUS-11902',tier:'Standard',tickets:1,csat:'4.9',lifetime:'₦980k',risk:''},
 {name:'Zainab Musa',id:'CUS-11542',tier:'Priority',tickets:3,csat:'4.4',lifetime:'₦4.9m',risk:'Duplicate debit investigation in progress.'},
 {name:'Daniel Eze',id:'CUS-11145',tier:'Standard',tickets:6,csat:'4.7',lifetime:'₦3.3m',risk:''}
];

const intents=[['Failed transfer',34],['KYC verification',21],['Refund pending',16],['Card/payment decline',13],['Account access',9],['Other',7]];
const volume=[42,51,46,63,58,39,44];
const agents=[['TI','T. Ibrahim','Payments Ops',82],['NB','N. Bello','Verification',68],['JA','J. Adeyemi','Refunds',57],['KY','K. Yusuf','Account Access',73],['MJ','M. Joseph','General Support',44]];
const kb=[
 {id:'kb-01',title:'Failed bank transfer troubleshooting',category:'Payments',views:1842,updated:'2h ago',body:'A guided workflow for failed transfers: confirm the transaction state, verify beneficiary details, check retry eligibility, and escalate exceptions that remain unresolved.',content:[
  ['1. Confirm the transaction state','Check whether the transfer is failed, reversed, pending, or completed before taking action. Do not ask the customer to retry a transaction that is still processing.'],
  ['2. Verify the basics','Confirm the destination details, available balance, transfer reference, and the exact error message shown to the customer.'],
  ['3. Check system context','Review recent provider or service alerts and whether similar failures are affecting other customers.'],
  ['4. Resolve or escalate','For eligible failures, provide the approved retry path. Escalate if the transfer remains unresolved, the amount is material, or the system state conflicts with the customer view.']
 ],source:'Operational playbook pattern for payment support; adapt to the provider\'s current transfer policy.'},
 {id:'kb-02',title:'KYC verification checklist',category:'Verification',views:1311,updated:'Yesterday',body:'A concise checklist for identity-verification cases, including document quality, data matching, common rejection reasons, and manual-review triggers.',content:[
  ['1. Check document quality','Confirm the document is readable, current where required, complete, and matches the accepted document types.'],
  ['2. Compare identity fields','Verify that the submitted name, date of birth, and other required fields match the customer profile and document.'],
  ['3. Identify the failure reason','Use the verification result or rejection code rather than guessing why verification failed.'],
  ['4. Route correctly','Send repeated failures, possible identity mismatch, or cases requiring enhanced review to the designated verification/risk queue. Avoid asking customers to submit unnecessary sensitive information through chat.']
 ],source:'Internal-style guidance for a fintech support operation; actual KYC requirements depend on the regulated service and jurisdiction.'},
 {id:'kb-03',title:'Refund lifecycle & support handling',category:'Payments',views:987,updated:'Yesterday',body:'How support should trace a refund from initiation through processor status, ledger update, and customer confirmation without creating duplicate refund requests.',content:[
  ['1. Confirm the refund exists','Locate the original transaction and confirm whether a refund was actually initiated.'],
  ['2. Check the current status','Review the refund state and any processor/reference identifier available to support.'],
  ['3. Set the right expectation','Explain that timing can depend on the payment method and financial institution. Do not promise an exact arrival time unless the policy provides one.'],
  ['4. Prevent duplicates','Do not create another refund simply because the customer has not seen the credit yet. Escalate when the expected processing window has passed or the refund state is inconsistent.']
 ],source:'Stripe Support documents similar refund-status and timing concepts; implementation should follow the actual payment provider policy.'},
 {id:'kb-04',title:'Account access recovery',category:'Security',views:764,updated:'3 days ago',body:'Safe recovery steps for locked accounts and failed authentication, with clear controls around identity confirmation and suspicious-access escalation.',content:[
  ['1. Verify the request','Use the approved authentication and recovery process. Never bypass identity controls because a customer sounds urgent.'],
  ['2. Check recent signals','Review failed login attempts, device or session changes, and recent security events available to the support team.'],
  ['3. Guide recovery','Provide only the approved recovery steps and avoid requesting passwords, one-time codes, or other secrets in the support channel.'],
  ['4. Escalate suspicious cases','Route possible account takeover, repeated failed recovery, or conflicting identity signals to Risk/Security.']
 ],source:'Security-support workflow pattern; adapt to the platform\'s authentication and account-recovery controls.'},
 {id:'kb-05',title:'Duplicate debit investigation',category:'Reconciliation',views:643,updated:'4 days ago',body:'A practical investigation path for customers who report being charged twice, using references, timestamps, amounts, and settlement status.',content:[
  ['1. Gather references','Compare transaction IDs, processor references, timestamps, amounts, currency, and merchant details.'],
  ['2. Determine what actually posted','A duplicate-looking authorization is not necessarily two completed debits. Confirm the ledger and processor states.'],
  ['3. Look for a reversal','Check whether one of the entries was reversed or released instead of settled.'],
  ['4. Route confirmed exceptions','Escalate confirmed duplicate settlements to Payments Operations/Reconciliation with all references attached so the case can be investigated without repeated customer contact.']
 ],source:'Reconciliation workflow pattern; transaction states and reference fields vary by payment provider.'},
 {id:'kb-06',title:'Charge dispute handling',category:'Disputes',views:512,updated:'1 week ago',body:'How support should identify a dispute, separate it from a refund request, preserve evidence, and route the case before any response deadline.',content:[
  ['1. Identify the case type','Confirm whether the customer is reporting a chargeback/dispute, an unauthorized transaction, or simply requesting a refund.'],
  ['2. Preserve evidence','Capture the transaction reference, relevant communications, refund status, and any available merchant evidence in the case record.'],
  ['3. Follow the deadline','Dispute responses can be time-sensitive. Route the case to the designated disputes team early enough for review.'],
  ['4. Do not overpromise','Explain the process and next step without promising that the dispute will be accepted or rejected.']
 ],source:'Stripe Support notes that a card dispute can still be raised after a refund in some circumstances; actual dispute rules vary by scheme, issuer, acquirer, and provider.'}
];
const escalations=[
 ['TKT-4821','Failed transfer','Payments Operations','Critical','High-value transaction'],
 ['TKT-4798','Duplicate charge','Payments Operations','High','Potential duplicate'],
 ['TKT-4762','Suspicious login','Risk & Security','Critical','Account takeover signal'],
 ['TKT-4751','Charge dispute','Disputes','High','Repeat merchant complaint']
];
const qa=[
 ['TKT-4772','S. Okafor','96%','Great empathy; accurate resolution path.'],
 ['TKT-4768','M. Joseph','91%','Correct answer; could improve closure summary.'],
 ['TKT-4759','N. Bello','98%','Excellent documentation and policy adherence.'],
 ['TKT-4744','J. Adeyemi','88%','Escalation was correct; response could be faster.']
];
const audit=[
 ['10:23','Escalation','TKT-4821 escalated to Payments Operations after SLA risk threshold.','System'],
 ['10:16','Routing','TKT-4821 assigned to T. Ibrahim.','Automation'],
 ['10:15','Classification','TKT-4821 classified as Failed transfer / Critical.','AI Router'],
 ['10:11','Routing','TKT-4817 assigned to Verification queue.','Automation'],
 ['10:03','Classification','TKT-4809 classified as Refund pending / High.','AI Router'],
 ['09:40','Resolution','TKT-4786 marked resolved after customer confirmation.','M. Joseph']
];
