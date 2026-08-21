**BAMBOO REPORTS / RESEARCHNXT**

**Monthly Hackathon: Working Document**

GCC Tracker, master list and the two revenue engines

| Field | Detail |
| :---- | :---- |
| Meeting | Monthly hackathon |
| Date | Saturday, 15 August 2026\. Closed at approximately 17:30 IST. |
| Present | Santosh Abraham, Abhishek Fodikar |
| Agenda covered | 1\. Bamboo Reports master list and the prospector. 2\. GCC Tracker overhaul. 3\. GCC dataset health and role tagging. 4\. Key decisions and the year plan. |
| Reference period | This document is the working reference for both of us from Saturday, 15 August 2026 to the next hackathon on Tuesday, 15 September 2026\. |
| Carried forward | Section 7 consolidates open items raised in recorded meetings between 15 June 2026 and 14 August 2026\. |
| Prepared | Saturday, 15 August 2026 |

## **How to use this document**

Sections 1 to 6 are this month's work: what we decided today, who owns it, and by when. Section 7 is the backlog we are carrying from the last two months. It needs a status pass at the next review, not a fresh discussion. Anything in Section 7 that is closed gets struck. Anything still open with no owner gets one or gets dropped.

Where I have added something that was not decided in the meeting, it is marked as a recommendation. Where the meeting left a number or a name open, it sits in Section 6 with an owner and a date.

Points Missed

1. Thoughtworks  
2. Add subscriber tag / multiple tags in dashboard  
3. Upcoming (net new and expanding) filter  
4. 

# **1\. Bamboo Reports master list: the prospector**

The master list is the input file the prospector reads from and writes back to. Three fixes were agreed today. They run in parallel. The goal for the prospector this month is one current file where email ID, LinkedIn ID and phone number are either populated or explicitly flagged, updated by the tool and not by hand.

## **1.1 What we agreed**

| \# | Action | Owner | Target date | Done when |
| :---- | :---- | :---- | :---- | :---- |
| 1 | Populate email ID wherever it is missing. This is a manual step. Abhishek takes the list and gives it to Renuka. | Abhishek to extract and hand over. Renuka to run it. | Handover Tuesday, 18 August 2026\. First pass back Friday, 28 August 2026\. | Every record carries either a populated email ID or an explicit not-found flag with a date stamp. |
| 2 | Pull every case where LinkedIn ID is missing and give it to the team. Once the IDs come back, backfill through the enrichment tool. | Abhishek to extract and assign. Team to source. Backfill through the tool. | Extract Tuesday, 18 August 2026\. Backfill complete Friday, 4 September 2026\. | Missing LinkedIn ID count is reported weekly and trending to zero, backfilled through the tool and not by hand. |
| 3 | Download HubSpot data with phone numbers and all fields, and put it in the common folder. | Santosh | Thursday, 20 August 2026 | File sits in the common folder with the date in the file name. |
| 4 | Prospector picks up the HubSpot file from the common folder and updates the master list. | Abhishek | Within two working days of item 3 | Master list carries the HubSpot phone numbers with source tagged against each. |
| 5 | Create files with whatever has been updated and put them in the folder Abhishek has created. | Abhishek | Rolling, reviewed at the next hackathon | Every update batch sits as a dated file in that folder, so the change history is visible without opening the master list. |

## **1.2 What else this file needs: my recommendations**

*These were not decided today. I am putting them up because each one closes a gap that has already cost us time in the last two months.*

1. Source and date stamp on every field. Field level enrichment history and timestamps were raised on 30 June 2026 and again in the AMJ 26 ops review on 7 July 2026\. Without it we cannot tell a stale record from a bad one.

2. Email verification built into the enrichment run, not kept as a separate pass. The AMJ 26 ops review recorded roughly 50% bounce on the ThoughtWorks project, and on 19 June 2026 we recorded roughly 22% bounce across 21k contacts. If verification is not inside the prospector run, the master list degrades again.

3. A duplicate rule and a unique ID per record. Dedupe and unique IDs were agreed for the GCC list on 4 July 2026\. The master list needs the same, otherwise the HubSpot merge in item 4 creates duplicates.

4. A do-not-contact and suppression column. Client suppression lists have been built separately, for example the ThoughtWorks list on 1 August 2026\. Holding suppression in the master list stops the same mistake twice.

5. A record status field: active, archived, invalid email, junior level removed. The role clean up in Section 3 writes to this field, so define it once and define it now.

6. A weekly count report generated from the file itself: total records, email populated %, LinkedIn populated %, phone populated %, verified %. One number set, reviewed every Friday.

*Two items already sitting in the backlog are the same work as items 1 and 2 above: the bulk LinkedIn check on 12k to 14k platform cases (7 July 2026\) and the build of companies with no contacts (1 August 2026). Merge them into this plan. We should not be running two versions of the same exercise.*

# **2\. GCC Tracker overhaul**

## **2.1 The position**

We are not competing head on with the incumbent GCC media and data platform. They have been at this for more than five years and that game is theirs. We are creating a new turf: free access, without sign in, to GCC numbers. The intent is that anyone with a GCC question refers to us for the number. Authority on numbers first, everything else after.

All of our AEO and SEO work is built around those numbers. The page should read as a stock ticker, not a directory. People come for the latest.

## **2.2 What the page shows**

| Element | Decision |
| :---- | :---- |
| Headline counters | Total number of companies. Total centres. Upcoming centres. Overall employee count. Presented in a fancy, well designed manner with filters the visitor runs themselves. |
| Prospect count | Dropped from the page. |
| Row level data | Centres, upcoming centres and headcount added at company row level. |
| Style | Stock market style. Numbers first, latest state visible, built for return visits. |
| Sign up and sign in | Removed from the tracker path entirely. |

## **2.3 How much data we expose**

We show enough to be useful and not enough to be lifted. The rule caps what any single view returns, not what we hold.

| Rule | Setting |
| :---- | :---- |
| Rows displayed | Limited. No filter combination should return more than 20% to 25% of the underlying dataset. The exact figure needs to be locked, see Section 6\. |
| Hard cap per search | 10 to 15 outcomes displayed. Hard coded. |
| Governing table | A table maps each filter combination to the permitted row count at the agreed percentage. The page displays only what that table allows. Nothing is decided at run time. |
| Full data pages | Up to 250+ companies get GCC compare pages carrying the full data we hold. |

## **2.4 Filters and geography**

* Top 10 for industries.

* Top 5 for cities.

* Top 6 for the third filter. *The category was not named in the meeting and needs confirming, see Section 6\.*

**Geography grouping:**

* Mumbai, Navi Mumbai and Thane combine as Mumbai MMR.

* Delhi, Noida and Gurugram combine as NCR.

This grouping also serves the exposure rule. It stops a city filter from isolating a set small enough to be lifted in full.

*Carry forward: on 10 July 2026 we also agreed to add Faridabad and Ghaziabad into the NCR grouping and to group IT services under NCR. That should go into this build.*

## **2.5 Compare pages and the CTA**

Up to 250+ GCC compare pages, each carrying the full data we hold on that company. A visitor who is interested clicks a CTA, working title "Map Here This is Opportunity", and fills the form. Every submission is approached by the sales team.

*The CTA wording is a working title from the meeting. It needs a final line before build. Direction worth considering: name the value the visitor gets, for example "Map my GCC opportunity". The final call sits with Santosh.*

## **2.6 Intent routing, with no sign in**

We have taken away the whole sign up and sign in process. In its place we read intent from behaviour. If someone has run multiple filters, has spent a certain amount of time on the site, and is running queries that go past the headline numbers, then we know the interest is genuine.

**Signals agreed:**

* Multiple filters run in a session.

* Time on site of 15 to 20 seconds, possibly 30 seconds. One number needs locking, see Section 6\.

* Queries that go beyond the headline numbers, showing the visitor wants to know more about GCCs.

At that stage the website routes them to the specific detail of what Bamboo Reports can provide and asks them to connect.

*This supersedes the gating decisions of 9 July 2026 (top 25 gating with locked pages and an "unlock full list by signing up" CTA) and 28 July 2026 (require signup to view company details, enforce single filter). The new position is open numbers, routed intent. The single filter question should be re-examined against the new exposure table rather than carried over as it stands.*

# **3\. GCC dataset health and role tagging**

We are adding a GCC health layer to the dataset. Two pieces, one owner, no manual element.

## **3.1 Contact clean up by level**

Every contact at manager level and below is checked, along with their department. The contacts meeting that criterion, senior manager, manager, leader, leaders and others, number around 15.9K. Our estimate is that at least 6,000 of those are still relevant. We need to identify which ones, and define the rules across the database properly so the identification is repeatable.

*These are estimates until the role definitions are locked and the relevant count out of the 15.9K is confirmed.*

## **3.2 Role tagging**

We are adding a role to every contact so the dataset can be filtered by role and not only by title. Roles such as GCC head and site head. The roles have to be defined first, mostly for the AI, and then we tag the dataset again.

Abhishek works with Ranu on defining roles across GCC level and department properly. That mapping goes back into the database.

## **3.3 Fully automated**

This is a fully automated exercise. We are not putting a manual element into it, because everyone's understanding of a title is different, and that difference is what produced the tagging problem in the first place. The rules go into the database and the machine applies them.

## **3.4 Dates and outcome**

| Milestone | Owner | Date |
| :---- | :---- | :---- |
| Role list defined across GCC level and department | Abhishek with Ranu | Friday, 28 August 2026 |
| Rules written into the database | Abhishek | Friday, 4 September 2026 |
| First full tagging pass across the dataset | Abhishek | Friday, 11 September 2026 |
| Review of the tagged output and the relevant count out of 15.9K | Santosh and Abhishek | Tuesday, 15 September 2026 |
| Expansion strategy on top of the cleaned base | Renuka | Brief issued after the 15 September review |

Outcome: a repository of 50,000+ contacts, properly tagged. Renuka then works on the strategy of adding more on top of that base.

*Carry forward: adding Level and Department to lead classification was raised on 28 July 2026\. That is the foundation this role tagging sits on. Confirm it is done before the tagging pass runs.*

# **4\. Key decisions taken on 15 August 2026**

7. We do not try to beat the incumbent GCC media and data platform at their own game. They have been in this for more than five years. (Named in the meeting; recorded here by category, per our convention.)

8. We create a new turf: free access, without sign in, to GCC numbers. We want to be the authority anyone refers to for any GCC query.

9. Our whole AEO and SEO strategy is built around those numbers, shown stock market style: total companies, total centres, upcoming centres, overall employee count, with filters.

10. The sign up and sign in process is removed. Interest is read from behaviour and routed to sales.

11. Bamboo Reports data customers are enterprise customers, customised for each one. That is our play on data.

12. The contact base is the second engine. Clean it, tag it, and monetise it through campaigns and reports.

13. Contact clean up is fully automated. No manual judgement in the loop.

# **5\. The two engines and the numbers**

## **5.1 Engine one: enterprise custom data**

Every account we have served on data has wanted something different. ThoughtWorks, Routematic and the third reference account named in the meeting each needed their own customisation. So the play is customised enterprise engagements, not a self serve list.

| Parameter | Figure as stated in the meeting |
| :---- | :---- |
| Deal size | Rs 8 lakh to 10 lakh |
| Target volume | Around 20 deals |
| Focus | This is the whole-year focus on the data side |
| Internal conversion note | At Rs 94 per USD, Rs 8 lakh to 10 lakh is roughly USD 8.5k to 10.6k a deal. Internal working figure only, not for client documents. |

## **5.2 Engine two: the contact base**

The second goal is utilising the contacts we hold in Bamboo Reports. A full contact update, junior level contacts that do not make sense for a prospect removed, and the tagging refined across the base. Once that is done we hold 50,000+ contacts.

| Parameter | Figure as stated in the meeting |
| :---- | :---- |
| Cleaned base | 50,000+ contacts |
| Value per contact | At least USD 4 in a calendar year |
| Opportunity | USD 200K |
| Status of the numbers | Estimates until the role definitions are locked and the relevant count out of the 15.9K is confirmed. |

**The four routes to mint that opportunity:**

14. Round tables.

15. Prospect lead generation campaigns.

16. Content syndication.

17. The H1 report and the quarterly reports we are planning.

For any of this to work the data has to be kept solid and ready. That is the whole point of Section 3\.

## **5.3 The third leg: customised ABM**

Customised ABM campaigns of the kind we pitched for ManageEngine. Two to three clients, four across the year. Those clients also participate in the spotlight campaigns inside the reports, which is what connects this engine back to the report calendar in Section 7.3.

# **6\. Open items to lock**

Each of these was left open in the meeting. None of them is large. All of them block build.

| \# | Open item | Owner | Lock by |
| :---- | :---- | :---- | :---- |
| 1 | The exposure cap: 20% or 25%. Both figures were used. We need one number applied to every filter combination. | Santosh | Tuesday, 18 August 2026 |
| 2 | The third filter, "top 6". The category was not named. | Abhishek | Tuesday, 18 August 2026 |
| 3 | The third reference account named alongside ThoughtWorks and Routematic. | Santosh | Tuesday, 18 August 2026 |
| 4 | Final CTA wording. "Map Here This is Opportunity" is a working title. | Santosh | Friday, 21 August 2026 |
| 5 | Intent routing thresholds: one dwell time number (15, 20 or 30 seconds) plus the filter count that triggers routing. | Abhishek | Friday, 21 August 2026 |
| 6 | The exposure table itself: every filter combination mapped to a permitted row count. | Abhishek | Friday, 28 August 2026 |
| 7 | The role list for tagging: GCC head, site head and the rest. | Abhishek with Ranu | Friday, 28 August 2026 |
| 8 | Whether the 250+ compare pages are indexed for AEO from day one or held back. This decides how fast the authority position builds. | Santosh and Abhishek | Friday, 28 August 2026 |
| 9 | Reconcile the page count: 130 to 150 company pages (6 July 2026), 1.7k+ pages (30 June 2026\) and today's 250+ compare pages. One number stands. | Abhishek | Friday, 28 August 2026 |
| 10 | Do the lead magnets agreed on 10 July 2026, gated content and "Unlock \[Company\] in Full", survive the no sign in position, or are they retired? | Santosh | Friday, 21 August 2026 |

# **7\. Carried forward: 15 June 2026 to 14 August 2026**

Everything below was raised in a recorded meeting in the last two months and has not been closed in front of me. Status against each needs confirming at the next review. Where today's decisions supersede an earlier one, that is marked. Dates in brackets are the meeting date.

## **7.1 GCC Tracker and product**

* Limit the tracker to the top 15 to 20 companies, then batch pages (27 July 2026, Abhishek). Partly superseded by today's 10 to 15 per search rule.

* Compile filter combination counts for the tracker and share (9 July 2026, Abhishek). This is now the direct input to the exposure table in Section 2.3.

* Top 25 gating with locked pages and "unlock full list by signing up" (9 July 2026). Superseded. Sign in is removed.

* Tracker gating requiring signup to view company details, single filter enforced, signup and My Account removed (28 July 2026). Superseded on gating. Re-examine the single filter point against the new exposure table.

* Lead magnets on tracker pages: gated content and "Unlock \[Company\] in Full" (10 July 2026, Abhishek). Needs a decision, see Section 6 item 10\.

* Hold advertorial space on the tracker for one month after launch (10 July 2026, Abhishek). Still live. Pairs with the spotlight campaigns in Section 5.3.

* Programmatic ad monetisation for the tracker (30 June 2026, Abhishek). Open.

* Tracker domain and subdomain strategy (30 June 2026, Santosh). Open, and it matters more now that the numbers page is the AEO asset.

* Tracker page template defined: teaser, filters, ad slots, updates, then build 1.7k+ pages (30 June 2026, Ranu and Abhishek). Reconcile with today's 250+ figure, Section 6 item 9\.

* GCC Tracker test instance created and URL shared (30 June 2026, Abhishek). Confirm status.

* Publish 130 to 150 company pages, 25 default plus filtered, 20 or fewer per page, no copy, AI readable (6 July 2026, Abhishek). Same reconciliation.

* Company profile changes: remove years in India, headcount, centre types and functions; add primary and secondary cities; set title order (4 July 2026, Abhishek). Today we add centres, upcoming centres and headcount back at row level. Reconcile the two.

* Existing versus net new tags on upcoming centres (9 July 2026 and 3 July 2026). Open, and it feeds the upcoming centres counter on the new page.

* Validation date field on centres, with a timestamp on each re-verification (3 July 2026, Ranu). Open.

* Software and SaaS created as a primary category in RxDX, with subtexts for High-Tech, Software and SaaS, HLS and RCG (10 July 2026, Abhishek). Feeds the top 10 industries filter.

* NASSCOM tagging corrected to approximately 2,100 and cross checked against 12 quarterly reports (23 June 2026, Abhishek).

* Transportation tagging fixed; title search and percentages validated (23 June 2026, Abhishek).

* Notification UI pagination fixed (23 June 2026, Abhishek).

* User login and activity logging for super user identification, and IP based login tracking and limits (6 July 2026 and 16 June 2026, Abhishek). Re-scope: with sign in removed from the tracker, this now applies to the paid platform only.

* Testing standards defined, a dedicated functional tester assigned, UI, load and security testing planned (6 July 2026, Abhishek). Open.

* Security audit backend integrated into the product (27 July 2026, Abhishek).

* Automated AEO and AIO audit tool added to the workflow (27 July 2026, Abhishek). Directly supports the authority position.

* Auto summary template implemented for all company pages (22 June 2026, Abhishek).

* Role and title charts on the dashboard: GCC, HR and IT heads, plus top titles (23 June 2026, Abhishek). Overlaps with the role tagging in Section 3\. Do them together.

* Account Data filters added: HQ, industry, India headcount (5 August 2026, Abhishek).

* Free tier scope and model defined (23 June 2026 and 22 June 2026, Abhishek). Needs a fresh look now that the tracker is open and the paid product is enterprise custom.

## **7.2 Data quality and contact operations**

* Field level enrichment history and timestamps, then a full database enrichment run (30 June 2026, Abhishek).

* Field level verification dates added; GCC, HR and IT heads tagged 100% verified (19 June 2026, Abhishek).

* Email verification across the base with a pre-send bounce check, and a plan for a 1k a month engine (19 June 2026, Abhishek).

* 44k contacts consolidated and delivered 100% verified (7 July 2026, Renuka).

* Planner for the 66k clean up and the 250k expansion (7 July 2026, Renuka). Same ground as Section 3 and the Renuka expansion brief. Merge them. We should not run two plans.

* Bulk LinkedIn check on 12k to 14k platform cases (7 July 2026, Renuka). Direct overlap with master list item 2\. Merge.

* List built of companies with no contacts, LinkedIn run, manual outreach assigned (1 August 2026, Renuka).

* Bounce cases processed and relevant titles retained (1 August 2026, Renuka).

* The 17,826 versus 17,646 verified count difference reconciled (9 July 2026, Renuka). Confirm this is closed.

* Level and Department added to lead classification (28 July 2026, Abhishek). Foundation for Section 3\.

* Million Verifier account, refund and auto top up settled; two month usage analysed and contact update frequency set (1 August 2026, Abhishek).

* Bouncer and Million Verifier access revoked for non-compliant users; team call held on verifier usage (3 July 2026, Abhishek).

* Truecaller Premium corporate plan checked and integrated into the phone verification workflow (15 June 2026, Renuka). Relevant to master list item 3\.

* The 844 ICP prospect list, refined by AI, powering the email campaign (13 August 2026, Santosh). This is the most recent list asset. Reconcile it into the master list rather than holding it separately.

* Invalid emails consolidated with GCC Head and IT prioritised (27 July 2026, Renuka).

* ThoughtWorks suppression list created and shared (1 August 2026, Renuka).

* IP warm up and dedicated IPs set up for 100k+ sends (22 June 2026, Abhishek).

## **7.3 Reports and content**

* Plan for website, content and social delivered, including the LinkedIn content plan (13 August 2026, Abhishek and Ranu). Hard date: Wednesday, 30 September 2026\.

* Q3 report template and process defined, marketing started for the October launch (13 August 2026, Ranu). This is one of the four monetisation routes in Section 5.2.

* Feedback on the quarterly report provided (13 August 2026, Santosh).

* ThoughtWorks and ManageEngine editorials drafted and approved (13 August 2026, Ranu).

* Q1 report infographics, landing page and the three email workflow (15 July 2026).

* Sponsor slots embedded in the report TOC; sponsor list compiled from the last two years of NASSCOM and HICIA (9 July 2026).

* Biweekly GCC newsletter with a CTA and a Bamboo Reports spotlight (8 July 2026, Santosh).

* Japanese GCC article published, with the LinkedIn news script, emailer and newsletter (8 July 2026, Santosh).

* GCC thought leadership on social: POVs posted and a LinkedIn newsletter started (15 July 2026, Abhishek).

* Two month LinkedIn strategy redefined and handed to Ranu (13 August 2026, Diptarup).

* Corporate decks updated: unique centres line, client order, NASSCOM, compliance, title set to Founder, CEO and Lead Analyst, testimonials (15 July 2026, Santosh).

## **7.4 Website and marketing**

* Website review feedback sent to Abhishek (13 August 2026, Diptarup).

* Re-engagement email copy revised and the campaign launched to registrants (13 August 2026, Abhishek).

* ResearchNXT site rebuilt in TypeScript and the content finalised (27 July 2026 and 1 August 2026).

* Bamboo Reports content updated: What We Offer, Success Stories, Resources (1 August 2026, Abhishek).

* Active Jobs form replaced with JotForm; roundtables section split into ResearchNXT versus partnerships; missing reports added; About Us numbers taken from the pitch deck; hero image replaced (5 August 2026, Abhishek).

* Calendar link set up for Get a Demo (28 July 2026, Santosh).

* AEO and SEO implemented for GCC keywords; "Submit a briefing request" CTA added (13 July 2026, Abhishek).

* Direct marketing campaign planned for meeting bookings (1 August 2026, Abhishek).

* Cookie cutter execution templates created for client projects (13 August 2026, Abhishek).

* Marketing ops role defined with Kunal (13 August 2026, Abhishek).

## **7.5 Clients and pipeline**

* Zoho Backstage: programme delayed to at least November 2026 on budget. Owed to them: updated programme deck, order form, survey process overview, the Salesforce survey pack, two proposals with geo costing, and the Corporate Gifting Report link. Next call to be scheduled for mid September 2026 (14 August 2026).

* MoveInSync: refreshed GCC list covering site leads and procurement, geo breakdown, platform overview, a Bamboo style report and a proposal. Their client list to be requested (11 August 2026).

* ThoughtWorks retail GCC roundtable: Taj Vivanta, Bangalore, Wednesday 9 and Thursday 10 September 2026\. Invite list on titles only for approval, roundtable narrative, PO plan for Thursday, 1 October 2026, USD 2k content syndication allocation, and the AI ready GCC dataset filtered from the 495 GCCs (11 August 2026).

* ThoughtWorks commercials: Rs 90k upfront plus Rs 9k an attendee, with the variable fee waived below five attendees (4 August 2026).

* HCLTech: the Retail CPG vertical study, with TOC covering horizontals and GTM, project plan including week four QBR content, modular commercial options, vendor empanelment check and a masked sample report (4 August 2026). Separately the 42 account programme on a fixed fee plus success fee, with the fixed fee covering roughly Rs 25 lakh a year of cost (4 August 2026).

* ManageEngine: MSA and sample POs to their legal team, refined senior leadership data purchase list, and the GCC specific two pager (15 July 2026).

* Reckitt: AI Implementer's Guide and the first quarterly GCC report sent; FP\&A talent study scope for Hyderabad and Bangalore to be confirmed (3 August 2026).

* Airtel Business: corporate deck plus an Airtel Business specific deck (11 August 2026).

* Great Place To Work: ICP questionnaire and the Q1 GCC report TOC including hiring trends (21 July 2026).

* Parsec: proposal covering ICP, subscription, add ons, engagement models and the HYSEA GCC forum (15 June 2026).

* Xflow: two stage discovery campaign proposal with slides and the Zoho case study (7 July 2026).

## **7.6 Team and admin**

* DeskTime IP restriction set up and the process shared with the team (1 August 2026, Abhishek).

* Team reviews run with Fathom, summaries sent to Santosh and HR, peer reviews submitted (1 August 2026).

* Leave policy reminders shared, early leave applications requested, DeskTime updated, leave balances updated (1 August 2026).

* Independent task assigned to Shreya and a hiring plan built under her (13 August 2026, Abhishek).

* Team trained on research and report production (13 August 2026, Ranu).

* Inside sales hire: Pune, one to three years, Rs 6 lakh to 7 lakh plus incentives, on a three month trial (16 June 2026, Santosh).

* Marketing executor hire: MBA, agency background, Pune (16 June 2026, Santosh).

* Five minute bullet point updates collected from Priyansh and Shreya at each sync (27 July 2026, Santosh).

* Team allocation planned across key areas with primary and secondary owners (30 June 2026, Santosh).

# **8\. What the two of us own this month**

| Date | What | Owner |
| :---- | :---- | :---- |
| Tuesday, 18 August 2026 | Open items 1, 2 and 3 locked. Master list extracts for missing email ID and missing LinkedIn ID handed over. | Santosh, Abhishek |
| Thursday, 20 August 2026 | HubSpot download with phone numbers placed in the common folder. | Santosh |
| Friday, 21 August 2026 | CTA wording locked. Intent routing thresholds locked. Decision taken on the lead magnets. | Santosh, Abhishek |
| Friday, 28 August 2026 | Exposure table built. Role definitions locked with Ranu. Indexing decision on the compare pages. Page count reconciled. First pass of email ID backfill returned. | Abhishek |
| Friday, 4 September 2026 | LinkedIn ID backfill complete through the enrichment tool. Role rules written into the database. | Abhishek |
| Wednesday 9 and Thursday 10 September 2026 | ThoughtWorks retail GCC roundtable, Taj Vivanta, Bangalore. | Santosh |
| Friday, 11 September 2026 | First full role tagging pass across the dataset. | Abhishek |
| Tuesday, 15 September 2026 | Next hackathon. Review this document top to bottom, close Section 7, confirm the relevant count out of the 15.9K. | Santosh, Abhishek |
| Wednesday, 30 September 2026 | Website, content and social plan delivered, including the LinkedIn content plan. | Abhishek with Ranu |

## **How we review this**

This document is the reference for both of us until the next hackathon on Tuesday, 15 September 2026\. Sections 1 to 6 are the month's work. Section 7 is the backlog and it needs a status pass, not a fresh discussion. At the next review, anything in Section 7 that is closed gets struck, and anything still open without an owner gets one or gets dropped.

# **Appendix: source meetings**

Recorded meetings between 15 June 2026 and 14 August 2026 used to build Section 7\. Today's hackathon on 15 August 2026 was not recorded; Section 1 to Section 6 come from the notes taken in the room.

| Date | Meeting | Recording |
| :---- | :---- | :---- |
| 14 August 2026 | Zoho Backstage RBM Proposal Next Steps | fathom.video/calls/783077331 |
| 13 August 2026 | Bamboo Reports Marketing Review | fathom.video/calls/779537720 |
| 11 August 2026 | Preety MIS and Santosh RNXT | fathom.video/calls/778577111 |
| 11 August 2026 | ThoughtWorks x ResearchNXT: Retail GCC Roundtable Kickoff | fathom.video/calls/778885663 |
| 11 August 2026 | Shreyas and Santosh: GCC ABM Discussion | fathom.video/calls/779038137 |
| 5 August 2026 | Team Call | fathom.video/calls/773665126 |
| 4 August 2026 | Santosh and Dipto Call | fathom.video/calls/771626952 |
| 4 August 2026 | Retail CPG Vertical Study: TOC and Scope, HCLTech | fathom.video/calls/767747022 |
| 3 August 2026 | Bamboo Reports walkthrough, Reckitt | fathom.video/calls/768319099 |
| 1 August 2026 | Team Syncup | fathom.video/calls/769153949 |
| 28 July 2026 | BR Marketing Sync up | fathom.video/calls/761339752 |
| 27 July 2026 | Team Sync Up | fathom.video/calls/759795526 |
| 22 July 2026 | GCC Event Discussion | fathom.video/calls/756567785 |
| 21 July 2026 | BR Marketing Review Call | fathom.video/calls/752747694 |
| 21 July 2026 | ResearchNXT x Great Place To Work | fathom.video/calls/752903689 |
| 20 July 2026 | BR Marketing Review Call | fathom.video/calls/750567734 |
| 16 July 2026 | Data Review Meeting | fathom.video/calls/748097454 |
| 15 July 2026 | ResearchNXT and ManageEngine, GCC Practice Proposal P2 | fathom.video/calls/744021335 |
| 15 July 2026 | Content Marketing | fathom.video/calls/744021339 |
| 13 July 2026 | BR Website Review | fathom.video/calls/743701366 |
| 10 July 2026 | Industry category refinement | fathom.video/calls/742661311 |
| 10 July 2026 | Bamboo Reports: July to September Marketing Charter | fathom.video/calls/740482490 |
| 9 July 2026 | GCC tracking and client data request form | fathom.video/calls/740887933 |
| 9 July 2026 | Data status and verification path | fathom.video/calls/740852753 |
| 9 July 2026 | Q1 Report Syncup | fathom.video/calls/739485633 |
| 8 July 2026 | Bamboo Reports: Marketing Strategy Call | fathom.video/calls/737271799 |
| 7 July 2026 | Ops team AMJ 26 Review Call | fathom.video/calls/737477546 |
| 7 July 2026 | Bamboo Reports walkthrough, Xflow | fathom.video/calls/736097537 |
| 6 July 2026 | Product development priorities | fathom.video/calls/735884926 |
| 4 July 2026 | Public GCC company list and detail pages | fathom.video/calls/734846521 |
| 3 July 2026 | Quarterly Review call, Ranu | fathom.video/calls/734128431 |
| 3 July 2026 | Team performance and operational issues | fathom.video/calls/733948760 |
| 1 July 2026 | ResearchNXT and ManageEngine, GCC Practice Proposal | fathom.video/calls/730068243 |
| 30 June 2026 | Team Meeting | fathom.video/calls/727779145 |
| 30 June 2026 | GPTW and RNXT | fathom.video/calls/727617214 |
| 23 June 2026 | Data quality and free tier strategy | fathom.video/calls/721398600 |
| 23 June 2026 | Handover Data Review | fathom.video/calls/721327061 |
| 23 June 2026 | Call with Dipto | fathom.video/calls/719826434 |
| 22 June 2026 | Team Syncup | fathom.video/calls/719279118 |
| 19 June 2026 | Team Syncup | fathom.video/calls/717480668 |
| 18 June 2026 | ThoughtWorks campaign and marketing database | fathom.video/calls/716024940 |
| 16 June 2026 | Email campaign and verification engine | fathom.video/calls/713112112 |
| 16 June 2026 | Call with Dipto | fathom.video/calls/710863481 |
| 15 June 2026 | Parsec GCC market discussion | fathom.video/calls/711279447 |
| 15 June 2026 | HLS account list and cleansing effort | fathom.video/calls/711146585 |

