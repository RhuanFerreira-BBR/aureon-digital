import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageEffects() {
  const location = useLocation();

  useEffect(() => {
    const header = document.querySelector('.site-header');
    const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const animated = document.documentElement.classList.contains('anim');
    const reveals = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];
    const show = (el: HTMLElement) => el.classList.add('in');
    const inView = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    };

    if (animated && 'IntersectionObserver' in window && reveals.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              show(entry.target as HTMLElement);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
      );

      reveals.forEach((element) => observer.observe(element));
      requestAnimationFrame(() => reveals.forEach((element) => inView(element) && show(element)));
      const forceVisible = window.setTimeout(() => reveals.forEach(show), 1200);

      return () => {
        window.clearTimeout(forceVisible);
        observer.disconnect();
      };
    }

    reveals.forEach(show);
  }, [location.pathname]);

  useEffect(() => {
    const animated = document.documentElement.classList.contains('anim');
    const nums = [...document.querySelectorAll<HTMLElement>('[data-count]')];
    const format = (value: number, suffix: string) =>
      Math.round(value).toLocaleString('pt-BR') + suffix;
    const setFinal = (el: HTMLElement) => {
      el.textContent = format(Number.parseFloat(el.dataset.count || '0'), el.dataset.suffix || '');
    };

    if (animated && 'IntersectionObserver' in window && nums.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            const target = Number.parseFloat(el.dataset.count || '0');
            const suffix = el.dataset.suffix || '';
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / 1400, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = format(target * eased, suffix);
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(el);
          });
        },
        { threshold: 0.6 },
      );
      nums.forEach((num) => observer.observe(num));
      const fallback = window.setTimeout(() => nums.forEach(setFinal), 1800);
      return () => {
        window.clearTimeout(fallback);
        observer.disconnect();
      };
    }

    nums.forEach(setFinal);
  }, [location.pathname]);

  useEffect(() => {
    const parallax = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
    if (!parallax.length || !window.matchMedia('(pointer:fine)').matches) return;

    const onMove = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      parallax.forEach((element) => {
        const depth = Number.parseFloat(element.dataset.parallax || '12');
        element.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [location.pathname]);
}
