/**
 * Localization (i18n) Engine
 * Rahul Mobile Services Lawan
 * 
 * Default: English (Clean, corporate, professional)
 * Hindi toggle translates all user-facing content smoothly.
 */

const translations = {
  en: {
    // Top Bar
    "top.welcome_en": "Welcome to Rahul Mobile Services Lawan",
    "top.welcome_hi": "राहुल मोबाइल सर्विसेज लवन में आपका स्वागत है",
    "top.hours": "Mon - Sun: 9:30 AM - 8:30 PM",
    
    // Header & Navigation
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.customers": "Happy Customers",
    "nav.why_us": "Why Choose Us",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.get_started": "Book Repair",
    "nav.admin_login": "Admin Login",
    "brand.sub": "Sales • Precision Repair • After-Sales | Lawan, CG",

    // Hero Section
    "hero.badge": "Official Store & Precision Repair Centre in Lawan",
    "hero.headline": "Reliable Mobile Solutions",
    "hero.subheadline": "Rahul Mobile Services Lawan",
    "hero.description": "Professional smartphone repair, genuine accessories, mobile sales, and dependable after-sales assistance — delivered all under one roof with transparent pricing.",
    "hero.btn_services": "Explore Services",
    "hero.btn_contact": "Contact Us",
    "hero.metric_1": "100% Genuine Tested Parts",
    "hero.metric_2": "Quick Turnaround Time",
    "hero.metric_3": "Located in Lawan, Chhattisgarh",
    "hero.card_title": "Store & Diagnostic Counter",
    "hero.status_open": "Counter Open Today until 8:30 PM",
    "hero.diag_1_title": "Screen & Display Replacement",
    "hero.diag_1_sub": "Express 45-Min Fix • OEM Grade Displays",
    "hero.diag_1_badge": "Express Service",
    "hero.diag_2_title": "Battery & Charging Ports",
    "hero.diag_2_sub": "Tested Cells • Safe High-Amp Pin Repairs",
    "hero.diag_2_badge": "Genuine Parts",
    "hero.diag_3_title": "Water Damage Recovery",
    "hero.diag_3_sub": "Ultrasonic Board Clean & Chip Soldering",
    "hero.diag_3_badge": "Deep Diagnostics",
    "hero.diag_4_title": "Smartphone & Keypad Sales",
    "hero.diag_4_sub": "Latest 5G Models • Budget Keypad Phones",
    "hero.diag_4_badge": "Warranty Backed",
    "hero.card_footer_loc": "Main Road Market, Lawan",

    // Services Section
    "services.badge": "Our Core Capabilities",
    "services.title": "Services by Rahul Mobile Services Lawan",
    "services.desc": "Precision engineering, genuine mobile technology, and lifelong customer commitment for the residents of Lawan and Baloda Bazar district.",
    
    // Service Card 1
    "services.c1_title": "Top Quality Repairing Services",
    "services.c1_desc": "Hardware-level precision repairs with advanced diagnostics and tested replacement components.",
    "services.c1_f1": "Express screen & display fixes (AMOLED, OLED, LCD)",
    "services.c1_f2": "Battery & charging jack replacements (Type-C, Micro-USB)",
    "services.c1_f3": "Mic, speaker, camera module, and motherboard diagnostics",
    "services.c1_f4": "Water damage recovery and micro-soldering solutions",
    "services.c1_f5": "Zero hidden charges with upfront diagnostic quotes",
    "services.c1_btn": "Request Repair Estimate",

    // Service Card 2
    "services.c2_title": "Mobile Sales Services",
    "services.c2_desc": "Carefully curated smartphones, keypad phones, and genuine brand accessories at competitive local prices.",
    "services.c2_f1": "Quality-verified new smartphone models and keypad devices",
    "services.c2_f2": "Expert device selection guidance tailored to customer budget",
    "services.c2_f3": "Original fast adapters, cables, tempered glass & cases",
    "services.c2_f4": "Easy initial device setup, unboxing, and SIM provisioning",
    "services.c2_f5": "Official brand warranty and verified purchase billing",
    "services.c2_btn": "Inquire About Models",

    // Service Card 3
    "services.c3_title": "After-Sales Services",
    "services.c3_desc": "End-to-end continuous support to keep your smartphones running smoothly throughout their lifecycle.",
    "services.c3_f1": "Dedicated post-purchase customer support & troubleshooting",
    "services.c3_f2": "Software updates, OS optimization, and cache clearance",
    "services.c3_f3": "Secure data backup, WhatsApp chat migration & contact sync",
    "services.c3_f4": "Long-term customer service guarantee and satisfaction checks",
    "services.c3_f5": "Priority follow-up counter assistance for repeat customers",
    "services.c3_btn": "Learn About Support",

    // Testimonials Section & Customer Photo Gallery
    "test.badge": "Verified Community Trust",
    "test.title": "Happy Customers & Delivery Gallery",
    "test.desc": "Real feedback and smiling customer delivery moments from residents who trust Rahul Mobile Services Lawan.",
    "test.gallery_title": "Full-Size Customer Delivery Photo Gallery",
    "test.gallery_desc": "Real customers proudly holding their newly purchased smartphones and precision-repaired devices at our Lawan counter.",
    "test.filter_all": "All Handover Moments",
    "test.filter_sales": "New Smartphone Sales",
    "test.filter_repair": "Precision Repairs",
    "test.reviews_tab": "Customer Reviews & Ratings",
    "test.gallery_tab": "Customer Photo Gallery",
    "test.rating_text": "Overall Rating from Lawan Customers",
    "test.verified_badge": "Verified Customer",
    "test.device_label": "Device Handover",

    // Why Choose Us
    "why.badge": "Trust & Reliability",
    "why.title": "Why Choose Rahul Mobile Services Lawan",
    "why.desc": "Built on corporate standards of engineering precision, transparency, and deep community goodwill in Lawan.",
    "why.p1_title": "Quality-Focused",
    "why.p1_desc": "Every spare component undergoes pre-installation voltage, touch response, and color calibration testing.",
    "why.p2_title": "Fast Turnaround",
    "why.p2_desc": "Express repairs for displays, batteries, and charging ports completed typically within 30 to 60 minutes.",
    "why.p3_title": "Honest Pricing",
    "why.p3_desc": "Upfront, transparent diagnostic estimates with zero hidden fees. You approve the cost before any work begins.",
    "why.p4_title": "Customer Care",
    "why.p4_desc": "Dedicated community support in Lawan with friendly guidance, patient problem solving, and dependable after-sales care.",

    // About Us
    "about.badge": "About Our Enterprise",
    "about.title": "Serving Lawan with Integrity & Precision",
    "about.p1": "Rahul Mobile Services Lawan is the premier mobile technology, precision hardware repair, and retail sales centre located in the heart of Lawan, Chhattisgarh. Founded with the mission to bring corporate-grade repair standards and genuine mobile electronics to our local community, we pride ourselves on honesty, speed, and technical excellence.",
    "about.p2": "Whether you require an emergency screen replacement, are purchasing your family's next smartphone, or need dependable after-sales data migration, our dedicated technicians treat every device with the utmost care and respect.",
    "about.v1": "Hardware Repair Integrity",
    "about.v2": "Genuine Mobile Sales",
    "about.v3": "Lifelong After-Sales Follow-Up",
    "about.v4": "Community Customer Trust",
    "about.stat1_num": "5,000+",
    "about.stat1_lbl": "Devices Repaired",
    "about.stat2_num": "100%",
    "about.stat2_lbl": "Tested Spares",
    "about.stat3_num": "8+ Yrs",
    "about.stat3_lbl": "Lawan Experience",
    "about.stat4_num": "99.4%",
    "about.stat4_lbl": "Satisfaction Rate",

    // Contact Section
    "contact.badge": "Visit Or Reach Us",
    "contact.title": "Contact Rahul Mobile Services Lawan",
    "contact.desc": "We are conveniently located in the Main Road Market in Lawan. Call us, chat on WhatsApp, or stop by our store counter today.",
    "contact.touch_title": "Direct Contact Actions",
    "contact.touch_subtitle": "Tap below for instant connection with our counter in Lawan:",
    "contact.btn_call": "Call Now",
    "contact.btn_whatsapp": "Chat on WhatsApp",
    "contact.btn_directions": "Get Directions (Google Maps)",
    "contact.address_label": "Store Location",
    "contact.address_val": "Main Road Market, Lawan, Baloda Bazar District, Chhattisgarh - 493526",
    "contact.phone_label": "Phone Number",
    "contact.phone_val": "+91 98765 43210",
    "contact.hours_label": "Business Working Hours",
    "contact.hours_val": "Monday – Sunday: 9:30 AM to 8:30 PM",
    
    // Inquiry Form
    "contact.form_title": "Send a Quick Service Inquiry",
    "contact.form_subtitle": "Leave your details and our team will prepare a quick estimate for your device.",
    "contact.f_name": "Full Name",
    "contact.f_name_ph": "e.g., Ramesh Verma",
    "contact.f_phone": "Mobile Number",
    "contact.f_phone_ph": "e.g., 9876543210",
    "contact.f_service": "Service Required",
    "contact.f_service_opt1": "Hardware Repair (Screen, Battery, Port)",
    "contact.f_service_opt2": "New Mobile Phone Sales",
    "contact.f_service_opt3": "Accessories & Screen Protection",
    "contact.f_service_opt4": "After-Sales & Software / Data Support",
    "contact.f_model": "Device Model & Issue Description",
    "contact.f_model_ph": "e.g., Vivo Y20 display touch not responding after fall...",
    "contact.btn_submit": "Submit Service Inquiry",
    "contact.success_msg": "Thank you! Your inquiry has been submitted to Rahul Mobile Services Lawan. We will call you shortly.",

    // Footer
    "footer.brand_desc": "Retail Smartphone Sales, Precision Hardware Mobile Repairs, and Customer-Centric After-Sales Services located in Lawan, Chhattisgarh.",
    "footer.col_services": "Core Services",
    "footer.col_quick": "Quick Links",
    "footer.col_visit": "Visit Store",
    "footer.copy": "© 2026 Rahul Mobile Services Lawan. All rights reserved. Precision Mobile Technology & Services.",
    "footer.admin_portal": "Store Admin Portal"
  },
  
  hi: {
    // Top Bar
    "top.welcome_en": "Welcome to Rahul Mobile Services Lawan",
    "top.welcome_hi": "राहुल मोबाइल सर्विसेज लवन में आपका स्वागत है",
    "top.hours": "सोमवार - रविवार: सुबह 9:30 से रात 8:30 तक",

    // Header & Navigation
    "nav.home": "होम",
    "nav.services": "सेवाएं",
    "nav.customers": "संतुष्ट ग्राहक",
    "nav.why_us": "हमें क्यों चुनें",
    "nav.about": "हमारे बारे में",
    "nav.contact": "संपर्क करें",
    "nav.get_started": "रिपेयर बुक करें",
    "nav.admin_login": "एडमिन लॉगिन",
    "brand.sub": "बिक्री • सटीक रिपेयर • आफ्टर-सेल्स | लवन, छत्तीसगढ़",

    // Hero Section
    "hero.badge": "लवन में अधिकृत मोबाइल स्टोर एवं सटीक रिपेयरिंग सेंटर",
    "hero.headline": "विश्वसनीय मोबाइल समाधान",
    "hero.subheadline": "Rahul Mobile Services Lawan",
    "hero.description": "प्रोफेशनल स्मार्टफोन रिपेयर, ओरिजिनल एक्सेसरीज, नए मोबाइल की बिक्री और भरोसेमंद आफ्टर-सेल्स सेवा — एक ही छत के नीचे पारदर्शी दरों पर उपलब्ध।",
    "hero.btn_services": "सेवाएं देखें",
    "hero.btn_contact": "संपर्क करें",
    "hero.metric_1": "100% ओरिजिनल एवं जांची गई स्पेयर पार्ट्स",
    "hero.metric_2": "त्वरित रिपेयरिंग समय",
    "hero.metric_3": "लवन, छत्तीसगढ़ में स्थित",
    "hero.card_title": "लाइव स्टोर एवं डायग्नोस्टिक काउंटर",
    "hero.status_open": "काउंटर आज रात 8:30 बजे तक खुला है",
    "hero.diag_1_title": "स्क्रीन व डिस्प्ले रिप्लेसमेंट",
    "hero.diag_1_sub": "45-मिनट में त्वरित कार्य • OEM ग्रेड डिस्प्ले",
    "hero.diag_1_badge": "त्वरित सेवा",
    "hero.diag_2_title": "बैटरी एवं चार्जिंग सॉकेट",
    "hero.diag_2_sub": "परीक्षित बैटरी सेल्स • सुरक्षित हाई-एम्पियर पिन रिपेयर",
    "hero.diag_2_badge": "ओरिजिनल पार्ट्स",
    "hero.diag_3_title": "पानी से खराब फोन की रिकवरी",
    "hero.diag_3_sub": "अल्ट्रासोनिक मदरबोर्ड क्लीनिंग एवं माइक्रो-सोल्डरिंग",
    "hero.diag_3_badge": "गहन डायग्नोस्टिक्स",
    "hero.diag_4_title": "स्मार्टफोन एवं कीपैड मोबाइल बिक्री",
    "hero.diag_4_sub": "लेटेस्ट 5G स्मार्टफोन्स • बजट कीपैड मोबाइल्स",
    "hero.diag_4_badge": "वारंटी सहित",
    "hero.card_footer_loc": "मेन रोड मार्केट, लवन",

    // Services Section
    "services.badge": "हमारी प्रमुख सेवाएं",
    "services.title": "Rahul Mobile Services Lawan द्वारा सेवाएं",
    "services.desc": "लवन एवं बलौदा बाजार जिले के निवासियों के लिए सटीक तकनीकी रिपेयरिंग, प्रामाणिक मोबाइल गैजेट्स और निरंतर ग्राहक सेवा।",

    // Service Card 1
    "services.c1_title": "उच्च गुणवत्ता रिपेयरिंग सेवाएं",
    "services.c1_desc": "आधुनिक टूल्स और परीक्षित स्पेयर पार्ट्स के साथ हार्डवेयर-स्तरीय सटीक रिपेयरिंग।",
    "services.c1_f1": "त्वरित स्क्रीन एवं डिस्प्ले रिप्लेसमेंट (AMOLED, OLED, LCD)",
    "services.c1_f2": "बैटरी एवं चार्जिंग जैक रिप्लेसमेंट (Type-C, Micro-USB)",
    "services.c1_f3": "माइक, स्पीकर, कैमरा मॉड्यूल और मदरबोर्ड डायग्नोस्टिक्स",
    "services.c1_f4": "पानी से भीगे फोन का सर्किट उपचार एवं माइक्रो-सोल्डरिंग",
    "services.c1_f5": "काम शुरू होने से पहले पारदर्शी खर्च का स्पष्ट अनुमान",
    "services.c1_btn": "रिपेयर का खर्च जानें",

    // Service Card 2
    "services.c2_title": "मोबाइल बिक्री सेवाएं",
    "services.c2_desc": "किफायती स्थानीय दरों पर गुणवत्ता-प्रमाणित नए स्मार्टफोन्स, कीपैड डिवाइस और असली एक्सेसरीज।",
    "services.c2_f1": "गुणवत्ता-सत्यापित नए स्मार्टफोन और कीपैड मोबाइल मॉडल्स",
    "services.c2_f2": "ग्राहक के बजट और जरूरत अनुसार विशेषज्ञ फोन चयन सलाह",
    "services.c2_f3": "ओरिजिनल फास्ट चार्जर, केबल, टेम्पर्ड ग्लास और बैक कवर",
    "services.c2_f4": "नया फोन चालू करना, अनबॉक्सिंग और सिम कार्ड सेटअप सहायता",
    "services.c2_f5": "आधिकारिक ब्रांड वारंटी और पक्के बिल के साथ खरीदारी",
    "services.c2_btn": "मॉडल की जानकारी लें",

    // Service Card 3
    "services.c3_title": "आफ्टर-सेल्स सेवाएं",
    "services.c3_desc": "खरीदारी के बाद भी आपके फोन को हमेशा सुचारू रखने के लिए समर्पित सहायता।",
    "services.c3_f1": "खरीदारी उपरांत समर्पित ग्राहक सहायता व तकनीकी मार्गदर्शन",
    "services.c3_f2": "सॉफ्टवेयर अपडेट, सिस्टम स्पीड ऑप्टिमाइजेशन और कैशे सफाई",
    "services.c3_f3": "सुरक्षित डेटा बैकअप, व्हाट्सएप चैट ट्रांसफर व कांटेक्ट सिंक",
    "services.c3_f4": "दीर्घकालिक ग्राहक सेवा गारंटी और संतुष्टि का भरोसा",
    "services.c3_f5": "हमारे नियमित ग्राहकों के लिए काउंटर पर प्राथमिकता सेवा",
    "services.c3_btn": "सपोर्ट के बारे में जानें",

    // Testimonials Section & Customer Photo Gallery
    "test.badge": "सत्यापित स्थानीय भरोसा",
    "test.title": "संतुष्ट ग्राहक एवं डिलीवरी गैलरी",
    "test.desc": "लवन और आसपास के क्षेत्रों के वास्तविक ग्राहकों के अनुभव और नए फोन के साथ उनकी मुस्कान।",
    "test.gallery_title": "फुल-साइज कस्टमर डिलीवरी फोटो गैलरी",
    "test.gallery_desc": "Rahul Mobile Services Lawan से खरीदे गए नए स्मार्टफोन्स और रिपेयर कराए गए मोबाइल्स को हाथ में थामे हमारे मुस्कुराते ग्राहकों की झलकियां।",
    "test.filter_all": "सभी डिलीवरी एवं हैंडओवर",
    "test.filter_sales": "नए स्मार्टफोन की खरीदारी",
    "test.filter_repair": "सटीक रिपेयरिंग हैंडओवर",
    "test.reviews_tab": "समीक्षाएं एवं रेटिंग्स",
    "test.gallery_tab": "कस्टमर फोटो गैलरी",
    "test.rating_text": "लवन के ग्राहकों द्वारा समग्र रेटिंग",
    "test.verified_badge": "सत्यापित ग्राहक",
    "test.device_label": "हैंडओवर डिवाइस",

    // Why Choose Us
    "why.badge": "भरोसा एवं विश्वसनीयता",
    "why.title": "Rahul Mobile Services Lawan को क्यों चुनें",
    "why.desc": "सटीक तकनीकी दक्षता, पूर्ण पारदर्शिता और लवन में मजबूत स्थानीय विश्वास पर आधारित सेवा।",
    "why.p1_title": "गुणवत्ता पर ध्यान",
    "why.p1_desc": "प्रत्येक स्पेयर पार्ट को लगाने से पहले वोल्टेज, टच रिस्पॉन्स और डिस्प्ले कलर का कड़ा परीक्षण किया जाता है।",
    "why.p2_title": "त्वरित समाधान",
    "why.p2_desc": "स्क्रीन, बैटरी और चार्जिंग पोर्ट का अधिकांश काम 30 से 60 मिनट में पूरा कर दिया जाता है।",
    "why.p3_title": "ईमानदार दरें",
    "why.p3_desc": "बिना किसी छुपे हुए शुल्क के काम से पहले स्पष्ट एस्टीमेट। आपकी सहमति के बाद ही काम शुरू होता है।",
    "why.p4_title": "आत्मीय ग्राहक सेवा",
    "why.p4_desc": "लवन में स्थानीय भाषा में सम्मानजनक व्यवहार, सही सलाह और बिक्री के बाद भी पूरा सहयोग।",

    // About Us
    "about.badge": "हमारे बारे में",
    "about.title": "सत्यनिष्ठा और सटीकता के साथ लवन की सेवा में",
    "about.p1": "Rahul Mobile Services Lawan, लवन (छत्तीसगढ़) के मेन मार्केट में स्थित प्रमुख मोबाइल बिक्री, ओरिजिनल एक्सेसरीज एवं आधुनिक हार्डवेयर रिपेयर केंद्र है। स्थानीय समुदाय को कॉरपोरेट स्तर की तकनीकी गुणवत्ता और ईमानदार सेवाएं उपलब्ध कराने के उद्देश्य से स्थापित यह संस्थान विश्वसनीयता का पर्याय है।",
    "about.p2": "चाहे स्क्रीन का अचानक टूटना हो, नया स्मार्टफोन खरीदना हो या पुराने फोन का डेटा नए फोन में सुरक्षित रूप से ट्रांसफर करना हो — हमारे कुशल तकनीशियन हर उपकरण को पूरी सावधानी और जिम्मेदारी से संभालते हैं।",
    "about.v1": "ईमानदार हार्डवेयर रिपेयरिंग",
    "about.v2": "प्रामाणिक मोबाइल बिक्री",
    "about.v3": "दीर्घकालिक आफ्टर-सेल्स सपोर्ट",
    "about.v4": "समुदाय का अटूट विश्वास",
    "about.stat1_num": "5,000+",
    "about.stat1_lbl": "फोन रिपेयर किए",
    "about.stat2_num": "100%",
    "about.stat2_lbl": "परीक्षित स्पेयर पार्ट्स",
    "about.stat3_num": "8+ वर्ष",
    "about.stat3_lbl": "लवन में अनुभव",
    "about.stat4_num": "99.4%",
    "about.stat4_lbl": "संतुष्ट ग्राहक दर",

    // Contact Section
    "contact.badge": "स्टोर पर पधारें या संपर्क करें",
    "contact.title": "Rahul Mobile Services Lawan से संपर्क करें",
    "contact.desc": "हम लवन के मेन रोड मार्केट में सुगमता से उपलब्ध हैं। फोन करें, व्हाट्सएप पर संदेश भेजें या आज ही हमारे स्टोर पर आएं।",
    "contact.touch_title": "त्वरित संपर्क विकल्प",
    "contact.touch_subtitle": "लवन काउंटर से तुरंत जुड़ने के लिए नीचे टैप करें:",
    "contact.btn_call": "कॉल करें",
    "contact.btn_whatsapp": "व्हाट्सएप पर बात करें",
    "contact.btn_directions": "दुकान का रास्ता (गूगल मैप्स)",
    "contact.address_label": "दुकान का पता",
    "contact.address_val": "मेन रोड मार्केट, लवन, जिला बलौदा बाजार, छत्तीसगढ़ - 493526",
    "contact.phone_label": "फोन नंबर",
    "contact.phone_val": "+91 98765 43210",
    "contact.hours_label": "कार्य समय",
    "contact.hours_val": "सोमवार – रविवार: सुबह 9:30 से रात 8:30 तक",

    // Inquiry Form
    "contact.form_title": "त्वरित सेवा संबंधी पूछताछ भेजें",
    "contact.form_subtitle": "अपना विवरण लिखें, हमारी टीम आपके उपकरण के संबंध में शीघ्र संपर्क करेगी।",
    "contact.f_name": "पूरा नाम",
    "contact.f_name_ph": "उदा. रमेश वर्मा",
    "contact.f_phone": "मोबाइल नंबर",
    "contact.f_phone_ph": "उदा. 9876543210",
    "contact.f_service": "आवश्यक सेवा",
    "contact.f_service_opt1": "हार्डवेयर रिपेयर (स्क्रीन, बैटरी, चार्जिंग जैक)",
    "contact.f_service_opt2": "नया मोबाइल फोन खरीदना",
    "contact.f_service_opt3": "एक्सेसरीज एवं टेम्पर्ड ग्लास",
    "contact.f_service_opt4": "आफ्टर-सेल्स व सॉफ्टवेयर / डेटा ट्रांसफर",
    "contact.f_model": "डिवाइस मॉडल एवं समस्या का विवरण",
    "contact.f_model_ph": "उदा. वीवो Y20 गिरने के बाद स्क्रीन टच काम नहीं कर रहा...",
    "contact.btn_submit": "पूछताछ भेजें",
    "contact.success_msg": "धन्यवाद! आपका संदेश Rahul Mobile Services Lawan को प्राप्त हो गया है। हम जल्द ही आपसे संपर्क करेंगे।",

    // Footer
    "footer.brand_desc": "रिटेल स्मार्टफोन बिक्री, सटीक हार्डवेयर मोबाइल रिपेयर और ग्राहक-हितैषी आफ्टर-सेल्स सेवाएं — लवन, छत्तीसगढ़।",
    "footer.col_services": "प्रमुख सेवाएं",
    "footer.col_quick": "त्वरित लिंक",
    "footer.col_visit": "स्टोर स्थान",
    "footer.copy": "© 2026 Rahul Mobile Services Lawan. सर्वाधिकार सुरक्षित। सटीक मोबाइल तकनीक एवं सेवाएं।",
    "footer.admin_portal": "स्टोर एडमिन पोर्टल"
  }
};

class I18nManager {
  constructor() {
    // By default, STRICT rule: entire website MUST be in English.
    this.currentLang = 'en';
  }

  init() {
    this.applyLanguage(this.currentLang);
    this.bindEvents();
  }

  bindEvents() {
    const enBtns = document.querySelectorAll('.lang-btn-en');
    const hiBtns = document.querySelectorAll('.lang-btn-hi');

    enBtns.forEach(btn => {
      btn.addEventListener('click', () => this.setLanguage('en'));
    });

    hiBtns.forEach(btn => {
      btn.addEventListener('click', () => this.setLanguage('hi'));
    });
  }

  setLanguage(lang) {
    if (lang !== 'en' && lang !== 'hi') return;
    this.currentLang = lang;
    this.applyLanguage(lang);
    
    // Update active states on toggles
    document.querySelectorAll('.lang-btn-en').forEach(btn => {
      btn.classList.toggle('active', lang === 'en');
    });
    document.querySelectorAll('.lang-btn-hi').forEach(btn => {
      btn.classList.toggle('active', lang === 'hi');
    });

    // Notify other components if needed
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
  }

  applyLanguage(lang) {
    const dict = translations[lang] || translations.en;
    
    // Update elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Update elements with data-i18n-ph (placeholders)
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // Update elements with data-i18n-title
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key]) {
        el.setAttribute('title', dict[key]);
      }
    });
  }

  t(key) {
    const dict = translations[this.currentLang] || translations.en;
    return dict[key] || key;
  }
}

window.I18n = new I18nManager();
