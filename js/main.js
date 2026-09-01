/* ═══════════════════════════════════════════════════════
   DON.DEV — Main Script
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Scroll Reveal ───
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  // ─── Navbar Scroll Effect ───
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });


  // ─── Mobile Nav Toggle ───
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // ─── Smooth Scroll for Anchor Links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ─── Active Nav Link Highlight ───
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  const activateNav = () => {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', activateNav, { passive: true });


  // ─── Portrait Mouse Parallax ───
  const portraitFrame = document.querySelector('.portrait-frame');
  const portraitImg   = portraitFrame?.querySelector('.portrait-img');
  const portraitRing  = portraitFrame?.querySelector('.portrait-grid-lines');

  if (portraitFrame && portraitImg && window.matchMedia('(pointer: fine)').matches) {
    portraitFrame.addEventListener('mousemove', (e) => {
      const rect = portraitFrame.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width  - 0.5;
      const ny = (e.clientY - rect.top)  / rect.height - 0.5;
      const maxShift = 10;

      portraitImg.style.transform =
        `translate3d(calc(-50% + ${nx * maxShift}px), ${ny * maxShift}px, 0)`;

      if (portraitRing) {
        portraitRing.style.transform = `translate3d(${nx * -6}px, ${ny * -6}px, 0)`;
      }
    });

    portraitFrame.addEventListener('mouseleave', () => {
      portraitImg.style.transform = 'translate3d(-50%, 0, 0)';
      if (portraitRing) portraitRing.style.transform = '';
    });
  }

});
/* ═══════════════════════════════════════════════════════
   PORTFOLIO AI CHATBOT
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  const WORKER_URL =
    'https://esmeraldo-portfolio-ai.esmeraldoinciso-main.workers.dev';


  const chat =
    document.getElementById('aiChat');

  const toggle =
    document.getElementById('aiChatToggle');

  const closeButton =
    document.getElementById('aiChatClose');

  const form =
    document.getElementById('aiChatForm');

  const input =
    document.getElementById('aiChatInput');

  const sendButton =
    document.getElementById('aiChatSend');

  const messages =
    document.getElementById('aiChatMessages');


  /*
   * Stop if chatbot HTML does not exist.
   */

  if (
    !chat ||
    !toggle ||
    !closeButton ||
    !form ||
    !input ||
    !sendButton ||
    !messages
  ) {

    console.error(
      'AI Chatbot: HTML elements not found.'
    );

    return;

  }


  /* ─── Open Chat ─── */

  function openChat() {

    chat.classList.add('open');

    setTimeout(() => {
      input.focus();
    }, 200);

  }


  /* ─── Close Chat ─── */

  function closeChat() {

    chat.classList.remove('open');

  }


  toggle.addEventListener(
    'click',
    openChat
  );


  closeButton.addEventListener(
    'click',
    closeChat
  );


  /* ─── Add Message ─── */

  function addMessage(
    text,
    type
  ) {

    const message =
      document.createElement('div');

    message.className =
      `ai-message ${type}`;


    const label =
      document.createElement('div');

    label.className =
      'ai-message-label';

    label.textContent =
      type === 'ai-user-message'
        ? 'YOU'
        : 'DON.AI';


    const bubble =
      document.createElement('div');

    bubble.className =
      'ai-message-bubble';


    /*
     * textContent is safer than innerHTML.
     */

    bubble.textContent = text;


    message.appendChild(label);

    message.appendChild(bubble);


    messages.appendChild(message);


    messages.scrollTop =
      messages.scrollHeight;


    return message;

  }


  /* ─── Thinking ─── */

  function addThinking() {

    const message =
      document.createElement('div');


    message.className =
      'ai-message ai-bot-message';


    const label =
      document.createElement('div');

    label.className =
      'ai-message-label';

    label.textContent =
      'DON.AI';


    const thinking =
      document.createElement('div');

    thinking.className =
      'ai-thinking';


    for (
      let i = 0;
      i < 3;
      i++
    ) {

      const dot =
        document.createElement('span');

      thinking.appendChild(dot);

    }


    message.appendChild(label);

    message.appendChild(thinking);


    messages.appendChild(message);


    messages.scrollTop =
      messages.scrollHeight;


    return message;

  }


  /* ─── Send Message ─── */

  form.addEventListener(
    'submit',

    async (event) => {

      /*
       * THIS PREVENTS THE PAGE RELOAD.
       */

      event.preventDefault();


      const userMessage =
        input.value.trim();


      if (!userMessage) {

        return;

      }


      /*
       * Prevent multiple requests.
       */

      if (sendButton.disabled) {

        return;

      }


      addMessage(
        userMessage,
        'ai-user-message'
      );


      input.value = '';


      sendButton.disabled = true;

      input.disabled = true;


      const thinkingMessage =
        addThinking();


      try {

        const response =
          await fetch(
            WORKER_URL,
            {

              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json'
              },

              body:
                JSON.stringify({
                  message: userMessage
                })

            }
          );


        if (!response.ok) {

          throw new Error(
            `HTTP error: ${response.status}`
          );

        }


        const data =
          await response.json();


        thinkingMessage.remove();


        if (
          data.response
        ) {

          addMessage(
            data.response,
            'ai-bot-message'
          );

        } else {

          addMessage(
            "Sorry, I couldn't generate a response.",
            'ai-bot-message'
          );

        }


      } catch (error) {

        console.error(
          'AI Chatbot Error:',
          error
        );


        thinkingMessage.remove();


        addMessage(
          "Sorry, I'm temporarily unavailable. Please try again in a moment.",
          'ai-bot-message'
        );

      }


      sendButton.disabled = false;

      input.disabled = false;


      input.focus();

    }

  );


  /* ─── Enter to Send ─── */

  input.addEventListener(
    'keydown',

    (event) => {

      if (
        event.key === 'Enter' &&
        !event.shiftKey
      ) {

        event.preventDefault();


        /*
         * Manually trigger submit.
         */

        form.dispatchEvent(
          new Event(
            'submit',
            {
              bubbles: true,
              cancelable: true
            }
          )
        );

      }

    }

  );


  /* ─── Escape to Close ─── */

  document.addEventListener(
    'keydown',

    (event) => {

      if (
        event.key === 'Escape'
      ) {

        closeChat();

      }

    }

  );

});
