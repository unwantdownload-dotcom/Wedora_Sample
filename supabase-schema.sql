-- ==============================================================
-- WEDORA CHOCOLATE CATALOGUE - SUPABASE DATABASE SCHEMA
-- ==============================================================

-- 1. Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    product_code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    minimum_order INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create product_images table
CREATE TABLE IF NOT EXISTS product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    view_tag VARCHAR(10) CHECK (view_tag IN ('Front', 'Back')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE product_images
ADD COLUMN IF NOT EXISTS view_tag VARCHAR(10) CHECK (view_tag IN ('Front', 'Back'));
NOTIFY pgrst, 'reload schema';

-- 4. Create product_variants table (Size, Weight, Dimensions, Price)
CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    size VARCHAR(100) NOT NULL, -- e.g. "12.5 cm x 5.5 cm" or "Small"
    weight VARCHAR(50),         -- e.g. "12 g", "25 g"
    price NUMERIC(10, 2) NOT NULL, -- in LKR (Rs.)
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create admin_users table for verified administrators
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to auto-update 'updated_at' on products
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_products_updated_at ON products;
CREATE TRIGGER set_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Helper check function for admin authentication:
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.role() = 'authenticated');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- CATEGORIES RLS
-- Anyone (public) can view categories
DROP POLICY IF EXISTS "Public can view categories" ON categories;
CREATE POLICY "Public can view categories" ON categories
    FOR SELECT USING (true);

-- Only authenticated admins can insert/update/delete categories
DROP POLICY IF EXISTS "Admins can insert categories" ON categories;
CREATE POLICY "Admins can insert categories" ON categories
    FOR INSERT WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can update categories" ON categories;
CREATE POLICY "Admins can update categories" ON categories
    FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins can delete categories" ON categories;
CREATE POLICY "Admins can delete categories" ON categories
    FOR DELETE USING (is_admin());

-- PRODUCTS RLS
-- Public can view active products (or admins can view all)
DROP POLICY IF EXISTS "Public can view active products" ON products;
CREATE POLICY "Public can view active products" ON products
    FOR SELECT USING (is_active = true OR is_admin());

DROP POLICY IF EXISTS "Admins can insert products" ON products;
CREATE POLICY "Admins can insert products" ON products
    FOR INSERT WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can update products" ON products;
CREATE POLICY "Admins can update products" ON products
    FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins can delete products" ON products;
CREATE POLICY "Admins can delete products" ON products
    FOR DELETE USING (is_admin());

-- PRODUCT_IMAGES RLS
DROP POLICY IF EXISTS "Public can view product images" ON product_images;
CREATE POLICY "Public can view product images" ON product_images
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage product images" ON product_images;
CREATE POLICY "Admins can manage product images" ON product_images
    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- PRODUCT_VARIANTS RLS
DROP POLICY IF EXISTS "Public can view product variants" ON product_variants;
CREATE POLICY "Public can view product variants" ON product_variants
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage product variants" ON product_variants;
CREATE POLICY "Admins can manage product variants" ON product_variants
    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ADMIN_USERS RLS
DROP POLICY IF EXISTS "Admins can view admin_users" ON admin_users;
CREATE POLICY "Admins can view admin_users" ON admin_users
    FOR SELECT USING (is_admin());

-- ==============================================================
-- 7. SUPABASE STORAGE BUCKET FOR PRODUCT PHOTOGRAPHS
-- ==============================================================
-- Insert the public bucket if not already existing
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies: Public can read, authenticated admin can upload/delete
DROP POLICY IF EXISTS "Public Access to Product Images" ON storage.objects;
CREATE POLICY "Public Access to Product Images" ON storage.objects
    FOR SELECT USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
CREATE POLICY "Admins can upload product images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
CREATE POLICY "Admins can update product images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;
CREATE POLICY "Admins can delete product images" ON storage.objects
    FOR DELETE USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- ==============================================================
-- 8. SEED DATA - REAL WEDORA CATALOGUE (FROM WEDORA FLYER)
-- ==============================================================
DO $$
DECLARE
    cat_wedding UUID;
    cat_birthday UUID;
    cat_graduation UUID;
    cat_corporate UUID;
    cat_custom UUID;
    
    prod_a UUID;
    prod_a1 UUID;
    prod_c1 UUID;
    prod_d1 UUID;
BEGIN
    -- Insert Categories based on Wedora themes
    INSERT INTO categories (name, description, display_order)
    VALUES ('Wedding Chocolates', 'Exquisite personalized chocolate bars for weddings and anniversary favors.', 1)
    RETURNING id INTO cat_wedding;

    INSERT INTO categories (name, description, display_order)
    VALUES ('Birthday Favors', 'Vibrant, customized chocolate bars to celebrate memorable birthdays.', 2)
    RETURNING id INTO cat_birthday;

    INSERT INTO categories (name, description, display_order)
    VALUES ('Graduation Specials', 'Celebrate academic milestones and convocations with sweet elegance.', 3)
    RETURNING id INTO cat_graduation;

    INSERT INTO categories (name, description, display_order)
    VALUES ('Corporate Gifts', 'Branded bespoke chocolates for corporate events, clients, and team appreciation.', 4)
    RETURNING id INTO cat_corporate;

    INSERT INTO categories (name, description, display_order)
    VALUES ('Custom Designs', 'Tailor-made customized wrapper artworks and dimensions for any celebration.', 5)
    RETURNING id INTO cat_custom;

    -- Insert Product A (From Wedora Flyer)
    -- Order Code: A | Size: 12.5 cm x 5.5 cm | Weight: 12g | Price: Rs. 85 | MOQ: 50
    INSERT INTO products (category_id, product_code, name, description, minimum_order, is_active)
    VALUES (
        cat_wedding,
        'A',
        'Wedora Classic Petite Bar - Design A',
        'Elegant personalized mini chocolate bar with bespoke "Thank You" couple floral illustration wrapper. Perfect as wedding and event guest favors.',
        50,
        true
    ) RETURNING id INTO prod_a;

    INSERT INTO product_variants (product_id, size, weight, price)
    VALUES (prod_a, '12.5 cm × 5.5 cm', '12 g', 85.00);

    INSERT INTO product_images (product_id, image_url, is_primary, display_order)
    VALUES (prod_a, 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=80', true, 1);

    -- Insert Product A1 (From Wedora Flyer)
    -- Order Code: A1 | Size: 13.5 cm x 6 cm | Weight: 25g | Price: Rs. 125 | MOQ: 50
    INSERT INTO products (category_id, product_code, name, description, minimum_order, is_active)
    VALUES (
        cat_wedding,
        'A1',
        'Wedora Sweet Harmony Bar - Design A1',
        'Generous single-serve chocolate bar featuring customized couple naming, date, and delicate border graphics.',
        50,
        true
    ) RETURNING id INTO prod_a1;

    INSERT INTO product_variants (product_id, size, weight, price)
    VALUES (prod_a1, '13.5 cm × 6 cm', '25 g', 125.00);

    INSERT INTO product_images (product_id, image_url, is_primary, display_order)
    VALUES (prod_a1, 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80', true, 1);

    -- Insert Product C1 (From Wedora Flyer)
    -- Order Code: C1 | Size: 17 cm x 6.5 cm | Weight: 38g | Price: Rs. 165 | MOQ: 20
    INSERT INTO products (category_id, product_code, name, description, minimum_order, is_active)
    VALUES (
        cat_wedding,
        'C1',
        'Wedora Signature Elegance Bar - Design C1',
        'Luxury medium chocolate bar crafted for premium wedding favors and banquet table arrangements.',
        20,
        true
    ) RETURNING id INTO prod_c1;

    INSERT INTO product_variants (product_id, size, weight, price)
    VALUES (prod_c1, '17 cm × 6.5 cm', '38 g', 165.00);

    INSERT INTO product_images (product_id, image_url, is_primary, display_order)
    VALUES (prod_c1, 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80', true, 1);

    -- Insert Product D1 (From Wedora Flyer)
    -- Order Code: D1 | Size: 20.5 cm x 9 cm | Weight: 85g | Price: Rs. 700 | MOQ: 1
    INSERT INTO products (category_id, product_code, name, description, minimum_order, is_active)
    VALUES (
        cat_wedding,
        'D1',
        'Wedora Grand Luxury Slab - Design D1',
        'Showstopper centerpiece chocolate slab. High-end souvenir or personal gift with full custom wedding or corporate artwork.',
        1,
        true
    ) RETURNING id INTO prod_d1;

    INSERT INTO product_variants (product_id, size, weight, price)
    VALUES (prod_d1, '20.5 cm × 9 cm', '85 g', 700.00);

    INSERT INTO product_images (product_id, image_url, is_primary, display_order)
    VALUES (prod_d1, 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?auto=format&fit=crop&w=800&q=80', true, 1);

END $$;
