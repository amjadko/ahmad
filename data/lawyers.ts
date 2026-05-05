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
      en: 'Founder of Alkourabi Law Firm. Leads all six specialized departments and personally oversees major international client matters.',
      de: 'Gründer der Alkourabi Anwaltskanzlei. Leitet alle sechs Fachbereiche und betreut persönlich die wichtigsten internationalen Mandanten.',
      tr: 'Alkourabi Hukuk Bürosu\'nun kurucusu. Altı uzmanlık bölümünün tümünü yönetir ve önemli uluslararası müvekkil dosyalarını bizzat takip eder.',
      ar: 'مؤسس مكتب القربي للمحاماة والاستشارات القانونية، يقود الأقسام الستة ويتابع بنفسه أهم ملفات الموكلين الدوليين.'
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
      'tax-financial',
      'intellectual-property',
      'certified-translation'
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
  }
];

export function getLawyerBySlug(slug: string) {
  return lawyers.find((l) => l.slug === slug);
}

export function getFounder() {
  return lawyers.find((l) => l.isFounder) ?? lawyers[0];
}
