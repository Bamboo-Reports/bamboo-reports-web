# Base Layer Pricing Implementation - Complete Guide

## 🎉 What's Been Built

The complete Base Layer pricing system is now implemented! Here's everything that was created:

### ✅ Database & Storage
1. **PDF Storage Bucket** (`plan-documents`)
   - Private storage for Base Layer PDFs
   - Row Level Security (RLS) enabled
   - Only purchased users can access

2. **GCC Companies Table** (`gcc_companies`)
   - 2,500+ GCC company records
   - Full-text search enabled
   - RLS policies for Base Layer purchasers only

3. **Plan Documents Metadata** (`plan_documents`)
   - Links documents to plans
   - Tracks 5 Base Layer deliverables
   - Supports both PDFs and table views

### ✅ Backend Components
1. **Access Control Hook** (`usePurchaseAccess.ts`)
   - Checks if user purchased specific plan
   - Returns purchase status and data
   - Used throughout the app for access control

2. **Python Import Script** (`import-gcc-data.py`)
   - Reads Excel/JSON/CSV files
   - Auto-maps columns
   - Batch imports with progress bar

### ✅ Frontend Components
1. **GCC Companies Table** (`GCCCompaniesTable.tsx`)
   - Displays all 17 columns for 2,500+ companies
   - Search by name, city, industry, country, location
   - Pagination (25 per page)
   - Horizontal scrolling for wide data
   - External links to company websites

2. **Secure PDF Viewer** (`SecurePDFViewer.tsx`)
   - Custom PDF viewer with react-pdf
   - View-only (no download or print buttons)
   - User email watermark overlay
   - Disabled right-click and text selection
   - Navigation and zoom controls
   - Uses local PDF.js worker file

3. **Plan Documents** (`PlanDocuments.tsx`)
   - Grid view of all purchased documents
   - Secure PDF viewer integration
   - Signed URLs with 1-hour expiration
   - GCC table access button
   - Separate views for PDFs and database

4. **My Content Page** (`MyContent.tsx`)
   - Main hub for purchased content
   - Tabs for multiple plans
   - Header, Footer, and cohesive design
   - "Access Your Content" from purchases
   - Protected route (requires login)

5. **Updated Purchases Page**
   - Added "Access Your Content" button
   - Shows all 5 Base Layer items
   - Direct link to /my-content

---

## 🗂️ Base Layer Content Structure

When a user purchases Base Layer ($1,299), they get access to:

| # | Item | Type | Location |
|---|------|------|----------|
| 1 | Standard Trends Report | PDF | Supabase Storage |
| 2 | L1 List - 2,500+ GCCs | Table | Supabase Database |
| 3 | Annual Snapshot 2024-25 | PDF | Supabase Storage |
| 4 | Historic View (3 Years) | PDF | Supabase Storage |
| 5 | Quarterly View | PDF | Supabase Storage |

---

## 🔐 Access Control Flow

```
User purchases Base Layer
    ↓
Record created in `purchases` table
    ↓
User goes to /my-content or /purchases
    ↓
usePurchaseAccess hook checks database
    ↓
If purchase exists && status = 'completed':
    ✅ Show documents
    ✅ Allow PDF downloads
    ✅ Show GCC table
Else:
    ❌ Redirect to pricing or show "No purchases"
```

### RLS Policies

**For PDFs (Supabase Storage):**
```sql
Users can download if they have a completed purchase for the plan
```

**For GCC Data (Database):**
```sql
Users can SELECT if they have a completed Base Layer purchase
```

---

## 📁 File Structure

```
bamboo-reports-web/
├── src/
│   ├── components/
│   │   ├── GCCCompaniesTable.tsx     # GCC data table with filters
│   │   └── PlanDocuments.tsx         # PDF viewer/downloader
│   ├── hooks/
│   │   └── usePurchaseAccess.ts      # Access control hook
│   ├── pages/
│   │   ├── MyContent.tsx             # Main content hub
│   │   └── Purchases.tsx             # Updated with "Access Content" button
│   └── App.tsx                       # Added /my-content route
├── scripts/
│   ├── import-gcc-data.py            # Python import script
│   └── requirements.txt              # Python dependencies
├── supabase-storage-setup.sql        # Storage & document setup
├── gcc-companies-schema.sql          # GCC table schema
└── .env                              # Environment variables
```

---

## 🧪 Testing Guide

### Step 1: Verify Database Setup

**Check if tables exist:**
```sql
-- Should return plan_documents table
SELECT * FROM plan_documents WHERE plan_name = 'Base Layer';

-- Should return ~2,500 records
SELECT COUNT(*) FROM gcc_companies;

-- Should return storage bucket
SELECT * FROM storage.buckets WHERE name = 'plan-documents';
```

**Expected Results:**
- ✅ 5 document records in `plan_documents`
- ✅ 2,500+ records in `gcc_companies`
- ✅ 1 storage bucket `plan-documents`

### Step 2: Test Without Purchase

1. **Sign in** to the app
2. **Go to** `/my-content`
3. **Expected:** "No Purchases Yet" message with link to pricing

### Step 3: Make a Test Purchase

**Option A: Use Razorpay Test Mode**
1. Go to `/pricing`
2. Click "Get Started" on Base Layer
3. Use Razorpay test card:
   - Card: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date
4. Complete payment

**Option B: Manual Database Insert (For Testing)**
```sql
INSERT INTO purchases (
  user_id,
  order_id,
  plan_name,
  amount,
  currency,
  status,
  features,
  purchased_at
) VALUES (
  'your-user-id-here',
  'test-order-' || gen_random_uuid(),
  'Base Layer',
  1299.00,
  'USD',
  'completed',
  '[
    {"title": "Standard Trends Report", "description": "Comprehensive GCC market insights"},
    {"title": "L1 List - 2,500+ GCCs", "description": "Limited view of GCC database"},
    {"title": "Annual Snapshot 2024-25", "description": "Free update in December"},
    {"title": "Historic View (3 Years)", "description": "GCC movement trends in India"},
    {"title": "Quarterly View", "description": "Latest quarter insights"}
  ]'::jsonb,
  NOW()
);
```

### Step 4: Test Content Access

After purchase:

1. **Go to** `/purchases`
   - ✅ Should show Base Layer purchase
   - ✅ Expand details shows 5 items
   - ✅ "Access Your Content" button visible

2. **Click** "Access Your Content"
   - ✅ Redirects to `/my-content`
   - ✅ Shows "Base Layer - Your Content"
   - ✅ Displays 5 document cards

3. **Test PDF Documents:**
   - ✅ Click "View" → Opens PDF in new tab
   - ✅ Click "Download" → Downloads PDF file

4. **Test GCC Table:**
   - ✅ Click "View Database" on L1 List card
   - ✅ Shows table with 2,500+ companies
   - ✅ Search works (try searching "ai")
   - ✅ Filters work (select an industry)
   - ✅ Pagination works

### Step 5: Test Access Control

**Logout and try to access:**
1. Sign out
2. Go to `/my-content`
   - ✅ Redirects to `/signin`

**Different user without purchase:**
1. Create new account
2. Go to `/my-content`
   - ✅ Shows "No Purchases Yet"

**Direct PDF access (test RLS):**
1. Try to access PDF directly via URL
   - ✅ Should be denied if no purchase
   - ✅ Should work if Base Layer purchased

---

## 🚀 Deployment Checklist

Before deploying to production:

### Environment Variables
Ensure these are set in Netlify/Production:
```env
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
VITE_RAZORPAY_KEY_ID=your_production_razorpay_key
RAZORPAY_KEY_SECRET=your_production_razorpay_secret
RESEND_API_KEY=your_production_resend_key
VITE_SUBSCRIPTION_ENABLED=true
```

### Database
1. ✅ Run `gcc-companies-schema.sql` in production Supabase
2. ✅ Run `supabase-storage-setup.sql` in production Supabase
3. ✅ Import GCC data using Python script
4. ✅ Verify RLS policies are active

### Storage
1. ✅ Create `plan-documents` bucket
2. ✅ Upload all 4 Base Layer PDFs:
   - `base-layer/standard-trends-report.pdf`
   - `base-layer/annual-snapshot-2024-25.pdf`
   - `base-layer/historic-view-3-years.pdf`
   - `base-layer/quarterly-view.pdf`
3. ✅ Verify bucket is private
4. ✅ Test RLS policies

### Frontend
1. ✅ Build the app: `npm run build`
2. ✅ Deploy to Netlify
3. ✅ Test all routes work
4. ✅ Test purchase flow end-to-end

---

## 🐛 Troubleshooting

### "No documents available"
**Cause:** `plan_documents` table not populated
**Fix:** Run `supabase-storage-setup.sql`

### "Access denied" when downloading PDF
**Cause:** RLS policy not working or no purchase record
**Fix:**
1. Check user has `completed` purchase for `Base Layer`
2. Verify RLS policies exist on `storage.objects`
3. Check PDF file path matches exactly

### GCC table shows empty
**Cause:** Data not imported or RLS blocking
**Fix:**
1. Run: `SELECT COUNT(*) FROM gcc_companies;`
2. If 0, run import script
3. If >0, check user has Base Layer purchase

### "Failed to load PDF" or PDF.js worker error
**Cause:** PDF.js worker file not loading or version mismatch
**Fix:**
1. **Version mismatch error** (e.g., "API version 5.4.296 does not match Worker version 5.4.394"):
   - Copy worker from react-pdf's dependency: `cp node_modules/react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/`
   - Update SecurePDFViewer to use: `pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'`
2. **Worker not found error**:
   - Ensure `public/pdf.worker.min.mjs` exists
   - Verify file is accessible at `/pdf.worker.min.mjs` in browser
3. Rebuild the app: `npm run build`

**Important:** Always use the worker file from `react-pdf/node_modules/pdfjs-dist`, not the standalone `pdfjs-dist` package, to ensure version compatibility.

### "Error loading content"
**Cause:** Supabase connection issue or missing env variables
**Fix:**
1. Check `.env` has correct Supabase credentials
2. Verify Supabase project is running
3. Check browser console for specific error

---

## 📊 User Journey Example

1. **User visits** `/pricing`
2. **Clicks** "Get Started" on Base Layer ($1,299)
3. **Completes** Razorpay payment
4. **Redirected to** `/payment-success`
5. **Goes to** `/purchases`
6. **Sees** Base Layer purchase with 5 items
7. **Clicks** "Access Your Content"
8. **Lands on** `/my-content`
9. **Sees** 5 document cards:
   - 4 PDF documents (View/Download buttons)
   - 1 GCC database (View Database button)
10. **Downloads** PDFs
11. **Opens** GCC table
12. **Searches/Filters** companies
13. **Finds** relevant GCC companies

---

## 🎯 Next Steps (Future Enhancements)

### Short Term
- [ ] Add export to CSV functionality for GCC table
- [ ] Add company detail modal with full information
- [ ] Add favorites/bookmarking for companies
- [ ] Add email notifications when new reports are added

### Medium Term
- [ ] Add Custom Layer content (L2 list, prospects database)
- [ ] Add Consult Layer materials
- [ ] Add analytics dashboard (views, downloads)
- [ ] Add quarterly report auto-updates

### Long Term
- [ ] Add AI-powered company search
- [ ] Add comparison tool for multiple companies
- [ ] Add industry trend visualizations
- [ ] Add custom report builder

---

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Review the SQL setup files
3. Check browser console for errors
4. Verify Supabase dashboard shows data
5. Test with a fresh user account

---

## ✅ Success Criteria

Your Base Layer implementation is complete when:

- ✅ User can purchase Base Layer plan
- ✅ Purchase recorded in database
- ✅ User can access /my-content after purchase
- ✅ User can view/download all 4 PDFs
- ✅ User can view GCC table with 2,500+ companies
- ✅ Search and filters work on GCC table
- ✅ Access is blocked for users without purchase
- ✅ RLS policies prevent unauthorized access
- ✅ All components load without errors

**Congratulations! Your Base Layer pricing implementation is complete! 🎉**
