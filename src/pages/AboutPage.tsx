import { CtaPanel } from '../components/CtaPanel';
import { MediaImage } from '../components/MediaImage';
import { Seo } from '../components/Seo';
import { team, ui } from '../data/site';
import type { Locale } from '../types';

export function AboutPage({ locale }: { locale: Locale }) {
  return (
    <>
      <Seo
        locale={locale}
        title={locale === 'pt' ? 'Sobre' : 'About'}
        description={
          locale === 'pt'
            ? 'Quem é a Horizon Collective: um coletivo de design, código e SEO para pequenos negócios.'
            : 'Meet Horizon Collective: a design, code and SEO collective for small businesses.'
        }
      />
      <section className="section page-hero">
        <div className="aurora" aria-hidden="true" style={{ opacity: 0.5 }} data-parallax="14">
          <i />
          <i />
          <i />
        </div>
        <div className="wrap">
          <span className="eyebrow" data-reveal>{locale === 'pt' ? 'Sobre nós' : 'About us'}</span>
          <h1 className="display about-title" data-reveal data-reveal-delay="1">
            {locale === 'pt' ? (
              <>
                Um coletivo que acredita no <em className="serif-i warm-grad">pequeno</em> grande negócio.
              </>
            ) : (
              <>
                A collective that believes in the <em className="serif-i warm-grad">small</em> big business.
              </>
            )}
          </h1>
          <p className="lead page-lead" data-reveal data-reveal-delay="2">
            {locale === 'pt'
              ? 'Nascemos da ideia de que um negócio de bairro merece a mesma qualidade digital de uma grande marca.'
              : 'We were born from the idea that a neighborhood business deserves the same digital quality as a major brand.'}
          </p>
        </div>
      </section>

      <section className="section--tight">
        <div className="wrap story-grid">
          <MediaImage src="images/horizon-hero.png" alt="Horizon Collective studio" ratio="4 / 3" />
          <div data-reveal data-reveal-delay="1">
            <span className="eyebrow">{locale === 'pt' ? 'Nossa história' : 'Our story'}</span>
            <h2 className="h2 heading-offset">{locale === 'pt' ? 'Começou com uma cafeteria.' : 'It started with a coffee shop.'}</h2>
            <p className="muted story-copy">
              {locale === 'pt'
                ? 'Em 2019, ajudamos uma cafeteria de bairro a ter o primeiro site decente. Em três meses, ela estava lotada de gente que “achou no Google”.'
                : 'In 2019, we helped a neighborhood coffee shop get its first decent website. Within three months, it was full of people who “found it on Google”.'}
            </p>
            <p className="muted story-copy">
              {locale === 'pt'
                ? 'Hoje somos um time de doze pessoas, designers, devs e estrategistas, que já entregou mais de 180 projetos.'
                : 'Today we are a twelve-person team of designers, developers and strategists with more than 180 projects delivered.'}
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="max-46">
            <span className="eyebrow" data-reveal>{locale === 'pt' ? 'No que acreditamos' : 'What we believe'}</span>
            <h2 className="h2 heading-offset" data-reveal data-reveal-delay="1">
              {locale === 'pt' ? 'Valores que guiam cada projeto' : 'Values that guide every project'}
            </h2>
          </div>
          <div className="values">
            {[
              ['01', locale === 'pt' ? 'Resultado > vaidade' : 'Results > vanity', locale === 'pt' ? 'Site bonito que não traz cliente é decoração cara.' : 'A beautiful site that brings no customers is expensive decoration.'],
              ['02', locale === 'pt' ? 'Transparência radical' : 'Radical transparency', locale === 'pt' ? 'Sem jargão e sem promessa mágica.' : 'No jargon and no magic promises.'],
              ['03', locale === 'pt' ? 'Parceria de longo prazo' : 'Long-term partnership', locale === 'pt' ? 'Não entregamos e sumimos. Crescemos junto.' : 'We do not ship and disappear. We grow together.'],
            ].map(([number, title, text], index) => (
              <div className="value" data-reveal data-reveal-delay={index} key={number}>
                <div className="stat-n warm-grad value-number">{number}</div>
                <h3 className="h3 value-title">{title}</h3>
                <p className="muted value-copy">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <div className="between section-heading">
            <div>
              <span className="eyebrow" data-reveal>{locale === 'pt' ? 'O time' : 'The team'}</span>
              <h2 className="h2 heading-offset" data-reveal data-reveal-delay="1">
                {locale === 'pt' ? 'Gente real por trás do pixel' : 'Real people behind the pixels'}
              </h2>
            </div>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div className="member" data-reveal data-reveal-delay={index} key={member.name}>
                <div className="ph member-photo">
                  <span>{locale === 'pt' ? 'Retrato' : 'Portrait'}</span>
                </div>
                <h3>{member.name}</h3>
                <div className="role">{member.role[locale]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid stat-grid">
            <Stat value="2019" label={locale === 'pt' ? 'Fundada em' : 'Founded'} />
            <Stat value="180+" label={locale === 'pt' ? 'Projetos entregues' : 'Projects delivered'} />
            <Stat value="12" label={locale === 'pt' ? 'Pessoas no time' : 'People on the team'} />
            <Stat value="98%" label={locale === 'pt' ? 'Clientes que renovam' : 'Clients who renew'} />
          </div>
        </div>
      </section>

      <CtaPanel locale={locale} title={locale === 'pt' ? 'Vamos crescer juntos?' : 'Shall we grow together?'} button={ui[locale].startProject} />
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div data-reveal>
      <div className="stat-n warm-grad">{value}</div>
      <div className="stat-l">{label}</div>
    </div>
  );
}
