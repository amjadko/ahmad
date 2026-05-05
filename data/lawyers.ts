// REVIEW PENDING: German (de) and Turkish (tr) translations are best-effort AI translations
// and should be reviewed by native speakers (especially for legal terminology) before
// public launch.

import type { Lawyer } from './types';

export const lawyers: Lawyer[] = [
  {
    slug: 'ahmad-alkourabi',
    isFounder: true,
    name: {
      en: 'Attorney Ahmad Alkourabi',
      de: 'Rechtsanwalt Ahmad Alkourabi',
      tr: 'Avukat Ahmad Alkourabi',
      ar: 'الأستاذ أحمد القربي'
    },
    title: {
      en: 'Founding Attorney',
      de: 'Gründungsanwalt',
      tr: 'Kurucu Avukat',
      ar: 'المحامي المؤسس'
    },
    credentials: {
      en: 'Member of the Damascus Bar Association',
      de: 'Mitglied der Anwaltskammer Damaskus',
      tr: 'Şam Barosu Üyesi',
      ar: 'عضو نقابة المحامين بدمشق'
    },
    photo: null,
    monogram: {
      en: 'AK',
      de: 'AK',
      tr: 'AK',
      ar: 'أ.ق'
    },
    shortBio: {
      en: 'Founder of Alkourabi Law Firm. Leads the firm and oversees its corporate, litigation, labor, and intellectual-property practices alongside major international client matters.',
      de: 'Gründer der Alkourabi Anwaltskanzlei. Leitet die Kanzlei und verantwortet die Bereiche Gesellschaftsrecht, Prozessrecht, Arbeitsrecht und geistiges Eigentum sowie die wichtigsten internationalen Mandanten.',
      tr: 'Alkourabi Hukuk Bürosu\'nun kurucusu. Hukuk bürosunu yönetir ve şirketler, dava, iş hukuku ile fikri mülkiyet alanlarını, önemli uluslararası müvekkil dosyalarıyla birlikte üstlenir.',
      ar: 'مؤسس مكتب القربي للمحاماة، يقود المكتب ويتولى أقسام الشركات والاستثمار، والقضايا التجارية والمدنية، وشؤون العمال، والملكية الفكرية، إلى جانب متابعة أهم ملفات الموكلين الدوليين.'
    },
    bio: {
      en: 'Attorney Ahmad Alkourabi is the founding lawyer of Alkourabi Law Firm and a member of the Damascus Bar Association. He established the firm in 2018 to provide comprehensive legal and financial solutions to local and international companies operating in the Syrian market. Over years of practice he has built long-standing relationships with leading agencies and companies from Germany, Türkiye, and Jordan, overseen the formation of dozens of companies, and resolved complex commercial disputes. He believes a lawyer\'s role is not merely to apply the text of the law, but to build a bridge the client trusts when making decisions.',
      de: 'Rechtsanwalt Ahmad Alkourabi ist Gründungsanwalt der Alkourabi Anwaltskanzlei und Mitglied der Anwaltskammer Damaskus. Er gründete die Kanzlei im Jahr 2018, um nationalen und internationalen Unternehmen, die auf dem syrischen Markt tätig sind, umfassende rechtliche und finanzielle Lösungen anzubieten. Über die Jahre hat er langfristige Beziehungen zu führenden Agenturen und Unternehmen aus Deutschland, der Türkei und Jordanien aufgebaut, die Gründung dutzender Gesellschaften betreut und komplexe Handelsstreitigkeiten gelöst. Für ihn besteht die Aufgabe eines Anwalts nicht nur darin, den Wortlaut des Gesetzes anzuwenden, sondern eine Brücke zu bauen, der der Mandant bei seinen Entscheidungen vertraut.',
      tr: 'Avukat Ahmad Alkourabi, Alkourabi Hukuk Bürosu\'nun kurucu avukatı ve Şam Barosu üyesidir. Hukuk bürosunu 2018 yılında, Suriye pazarında faaliyet gösteren yerli ve uluslararası şirketlere kapsamlı hukuki ve mali çözümler sunmak amacıyla kurmuştur. Yıllar süren mesleki uygulaması boyunca Almanya, Türkiye ve Ürdün\'den önde gelen ajans ve şirketlerle uzun soluklu ilişkiler kurmuş, onlarca şirketin kuruluşunu yönetmiş ve karmaşık ticari uyuşmazlıkları çözüme kavuşturmuştur. Bir avukatın rolünün yalnızca kanun metnini uygulamak olmadığına, müvekkilin kararlarını alırken güvenebileceği bir köprü kurmak olduğuna inanır.',
      ar: 'الأستاذ أحمد القربي محامٍ مؤسس وعضو في نقابة المحامين بدمشق. أسس مكتبه عام 2018 ليقدم حلولاً قانونية ومالية متكاملة للشركات المحلية والدولية العاملة في السوق السورية. على مدى سنوات ممارسته، رسّخ علاقات عمل طويلة الأمد مع وكالات وشركات بارزة من ألمانيا وتركيا والأردن، وأشرف على تأسيس عشرات الشركات وتسوية نزاعات تجارية معقدة. يؤمن بأن دور المحامي ليس مجرد تطبيق النص، بل بناء جسر يثق به الموكل لاتخاذ قراراته.'
    },
    departments: [
      'corporate-investment',
      'litigation',
      'labor-compliance',
      'intellectual-property'
    ],
    languages: ['ar', 'en'],
    education: [
      {
        en: 'Bachelor of Laws — University of Damascus',
        de: 'Bachelor of Laws — Universität Damaskus',
        tr: 'Hukuk Lisansı — Şam Üniversitesi',
        ar: 'إجازة في الحقوق – جامعة دمشق'
      }
    ],
    notableMatters: [
      {
        en: 'Representing Schwing-Stetter (Germany) in the Syrian market and managing all their legal affairs.',
        de: 'Vertretung von Schwing-Stetter (Deutschland) auf dem syrischen Markt und Verwaltung sämtlicher rechtlicher Angelegenheiten.',
        tr: 'Schwing-Stetter\'in (Almanya) Suriye pazarında temsili ve tüm hukuki işlerinin yönetimi.',
        ar: 'تمثيل وكالة شفنيغ-شتتر الألمانية في السوق السورية وإدارة شؤونها القانونية بالكامل.'
      },
      {
        en: 'Establishing and managing the affairs of Tiryaki Anadolu (Türkiye) in Syria.',
        de: 'Gründung und Betreuung von Tiryaki Anadolu (Türkei) in Syrien.',
        tr: 'Tiryaki Anadolu\'nun (Türkiye) Suriye\'deki kuruluşu ve işlerinin yönetimi.',
        ar: 'تأسيس وإدارة شؤون شركة ترياكي أناضول التركية في سوريا.'
      },
      {
        en: 'Representing Jordanian companies including Abshar Passenger Transport, Auto Score, and Auto Hub in their Syrian operations.',
        de: 'Vertretung jordanischer Unternehmen wie Abshar Passenger Transport, Auto Score und Auto Hub bei ihren Aktivitäten in Syrien.',
        tr: 'Abshar Yolcu Taşımacılığı, Auto Score ve Auto Hub gibi Ürdünlü şirketlerin Suriye operasyonlarında temsili.',
        ar: 'تمثيل شركات الأردنية كأبشر لنقل الركاب وأوتو سكور وأوتو هوب في عملياتها داخل سوريا.'
      },
      {
        en: 'Legal oversight of Tiryaki Grains and Al-Nahrain Harvest in Syria.',
        de: 'Rechtliche Begleitung von Tiryaki Grains und Al-Nahrain Harvest in Syrien.',
        tr: 'Tiryaki Tahıl ve Al-Nahrain Hasat şirketlerinin Suriye\'deki hukuki gözetimi.',
        ar: 'الإشراف القانوني على شركة ترياكي حبوب وشركة حصاد النهرين في سوريا.'
      }
    ],
    email: 'ahmad@kourabi.com',
    phone: '+963959435555'
  },

  // PENDING: Full bio, education, notable matters, photo, email/phone for Mr. Hassan Aqeel.
  // Title set as Certified Sworn Translator — confirm with the firm.
  {
    slug: 'hassan-aqeel',
    name: {
      en: 'Mr. Hassan Aqeel',
      de: 'Herr Hassan Aqeel',
      tr: 'Sn. Hassan Aqeel',
      ar: 'السيد حسان عقيل'
    },
    title: {
      en: 'Head of Certified Legal Translation',
      de: 'Leiter der beglaubigten Rechtsübersetzung',
      tr: 'Yeminli Hukuki Tercüme Bölüm Başkanı',
      ar: 'رئيس قسم الترجمة المحلفة'
    },
    credentials: {
      en: 'Certified Sworn Translator',
      de: 'Vereidigter Übersetzer',
      tr: 'Yeminli Tercüman',
      ar: 'مترجم محلّف معتمد'
    },
    photo: null,
    monogram: {
      en: 'HA',
      de: 'HA',
      tr: 'HA',
      ar: 'ح.ع'
    },
    shortBio: {
      en: 'Heads the Certified Legal Translation department at Alkourabi Law Firm, providing accredited translations between Arabic, English, and several additional languages for contracts, court documents, and official records.',
      de: 'Leitet den Bereich beglaubigte Rechtsübersetzung der Alkourabi Anwaltskanzlei und liefert anerkannte Übersetzungen zwischen Arabisch, Englisch und weiteren Sprachen für Verträge, Gerichtsdokumente und amtliche Unterlagen.',
      tr: 'Alkourabi Hukuk Bürosu\'nun Yeminli Hukuki Tercüme bölümünü yönetir; sözleşmeler, mahkeme belgeleri ve resmi kayıtlar için Arapça, İngilizce ve diğer birkaç dil arasında onaylı tercümeler sağlar.',
      ar: 'يرأس قسم الترجمة المحلفة في مكتب القربي للمحاماة، ويقدم ترجمات معتمدة بين العربية والإنكليزية وعدد من اللغات الأخرى للعقود والوثائق القضائية والسجلات الرسمية.'
    },
    bio: {
      en: 'Mr. Hassan Aqeel is a certified sworn translator and heads the Certified Legal Translation department at Alkourabi Law Firm. He delivers accredited translations recognized by official authorities — covering contracts, powers of attorney, court judgments, commercial registry records, and civil-status documents — between Arabic, English, and several additional languages.',
      de: 'Herr Hassan Aqeel ist vereidigter Übersetzer und leitet den Bereich beglaubigte Rechtsübersetzung der Alkourabi Anwaltskanzlei. Er liefert von offiziellen Stellen anerkannte Übersetzungen — einschließlich Verträgen, Vollmachten, Gerichtsurteilen, Handelsregisterauszügen und Personenstandsurkunden — zwischen Arabisch, Englisch und weiteren Sprachen.',
      tr: 'Sn. Hassan Aqeel yeminli tercümandır ve Alkourabi Hukuk Bürosu\'nun Yeminli Hukuki Tercüme bölümünü yönetir. Resmi makamlarca tanınan tercümeler sunar — sözleşmeler, vekaletnameler, mahkeme kararları, ticaret sicil kayıtları ve nüfus belgeleri dahil — Arapça, İngilizce ve diğer birkaç dil arasında.',
      ar: 'السيد حسان عقيل مترجم محلّف معتمد ويرأس قسم الترجمة المحلفة في مكتب القربي للمحاماة. يقدم ترجمات معتمدة من الجهات الرسمية تشمل العقود والوكالات والأحكام القضائية والسجلات التجارية ووثائق الأحوال المدنية بين العربية والإنكليزية وعدد من اللغات الأخرى.'
    },
    departments: ['certified-translation'],
    languages: ['ar', 'en'],
    education: [],
    notableMatters: []
  },

  // PENDING: Full surname, bio, education, notable matters, photo, email/phone for Attorney Alia.
  {
    slug: 'alia',
    name: {
      en: 'Attorney Alia',
      de: 'Rechtsanwältin Alia',
      tr: 'Avukat Alia',
      ar: 'المحامية عليا'
    },
    title: {
      en: 'Head of Tax & Financial Advisory',
      de: 'Leiterin der Steuer- und Finanzberatung',
      tr: 'Vergi ve Mali Danışmanlık Bölüm Başkanı',
      ar: 'رئيسة قسم الاستشارات الضريبية والمالية'
    },
    credentials: {
      en: 'Member of the Damascus Bar Association',
      de: 'Mitglied der Anwaltskammer Damaskus',
      tr: 'Şam Barosu Üyesi',
      ar: 'عضو نقابة المحامين بدمشق'
    },
    photo: null,
    monogram: {
      en: 'A',
      de: 'A',
      tr: 'A',
      ar: 'ع'
    },
    shortBio: {
      en: 'Heads the Tax & Financial Advisory department at Alkourabi Law Firm. Oversees tax filings, financial-authority liaison, and corporate tax compliance, working alongside a licensed certified public accountant.',
      de: 'Leitet den Bereich Steuer- und Finanzberatung der Alkourabi Anwaltskanzlei. Verantwortet Steuererklärungen, Kontakt zu Finanzbehörden und steuerliche Compliance von Unternehmen — gemeinsam mit einem lizenzierten vereidigten Wirtschaftsprüfer.',
      tr: 'Alkourabi Hukuk Bürosu\'nun Vergi ve Mali Danışmanlık bölümünü yönetir. Vergi beyannamelerini, mali makamlarla irtibatı ve kurumsal vergi uyumunu — yetkili yeminli mali müşavir ile birlikte — denetler.',
      ar: 'ترأس قسم الاستشارات الضريبية والمالية في مكتب القربي للمحاماة. تشرف على إعداد البيانات الضريبية ومتابعة الدوائر المالية وضمان السلامة الضريبية للشركات، بالتعاون مع محاسب قانوني مجاز.'
    },
    bio: {
      en: 'Attorney Alia heads the Tax & Financial Advisory department at Alkourabi Law Firm and is a member of the Damascus Bar Association. She prepares periodic and annual tax filings, maintains liaison with the relevant financial directorates, and audits corporate tax compliance — working alongside a licensed certified public accountant whose oversight ensures every procedure matches the letter of the Syrian tax framework.',
      de: 'Rechtsanwältin Alia leitet den Bereich Steuer- und Finanzberatung der Alkourabi Anwaltskanzlei und ist Mitglied der Anwaltskammer Damaskus. Sie erstellt periodische und jährliche Steuererklärungen, hält Kontakt zu den zuständigen Finanzdirektionen und prüft die steuerliche Compliance von Unternehmen — gemeinsam mit einem lizenzierten vereidigten Wirtschaftsprüfer, der sicherstellt, dass jedes Verfahren dem syrischen Steuerrecht entspricht.',
      tr: 'Avukat Alia, Alkourabi Hukuk Bürosu\'nun Vergi ve Mali Danışmanlık bölümünü yönetir ve Şam Barosu üyesidir. Dönemsel ve yıllık vergi beyannamelerini hazırlar, ilgili mali müdürlüklerle irtibat kurar ve kurumsal vergi uyumunu denetler — her prosedürün Suriye vergi mevzuatına uygun olmasını sağlayan yetkili bir yeminli mali müşavir ile birlikte çalışır.',
      ar: 'المحامية عليا ترأس قسم الاستشارات الضريبية والمالية في مكتب القربي للمحاماة وعضو في نقابة المحامين بدمشق. تتولى إعداد البيانات الضريبية الدورية والسنوية، ومتابعة الدوائر المالية المختصة، والتدقيق على السلامة الضريبية للشركات، بالعمل جنباً إلى جنب مع محاسب قانوني مجاز يضمن مطابقة كافة الإجراءات للقانون الضريبي السوري.'
    },
    departments: ['tax-financial'],
    languages: ['ar', 'en'],
    education: [],
    notableMatters: []
  }
];

export function getLawyerBySlug(slug: string) {
  return lawyers.find((l) => l.slug === slug);
}

export function getFounder() {
  return lawyers.find((l) => l.isFounder) ?? lawyers[0];
}
