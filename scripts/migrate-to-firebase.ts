// Migration script to push all products and categories to Firebase
// Run with: npx tsx scripts/migrate-to-firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC-nb0andAX72CQdZumEWV8Fp2_8gyNodU",
    authDomain: "cspainting-483111.firebaseapp.com",
    projectId: "cspainting-483111",
    storageBucket: "cspainting-483111.firebasestorage.app",
    messagingSenderId: "790653190904",
    appId: "1:790653190904:web:101734d902d2dbb838310d",
    measurementId: "G-ZNQZ5L3KGH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// All categories and products data
const productCategories = [
    {
        id: "interior-paints",
        name: "Interior Wall Paints",
        icon: "Home",
        description: "Premium Montó wall paints for beautiful interiors",
        order: 1,
        products: [
            { name: "Premium Matt Paint", description: "High-quality matt finish for walls and ceilings with excellent coverage", sizes: ["4L", "12L", "20L"], brand: "Montó", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=400&fit=crop" },
            { name: "Standard Matt Paint", description: "Economical matt finish paint for general interior use", sizes: ["4L", "12L", "20L"], brand: "Montó", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop" },
            { name: "Satin Finish Paint", description: "Elegant satin sheen for living rooms and bedrooms", sizes: ["4L", "12L"], brand: "Montó", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
            { name: "Stain-Resistant Paint", description: "Washable, stain-resistant paint ideal for kitchens and kids rooms", sizes: ["4L", "12L"], brand: "Montó", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=400&fit=crop" },
            { name: "Monto Professional Ibresat", description: "Professional-grade interior paint with superior durability", sizes: ["4L", "12L", "20L"], brand: "Montó", image: "https://images.unsplash.com/photo-1572297794908-f2ee5a2930d6?w=400&h=400&fit=crop" },
            { name: "Montonature Eco Paint", description: "Environmentally friendly paint with low VOC emissions", sizes: ["4L", "12L"], brand: "Montó", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop" }
        ]
    },
    {
        id: "exterior-paints",
        name: "Exterior & Façade",
        icon: "Building2",
        description: "Weather-resistant coatings for building exteriors",
        order: 2,
        products: [
            { name: "Montokril Fachadas", description: "Premium 100% acrylic façade coating for lasting protection", sizes: ["4L", "12L", "20L"], brand: "Montó", image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=400&h=400&fit=crop" },
            { name: "Siloxane Façade Coating", description: "Breathable siloxane finish that repels water while allowing vapor escape", sizes: ["12L", "20L"], brand: "Montó", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop" },
            { name: "Textured Façade Coating", description: "Rugged textured finish for durable exterior protection", sizes: ["20L", "25kg"], brand: "Montó", image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?w=400&h=400&fit=crop" },
            { name: "Smooth Façade Paint", description: "Smooth acrylic finish for modern building exteriors", sizes: ["4L", "12L", "20L"], brand: "Montó", image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=400&fit=crop" }
        ]
    },
    {
        id: "waterproofing",
        name: "Waterproofing",
        icon: "Droplets",
        description: "Koraza waterproofing systems for roofs, terraces, and walls",
        order: 3,
        products: [
            { name: "Koraza Membrane", description: "High-performance waterproof membrane coating for complete protection", sizes: ["5L", "10L", "20L"], brand: "Montó Koraza", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop" },
            { name: "Primer Koraza", description: "Adhesion bridge primer for waterproofing systems", sizes: ["4L", "10L"], brand: "Montó Koraza", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop" },
            { name: "Vertical Waterproofing", description: "Specialized coating for vertical wall waterproofing", sizes: ["10L", "20L"], brand: "Montó Koraza", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
            { name: "Rising Damp Solution", description: "Treatment for walls affected by rising damp and moisture", sizes: ["5L", "10L"], brand: "Montó", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop" },
            { name: "Water Repellent Coating", description: "Invisible water repellent for masonry and concrete surfaces", sizes: ["5L", "10L"], brand: "Montó", image: "https://images.unsplash.com/photo-1563166423-482a8d92f230?w=400&h=400&fit=crop" }
        ]
    },
    {
        id: "fillers-prep",
        name: "Fillers & Primers",
        icon: "Wrench",
        description: "Professional-grade fillers and primers for perfect surfaces",
        order: 4,
        products: [
            { name: "Montó Mastic", description: "Heavy-duty wall filler for cracks and surface repairs", sizes: ["1kg", "5kg", "20kg"], brand: "Montó", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop" },
            { name: "Wall Primer", description: "Universal primer for walls and ceilings before painting", sizes: ["4L", "12L"], brand: "Montó", image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=400&fit=crop" },
            { name: "Metal Primer", description: "Anti-rust primer for metal surfaces", sizes: ["750ml", "4L"], brand: "Montó", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=400&fit=crop" },
            { name: "Floor Primer", description: "Specialized primer for concrete and floor surfaces", sizes: ["4L", "12L"], brand: "Montó", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
            { name: "Wood Filler", description: "Sandable wood filler for repairs and preparation", sizes: ["500g", "1kg"], brand: "Montó", image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=400&h=400&fit=crop" }
        ]
    },
    {
        id: "enamels",
        name: "Enamels",
        icon: "Sparkles",
        description: "Durable enamels for metal, wood, and multiple surfaces",
        order: 5,
        products: [
            { name: "Polyurethane Enamel", description: "High-gloss polyurethane enamel for superior durability", sizes: ["750ml", "4L"], brand: "Montó", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=400&fit=crop" },
            { name: "Anti-Rust Enamel", description: "Direct-to-metal anti-rust enamel paint", sizes: ["750ml", "4L"], brand: "Montó", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=400&fit=crop" },
            { name: "Water-Based Enamel", description: "Low-odor water-based enamel for indoor use", sizes: ["750ml", "4L"], brand: "Montó", image: "https://images.unsplash.com/photo-1572297794908-f2ee5a2930d6?w=400&h=400&fit=crop" },
            { name: "Acrylic Multi-Surface Enamel", description: "Versatile acrylic enamel for wood, metal, and plastic", sizes: ["750ml", "4L"], brand: "Montó", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop" }
        ]
    },
    {
        id: "wood-products",
        name: "Wood Finishes",
        icon: "TreeDeciduous",
        description: "Varnishes, lacquers, and wood treatments",
        order: 6,
        products: [
            { name: "Synthetic Varnish", description: "Clear synthetic varnish for interior wood surfaces", sizes: ["750ml", "4L"], brand: "Montó", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
            { name: "Polyurethane Lacquer", description: "Professional furniture lacquer with excellent hardness", sizes: ["750ml", "4L"], brand: "Montó", image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=400&h=400&fit=crop" },
            { name: "Wood Treatment", description: "Anti-woodworm and fungal protection treatment", sizes: ["1L", "5L"], brand: "Montó", image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=400&h=400&fit=crop" },
            { name: "Wood Stain", description: "Decorative wood stain in various natural tones", sizes: ["750ml", "4L"], brand: "Montó", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=400&fit=crop" }
        ]
    },
    {
        id: "floor-coatings",
        name: "Floor Coatings",
        icon: "Factory",
        description: "Durable coatings for floors, garages, and industrial spaces",
        order: 7,
        products: [
            { name: "Floor Varnish", description: "Hard-wearing varnish for wooden floors", sizes: ["4L", "12L"], brand: "Montó", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
            { name: "Industrial Floor Paint", description: "Heavy-duty floor paint for warehouses and parking", sizes: ["4L", "12L", "20L"], brand: "Montó", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop" },
            { name: "Garage Floor Coating", description: "Oil-resistant coating for garage floors", sizes: ["4L", "12L"], brand: "Montó", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
            { name: "Road Marking Paint", description: "High-visibility road and parking lot marking paint", sizes: ["4L", "20L"], brand: "Montó", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop" }
        ]
    },
    {
        id: "decorative",
        name: "Decorative Finishes",
        icon: "Palette",
        description: "Special effect paints and decorative finishes",
        order: 8,
        products: [
            { name: "Metallic Finish Paint", description: "Luxurious metallic effect for feature walls", sizes: ["1L", "4L"], brand: "Montó", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
            { name: "Iridescent Metallic", description: "Color-shifting iridescent finish for dramatic effects", sizes: ["1L"], brand: "Montó", image: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=400&fit=crop" },
            { name: "Textured Effect Paint", description: "Create unique textured patterns on walls", sizes: ["4L", "12L"], brand: "Montó", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
            { name: "Velature Glaze", description: "Translucent glaze for decorative aging effects", sizes: ["1L", "4L"], brand: "Montó", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=400&fit=crop" },
            { name: "Microcement System", description: "Complete microcement system for seamless surfaces", sizes: ["Kit"], brand: "Montó", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" }
        ]
    },
    {
        id: "graco-equipment",
        name: "Graco Equipment",
        icon: "Cog",
        description: "Authorized Graco distributor - professional painting equipment",
        order: 9,
        products: [
            { name: "Graco GX21 Airless Sprayer", description: "Professional airless sprayer for residential and commercial jobs", sizes: ["Unit"], brand: "Graco", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop" },
            { name: "Graco TexSpray RTX 5500PX", description: "Heavy-duty texture sprayer for drywall and stucco", sizes: ["Unit"], brand: "Graco", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop" },
            { name: "Spray Tips & Guards", description: "Replacement tips and guards for Graco sprayers", sizes: ["Various"], brand: "Graco", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=400&fit=crop" },
            { name: "Spray Hoses", description: "High-pressure hoses for airless sprayers", sizes: ["25ft", "50ft", "100ft"], brand: "Graco", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop" },
            { name: "Filters & Strainers", description: "Paint filters and strainers for clean spray finish", sizes: ["Pack"], brand: "Graco", image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop" },
            { name: "Gun Repair Kit", description: "Trigger, seals, and parts for spray gun maintenance", sizes: ["Kit"], brand: "Graco", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=400&fit=crop" }
        ]
    },
    {
        id: "home-decor",
        name: "Home Décor",
        icon: "Sofa",
        description: "Wall cladding, mouldings, and decorative panels",
        order: 10,
        products: [
            { name: "Interior Cladding Panels", description: "Decorative interior wall cladding in various styles", sizes: ["Per sqm"], brand: "CS Painting", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
            { name: "Exterior Cladding Panels", description: "Weather-resistant exterior cladding solutions", sizes: ["Per sqm"], brand: "CS Painting", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop" },
            { name: "Wall Moulding Trims", description: "Elegant decorative wall mouldings and trims", sizes: ["Per meter"], brand: "CS Painting", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=400&fit=crop" },
            { name: "3D Wall Panels", description: "Modern 3D textured wall panels for feature walls", sizes: ["Per sqm"], brand: "CS Painting", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop" },
            { name: "Decorative Profiles", description: "Architectural profiles for ceiling and wall details", sizes: ["Per meter"], brand: "CS Painting", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=400&fit=crop" }
        ]
    }
];

async function migrate() {
    console.log("🚀 Starting migration to Firebase...\n");

    // 1. Set default admin credentials
    console.log("📝 Setting up admin credentials...");
    await setDoc(doc(db, "settings", "admin"), {
        username: "admin",
        password: "admin"
    });
    console.log("✅ Admin credentials set (admin/admin)\n");

    // 2. Add categories and products
    let totalProducts = 0;
    for (const category of productCategories) {
        console.log(`📁 Creating category: ${category.name}`);

        // Add category with specific ID
        await setDoc(doc(db, "categories", category.id), {
            name: category.name,
            icon: category.icon,
            description: category.description,
            order: category.order
        });

        // Add products for this category
        for (const product of category.products) {
            await addDoc(collection(db, "products"), {
                name: product.name,
                description: product.description,
                sizes: product.sizes,
                brand: product.brand,
                image: product.image,
                categoryId: category.id
            });
            totalProducts++;
        }
        console.log(`   ✅ Added ${category.products.length} products`);
    }

    console.log("\n🎉 Migration complete!");
    console.log(`   Categories: ${productCategories.length}`);
    console.log(`   Products: ${totalProducts}`);
    console.log(`   Admin: admin/admin`);
}

migrate().catch(console.error);
