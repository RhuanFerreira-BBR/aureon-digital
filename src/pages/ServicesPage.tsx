import { Link } from 'react-router-dom';
import { CtaPanel } from '../components/CtaPanel';
import { MediaImage } from '../components/MediaImage';
import { Seo } from '../components/Seo';
import { services, ui } from '../data/site';
import type { Locale } from '../types';
import { routePath } from '../utils';

export function ServicesPage({ locale }: { locale: Locale }) {
  const copy = ui[locale];
  const images = ['images/horizon-hero.png', 'images/cases/pao-brasa.png', 'images/cases/norte-clinica.png', 'images/cases/studio-lume.png'];

  return (
    <>
      <Seo
        locale={locale}
        title={locale === 'pt' ? 'Serviços' : 'Services'}
        description={
          locale === 'pt'
            ? 'Web design, desenvolvimento, SEO, tráfego orgânico e GEO para pequenos negócios.'
            : 'Web design, development, SEO, organic growth and GEO for small businesses.'
        }
      />
      <section className="section page-hero">
        <div className="aurora" aria-hidden="true" style={{ opacity: 0.55 }} data-parallax="14">
          <i />
          <i />
          <i />
        </div>
        <div className="wrap">
          <span className="eyebrow" data-reveal>{locale === 'pt' ? 'Serviços' : 'Services'}</span>
          <h1 className="h1 page-title" data-reveal data-reveal-delay="1">
            {locale === 'pt' ? (
              <>
                Tudo para seu negócio ser <em className="serif-i warm-grad">encontrado</em> e escolhido.
              </>
            ) : (
              <>
                Everything your business needs to be <em className="serif-i warm-grad">found</em> and chosen.
              </>
            )}
          </h1>
          <p className="lead page-lead" data-reveal data-reveal-delay="2">
            {locale === 'pt'
              ? 'Estratégia, design, código e crescimento sob o mesmo teto. Sem terceirizar, sem ruído.'
              : 'Strategy, design, code and growth under one roof. No handoffs, no noise.'}
          </p>
        </div>
      </section>

      <section className="section--tight">
        <div className="wrap">
          {services.map((service, index) => (
            <article className="svc" key={service.number}>
              <div>
                <div className="svc-num">
                  {service.number} - {service.key}
                </div>
                <h2 className="h2 svc-title">{service.title[locale]}</h2>
                <p className="muted svc-copy">{service.summary[locale]}</p>
                <ul className="svc-list">
                  {service.bullets[locale].map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
              <div className="svc-media">
                <MediaImage src={images[index]} alt={service.title[locale]} ratio="4 / 3" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="price-heading">
            <span className="eyebrow" data-reveal>{locale === 'pt' ? 'Pacotes' : 'Packages'}</span>
            <h2 className="h2 heading-offset" data-reveal data-reveal-delay="1">
              {locale === 'pt' ? 'Planos para cada momento do seu negócio' : 'Plans for each stage of your business'}
            </h2>
          </div>
          <div className="price-grid">
            {[
              [locale === 'pt' ? 'Essencial' : 'Essential', 'R$ 4,9k', locale === 'pt' ? '/ projeto' : '/ project', ['Site de até 5 páginas', 'Design + desenvolvimento', 'SEO técnico essencial', 'Entrega em 3 semanas']],
              [locale === 'pt' ? 'Crescimento' : 'Growth', 'R$ 2,4k', locale === 'pt' ? '/ mês' : '/ month', ['Tudo do Essencial', 'SEO contínuo + conteúdo', 'Tráfego orgânico e GEO', 'Relatórios mensais']],
              [locale === 'pt' ? 'Autoridade' : 'Authority', locale === 'pt' ? 'Sob' : 'Custom', locale === 'pt' ? 'medida' : 'plan', ['Estratégia dedicada', 'Conteúdo em escala', 'Link building avançado', 'Squad exclusivo']],
            ].map(([name, price, period, items], index) => (
              <article className={`card ${index === 1 ? 'price--feat' : ''}`} data-reveal data-reveal-delay={index} key={String(name)}>
                <span className={`pill ${index === 1 ? 'pill--accent' : ''}`}>{index === 1 ? <span className="dot" /> : null}{String(name)}</span>
                <p className="muted price-desc">
                  {index === 0
                    ? locale === 'pt'
                      ? 'Para tirar a marca do papel com presença profissional.'
                      : 'For a professional first presence.'
                    : index === 1
                      ? locale === 'pt'
                        ? 'Para quem quer ser encontrado e converter de verdade.'
                        : 'For businesses that want to be found and convert.'
                      : locale === 'pt'
                        ? 'Para liderar o setor e dominar a busca.'
                        : 'For category leadership and search authority.'}
                </p>
                <div className="price-tag warm-grad">
                  {String(price)}
                  <span>{String(period)}</span>
                </div>
                <ul className="price-list">
                  {(items as string[]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link to={routePath(locale, 'contact')} className={`btn ${index === 1 ? 'btn--primary' : 'btn--ghost'} full-btn`}>
                  {locale === 'pt' ? 'Escolher' : 'Choose'} {index === 1 ? <span className="arr">→</span> : null}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap faq-layout">
          <div>
            <span className="eyebrow" data-reveal>{locale === 'pt' ? 'Dúvidas' : 'Questions'}</span>
            <h2 className="h2 heading-offset" data-reveal data-reveal-delay="1">
              {locale === 'pt' ? 'Perguntas frequentes' : 'Frequently asked questions'}
            </h2>
            <p className="muted faq-help" data-reveal data-reveal-delay="2">
              {locale === 'pt' ? 'Não achou o que procurava?' : 'Did not find what you need?'}{' '}
              <Link to={routePath(locale, 'contact')}>{locale === 'pt' ? 'Fale com a gente →' : 'Talk to us →'}</Link>
            </p>
          </div>
          <div data-reveal>
            {[
              [locale === 'pt' ? 'Quanto tempo leva um projeto?' : 'How long does a project take?', locale === 'pt' ? 'Sites essenciais ficam prontos em cerca de 3 semanas. Projetos maiores levam de 6 a 10 semanas.' : 'Essential websites take about 3 weeks. Larger projects usually take 6 to 10 weeks.'],
              [locale === 'pt' ? 'Vou conseguir gerenciar o site sozinho?' : 'Will I be able to manage the site?', locale === 'pt' ? 'Sim. Entregamos um fluxo simples e fazemos treinamento para atualizar textos, imagens e posts.' : 'Yes. We deliver a simple workflow and train your team to update copy, images and posts.'],
              [locale === 'pt' ? 'Em quanto tempo vejo resultado de SEO?' : 'When do SEO results appear?', locale === 'pt' ? 'Os primeiros movimentos aparecem entre 60 e 90 dias, com ganhos compostos ao longo dos meses.' : 'Initial movement usually appears within 60 to 90 days, with compounding gains over time.'],
              [locale === 'pt' ? 'O que é GEO?' : 'What is GEO?', locale === 'pt' ? 'GEO otimiza sua marca para ser citada por IAs como ChatGPT, Gemini e Perplexity.' : 'GEO optimizes your brand to be cited by AI answer engines such as ChatGPT, Gemini and Perplexity.'],
            ].map(([question, answer]) => (
              <div className="faq" key={question}>
                <details>
                  <summary>
                    {question} <span className="pm">+</span>
                  </summary>
                  <p>{answer}</p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaPanel
        locale={locale}
        title={locale === 'pt' ? 'Vamos montar seu plano?' : 'Let’s build your plan?'}
        text={locale === 'pt' ? 'Diagnóstico gratuito em até 48h, sem compromisso.' : 'Free diagnosis within 48h, no commitment.'}
        button={copy.requestDiagnostic}
      />
    </>
  );
}
