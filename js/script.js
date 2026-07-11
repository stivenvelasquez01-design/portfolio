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
      theme: { primary: '#1C86F2', secondary: '#0A1F45' },
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
      previewImage: 'assets/proyectos%20port/netelIp/Portada%20netelIP.png',
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
      theme: { primary: '#E0592D', secondary: '#1F3A5F' },
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
      previewImage: 'assets/proyectos%20port/repsol/portada%20repsol.png',
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
      theme: { primary: '#3D5AFE', secondary: '#0B1230' },
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
      previewImage: 'assets/proyectos%20port/phishing%20App/portada%20phishing.png',
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
      theme: { primary: '#7FA88F', secondary: '#16241C' },
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
      previewImage: 'assets/proyectos%20port/Proyecto%20Niebla/portada%20niebla.png',
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
      theme: { primary: '#D4A544', secondary: '#0C1B33' },
      tag: 'Proyecto profesional · UX/UI · Diseño web',
      title: 'US Legal Group',
      description: 'Diseño y desarrollo de la experiencia de usuario para el sitio web de US Legal Group, una firma de abogados especializada en procesos migratorios en Estados Unidos, orientado a la comunidad latina.',
      role: 'UX/UI Design, Arquitectura de información, Diseño responsive, Prototipado',
      tools: 'Figma, UX/UI Design, Information Architecture, Responsive Design, Prototipado, Diseño Web',
      sections: [
        {
          heading: 'El problema',
          type: 'text',
          content: 'Muchas personas que buscan asesoría migratoria enfrentan incertidumbre y estrés durante su proceso. Además, los sitios web de este sector suelen presentar exceso de información, navegación poco intuitiva o falta de claridad sobre los servicios ofrecidos, dificultando que los usuarios encuentren rápidamente la ayuda que necesitan.',
        },
        {
          heading: 'El objetivo',
          type: 'list',
          content: [
            'Generar confianza desde el primer contacto.',
            'Explicar los servicios legales de forma clara y organizada.',
            'Facilitar la solicitud de asesorías y consultas.',
            'Mejorar la navegación para usuarios con diferentes niveles de alfabetización digital.',
            'Adaptar la experiencia a un público latino residente en Estados Unidos.',
          ],
        },
        {
          heading: 'Investigación',
          type: 'list',
          content: [
            'Comprensión del público objetivo.',
            'Análisis de las necesidades del cliente.',
            'Organización de la información y los servicios legales.',
            'Definición de la estructura de navegación.',
          ],
        },
        {
          heading: 'Arquitectura de información',
          type: 'list',
          content: [
            'Inicio.',
            'Servicios.',
            'Sobre nosotros.',
            'Proceso de atención.',
            'Preguntas frecuentes.',
            'Contacto.',
          ],
        },
        {
          heading: 'Diseño UX/UI',
          type: 'text',
          content: 'Se desarrolló una interfaz centrada en la confianza y la claridad, utilizando una jerarquía visual que guiara al usuario durante todo el recorrido. Se priorizó: llamadas a la acción visibles, navegación intuitiva, diseño responsive, contenido fácil de comprender e identidad visual profesional.',
        },
        {
          heading: 'Decisiones de diseño',
          type: 'list',
          content: [
            'Transmitir seguridad y profesionalismo mediante una identidad visual sobria.',
            'Reducir la carga cognitiva organizando la información por secciones.',
            'Destacar los principales servicios mediante bloques visuales.',
            'Facilitar el contacto mediante llamadas a la acción estratégicamente ubicadas.',
            'Garantizar una experiencia consistente en dispositivos móviles y de escritorio.',
          ],
        },
        {
          heading: 'Funcionalidades principales',
          type: 'list',
          content: [
            'Presentación de servicios migratorios.',
            'Información sobre la firma y el equipo legal.',
            'Formularios de contacto.',
            'Navegación responsive.',
            'Llamados a la acción para solicitar asesorías.',
            'Organización clara de la información jurídica.',
          ],
        },
        {
          heading: 'Resultado',
          type: 'text',
          content: 'Se diseñó una página web moderna y orientada a la conversión, facilitando que potenciales clientes comprendieran los servicios ofrecidos y pudieran contactar fácilmente con la firma. La propuesta mejoró la organización del contenido, fortaleció la percepción de confianza y ofreció una experiencia de navegación clara para un público diverso, especialmente la comunidad latina en Estados Unidos.',
        },
      ],
      previewImage: 'assets/proyectos%20port/proyecto%20us%20legal/portada%20legal.png',
      galleries: [
        {
          label: 'Mockups',
          items: [
            { src: 'assets/proyectos%20port/proyecto%20us%20legal/mockup1.png', alt: 'Mockup de escritorio mostrando la página de inicio de US Legal Group' },
            { src: 'assets/proyectos%20port/proyecto%20us%20legal/mockup2.png', alt: 'Mockup de escritorio mostrando la página de servicios de US Legal Group' },
          ],
        },
        {
          label: 'Páginas del sitio web',
          items: [
            { src: 'assets/proyectos%20port/proyecto%20us%20legal/home.png', alt: 'Página de inicio del sitio web de US Legal Group' },
            { src: 'assets/proyectos%20port/proyecto%20us%20legal/servicios.png', alt: 'Página de servicios migratorios de US Legal Group' },
            { src: 'assets/proyectos%20port/proyecto%20us%20legal/sobre%20nosotros.png', alt: 'Página Sobre Nosotros de US Legal Group' },
            { src: 'assets/proyectos%20port/proyecto%20us%20legal/casos.png', alt: 'Página de Casos de Éxito de US Legal Group' },
            { src: 'assets/proyectos%20port/proyecto%20us%20legal/blog.png', alt: 'Página de blog de US Legal Group' },
            { src: 'assets/proyectos%20port/proyecto%20us%20legal/FAQ.png', alt: 'Página de preguntas frecuentes de US Legal Group' },
            { src: 'assets/proyectos%20port/proyecto%20us%20legal/contacto.png', alt: 'Página de contacto con formulario de solicitud de evaluación de caso' },
          ],
        },
      ],
    },
    6: {
      theme: { primary: '#D43A84', secondary: '#472458' },
      tag: 'Proyecto académico · Branding · Identidad Visual · Estrategia Digital',
      title: 'Voltix Energy',
      description: 'Voltix Energy es una marca conceptual de bebida energética desarrollada para conectar con jóvenes apasionados por el deporte, la actividad física y las tendencias digitales, con una identidad de marca completa y su aplicación en estrategia digital.',
      role: 'Branding, Identidad Visual, Estrategia Digital, Social Media Design',
      tools: 'Adobe Illustrator, Adobe Photoshop, Figma, Branding, Diseño Editorial, Social Media Design, Identidad Visual',
      sections: [
        {
          heading: 'El problema',
          type: 'text',
          content: 'El mercado de las bebidas energéticas es altamente competitivo y muchas marcas comunican mensajes similares, dificultando la diferenciación y la conexión emocional con el público. El reto era construir una identidad visual moderna y memorable que transmitiera energía, motivación y pasión deportiva, además de generar una presencia digital consistente.',
        },
        {
          heading: 'El objetivo',
          type: 'list',
          content: [
            'Transmitir energía, concentración y motivación.',
            'Conectar con un público joven y digital.',
            'Diferenciarse mediante una propuesta visual moderna.',
            'Mantener coherencia en todos los canales de comunicación.',
            'Fortalecer el posicionamiento de la marca mediante una estrategia digital.',
          ],
        },
        {
          heading: 'Investigación',
          type: 'list',
          content: [
            'Definición del público objetivo.',
            'Análisis del mercado de bebidas energéticas.',
            'Construcción del concepto de marca.',
            'Definición del tono visual y comunicativo.',
          ],
        },
        {
          heading: 'Branding',
          type: 'list',
          content: [
            'Naming.',
            'Logotipo.',
            'Isotipo.',
            'Sistema visual.',
            'Paleta de color.',
            'Tipografía.',
            'Manual de marca.',
          ],
        },
        {
          heading: 'Estrategia digital',
          type: 'list',
          content: [
            'Identidad para Instagram.',
            'Diseño del feed.',
            'Contenido promocional.',
            'Campaña temática inspirada en el Mundial 2026.',
            'Aplicaciones gráficas para diferentes soportes.',
          ],
        },
        {
          heading: 'Decisiones de diseño',
          type: 'list',
          content: [
            'Una identidad visual moderna inspirada en el deporte y la cultura digital.',
            'Una paleta cromática con predominio del fucsia para mejorar el reconocimiento de marca.',
            'Un sistema gráfico adaptable a medios digitales y físicos.',
            'Consistencia visual en redes sociales, merchandising y piezas promocionales.',
            'Una narrativa de marca centrada en la energía, la pasión y la superación.',
          ],
        },
        {
          heading: 'Entregables',
          type: 'list',
          content: [
            'Naming de marca.',
            'Identidad visual.',
            'Manual de marca.',
            'Diseño del empaque.',
            'Edición especial Mundial 2026.',
            'Perfil y estrategia para Instagram.',
            'Diseño de feed.',
            'Merchandising.',
            'Papelería corporativa.',
            'Landing Page.',
            'Video corporativo.',
            'Video animado.',
          ],
        },
        {
          heading: 'Resultado',
          type: 'text',
          content: 'Se desarrolló una propuesta integral de branding para una bebida energética, construyendo una identidad visual sólida y una estrategia digital coherente que permite a la marca mantener una presencia consistente en diferentes canales y aplicaciones. El proyecto demuestra cómo una identidad bien estructurada puede extenderse desde el diseño del producto hasta la comunicación en redes sociales y materiales promocionales.',
        },
      ],
      previewImage: 'assets/proyectos%20port/voltix/producto.png',
      galleries: [
        {
          label: 'Concepto y producto',
          items: [
            { src: 'assets/proyectos%20port/voltix/portada.png', alt: 'Portada de la presentación de Voltix Energy con la lata del producto' },
            { src: 'assets/proyectos%20port/voltix/producto.png', alt: 'Fotografía de producto de la lata Voltix Energy' },
          ],
        },
        {
          label: 'Identidad visual · Manual de marca',
          items: [
            { src: 'assets/proyectos%20port/voltix/logotipo.png', alt: 'Manual de marca mostrando el logotipo de Voltix Energy y sus versiones de uso' },
            { src: 'assets/proyectos%20port/voltix/color-tipografia.png', alt: 'Manual de marca mostrando la paleta de color y la tipografía de Voltix Energy' },
          ],
        },
        {
          label: 'Edición especial Mundial 2026',
          items: [
            { src: 'assets/proyectos%20port/voltix/etiqueta-mundial.png', alt: 'Etiqueta de la edición especial Mundial 2026 de Voltix Energy' },
            { src: 'assets/proyectos%20port/voltix/ig%20feed/Mesa%20de%20trabajo%203.png', alt: 'Pieza promocional de la edición Mundial 2026 con el trofeo FIFA' },
          ],
        },
        {
          label: 'Estrategia digital · Instagram',
          items: [
            { src: 'assets/proyectos%20port/voltix/perfil-instagram.png', alt: 'Perfil de Instagram @voltixenergy' },
            { src: 'assets/proyectos%20port/voltix/Voltix_Feed%20Instagram.png', alt: 'Feed de Instagram de Voltix Energy con piezas de campaña' },
            { src: 'assets/proyectos%20port/voltix/Voltix_Feed%20Instagram%202.png', alt: 'Perfil de Instagram de Voltix Energy con la cuadrícula de posts' },
          ],
        },
        {
          label: 'Piezas de campaña',
          items: [
            { src: 'assets/proyectos%20port/voltix/ig%20feed/Mesa%20de%20trabajo%202.png', alt: 'Pieza de campaña: mano sosteniendo una lata de Voltix Energy' },
            { src: 'assets/proyectos%20port/voltix/ig%20feed/Mesa%20de%20trabajo%207.png', alt: 'Pieza de campaña: futbolista celebrando, Tu pasión, tu energía, tu momento' },
            { src: 'assets/proyectos%20port/voltix/ig%20feed/Mesa%20de%20trabajo%208.png', alt: 'Pieza de campaña: skater y futbolista junto a una lata de Voltix Energy' },
            { src: 'assets/proyectos%20port/voltix/ig%20feed/Mesa%20de%20trabajo%204.png', alt: 'Pieza de campaña: evento Voltix Run 5K en Bogotá' },
            { src: 'assets/proyectos%20port/voltix/ig%20feed/Mesa%20de%20trabajo%205.png', alt: 'Pieza de campaña: No Days Off con atleta femenina' },
            { src: 'assets/proyectos%20port/voltix/ig%20feed/Mesa%20de%20trabajo%206.png', alt: 'Pieza de campaña: influencer sosteniendo una lata de Voltix Energy' },
            { src: 'assets/proyectos%20port/voltix/ig%20feed/Mesa%20de%20trabajo%209.png', alt: 'Fotografía de producto de la lata Voltix Energy sobre fondo negro' },
          ],
        },
        {
          label: 'Aplicaciones de marca',
          items: [
            { src: 'assets/proyectos%20port/voltix/merchandising.png', alt: 'Aplicaciones de marca: camiseta, termo, hoja membreteada, llavero, libreta y gorra de Voltix Energy' },
          ],
        },
      ],
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

  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  let lastFocusedBeforeLightbox = null;

  const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lastFocusedBeforeLightbox = document.activeElement;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.querySelector('.lightbox__close').focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    if (lastFocusedBeforeLightbox) lastFocusedBeforeLightbox.focus();
  };

  if (lightbox) {
    lightbox.querySelectorAll('[data-lightbox-close]').forEach((el) => {
      el.addEventListener('click', closeLightbox);
    });
  }

  const renderChips = (container, value) => {
    container.innerHTML = '';
    if (!value) return;
    value.split(',').forEach((item) => {
      const chip = document.createElement('span');
      chip.className = 'project-modal__chip';
      chip.textContent = item.trim();
      container.appendChild(chip);
    });
  };

  const renderSections = (container, sections) => {
    container.innerHTML = '';
    if (!sections || !sections.length) return;

    sections.forEach((section, index) => {
      const sectionEl = document.createElement('div');
      sectionEl.className = 'project-modal__section' + (index % 2 === 1 ? ' project-modal__section--tint' : '');

      const headingRow = document.createElement('div');
      headingRow.className = 'project-modal__section-head';

      const number = document.createElement('span');
      number.className = 'project-modal__section-index';
      number.textContent = String(index + 1).padStart(2, '0');
      headingRow.appendChild(number);

      const heading = document.createElement('h4');
      heading.textContent = section.heading;
      headingRow.appendChild(heading);

      sectionEl.appendChild(headingRow);

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
        img.addEventListener('click', () => openLightbox(item.src, item.alt || ''));
        grid.appendChild(img);
      });
      groupEl.appendChild(grid);

      container.appendChild(groupEl);
    });
  };

  const openProjectModal = (id) => {
    const data = projectsData[id];
    if (!data || !modal) return;

    if (data.theme) {
      modal.style.setProperty('--proj-primary', data.theme.primary);
      modal.style.setProperty('--proj-secondary', data.theme.secondary);
    }

    modalPreview.style.backgroundImage = data.previewImage ? `url("${data.previewImage}")` : '';

    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    renderChips(modalRole, data.role);
    renderChips(modalTools, data.tools);

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

  // CV modal
  const cvModal = document.getElementById('cvModal');

  const openCvModal = () => {
    lastFocusedEl = document.activeElement;
    cvModal.classList.add('is-open');
    cvModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    cvModal.querySelector('.cv-modal__close').focus();
  };

  const closeCvModal = () => {
    cvModal.classList.remove('is-open');
    cvModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (lastFocusedEl) lastFocusedEl.focus();
  };

  document.querySelectorAll('[data-cv-trigger]').forEach((el) => {
    el.addEventListener('click', openCvModal);
  });

  document.querySelectorAll('[data-cv-close]').forEach((el) => {
    el.addEventListener('click', closeCvModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (lightbox && lightbox.classList.contains('is-open')) {
      closeLightbox();
    } else if (cvModal && cvModal.classList.contains('is-open')) {
      closeCvModal();
    } else if (modal.classList.contains('is-open')) {
      closeProjectModal();
    }
  });
})();
