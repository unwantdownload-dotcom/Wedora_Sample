# WEDORA – Chocolate Design Catalogue & Admin Website

A responsive, chocolate product catalogue and administrative management website built for **Wedora Chocolatier**.

Designed specifically for wedding souvenirs, birthdays, graduations, corporate events, and bespoke customized gift bars.

---

## 🌟 Features Included

### 1. Customer Website
- **Luxury Brand Aesthetic**: Warm chocolate palette (deep dark chocolate `#1c100b`, rich cocoa `#2d1810`, ivory cream `#fdfaf5`, soft gold accents `#c59b27`).
- **Hero & Storytelling Showcase**: Highlighted offers, value propositions, and direct links to the official Wedora size and price guide flyer.
- **Product Categories System**: Filter chocolate designs by theme (*Wedding Chocolates*, *Birthday Favors*, *Graduation Specials*, *Corporate Gifts*, *Custom Designs*).
- **Flyer-Synchronized Product Details**:
  - **Order Code A**: 12.5 cm × 5.5 cm | 12g | Rs. 85 (MOQ: 50)
  - **Order Code A1**: 13.5 cm × 6 cm | 25g | Rs. 125 (MOQ: 50)
  - **Order Code C1**: 17 cm × 6.5 cm | 38g | Rs. 165 (MOQ: 20)
  - **Order Code D1**: 20.5 cm × 9 cm | 85g | Rs. 700 (MOQ: 1)
- **High-Resolution Photo Gallery**: Image zoom on click, multi-photo thumbnail selector.
- **Direct WhatsApp Order Generator**: Formats inquiry messages with selected chocolate code, size variant, unit price, and event specifications.
- **Direct Contact Links**: WhatsApp (+94 78 359 0222), Facebook, TikTok, Voice Call.

### 2. Admin Portal & Dashboard (`/admin/login` & `/admin/dashboard`)
- **Authentication**: Powered by Supabase Authentication (or automatic sandboxed demo fallback for immediate local testing).
- **Product Management**:
  - Add new products and chocolate models.
  - Upload multiple product photographs (JPG, PNG, WebP) directly to Supabase Storage.
  - Set primary thumbnail photo.
  - Add / edit multi-tier sizes, weights, and price combinations (Rs.).
  - Set Minimum Order Quantities (MOQ).
  - Toggle visibility status (`Active` / `Draft`).
  - Delete unwanted products with confirmation.
- **Category Management**:
  - Create custom categories and order of appearance.
- **Protected Routes & Security**:
  - Row Level Security (RLS) ensures public users can only read active products and prices, while only authenticated admins can write/delete.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, Custom typography (`Playfair Display`, `Plus Jakarta Sans`)
- **Icons**: Lucide React
- **Backend / Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage bucket (`product-images`)
- **Authentication**: Supabase Auth

---

## 🚀 Step-by-Step Setup Guide

### 1. Run the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

Open your browser at `http://localhost:5173`.

---

### 2. Configure Supabase

1. Go to [supabase.com](https://supabase.com) and create a free project named **Wedora Chocolates**.
2. Go to **SQL Editor** in your Supabase dashboard.
3. Open the file `supabase-schema.sql` located in this project.
4. Copy the entire contents and paste it into the Supabase SQL Editor, then click **Run**.
   - This creates all 5 tables (`categories`, `products`, `product_images`, `product_variants`, `admin_users`),
   - Enables Row Level Security (RLS) policies,
   - Creates the public `product-images` storage bucket with upload policies,
   - Seeds the initial Wedora chocolate catalogue extracted from your flyer!

5. In Supabase, go to **Project Settings** > **API**.
6. Copy your **Project URL** and **anon public key**.
7. Create a `.env` file in the root of your project:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

Restart the dev server (`npm run dev`). The website will now pull and push all data directly from your Supabase PostgreSQL database!

If the schema was already installed before photo view tags were added, run this migration in the Supabase SQL Editor:

```sql
ALTER TABLE product_images
ADD COLUMN IF NOT EXISTS view_tag VARCHAR(10) CHECK (view_tag IN ('Front', 'Back'));
NOTIFY pgrst, 'reload schema';
```

---

### 3. Create Your First Admin User

1. In Supabase Dashboard, go to **Authentication** > **Users**.
2. Click **Add user** > **Create user**.
3. Enter your email (e.g. `admin@wedora.com`) and choose a strong password.
4. Check **Auto Confirm User?** so you can log in immediately.
5. In your Wedora site, click the lock icon or visit `/admin/login`, and log in with your email and password!

*(Note: In sandbox mode without Supabase connected, you can test the admin dashboard immediately with `admin@wedora.com` / `wedora123`)*.

---

### 4. How to Upload Photographs & Edit Prices

1. Log in to the Admin Dashboard at `/admin/dashboard`.
2. To edit an existing chocolate (e.g. Model A1 or D1), click the **Edit (pencil)** icon.
3. Under **Sizes, Weights & Prices (Rs.)**, change any price or add a new size variation.
4. Under **Product Photographs**, click **Upload Photos** to pick pictures from your computer. Click **Make Primary** to set the default thumbnail.
5. Click **Save Product Design**. The changes immediately reflect on the live customer website!

---

## 🌐 Deployment Instructions

### Deploy to Vercel (Recommended)

1. Push your project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial Wedora Chocolate Catalogue"
   git branch -M main
   git remote add origin https://github.com/<your-username>/wedora-catalogue.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import your `wedora-catalogue` GitHub repository.
4. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL` = your Supabase URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click **Deploy**. Vercel will build and assign you a free production domain with HTTPS!

*(A `vercel.json` file is already included to ensure SPA client-side routing works smoothly without 404 errors)*.

---

## 📞 Support & Contacts
- **Brand**: WEDORA Chocolates
- **WhatsApp**: +94 78 359 0222
"# Wedora_Sample" 
