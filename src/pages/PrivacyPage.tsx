import { contactEmail } from "../lib/contact";

interface PrivacyPageProps {
  lang: "en" | "pt";
}

const t = {
  en: {
    badge: "Legal",
    title: "Privacy Policy",
    updated: "Last updated: June 2026",
    sections: [
      {
        title: "1. Who we are",
        content: "Aureon is a digital agency providing web design, SEO, and GEO services. This privacy policy explains how we collect, use, and protect your personal information when you visit this website or engage our services.",
      },
      {
        title: "2. What data we collect",
        content: "We may collect the following information:\n• Name and contact information (email, phone) when you fill out our contact form\n• Usage data (pages visited, time on site, clicks) via analytics tools\n• Device and browser information for site optimization\n• Communications history if you contact us by email",
      },
      {
        title: "3. How we use your data",
        content: "We use your information to:\n• Respond to project inquiries and send proposals\n• Improve website performance and user experience\n• Send service updates only if you've opted in\n• Fulfill legal obligations\n\nWe do not sell, rent, or trade your personal data to third parties.",
      },
      {
        title: "4. Cookies",
        content: "Our website uses cookies to understand how visitors interact with our content. This includes analytics cookies (such as Google Analytics). You can disable cookies in your browser settings at any time. Disabling cookies will not prevent you from using our website but may affect some functionality.",
      },
      {
        title: "5. Third-party services",
        content: "We may use third-party services including Google Analytics, email platforms, and project management tools. These services have their own privacy policies and we encourage you to review them. We only share data necessary for service delivery.",
      },
      {
        title: "6. Data retention",
        content: "We retain personal data only as long as necessary to provide our services or as required by law. Contact form submissions are stored for up to 2 years. You can request deletion of your data at any time.",
      },
      {
        title: "7. Your rights",
        content: `Depending on your location, you may have the right to:\n• Access the personal data we hold about you\n• Request correction of inaccurate data\n• Request deletion of your data\n• Object to processing of your data\n• Data portability\n\nTo exercise any of these rights, contact us at ${contactEmail.en}.`,
      },
      {
        title: "8. LGPD (Brazil)",
        content: "If you are a resident of Brazil, your data is processed in accordance with the Lei Geral de Proteção de Dados (LGPD - Law 13.709/2018). You have the right to confirm data processing, access your data, correct incomplete or inaccurate data, anonymize, block, or delete unnecessary data, and revoke consent at any time.",
      },
      {
        title: "9. Contact",
        content: `For any privacy-related questions or to exercise your rights, contact us at:\n\nEmail: ${contactEmail.en}\nAureon Digital Agency — Brazil`,
      },
    ],
  },
  pt: {
    badge: "Legal",
    title: "Política de Privacidade",
    updated: "Última atualização: Junho de 2026",
    sections: [
      {
        title: "1. Quem somos",
        content: "A Aureon é uma agência digital que oferece serviços de web design, SEO e GEO. Esta política de privacidade explica como coletamos, usamos e protegemos suas informações pessoais quando você visita este site ou contrata nossos serviços.",
      },
      {
        title: "2. Quais dados coletamos",
        content: "Podemos coletar as seguintes informações:\n• Nome e informações de contato (email, telefone) quando você preenche nosso formulário de contato\n• Dados de uso (páginas visitadas, tempo no site, cliques) via ferramentas de analytics\n• Informações de dispositivo e navegador para otimização do site\n• Histórico de comunicações caso você entre em contato por email",
      },
      {
        title: "3. Como usamos seus dados",
        content: "Usamos suas informações para:\n• Responder a consultas de projetos e enviar propostas\n• Melhorar o desempenho e a experiência do site\n• Enviar atualizações de serviço somente se você optou por isso\n• Cumprir obrigações legais\n\nNão vendemos, alugamos ou trocamos seus dados pessoais com terceiros.",
      },
      {
        title: "4. Cookies",
        content: "Nosso site utiliza cookies para entender como os visitantes interagem com nosso conteúdo. Isso inclui cookies de analytics (como Google Analytics). Você pode desativar cookies nas configurações do seu navegador a qualquer momento. Desativar cookies não impedirá o uso do site, mas pode afetar algumas funcionalidades.",
      },
      {
        title: "5. Serviços de terceiros",
        content: "Podemos usar serviços de terceiros, incluindo Google Analytics, plataformas de email e ferramentas de gestão de projetos. Esses serviços têm suas próprias políticas de privacidade e encorajamos você a revisá-las. Compartilhamos apenas os dados necessários para a prestação dos serviços.",
      },
      {
        title: "6. Retenção de dados",
        content: "Retemos dados pessoais apenas pelo tempo necessário para fornecer nossos serviços ou conforme exigido por lei. Envios de formulário de contato são armazenados por até 2 anos. Você pode solicitar a exclusão dos seus dados a qualquer momento.",
      },
      {
        title: "7. Seus direitos",
        content: `Dependendo da sua localização, você pode ter o direito de:\n• Acessar os dados pessoais que mantemos sobre você\n• Solicitar a correção de dados imprecisos\n• Solicitar a exclusão dos seus dados\n• Opor-se ao processamento dos seus dados\n• Portabilidade dos dados\n\nPara exercer qualquer um desses direitos, entre em contato conosco em ${contactEmail.pt}.`,
      },
      {
        title: "8. LGPD (Brasil)",
        content: "Se você é residente no Brasil, seus dados são processados em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018). Você tem o direito de confirmar o processamento de dados, acessar seus dados, corrigir dados incompletos ou imprecisos, anonimizar, bloquear ou eliminar dados desnecessários e revogar o consentimento a qualquer momento.",
      },
      {
        title: "9. Contato",
        content: `Para quaisquer dúvidas relacionadas à privacidade ou para exercer seus direitos, entre em contato:\n\nEmail: ${contactEmail.pt}\nAureon Digital Agency — Brasil`,
      },
    ],
  },
};

export function PrivacyPage({ lang }: PrivacyPageProps) {
  const tx = t[lang];

  return (
    <main style={{ paddingTop: 120, paddingBottom: 100 }}>
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px" }}>
        <span style={{
          display: "inline-block",
          background: "rgba(212,160,23,0.1)",
          border: "1px solid rgba(212,160,23,0.3)",
          color: "var(--gold)",
          fontSize: 11,
          fontFamily: "var(--font-body)",
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          padding: "6px 16px",
          borderRadius: 100,
          marginBottom: 24,
        }}>
          {tx.badge}
        </span>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(32px, 5vw, 56px)",
          color: "var(--text)",
          margin: "0 0 12px",
          lineHeight: 1.1,
        }}>
          {tx.title}
        </h1>
        <p style={{ color: "var(--text-dim)", fontSize: 13, marginBottom: 56 }}>
          {tx.updated}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {tx.sections.map((section, i) => (
            <div key={i}>
              <h2 style={{
                fontFamily: "var(--font-body)",
                fontSize: 18,
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: 12,
              }}>
                {section.title}
              </h2>
              <div style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.8 }}>
                {section.content.split("\n").map((line, li) => (
                  <p key={li} style={{ margin: "0 0 6px" }}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
