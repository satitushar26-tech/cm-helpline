export interface GovtScheme {
  id: string;
  nameHi: string;
  nameEn: string;
  department: string;
  category: 'Health' | 'Women' | 'Agriculture' | 'Employment' | 'Education' | 'Social Welfare' | 'Tourism';
  categoryHi: string;
  overviewHi: string;
  overviewEn: string;
  benefitsHi: string[];
  benefitsEn: string[];
  eligibilityHi: string[];
  eligibilityEn: string[];
  requiredDocsHi: string[];
  requiredDocsEn: string[];
  howToApplyHi: string;
  howToApplyEn: string;
  officialPortal: string;
  lastVerifiedDate: string;
}

export const UTTARAKHAND_SCHEMES: GovtScheme[] = [
  {
    id: 'atal-ayushman',
    nameHi: 'अटल आयुष्मान उत्तराखण्ड योजना',
    nameEn: 'Atal Ayushman Uttarakhand Yojana (AAUY)',
    department: 'चिकित्सा स्वास्थ्य एवं परिवार कल्याण विभाग',
    category: 'Health',
    categoryHi: 'स्वास्थ्य',
    overviewHi: 'उत्तराखण्ड के समस्त 23 लाख परिवारों को प्रतिवर्ष ₹5 लाख तक का कैशलेस एवं निशुल्क उपचार।',
    overviewEn: 'Provides cashless medical coverage up to ₹5 lakh per year to all permanent resident families in Uttarakhand.',
    benefitsHi: [
      'प्रति परिवार प्रति वर्ष ₹5,00,000 तक का निशुल्क कैशलेस अस्पताल उपचार',
      'राज्य एवं देश भर के 175+ से अधिक सूचीबद्ध सरकारी एवं निजी अस्पतालों में मान्य',
      '1,700 से अधिक प्रकार की गंभीर बीमारियों एवं सर्जरी का सम्पूर्ण पैकेज सम्मिलित',
    ],
    benefitsEn: [
      'Up to ₹5,00,000 cashless inpatient treatment per family per year',
      'Valid across 175+ empanelled government and private hospitals',
      'Covers 1,700+ medical and surgical procedures',
    ],
    eligibilityHi: [
      'उत्तराखण्ड का मूल या स्थायी निवासी परिवार',
      'राशन कार्ड या राज्य सरकार द्वारा जारी वैध परिवार पहचान पत्र धारक',
    ],
    eligibilityEn: [
      'Permanent resident family of Uttarakhand',
      'Valid Ration Card or State Family ID holder',
    ],
    requiredDocsHi: ['राशन कार्ड / परिवार रजिस्टर नकल', 'आधार कार्ड', 'मोबाइल नंबर'],
    requiredDocsEn: ['Ration Card / Parivar Register Copy', 'Aadhaar Card', 'Mobile Number'],
    howToApplyHi: 'निकटतम जन सेवा केंद्र (CSC), राजकीय चिकित्सालय या apunsarkar.uk.gov.in पर आयुष्मान कार्ड बनवाएं।',
    howToApplyEn: 'Visit nearest Common Service Center (CSC), District Hospital, or apply online at apunsarkar.uk.gov.in.',
    officialPortal: 'https://ayushmanuttarakhand.org/',
    lastVerifiedDate: '2026-01-15',
  },
  {
    id: 'gaura-devi-kanya-dhan',
    nameHi: 'नंदा गौरा योजना (गौरा देवी कन्या धन)',
    nameEn: 'Nanda Gaura Kanya Dhan Yojana',
    department: 'महिला सशक्तिकरण एवं बाल विकास विभाग',
    category: 'Women',
    categoryHi: 'महिला कल्याण',
    overviewHi: 'बालिकाओं के जन्म एवं 12वीं उत्तीर्ण करने पर कुल ₹62,000 की वित्तीय सहायता।',
    overviewEn: 'Financial assistance of ₹62,000 in two stages: on the birth of a girl child and upon passing Class 12.',
    benefitsHi: [
      'बालिका के जन्म पर ₹11,000 की एकमुश्त सहायता',
      '12वीं कक्षा उत्तीर्ण करने एवं उच्च शिक्षा में प्रवेश पर ₹51,000 की वित्तीय सहायता',
      'बालिकाओं की उच्च शिक्षा को प्रोत्साहन एवं लिंगानुपात में सुधार',
    ],
    benefitsEn: [
      '₹11,000 on birth of girl child',
      '₹51,000 upon passing 12th standard for higher education',
      'Promotes female literacy and reduces dropout rates',
    ],
    eligibilityHi: [
      'उत्तराखण्ड की स्थायी निवासी छात्रा/बालिका',
      'परिवार की वार्षिक आय ग्रामीण क्षेत्र में ₹72,000 से कम हो',
      'मान्यता प्राप्त बोर्ड से 12वीं उत्तीर्ण',
    ],
    eligibilityEn: [
      'Permanent resident of Uttarakhand',
      'Family annual income below ₹72,000 (rural) or prescribed ceiling',
      'Passed 12th from recognized state/central board',
    ],
    requiredDocsHi: ['मूल निवास प्रमाण पत्र', '12वीं की अंकतालिका', 'आय प्रमाण पत्र', 'बैंक पासबुक', 'जन्म प्रमाण पत्र'],
    requiredDocsEn: ['Domicile Certificate', '12th Marksheet', 'Income Certificate', 'Bank Passbook', 'Birth Certificate'],
    howToApplyHi: 'अपुणि सरकार पोर्टल (apunsarkar.uk.gov.in) पर ऑनलाइन आवेदन करें अथवा जिला बाल विकास कार्यालय से संपर्क करें।',
    howToApplyEn: 'Apply online through Apuni Sarkar Portal (apunsarkar.uk.gov.in) or submit via District Child Development Office.',
    officialPortal: 'https://wecd.uk.gov.in/',
    lastVerifiedDate: '2026-01-20',
  },
  {
    id: 'kisan-kalyan-yojana',
    nameHi: 'दीनदयाल उपाध्याय किसान कल्याण योजना',
    nameEn: 'Deen Dayal Upadhyaya Kisan Kalyan Yojana',
    department: 'कृषि एवं कृषक कल्याण विभाग / सहकारिता',
    category: 'Agriculture',
    categoryHi: 'कृषि कल्याण',
    overviewHi: 'उत्तराखण्ड के किसानों को शून्य प्रतिशत (0%) ब्याज दर पर ₹3 लाख तक का फसली व कृषि ऋण।',
    overviewEn: 'Zero percent (0%) interest agricultural and allied farming loans up to ₹3 lakh to Uttarakhand farmers.',
    benefitsHi: [
      'व्यक्तिगत कृषकों को 0% ब्याज पर ₹3,00,000 तक का ऋण',
      'स्वयं सहायता समूहों (SHG) को 0% ब्याज पर ₹5,00,000 तक का समूह ऋण',
      'जैविक खेती, पॉलीहाउस, डेयरी, मत्स्य पालन एवं मशरूम उत्पादन हेतु सुलभ ऋण',
    ],
    benefitsEn: [
      'Up to ₹3,00,000 loan at 0% interest for individual farmers',
      'Up to ₹5,00,000 at 0% interest for women SHGs',
      'Covers organic farming, polyhouses, horticulture, and livestock',
    ],
    eligibilityHi: [
      'उत्तराखण्ड के स्थायी निवासी लघु एवं सीमांत किसान',
      'सहकारी बैंक या प्राथमिक कृषि साख समिति (PACS) का सदस्य',
    ],
    eligibilityEn: [
      'Small and marginal farmers residing in Uttarakhand',
      'Member of District Cooperative Bank or PACS',
    ],
    requiredDocsHi: ['भू-अभिलेख (खतौनी नकल)', 'किसान क्रेडिट कार्ड / आधार कार्ड', 'बैंक खाता पासबुक', 'पासपोर्ट फोटो'],
    requiredDocsEn: ['Land Record (Khatauni)', 'Kisan Credit Card / Aadhaar', 'Bank Passbook', 'Passport Photo'],
    howToApplyHi: 'निकटतम जिला सहकारी बैंक अथवा क्षेत्रीय प्राथमिक कृषि साख समिति (PACS) शाखा में आवेदन करें।',
    howToApplyEn: 'Apply through your nearest District Cooperative Bank branch or regional PACS office.',
    officialPortal: 'https://cooperative.uk.gov.in/',
    lastVerifiedDate: '2026-01-18',
  },
  {
    id: 'mukhyamantri-swarojgar',
    nameHi: 'मुख्यमंत्री स्वरोजगार योजना (MSY)',
    nameEn: 'Mukhyamantri Swarojgar Yojana (MSY)',
    department: 'उद्योग निदेशालय (MSME उत्तराखण्ड)',
    category: 'Employment',
    categoryHi: 'रोजगार व उद्यम',
    overviewHi: 'पर्वतीय एवं ग्रामीण क्षेत्रों में विनिर्माण व सेवा क्षेत्र में उद्यम स्थापित करने हेतु 25% तक सरकारी सब्सिडी।',
    overviewEn: 'Promotes local entrepreneurship with up to 25% capital subsidy for manufacturing and service ventures in hilly areas.',
    benefitsHi: [
      'विनिर्माण क्षेत्र में ₹25 लाख एवं सेवा क्षेत्र में ₹10 लाख तक की परियोजना लागत',
      'पर्वतीय जिलों (श्रेणी A) में 25% तक अधिकतम मार्जिन मनी (सब्सिडी) सहायता',
      'राष्ट्रीयकृत एवं सहकारी बैंकों से आसान ऋण सुविधा',
    ],
    benefitsEn: [
      'Project cost up to ₹25 lakh (manufacturing) and ₹10 lakh (services)',
      'Up to 25% capital subsidy in hill districts (Category A)',
      'Easy loan processing through commercial and cooperative banks',
    ],
    eligibilityHi: [
      'उत्तराखण्ड का स्थायी निवासी, न्यूनतम आयु 18 वर्ष',
      'शैक्षिक योग्यता: न्यूनतम 8वीं उत्तीर्ण',
    ],
    eligibilityEn: [
      'Permanent resident of Uttarakhand, minimum age 18 years',
      'Minimum educational qualification: 8th standard pass',
    ],
    requiredDocsHi: ['विस्तृत प्रोजेक्ट रिपोर्ट (DPR)', 'मूल निवास प्रमाण पत्र', 'आधार कार्ड', 'शैक्षिक योग्यता प्रमाण पत्र', 'बैंक पासबुक'],
    requiredDocsEn: ['Detailed Project Report (DPR)', 'Domicile Certificate', 'Aadhaar Card', 'Educational Certificate', 'Bank Passbook'],
    howToApplyHi: 'msy.uk.gov.in पोर्टल पर ऑनलाइन आवेदन करें अथवा जिला उद्योग केंद्र (DIC) से संपर्क करें।',
    howToApplyEn: 'Apply online on msy.uk.gov.in or consult your District Industries Center (DIC).',
    officialPortal: 'https://msy.uk.gov.in/',
    lastVerifiedDate: '2026-02-01',
  },
  {
    id: 'mukhyamantri-mahalakshmi',
    nameHi: 'मुख्यमंत्री महालक्ष्मी किट योजना',
    nameEn: 'Mukhyamantri Mahalakshmi Kit Yojana',
    department: 'महिला सशक्तिकरण एवं बाल विकास विभाग',
    category: 'Women',
    categoryHi: 'महिला कल्याण',
    overviewHi: 'प्रसव के उपरांत प्रसूता माता और नवजात शिशु की स्वच्छता व पोषण हेतु निशुल्क महालक्ष्मी किट वितरण।',
    overviewEn: 'Free distribution of comprehensive mother and newborn hygiene, nutrition, and care kits upon delivery.',
    benefitsHi: [
      'प्रसूता एवं नवजात शिशु हेतु गर्म कपड़े, तेल, साबुन, सैनिटरी पैड एवं पोषण सामग्री',
      'प्रथम दो बालिकाओं के जन्म पर अथवा एक बालक और एक बालिका के जन्म पर प्रदान',
      'मातृ एवं शिशु मृत्यु दर में कमी लाना',
    ],
    benefitsEn: [
      'Complete baby clothes, post-natal hygiene, baby massage oil, and nutrition package',
      'Provided for first two girl children or one boy and one girl child',
      'Helps improve post-natal infant and maternal hygiene',
    ],
    eligibilityHi: ['उत्तराखण्ड की स्थायी निवासी प्रसूता माता', 'संस्थागत प्रसव (सरकारी या अधिकृत अस्पताल में) अनिवार्य'],
    eligibilityEn: ['Permanent resident pregnant/lactating mother in Uttarakhand', 'Institutional delivery in authorized hospital'],
    requiredDocsHi: ['डिस्चार्ज कार्ड / प्रसव प्रमाण पत्र', 'एमसीपी कार्ड (Mother Child Protection)', 'आधार कार्ड'],
    requiredDocsEn: ['Hospital Discharge Card / Delivery Certificate', 'MCP Card', 'Aadhaar Card'],
    howToApplyHi: 'क्षेत्र की आंगनवाड़ी कार्यकत्री अथवा प्राथमिक स्वास्थ्य केंद्र (PHC) के माध्यम से किट प्राप्त करें।',
    howToApplyEn: 'Contact your local Anganwadi worker or the delivering government health center.',
    officialPortal: 'https://wecd.uk.gov.in/',
    lastVerifiedDate: '2026-01-10',
  },
  {
    id: 'mukhyamantri-vatsalya',
    nameHi: 'मुख्यमंत्री वात्सल्य योजना',
    nameEn: 'Mukhyamantri Vatsalya Yojana',
    department: 'महिला सशक्तिकरण एवं बाल विकास विभाग',
    category: 'Social Welfare',
    categoryHi: 'सामाजिक सुरक्षा',
    overviewHi: 'अनाथ एवं बेसहारा बच्चों को 21 वर्ष की आयु तक प्रति माह ₹3,000 की वित्तीय सहायता व निशुल्क शिक्षा।',
    overviewEn: 'Monthly maintenance assistance of ₹3,000 and free education up to age 21 for orphaned children in Uttarakhand.',
    benefitsHi: [
      'प्रति माह ₹3,000 सीधे बच्चे के बैंक खाते में',
      '21 वर्ष की आयु तक निशुल्क विद्यालयी एवं उच्च शिक्षा व्यवस्था',
      'राज्य की सरकारी नौकरियों में अनाथ बच्चों हेतु 5% क्षैतिज आरक्षण',
    ],
    benefitsEn: [
      '₹3,000 monthly allowance transferred directly to child/guardian account',
      'Free schooling and higher education support till age 21',
      '5% horizontal reservation in state government jobs for eligible orphans',
    ],
    eligibilityHi: ['माता-पिता दोनों अथवा एकमात्र कमाऊ अभिभावक को खो चुके बालक/बालिकाएं', 'उत्तराखण्ड का मूल निवासी'],
    eligibilityEn: ['Children who lost both parents or single earning parent', 'Resident of Uttarakhand'],
    requiredDocsHi: ['माता-पिता का मृत्यु प्रमाण पत्र', 'बालक/बालिका का जन्म प्रमाण पत्र', 'संरक्षक का आधार कार्ड व बैंक खाता'],
    requiredDocsEn: ['Parents Death Certificate', 'Child Birth Certificate', 'Guardian Aadhaar & Bank Account'],
    howToApplyHi: 'जिला बाल संरक्षण इकाई (DCPU) अथवा जिला समाज कल्याण अधिकारी कार्यालय में आवेदन प्रस्तुत करें।',
    howToApplyEn: 'Submit application to District Child Protection Unit (DCPU) or District Social Welfare Office.',
    officialPortal: 'https://wecd.uk.gov.in/',
    lastVerifiedDate: '2026-01-25',
  },
  {
    id: 'veer-chandra-singh-garhwali',
    nameHi: 'वीर चंद्र सिंह गढ़वाली पर्यटन स्वरोजगार योजना',
    nameEn: 'Veer Chandra Singh Garhwali Tourism Self-Employment Scheme',
    department: 'उत्तराखण्ड पर्यटन विकास परिषद (UTDB)',
    category: 'Tourism',
    categoryHi: 'पर्यटन स्वरोजगार',
    overviewHi: 'होमस्टे, बस/टैक्सी खरीद, रिवर राफ्टिंग, साहसिक खेल एवं रेस्टोरेंट संचालन हेतु 33% तक कैपिटल सब्सिडी।',
    overviewEn: 'Flagship tourism entrepreneurship scheme offering up to 33% subsidy for homestays, tourist vehicles, and eco-tourism ventures.',
    benefitsHi: [
      'होमस्टे निर्माण एवं विस्तार हेतु ₹15 लाख तक की वित्तीय सहायता (33% सब्सिडी पर्वतीय क्षेत्र में)',
      'पर्यटक बस, कैब व जीप खरीद हेतु ₹20 लाख तक का ऋण व अनुदान',
      'साहसिक पर्यटन जैसे राफ्टिंग, पैराग्लाइडिंग, ट्रेकिंग उपकरण स्थापना पर सब्सिडी',
    ],
    benefitsEn: [
      'Up to ₹15 lakh for Homestay construction/renovation (33% subsidy in hill regions)',
      'Subsidized vehicle loans up to ₹20 lakh for tourist commercial permits',
      'Subsidies for adventure sports equipment (rafting, paragliding, trekking)',
    ],
    eligibilityHi: ['उत्तराखण्ड का स्थायी निवासी, न्यूनतम आयु 18 वर्ष', 'पर्वतीय जनपदों के स्थानीय निवासियों को प्राथमिकता'],
    eligibilityEn: ['Permanent resident of Uttarakhand, age 18+', 'Priority for local residents in hill districts'],
    requiredDocsHi: ['स्थायी निवास प्रमाण पत्र', 'भूमि स्वामित्व अभिलेख (होमस्टे हेतु)', 'प्रोजेक्ट रिपोर्ट', 'ड्राइविंग लाइसेंस (वाहन हेतु)'],
    requiredDocsEn: ['Domicile Certificate', 'Land Registry Copy (for Homestay)', 'Project DPR', 'Commercial Driving License (for vehicle)'],
    howToApplyHi: 'uttarakhandtourism.gov.in पर ऑनलाइन पंजीकरण करें या जिला पर्यटन विकास अधिकारी (DTDO) से संपर्क करें।',
    howToApplyEn: 'Register on uttarakhandtourism.gov.in or contact the District Tourism Development Officer (DTDO).',
    officialPortal: 'https://uttarakhandtourism.gov.in/',
    lastVerifiedDate: '2026-02-05',
  },
  {
    id: 'old-age-pension',
    nameHi: 'उत्तराखण्ड वृद्धावस्था पेंशन योजना',
    nameEn: 'Uttarakhand Old Age Pension Scheme',
    department: 'समाज कल्याण विभाग',
    category: 'Social Welfare',
    categoryHi: 'पेंशन व सुरक्षा',
    overviewHi: '60 वर्ष से अधिक आयु के वरिष्ठ नागरिकों को प्रति माह ₹1,500 की सीधी सामाजिक सुरक्षा पेंशन।',
    overviewEn: 'Direct monthly pension of ₹1,500 for senior citizens aged 60 and above in Uttarakhand.',
    benefitsHi: [
      'प्रति माह ₹1,500 डीबीटी (DBT) के माध्यम से सीधे बैंक खाते में',
      '60 वर्ष अथवा उससे अधिक आयु के सभी पात्र वृद्धजन लाभान्वित',
      'पति-पत्नी दोनों के 60 वर्ष पूर्ण होने पर दोनों को अलग-अलग पेंशन प्राप्त करने की पात्रता',
    ],
    benefitsEn: [
      '₹1,500 per month deposited directly via DBT into beneficiary bank account',
      'Both husband and wife eligible individually once turning 60',
      'Covers both BPL and low-income senior citizens',
    ],
    eligibilityHi: ['आयु 60 वर्ष या उससे अधिक', 'उत्तराखण्ड का स्थायी निवासी', 'मासिक आय ₹4,000 या वार्षिक आय ₹48,000 से कम (बीपीएल परिवार हेतु आय सीमा की छूट)'],
    eligibilityEn: ['Age 60 years or above', 'Permanent resident of Uttarakhand', 'Monthly income below ₹4,000 (relaxed for BPL cardholders)'],
    requiredDocsHi: ['आयु प्रमाण पत्र (हाईस्कूल/वोटर कार्ड/आधार)', 'आय प्रमाण पत्र / बीपीएल कार्ड', 'मूल निवास प्रमाण पत्र', 'बैंक पासबुक'],
    requiredDocsEn: ['Age Proof (Aadhaar / Voter ID)', 'Income Certificate / BPL Card', 'Domicile Certificate', 'Bank Passbook'],
    howToApplyHi: 'अपुणि सरकार (apunsarkar.uk.gov.in) पर ऑनलाइन आवेदन करें अथवा ग्राम पंचायत विकास अधिकारी (VDO) के पास जमा करें।',
    howToApplyEn: 'Apply online on apunsarkar.uk.gov.in or submit form to Village Development Officer (VDO).',
    officialPortal: 'https://socialwelfare.uk.gov.in/',
    lastVerifiedDate: '2026-01-28',
  },
];
