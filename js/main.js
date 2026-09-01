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
    document.body.style.overflow =
      navLinks.classList.contains('open') ? 'hidden' : '';
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

      const target =
        document.querySelector(anchor.getAttribute('href'));

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
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

  window.addEventListener(
    'scroll',
    activateNav,
    { passive: true }
  );


  // ─── Portrait Mouse Parallax ───
  const portraitFrame =
    document.querySelector('.portrait-frame');

  const portraitImg =
    portraitFrame?.querySelector('.portrait-img');

  const portraitRing =
    portraitFrame?.querySelector('.portrait-grid-lines');

  if (
    portraitFrame &&
    portraitImg &&
    window.matchMedia('(pointer: fine)').matches
  ) {

    portraitFrame.addEventListener('mousemove', (e) => {

      const rect =
        portraitFrame.getBoundingClientRect();

      const nx =
        (e.clientX - rect.left) / rect.width - 0.5;

      const ny =
        (e.clientY - rect.top) / rect.height - 0.5;

      const maxShift = 10;

      portraitImg.style.transform =
        `translate3d(calc(-50% + ${nx * maxShift}px), ${ny * maxShift}px, 0)`;

      if (portraitRing) {
        portraitRing.style.transform =
          `translate3d(${nx * -6}px, ${ny * -6}px, 0)`;
      }

    });


    portraitFrame.addEventListener('mouseleave', () => {

      portraitImg.style.transform =
        'translate3d(-50%, 0, 0)';

      if (portraitRing) {
        portraitRing.style.transform = '';
      }

    });

  }


  // ═══════════════════════════════════════════════════════
  // PORTFOLIO AI CHATBOT
  // ═══════════════════════════════════════════════════════

  const AI_WORKER_URL =
    'https://esmeraldo-portfolio-ai.esmeraldoinciso-main.workers.dev';


  const aiChat =
    document.getElementById('aiChat');

  const aiChatPanel =
    document.getElementById('aiChatPanel');

  const aiChatToggle =
    document.getElementById('aiChatToggle');

  const aiChatClose =
    document.getElementById('aiChatClose');

  const aiChatMessages =
    document.getElementById('aiChatMessages');

  const aiChatForm =
    document.getElementById('aiChatForm');

  const aiChatInput =
    document.getElementById('aiChatInput');

  const aiChatSend =
    document.getElementById('aiChatSend');


  if (
    aiChat &&
    aiChatPanel &&
    aiChatToggle &&
    aiChatClose &&
    aiChatMessages &&
    aiChatForm &&
    aiChatInput &&
    aiChatSend
  ) {

    let aiRequestInProgress = false;


    // ─── Open / Close Chat ───

    const setChatOpen = (open) => {

      aiChat.classList.toggle('open', open);

      aiChatPanel.setAttribute(
        'aria-hidden',
        String(!open)
      );

      aiChatToggle.setAttribute(
        'aria-expanded',
        String(open)
      );

      aiChatToggle.setAttribute(
        'aria-label',
        open
          ? "Close Don's AI assistant"
          : "Open Don's AI assistant"
      );


      if (open) {

        window.setTimeout(() => {
          aiChatInput.focus();
        }, 120);

        scrollChatToBottom();

      } else {

        aiChatToggle.focus();

      }

    };


    // ─── Scroll Messages ───

    const scrollChatToBottom = () => {

      aiChatMessages.scrollTop =
        aiChatMessages.scrollHeight;

    };


    // ─── Add Message ───

    const appendMessage = (
      text,
      sender = 'bot'
    ) => {

      const message =
        document.createElement('div');

      message.className =
        `ai-message ai-message-${sender}`;


      const label =
        document.createElement('div');

      label.className =
        'ai-message-label';

      label.textContent =
        sender === 'user'
          ? 'YOU'
          : 'DON.AI';


      const bubble =
        document.createElement('div');

      bubble.className =
        'ai-message-bubble';

      // Using textContent prevents HTML injection
      bubble.textContent = text;


      message.append(label, bubble);

      aiChatMessages.appendChild(message);

      scrollChatToBottom();

      return message;

    };


    // ─── Thinking Animation ───

    const appendThinking = () => {

      const message =
        document.createElement('div');

      message.className =
        'ai-message ai-message-bot ai-message-thinking';

      message.setAttribute(
        'aria-label',
        'Don AI is thinking'
      );


      const label =
        document.createElement('div');

      label.className =
        'ai-message-label';

      label.textContent =
        'DON.AI';


      const bubble =
        document.createElement('div');

      bubble.className =
        'ai-message-bubble';


      bubble.innerHTML = `
        <span class="ai-thinking-dot"></span>
        <span class="ai-thinking-dot"></span>
        <span class="ai-thinking-dot"></span>
      `;


      message.append(label, bubble);

      aiChatMessages.appendChild(message);

      scrollChatToBottom();

      return message;

    };


    // ─── Auto Resize Input ───

    const resizeChatInput = () => {

      aiChatInput.style.height = 'auto';

      aiChatInput.style.height =
        `${Math.min(
          aiChatInput.scrollHeight,
          100
        )}px`;

    };


    // ─── Loading State ───

    const setChatLoading = (loading) => {

      aiRequestInProgress = loading;

      aiChatInput.disabled = loading;

      aiChatSend.disabled = loading;

    };


    // ─── Ask Cloudflare Worker ───

    const askPortfolioAI =
      async (message) => {

        const controller =
          new AbortController();


        // Stop request after 30 seconds

        const timeoutId =
          window.setTimeout(() => {
            controller.abort();
          }, 30000);


        try {

          const response =
            await fetch(AI_WORKER_URL, {

              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json'
              },

              body: JSON.stringify({
                message
              }),

              signal:
                controller.signal

            });


          if (!response.ok) {

            throw new Error(
              `Worker returned HTTP ${response.status}`
            );

          }


          const data =
            await response.json();


          if (
            !data ||
            typeof data.response !== 'string' ||
            !data.response.trim()
          ) {

            throw new Error(
              'Worker returned an invalid response'
            );

          }


          return data.response.trim();


        } finally {

          window.clearTimeout(timeoutId);

        }

      };


    // ─── Toggle Chat ───

    aiChatToggle.addEventListener(
      'click',
      () => {

        setChatOpen(
          !aiChat.classList.contains('open')
        );

      }
    );


    // ─── Close Button ───

    aiChatClose.addEventListener(
      'click',
      () => {

        setChatOpen(false);

      }
    );


    // ─── Escape Key ───

    document.addEventListener(
      'keydown',
      (event) => {

        if (
          event.key === 'Escape' &&
          aiChat.classList.contains('open')
        ) {

          setChatOpen(false);

        }

      }
    );


    // ─── Resize Input ───

    aiChatInput.addEventListener(
      'input',
      resizeChatInput
    );


    // ─── Enter to Send ───

    aiChatInput.addEventListener(
      'keydown',
      (event) => {

        if (
          event.key === 'Enter' &&
          !event.shiftKey
        ) {

          event.preventDefault();


          if (!aiRequestInProgress) {

            aiChatForm.requestSubmit();

          }

        }

      }
    );


    // ─── Send Message ───

    aiChatForm.addEventListener(
      'submit',
      async (event) => {

        event.preventDefault();


        if (aiRequestInProgress) {
          return;
        }


        const userMessage =
          aiChatInput.value.trim();


        if (!userMessage) {
          return;
        }


        // Display user message

        appendMessage(
          userMessage,
          'user'
        );


        // Clear input

        aiChatInput.value = '';

        resizeChatInput();


        // Start loading

        setChatLoading(true);


        // Display thinking animation

        const thinkingMessage =
          appendThinking();


        try {

          // Ask Cloudflare Worker

          const aiResponse =
            await askPortfolioAI(
              userMessage
            );


          // Remove thinking

          thinkingMessage.remove();


          // Display AI response

          appendMessage(
            aiResponse,
            'bot'
          );


        } catch (error) {

          console.error(
            'Portfolio AI request failed:',
            error
          );


          thinkingMessage.remove();


          appendMessage(
            "Sorry, I'm temporarily unavailable. Please try again in a moment.",
            'bot'
          );


        } finally {

          // Stop loading

          setChatLoading(false);


          // Focus input again

          if (
            aiChat.classList.contains('open')
          ) {

            aiChatInput.focus();

          }

        }

      }
    );

  }

});
