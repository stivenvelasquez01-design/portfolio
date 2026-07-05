(() => {
  'use strict';

  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Abrir menú');
    });
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  // Navbar background on scroll
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Ribbon words follow scroll position (smoothed with easing, no snapping)
  if (!prefersReducedMotion) {
    const ribbons = [
      { ribbon: document.querySelector('.ribbon--1'), track: document.querySelector('.ribbon--1 .ribbon__track'), current: 0, dir: 1, unitWidth: 0 },
      { ribbon: document.querySelector('.ribbon--2'), track: document.querySelector('.ribbon--2 .ribbon__track'), current: 0, dir: -1, unitWidth: 0 },
    ].filter((r) => r.track);

    // Keep cloning the tag list until the track is comfortably wider than the
    // ribbon itself, so it never runs out of words on very wide screens.
    const setupRibbon = (r) => {
      if (!r.track.dataset.unitHtml) {
        r.track.dataset.unitHtml = r.track.innerHTML;
      }
      const unitHTML = r.track.dataset.unitHtml;
      r.track.innerHTML = unitHTML;
      const unitSpanCount = r.track.children.length;
      const containerWidth = r.ribbon.getBoundingClientRect().width || window.innerWidth;

      let guard = 0;
      while (r.track.scrollWidth < containerWidth * 2.5 && guard < 20) {
        r.track.insertAdjacentHTML('beforeend', unitHTML);
        guard++;
      }

      const firstSpan = r.track.children[0];
      const nextUnitFirstSpan = r.track.children[unitSpanCount];
      r.unitWidth = nextUnitFirstSpan
        ? nextUnitFirstSpan.getBoundingClientRect().left - firstSpan.getBoundingClientRect().left
        : r.track.scrollWidth;
    };

    ribbons.forEach(setupRibbon);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ribbons.forEach(setupRibbon));
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ribbons.forEach(setupRibbon), 200);
    });

    const SPEED = 0.5;
    const EASE = 0.08;

    const loop = () => {
      const scrollY = window.scrollY;
      ribbons.forEach((r) => {
        if (!r.unitWidth) return;
        const target = scrollY * SPEED * r.dir;
        r.current += (target - r.current) * EASE;
        const wrapped = ((r.current % r.unitWidth) + r.unitWidth) % r.unitWidth;
        r.track.style.transform = `translateX(${-wrapped}px)`;
      });
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }

  // Project modal
  // Fill in each project's real content here as it becomes available.
  const projectsData = {
    1: {
      tag: 'Prueba técnica · Rediseño UX/UI',
      title: 'Rediseño UX/UI de Netelip',
      description: 'Propuesta de rediseño de la página web de Netelip desarrollada como parte de un proceso de selección. El objetivo fue modernizar la interfaz y mejorar la experiencia del usuario mediante una estructura más clara y una identidad visual renovada.',
      role: 'UX Research, UX/UI Design, Wireframing, Prototipado, Diseño Responsive',
      tools: 'Figma, Framer, Adobe Illustrator, Adobe Photoshop',
      sections: [
        { heading: 'Objetivo', type: 'text', content: 'Rediseñar una página web con una interfaz obsoleta, sin una jerarquía visual definida y con pocos elementos representativos de la marca, creando una experiencia más intuitiva, atractiva y funcional.' },
        { heading: 'Problemas identificados', type: 'list', content: [
          'Diseño visual desactualizado.',
          'Falta de jerarquía visual.',
          'Navegación poco intuitiva.',
          'Escasa identidad de marca.',
          'Distribución del contenido poco organizada.',
        ] },
        { heading: 'Solución', type: 'text', content: 'Diseñé una nueva interfaz con una estructura más limpia, mejor organización del contenido, una jerarquía visual clara y una identidad gráfica más consistente, priorizando la usabilidad y la experiencia del usuario.' },
        { heading: 'Resultado', type: 'text', content: 'Una propuesta de diseño moderna, funcional y alineada con las necesidades actuales de los usuarios, demostrando mi capacidad para analizar un producto digital e implementar mejoras enfocadas en la experiencia de usuario.' },
      ],
      previewImage: 'assets/proyectos%20port/netelIp/mockup%201.png',
      galleries: [
        {
          label: 'Mockups',
          items: [
            { src: 'assets/proyectos%20port/netelIp/mockup%201.png', alt: 'Mockup del sitio Netelip en laptop, vista de inicio' },
            { src: 'assets/proyectos%20port/netelIp/mockup2.png', alt: 'Mockup del sitio Netelip en laptop, sección de servicios' },
          ],
        },
        {
          label: 'Capturas del sitio',
          items: [
            { src: 'assets/proyectos%20port/netelIp/home.png', alt: 'Página de inicio rediseñada de Netelip' },
            { src: 'assets/proyectos%20port/netelIp/servicios.png', alt: 'Página de servicios de Netelip' },
            { src: 'assets/proyectos%20port/netelIp/Tarifas.png', alt: 'Página de tarifas de Netelip' },
            { src: 'assets/proyectos%20port/netelIp/software.png', alt: 'Página de software de Netelip' },
          ],
        },
      ],
    },
    2: {
      tag: 'Proyecto profesional · Diseño Digital',
      title: 'Proyecto Repsol',
      description: 'Participé durante varios meses en un proyecto para Repsol desarrollando diferentes soluciones de diseño para comunicación digital y marketing. Mi trabajo abarcó diseño web, identidad visual, producción de contenido audiovisual y piezas gráficas, adaptando cada entrega a los lineamientos de la marca y a las necesidades de cada campaña.',
      role: 'UI Design, Diseño Web, Diseño Gráfico, Branding, Edición de Video, Motion Graphics, Diseño para Marketing Digital',
      tools: 'Figma, Adobe Illustrator, Adobe Photoshop, Adobe After Effects, Adobe Premiere Pro',
      sections: [
        { heading: 'Objetivo', type: 'text', content: 'Diseñar y producir materiales digitales consistentes con la identidad de Repsol, creando soluciones visuales para distintos canales de comunicación que fortalecieran la presencia de la marca y mejoraran la experiencia de los usuarios.' },
        { heading: 'Principales actividades', type: 'list', content: [
          'Diseño y actualización de páginas web.',
          'Creación y adaptación de logotipos e identidades visuales.',
          'Producción y edición de videos corporativos y promocionales.',
          'Diseño de banners y piezas gráficas para campañas digitales.',
          'Desarrollo de recursos visuales para diferentes plataformas y formatos.',
          'Adaptación de diseños siguiendo los lineamientos de marca.',
        ] },
        { heading: 'Solución', type: 'text', content: 'Desarrollé soluciones visuales para diferentes necesidades de comunicación, garantizando coherencia gráfica entre los distintos canales, optimizando la calidad de los materiales entregados y manteniendo una identidad visual consistente en cada pieza.' },
        { heading: 'Resultado', type: 'text', content: 'Contribuí al desarrollo de múltiples entregables digitales para Repsol, participando en proyectos de diseño web, branding y contenido audiovisual. Esta experiencia fortaleció mi capacidad para trabajar en proyectos corporativos, colaborar con equipos multidisciplinarios y adaptarme a distintos retos de diseño dentro de una misma marca.' },
      ],
      previewImage: 'assets/proyectos%20port/repsol/imagenEditada1.jpg',
      galleries: [
        {
          label: 'Mockups',
          items: [
            { src: 'assets/proyectos%20port/repsol/mockup%20pc.png', alt: 'Mockup del sitio Repsol en laptop' },
            { src: 'assets/proyectos%20port/repsol/mockup2.png', alt: 'Mockup del sitio Repsol en celular' },
          ],
        },
        {
          label: 'Branding',
          items: [
            { src: 'assets/proyectos%20port/repsol/branding.png', alt: 'Exploración de logotipo e identidad visual de Repsol' },
            { src: 'assets/proyectos%20port/repsol/moodboard.png', alt: 'Moodboard de marca de Repsol' },
          ],
        },
        {
          label: 'Diseño Web',
          items: [
            { src: 'assets/proyectos%20port/repsol/web/homeweb.png', alt: 'Página de inicio del sitio web de Repsol' },
            { src: 'assets/proyectos%20port/repsol/web/productosweb.png', alt: 'Página de productos del sitio web de Repsol' },
            { src: 'assets/proyectos%20port/repsol/web/recompensasweb.png', alt: 'Página de recompensas del sitio web de Repsol' },
          ],
        },
        {
          label: 'Capturas de la app',
          items: [
            { src: 'assets/proyectos%20port/repsol/web/movil1.jpg', alt: 'Captura móvil de la app de Repsol 1' },
            { src: 'assets/proyectos%20port/repsol/web/movil2.jpg', alt: 'Captura móvil de la app de Repsol 2' },
            { src: 'assets/proyectos%20port/repsol/web/movil3.jpg', alt: 'Captura móvil de la app de Repsol 3' },
            { src: 'assets/proyectos%20port/repsol/web/movil4.jpg', alt: 'Captura móvil de la app de Repsol 4' },
          ],
        },
        {
          label: 'Piezas gráficas',
          items: [
            { src: 'assets/proyectos%20port/repsol/imagenEditada1.jpg', alt: 'Pieza gráfica de estación de servicio Repsol' },
            { src: 'assets/proyectos%20port/repsol/ImagenEditada2.jpg', alt: 'Pieza gráfica de equipo Repsol para redes sociales' },
          ],
        },
      ],
    },
    3: {
      tag: 'Proyecto académico · UX Research',
      title: 'Phishing Academy',
      description: 'Phishing Academy es una propuesta de videojuego serio (serious game) diseñada para fortalecer la concienciación en ciberseguridad dentro de las organizaciones. El proyecto consistió en transformar un conjunto de requerimientos funcionales y de negocio en una experiencia interactiva, accesible desde web y dispositivos móviles, donde los empleados aprenden a identificar intentos de phishing mediante retos cortos, retroalimentación inmediata y mecánicas de gamificación.',
      role: 'UX Research, Análisis de requerimientos, Arquitectura de información, Wireframing, User Flows',
      tools: 'Figma, UX Research, Wireframing, User Flows, Requirement Analysis, Information Architecture',
      sections: [
        {
          heading: 'El problema',
          type: 'text',
          content: 'Muchas organizaciones continúan siendo vulnerables a ataques de phishing debido a que los colaboradores tienen dificultades para distinguir entre correos legítimos y fraudulentos. Los programas tradicionales de capacitación suelen resultar poco atractivos, reduciendo la participación y el aprendizaje efectivo.',
        },
        {
          heading: 'El objetivo',
          type: 'list',
          content: [
            'Aprender mediante micro-retos interactivos.',
            'Incrementar la participación usando gamificación.',
            'Medir el progreso individual y grupal.',
            'Facilitar la gestión de campañas para instructores.',
            'Garantizar accesibilidad y seguridad durante toda la experiencia.',
          ],
        },
        {
          heading: 'Mi proceso',
          type: 'text',
          content: 'Investigación: análisis del brief, identificación de stakeholders y priorización de necesidades. Arquitectura: definición del flujo principal de navegación considerando dos perfiles, empleado e instructor. Wireframing: diseño de las principales pantallas (inicio de sesión, menú principal, misiones, micro-retos, retroalimentación, progreso y panel del instructor).',
        },
        {
          heading: 'Decisiones de diseño',
          type: 'list',
          content: [
            'Navegación simple y rápida.',
            'Sesiones cortas adaptadas al tiempo laboral.',
            'Retroalimentación inmediata después de cada reto.',
            'Progresión mediante niveles e insignias.',
            'Accesibilidad para teclado y lectores de pantalla.',
            'Privacidad de la información mostrada en reportes.',
          ],
        },
        {
          heading: 'Funcionalidades principales',
          type: 'list',
          content: [
            'Inicio de sesión multiplataforma.',
            'Misiones de detección de phishing.',
            'Retroalimentación instantánea.',
            'Sistema de niveles.',
            'Insignias.',
            'Seguimiento del progreso.',
            'Reportes para instructores.',
            'Gestión de campañas.',
            'Comparación del desempeño antes y después de la capacitación.',
          ],
        },
        {
          heading: 'Resultado',
          type: 'text',
          content: 'Se desarrolló una propuesta completa de experiencia de usuario traduciendo requerimientos de negocio y necesidades de distintos stakeholders en un conjunto coherente de wireframes para una plataforma educativa de ciberseguridad. El proyecto demuestra la capacidad de convertir problemas complejos en soluciones centradas en el usuario, considerando accesibilidad, usabilidad y objetivos organizacionales.',
        },
      ],
      previewImage: 'assets/proyectos%20port/phishing%20App/phisingapp/mockup2.png',
      galleries: [
        {
          label: 'Mockups',
          items: [
            { src: 'assets/proyectos%20port/phishing%20App/phisingapp/mockup1.png', alt: 'Mockup de tablet mostrando la pantalla de progreso de Phishing Academy' },
            { src: 'assets/proyectos%20port/phishing%20App/phisingapp/mockup2.png', alt: 'Mockup de tablet mostrando una misión de detección de phishing' },
          ],
        },
        {
          label: 'Vista estudiante',
          items: [
            { src: 'assets/proyectos%20port/phishing%20App/phisingapp/LOGIN.png', alt: 'Pantalla de inicio de sesión de Phishing Academy' },
            { src: 'assets/proyectos%20port/phishing%20App/phisingapp/home.png', alt: 'Menú principal del estudiante en Phishing Academy' },
            { src: 'assets/proyectos%20port/phishing%20App/phisingapp/misiones.png', alt: 'Pantalla de misión con bandeja de entrada sospechosa' },
            { src: 'assets/proyectos%20port/phishing%20App/phisingapp/mision1.png', alt: 'Pantalla de misión con panel de análisis de correo' },
            { src: 'assets/proyectos%20port/phishing%20App/phisingapp/mision resultados.png', alt: 'Pantalla de retroalimentación tras completar un reto' },
            { src: 'assets/proyectos%20port/phishing%20App/phisingapp/progreso.png', alt: 'Pantalla de progreso, niveles e insignias del estudiante' },
          ],
        },
        {
          label: 'Vista docente',
          items: [
            { src: 'assets/proyectos%20port/phishing%20App/phisingapp/vista docente.png', alt: 'Panel del instructor con el progreso de los estudiantes' },
          ],
        },
      ],
    },
    4: {
      tag: 'Proyecto académico · UX/UI · Transmedia · AR',
      title: 'Proyecto Niebla',
      description: 'Experiencia transmedia diseñada para sensibilizar sobre la importancia de los páramos andinos mediante una novela gráfica interactiva en la web y un simulador en Realidad Aumentada en aplicación móvil, donde las decisiones del usuario modifican el estado del ecosistema.',
      role: 'UX Research, Arquitectura de la experiencia, Wireframing, Diseño de experiencia transmedia',
      tools: 'Figma, UX Research, Wireframing, User Flows, Information Architecture, Storytelling, Gamificación, Diseño de experiencias inmersivas',
      sections: [
        {
          heading: 'El problema',
          type: 'text',
          content: 'Aunque los páramos son fundamentales para la regulación del agua y el equilibrio ambiental, existe un bajo nivel de conocimiento sobre su importancia y las consecuencias que tienen las actividades humanas sobre estos ecosistemas. Los métodos tradicionales de educación ambiental suelen ser poco inmersivos, limitando el aprendizaje y el compromiso de los usuarios.',
        },
        {
          heading: 'El objetivo',
          type: 'list',
          content: [
            'Educar sobre la conservación del páramo andino.',
            'Generar conciencia mediante la toma de decisiones.',
            'Integrar narrativa, gamificación y Realidad Aumentada.',
            'Mostrar de forma visual las consecuencias de cada decisión.',
            'Incrementar la participación mediante una experiencia inmersiva.',
          ],
        },
        {
          heading: 'Investigación',
          type: 'list',
          content: [
            'Análisis del problema ambiental.',
            'Definición del público objetivo.',
            'Investigación sobre narrativa interactiva.',
            'Identificación del recorrido transmedia.',
            'Planeación de la experiencia de usuario.',
          ],
        },
        {
          heading: 'Arquitectura de la experiencia',
          type: 'text',
          content: 'Se diseñó una experiencia dividida en dos plataformas conectadas. El sitio web presenta la introducción narrativa, la contextualización del ecosistema y el conflicto ambiental. Desde ahí, la experiencia continúa en la aplicación móvil con el simulador en Realidad Aumentada, la exploración del ecosistema, el sistema de decisiones, las misiones, los indicadores ambientales y finales dinámicos según las acciones del usuario.',
        },
        {
          heading: 'Wireframing',
          type: 'list',
          content: [
            'Pantalla de inicio.',
            'Menú principal.',
            'Novela gráfica interactiva.',
            'Simulador en Realidad Aumentada.',
            'Panel de decisiones.',
            'Sistema de misiones.',
            'Estado del ecosistema.',
            'Pantalla de resultados.',
          ],
        },
        {
          heading: 'Decisiones de diseño',
          type: 'list',
          content: [
            'Una narrativa progresiva para facilitar el aprendizaje.',
            'Retroalimentación visual inmediata ante cada decisión.',
            'Múltiples finales para fomentar la exploración.',
            'Una experiencia inmersiva apoyada en sonidos y elementos visuales.',
            'Navegación sencilla entre la plataforma web y la aplicación móvil.',
            'Indicadores ambientales fáciles de interpretar.',
          ],
        },
        {
          heading: 'Funcionalidades principales',
          type: 'list',
          content: [
            'Narrativa interactiva tipo novela gráfica.',
            'Experiencia transmedia (web + móvil).',
            'Simulador en Realidad Aumentada.',
            'Sistema de decisiones.',
            'Cambios dinámicos en el ecosistema.',
            'Misiones educativas.',
            'Indicadores de biodiversidad, agua y niebla.',
            'Múltiples finales según las decisiones del usuario.',
          ],
        },
        {
          heading: 'Resultado',
          type: 'text',
          content: 'Se desarrolló una propuesta de experiencia transmedia que combina narrativa interactiva y Realidad Aumentada para transformar un proceso de aprendizaje ambiental en una experiencia participativa. El diseño permite que los usuarios comprendan el impacto de sus decisiones sobre el ecosistema mediante cambios visuales, misiones y diferentes desenlaces, promoviendo un aprendizaje más significativo y memorable.',
        },
        {
          heading: 'Lo que demuestra este proyecto',
          type: 'list',
          content: [
            'Diseño UX/UI.',
            'Arquitectura de información.',
            'Diseño de experiencias transmedia.',
            'Storytelling interactivo.',
            'Gamificación.',
            'Diseño para Realidad Aumentada.',
            'Diseño centrado en el usuario.',
            'Pensamiento sistémico.',
          ],
        },
      ],
      previewImage: 'assets/proyectos%20port/Proyecto%20Niebla/mockup%20tablet1.png',
      galleries: [
        {
          label: 'Mockups',
          items: [
            { src: 'assets/proyectos%20port/Proyecto%20Niebla/mockup%20tablet1.png', alt: 'Mockup de tablet mostrando la pantalla de inicio de Proyecto Niebla' },
            { src: 'assets/proyectos%20port/Proyecto%20Niebla/mockup%20tablet2.png', alt: 'Mockup de tablet mostrando la novela gráfica interactiva' },
            { src: 'assets/proyectos%20port/Proyecto%20Niebla/mockup%20movil1.png', alt: 'Mockup de móvil mostrando la activación del simulador en Realidad Aumentada' },
            { src: 'assets/proyectos%20port/Proyecto%20Niebla/mockup%20movil2.png', alt: 'Mockup de móvil mostrando el panel de decisiones' },
          ],
        },
        {
          label: 'Novela gráfica interactiva (web)',
          items: [
            { src: 'assets/proyectos%20port/Proyecto%20Niebla/HOME.png', alt: 'Pantalla de inicio del sitio web de Proyecto Niebla' },
            { src: 'assets/proyectos%20port/Proyecto%20Niebla/HISTORIA%201.png', alt: 'Pantalla de la novela gráfica: El Equilibrio Frágil' },
            { src: 'assets/proyectos%20port/Proyecto%20Niebla/HISTORIA%202.png', alt: 'Pantalla de la novela gráfica interactiva' },
            { src: 'assets/proyectos%20port/Proyecto%20Niebla/HISTORIA%203.png', alt: 'Pantalla de la novela gráfica interactiva' },
          ],
        },
        {
          label: 'Simulador en Realidad Aumentada (móvil)',
          items: [
            { src: 'assets/proyectos%20port/Proyecto%20Niebla/movil1.png', alt: 'Pantalla de activación del simulador de Realidad Aumentada' },
            { src: 'assets/proyectos%20port/Proyecto%20Niebla/Copia%20de%20movil2.png', alt: 'Vista del ecosistema proyectado en Realidad Aumentada' },
            { src: 'assets/proyectos%20port/Proyecto%20Niebla/decisiones.png', alt: 'Panel de decisiones dentro del simulador de Realidad Aumentada' },
            { src: 'assets/proyectos%20port/Proyecto%20Niebla/misiones.png', alt: 'Panel de misiones dentro del simulador de Realidad Aumentada' },
            { src: 'assets/proyectos%20port/Proyecto%20Niebla/estadisticas.png', alt: 'Panel de indicadores del ecosistema en el simulador de Realidad Aumentada' },
          ],
        },
      ],
    },
    5: {
      tag: 'Diseño Editorial',
      title: 'Nombre del proyecto',
      description: 'Breve descripción del reto, tu rol y el resultado obtenido.',
      role: 'Por definir',
      tools: 'Por definir',
      previewClass: 'project-card__preview--e',
    },
    6: {
      tag: 'Desarrollo Web',
      title: 'Nombre del proyecto',
      description: 'Breve descripción del reto, tu rol y el resultado obtenido.',
      role: 'Por definir',
      tools: 'Por definir',
      previewClass: 'project-card__preview--f',
    },
  };

  const modal = document.getElementById('projectModal');
  const modalPreview = document.getElementById('projectModalPreview');
  const modalTag = document.getElementById('projectModalTag');
  const modalTitle = document.getElementById('projectModalTitle');
  const modalDescription = document.getElementById('projectModalDescription');
  const modalRole = document.getElementById('projectModalRole');
  const modalTools = document.getElementById('projectModalTools');
  const modalSections = document.getElementById('projectModalSections');
  const modalGalleries = document.getElementById('projectModalGalleries');
  let lastFocusedEl = null;

  const renderSections = (container, sections) => {
    container.innerHTML = '';
    if (!sections || !sections.length) return;

    sections.forEach((section) => {
      const sectionEl = document.createElement('div');
      sectionEl.className = 'project-modal__section';

      const heading = document.createElement('h4');
      heading.textContent = section.heading;
      sectionEl.appendChild(heading);

      if (section.type === 'list') {
        const list = document.createElement('ul');
        list.className = 'project-modal__list';
        section.content.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item;
          list.appendChild(li);
        });
        sectionEl.appendChild(list);
      } else {
        const p = document.createElement('p');
        p.textContent = section.content;
        sectionEl.appendChild(p);
      }

      container.appendChild(sectionEl);
    });
  };

  const renderGalleries = (container, galleries) => {
    container.innerHTML = '';
    if (!galleries || !galleries.length) return;

    galleries.forEach((group) => {
      const groupEl = document.createElement('div');
      groupEl.className = 'project-modal__gallery-group';

      const heading = document.createElement('h4');
      heading.textContent = group.label;
      groupEl.appendChild(heading);

      const grid = document.createElement('div');
      grid.className = 'project-modal__gallery';
      group.items.forEach((item) => {
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt || '';
        img.loading = 'lazy';
        grid.appendChild(img);
      });
      groupEl.appendChild(grid);

      container.appendChild(groupEl);
    });
  };

  const openProjectModal = (id) => {
    const data = projectsData[id];
    if (!data || !modal) return;

    if (data.previewImage) {
      modalPreview.className = 'project-modal__preview';
      modalPreview.style.backgroundImage = `url("${data.previewImage}")`;
    } else {
      modalPreview.className = 'project-modal__preview ' + data.previewClass;
      modalPreview.style.backgroundImage = '';
    }

    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalRole.textContent = data.role;
    modalTools.textContent = data.tools;

    renderSections(modalSections, data.sections);
    renderGalleries(modalGalleries, data.galleries);

    lastFocusedEl = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    modal.querySelector('.project-modal__close').focus();
  };

  const closeProjectModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (lastFocusedEl) lastFocusedEl.focus();
  };

  document.querySelectorAll('.project-card[data-project]').forEach((card) => {
    card.addEventListener('click', () => openProjectModal(card.dataset.project));
  });

  document.querySelectorAll('[data-project-close]').forEach((el) => {
    el.addEventListener('click', closeProjectModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeProjectModal();
  });
})();
