// REVIEW PENDING: German (de) and Turkish (tr) translations are best-effort AI translations
// and should be reviewed by native speakers (especially for legal terminology) before
// public launch. Arabic (ar) and English (en) content is sourced from the firm's PDF.

import type { Department } from './types';

export const departments: Department[] = [
  {
    slug: 'corporate-investment',
    iconKey: 'corporate',
    leadLawyerSlug: 'ahmad-alkourabi',
    name: {
      en: 'Corporate & Investment',
      de: 'Gesellschafts- und Investitionsrecht',
      tr: 'Şirketler ve Yatırım',
      ar: 'الشركات والاستثمار'
    },
    shortDescription: {
      en: 'Company formation across all structures, commercial contract drafting, and securing investment and industrial licenses.',
      de: 'Gründung von Unternehmen aller Rechtsformen, Erstellung von Handelsverträgen und Einholung von Investitions- und Industrielizenzen.',
      tr: 'Tüm şirket türlerinin kuruluşu, ticari sözleşmelerin hazırlanması ve yatırım ile sanayi ruhsatlarının alınması.',
      ar: 'تأسيس الشركات بكافة أنواعها، وصياغة العقود التجارية، والحصول على التراخيص الاستثمارية والصناعية.'
    },
    fullDescription: {
      en: 'The department handles company formation in all corporate structures (joint-stock, limited liability, partnership), drafts domestic and cross-border commercial contracts, and secures investment and industrial licenses from the Syrian Investment Authority and relevant ministries.',
      de: 'Der Bereich übernimmt die Gründung von Gesellschaften in allen Rechtsformen (Aktiengesellschaft, GmbH, Personengesellschaft), die Erstellung nationaler und grenzüberschreitender Handelsverträge sowie die Einholung von Investitions- und Industrielizenzen bei der Syrischen Investitionsbehörde und den zuständigen Ministerien.',
      tr: 'Bölüm, tüm kurumsal yapılarda (anonim şirket, limited şirket, şahıs şirketi) şirket kuruluşunu üstlenir, yurt içi ve sınır ötesi ticari sözleşmeler hazırlar ve Suriye Yatırım Kurumu ile ilgili bakanlıklardan yatırım ve sanayi ruhsatlarını alır.',
      ar: 'يتولى القسم تأسيس الشركات بكافة أنواعها (مساهمة، محدودة المسؤولية، تضامن، توصية)، وصياغة العقود التجارية والتجارية الدولية، والحصول على التراخيص الاستثمارية والصناعية من هيئة الاستثمار السورية والوزارات المختصة.'
    }
  },
  {
    slug: 'litigation',
    iconKey: 'litigation',
    leadLawyerSlug: 'ahmad-alkourabi',
    name: {
      en: 'Commercial & Civil Litigation',
      de: 'Handels- und Zivilprozessrecht',
      tr: 'Ticari ve Hukuki Davalar',
      ar: 'القضايا التجارية والمدنية'
    },
    shortDescription: {
      en: 'Professional advocacy and legal representation before all competent courts.',
      de: 'Professionelle Vertretung und rechtlicher Beistand vor allen zuständigen Gerichten.',
      tr: 'Tüm yetkili mahkemeler önünde profesyonel savunma ve hukuki temsil.',
      ar: 'المرافعة والتمثيل القانوني الاحترافي أمام كافة المحاكم المختصة.'
    },
    fullDescription: {
      en: 'The department provides full advocacy and representation before courts of first instance, appeal, and cassation, covering commercial disputes, supply-contract litigation, debt collection, and compensation claims — with particular focus on inter-company disputes.',
      de: 'Der Bereich übernimmt die vollständige Vertretung vor erstinstanzlichen Gerichten, Berufungs- und Kassationsgerichten in Handelsstreitigkeiten, Liefervertragsklagen, Forderungseinziehung und Schadensersatzansprüchen — mit besonderem Schwerpunkt auf Streitigkeiten zwischen Unternehmen.',
      tr: 'Bölüm, ilk derece mahkemeleri, istinaf ve temyiz mahkemeleri önünde tam temsil hizmeti sunar; ticari uyuşmazlıkları, tedarik sözleşmesi davalarını, alacak tahsilatını ve tazminat taleplerini kapsar — özellikle şirketler arası uyuşmazlıklara odaklanır.',
      ar: 'يقدم القسم المرافعة والتمثيل القانوني الكامل أمام محاكم البداية والاستئناف والنقض، في النزاعات التجارية، عقود التوريد، التحصيل، وقضايا التعويض، مع تركيز خاص على النزاعات بين الشركات.'
    }
  },
  {
    slug: 'labor-compliance',
    iconKey: 'labor',
    leadLawyerSlug: 'ahmad-alkourabi',
    name: {
      en: 'Labor Affairs & Compliance',
      de: 'Arbeitsrecht und Compliance',
      tr: 'İş İlişkileri ve Uyum',
      ar: 'شؤون العمال والامتثال'
    },
    shortDescription: {
      en: 'Work permits and residency for foreign staff, social security administration, and structured employment contracts.',
      de: 'Arbeitserlaubnisse und Aufenthaltsgenehmigungen für ausländische Mitarbeiter, Sozialversicherungsverwaltung und strukturierte Arbeitsverträge.',
      tr: 'Yabancı personel için çalışma izinleri ve oturma izinleri, sosyal güvenlik yönetimi ve düzenli iş sözleşmeleri.',
      ar: 'إدارة إقامات العمل للأجانب، والتأمينات الاجتماعية، وتنظيم عقود الموظفين.'
    },
    fullDescription: {
      en: 'The department manages work permits and annual residencies for foreign employees, registers staff with the Social Security Foundation, drafts employment contracts and staff regulations, and represents employers before labor courts when required.',
      de: 'Der Bereich verwaltet Arbeitserlaubnisse und jährliche Aufenthaltsgenehmigungen für ausländische Mitarbeiter, meldet Personal bei der Sozialversicherung an, erstellt Arbeitsverträge und Personalrichtlinien und vertritt Arbeitgeber bei Bedarf vor Arbeitsgerichten.',
      tr: 'Bölüm, yabancı çalışanlar için çalışma izinleri ve yıllık ikamet izinlerini yönetir, personeli Sosyal Güvenlik Kurumu\'na kaydeder, iş sözleşmeleri ve personel yönetmelikleri hazırlar ve gerektiğinde iş mahkemeleri önünde işverenleri temsil eder.',
      ar: 'يتولى القسم إدارة إقامات العمل والإقامات السنوية للموظفين الأجانب، وتسجيل الموظفين في مؤسسة التأمينات الاجتماعية، وصياغة عقود العمل ولوائح الموظفين، وتمثيل صاحب العمل أمام محاكم العمل عند الحاجة.'
    }
  },
  {
    slug: 'tax-financial',
    iconKey: 'tax',
    leadLawyerSlug: 'alia',
    name: {
      en: 'Tax & Financial Advisory',
      de: 'Steuer- und Finanzberatung',
      tr: 'Vergi ve Mali Danışmanlık',
      ar: 'الاستشارات الضريبية والمالية'
    },
    shortDescription: {
      en: 'Tax filing preparation, liaison with financial authorities, and ensuring tax compliance — supervised by a licensed certified public accountant.',
      de: 'Erstellung von Steuererklärungen, Kontakt zu Finanzbehörden und Sicherstellung der Steuerkonformität — unter Aufsicht eines lizenzierten vereidigten Wirtschaftsprüfers.',
      tr: 'Vergi beyannamesi hazırlama, mali makamlarla irtibat ve vergi uyumunun sağlanması — yetkili bir yeminli mali müşavir gözetiminde.',
      ar: 'إعداد البيانات الضريبية، ومتابعة الدوائر المالية، وضمان السلامة الضريبية بإشراف محاسب قانوني مجاز.'
    },
    fullDescription: {
      en: 'The department prepares periodic and annual tax filings, liaises with the relevant financial directorates, and audits corporate tax compliance — all under the supervision of a licensed certified public accountant who ensures every procedure matches the letter of the law.',
      de: 'Der Bereich erstellt periodische und jährliche Steuererklärungen, hält Kontakt zu den zuständigen Finanzdirektionen und prüft die steuerliche Compliance von Unternehmen — alles unter Aufsicht eines lizenzierten vereidigten Wirtschaftsprüfers, der sicherstellt, dass jedes Verfahren dem Wortlaut des Gesetzes entspricht.',
      tr: 'Bölüm, dönemsel ve yıllık vergi beyannamelerini hazırlar, ilgili mali müdürlüklerle irtibat kurar ve kurumsal vergi uyumunu denetler — tümü, her prosedürün kanun lafzına uygun olmasını sağlayan yetkili bir yeminli mali müşavir gözetiminde.',
      ar: 'يقدم القسم خدمات إعداد البيانات الضريبية الدورية والسنوية، ومتابعة الدوائر المالية المختصة، والتدقيق على السلامة الضريبية للشركات، تحت إشراف محاسب قانوني مجاز يضمن مطابقة كافة الإجراءات للقانون.'
    }
  },
  {
    slug: 'intellectual-property',
    iconKey: 'ip',
    leadLawyerSlug: 'ahmad-alkourabi',
    name: {
      en: 'Intellectual Property',
      de: 'Geistiges Eigentum',
      tr: 'Fikri Mülkiyet',
      ar: 'الملكية الفكرية'
    },
    shortDescription: {
      en: 'Trademark registration, trade-name protection, and safeguarding intellectual property rights.',
      de: 'Markenregistrierung, Schutz von Handelsnamen und Sicherung von Rechten am geistigen Eigentum.',
      tr: 'Marka tescili, ticari isim koruması ve fikri mülkiyet haklarının güvence altına alınması.',
      ar: 'تسجيل العلامات الفارقة، وحماية الأسماء التجارية، وصون حقوق الملكية.'
    },
    fullDescription: {
      en: 'The department registers trademarks and distinctive marks with the IP Protection Directorate, follows applications and oppositions through to grant, defends mark rights before competent courts, and registers and protects trade names and patents.',
      de: 'Der Bereich registriert Marken und Unterscheidungszeichen bei der Direktion für den Schutz geistigen Eigentums, begleitet Anmeldungen und Widerspruchsverfahren bis zur Eintragung, verteidigt Markenrechte vor den zuständigen Gerichten und registriert und schützt Handelsnamen und Patente.',
      tr: 'Bölüm, markaları ve ayırt edici işaretleri Fikri Mülkiyet Koruma Müdürlüğü\'nde tescil ettirir, başvuruları ve itirazları tescile kadar takip eder, marka haklarını yetkili mahkemeler önünde savunur ve ticari isimleri ile patentleri tescil edip korur.',
      ar: 'يتولى القسم تسجيل العلامات التجارية والفارقة لدى مديرية حماية الملكية، ومتابعة طلبات التسجيل والاعتراضات، والدفاع عن حقوق العلامة أمام المحاكم المختصة، وتسجيل وحماية الأسماء التجارية وبراءات الاختراع.'
    }
  },
  {
    slug: 'certified-translation',
    iconKey: 'translation',
    leadLawyerSlug: 'hassan-aqeel',
    name: {
      en: 'Certified Legal Translation',
      de: 'Beglaubigte Rechtsübersetzung',
      tr: 'Yeminli Hukuki Tercüme',
      ar: 'الترجمة المحلفة'
    },
    shortDescription: {
      en: 'Certified legal translation services for all documents and official records.',
      de: 'Beglaubigte Rechtsübersetzungen für alle Dokumente und amtlichen Unterlagen.',
      tr: 'Tüm belgeler ve resmi kayıtlar için yeminli hukuki tercüme hizmetleri.',
      ar: 'تقديم خدمات الترجمة القانونية المعتمدة لكافة الوثائق والمستندات.'
    },
    fullDescription: {
      en: 'The department provides sworn legal translation accredited by official authorities — covering contracts, powers of attorney, court judgments, commercial registry records, and civil-status documents — between Arabic, English, and several additional languages.',
      de: 'Der Bereich bietet beglaubigte Rechtsübersetzungen, die von offiziellen Stellen anerkannt sind — einschließlich Verträgen, Vollmachten, Gerichtsurteilen, Handelsregisterauszügen und Personenstandsurkunden — zwischen Arabisch, Englisch und mehreren weiteren Sprachen.',
      tr: 'Bölüm, resmi makamlarca onaylanmış yeminli hukuki tercüme sunar — sözleşmeler, vekaletnameler, mahkeme kararları, ticaret sicil kayıtları ve nüfus belgeleri dahil — Arapça, İngilizce ve birkaç ek dil arasında.',
      ar: 'يقدم القسم ترجمة قانونية محلفة معتمدة من الجهات الرسمية، تشمل العقود، الوكالات، الأحكام القضائية، السجلات التجارية، ووثائق الأحوال المدنية، بين العربية والإنكليزية وعدد من اللغات الأخرى.'
    }
  }
];

export function getDepartmentBySlug(slug: string) {
  return departments.find((d) => d.slug === slug);
}
