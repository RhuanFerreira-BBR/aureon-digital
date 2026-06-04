import { FormEvent, ReactNode, useState } from 'react';
import { Seo } from '../components/Seo';
import { CONTACT_EMAIL, ui } from '../data/site';
import type { Locale } from '../types';

export function ContactPage({ locale }: { locale: Locale }) {
  const [sent, setSent] = useState(false);
  const copy = ui[locale];

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '');
    const business = String(data.get('business') || '');
    const email = String(data.get('email') || '');
    const phone = String(data.get('phone') || '');
    const service = String(data.get('service') || '');
    const budget = String(data.get('budget') || '');
    const message = String(data.get('message') || '');
    const subject = encodeURIComponent(`Novo projeto - ${business || name || 'Horizon Collective'}`);
    const body = encodeURIComponent(
      [
        `Nome: ${name}`,
        `Negócio: ${business}`,
        `Email: ${email}`,
        `WhatsApp: ${phone}`,
        `Serviço: ${service}`,
        `Orçamento: ${budget}`,
        '',
        message,
      ].join('\n'),
    );
    setSent(true);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Seo
        locale={locale}
        title={locale === 'pt' ? 'Contato' : 'Contact'}
        description={
          locale === 'pt'
            ? 'Solicite um diagnóstico gratuito. Vamos colocar seu negócio no horizonte certo.'
            : 'Request a free diagnosis. Let’s put your business on the right horizon.'
        }
      />
      <section className="section contact-section">
        <div className="aurora" aria-hidden="true" style={{ opacity: 0.5 }} data-parallax="14">
          <i />
          <i />
          <i />
        </div>
        <div className="wrap contact-grid">
          <div>
            <span className="eyebrow" data-reveal>{locale === 'pt' ? 'Vamos conversar' : 'Let’s talk'}</span>
            <h1 className="h1 contact-title" data-reveal data-reveal-delay="1">
              {locale === 'pt' ? (
                <>
                  Pronto para ser <em className="serif-i warm-grad">encontrado</em>?
                </>
              ) : (
                <>
                  Ready to be <em className="serif-i warm-grad">found</em>?
                </>
              )}
            </h1>
            <p className="lead contact-lead" data-reveal data-reveal-delay="2">
              {locale === 'pt'
                ? 'Conte sobre seu negócio. Em até 48h enviamos um diagnóstico gratuito do seu site e da sua presença na busca, sem compromisso.'
                : 'Tell us about your business. Within 48h we send a free diagnosis of your site and search presence, no commitment.'}
            </p>
            <div data-reveal data-reveal-delay="3" className="contact-list">
              <ContactItem title="E-mail">
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </ContactItem>
              <ContactItem title="WhatsApp">
                <span className="muted">+55 11 9 9999-0000</span>
              </ContactItem>
              <ContactItem title={locale === 'pt' ? 'Onde estamos' : 'Where we are'}>
                <span className="muted">{locale === 'pt' ? 'São Paulo · atendimento remoto em todo o Brasil' : 'São Paulo · remote service worldwide'}</span>
              </ContactItem>
              <ContactItem title={locale === 'pt' ? 'Tempo de resposta' : 'Response time'} last>
                <span className="muted">{locale === 'pt' ? 'Em até 48 horas úteis' : 'Within 48 business hours'}</span>
              </ContactItem>
            </div>
          </div>

          <div className="card contact-card" data-reveal data-reveal-delay="1">
            <form onSubmit={onSubmit}>
              <div className="two">
                <Field label={locale === 'pt' ? 'Nome' : 'Name'} id="name" required placeholder={locale === 'pt' ? 'Seu nome' : 'Your name'} />
                <Field label={locale === 'pt' ? 'Negócio' : 'Business'} id="business" placeholder={locale === 'pt' ? 'Nome do seu negócio' : 'Business name'} />
              </div>
              <div className="two">
                <Field label="E-mail" id="email" type="email" required placeholder={locale === 'pt' ? 'seu@email.com' : 'you@email.com'} />
                <Field label="WhatsApp" id="phone" type="tel" placeholder="(11) 9 9999-0000" />
              </div>
              <div className="two">
                <Select
                  label={locale === 'pt' ? 'Serviço de interesse' : 'Service interest'}
                  id="service"
                  options={locale === 'pt' ? ['Site novo / redesign', 'SEO & tráfego orgânico', 'GEO · IA Search', 'E-commerce', 'Não sei, preciso de orientação'] : ['New website / redesign', 'SEO & organic growth', 'GEO · AI Search', 'Ecommerce', 'Not sure, need guidance']}
                />
                <Select
                  label={locale === 'pt' ? 'Orçamento estimado' : 'Estimated budget'}
                  id="budget"
                  options={locale === 'pt' ? ['Até R$ 5 mil', 'R$ 5 mil - R$ 15 mil', 'R$ 15 mil - R$ 40 mil', 'Acima de R$ 40 mil', 'Mensalidade recorrente'] : ['Up to R$ 5k', 'R$ 5k - R$ 15k', 'R$ 15k - R$ 40k', 'Above R$ 40k', 'Monthly retainer']}
                />
              </div>
              <div className="field">
                <label htmlFor="message">{locale === 'pt' ? 'Conte sobre seu projeto' : 'Tell us about your project'}</label>
                <textarea id="message" name="message" placeholder={locale === 'pt' ? 'O que você quer alcançar? Onde está hoje?' : 'What do you want to achieve? Where are you now?'} />
              </div>
              <button type="submit" className="btn btn--primary btn--lg full-btn">
                {locale === 'pt' ? 'Enviar mensagem' : 'Send message'} <span className="arr">→</span>
              </button>
              {sent && <p className="success-note centered-text">{copy.formSuccess}</p>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactItem({ title, children, last = false }: { title: string; children: ReactNode; last?: boolean }) {
  return (
    <div className={`contact-item ${last ? 'last' : ''}`}>
      <span className="dot2" />
      <div>
        <h4>{title}</h4>
        {children}
      </div>
    </div>
  );
}

function Field({ label, id, type = 'text', placeholder, required = false }: { label: string; id: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} type={type} required={required} placeholder={placeholder} />
    </div>
  );
}

function Select({ label, id, options }: { label: string; id: string; options: string[] }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={id}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
