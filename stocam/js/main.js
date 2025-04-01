/**
 * STOCAM - JavaScript principal
 * Gerencia interatividade e comportamentos dinâmicos do site
 */

document.addEventListener("DOMContentLoaded", function () {
  // Inicialização quando o DOM estiver completamente carregado
  console.log("STOCAM - Sistema inicializado");

  // Inicializar componentes
  initializeSmoothScrolling();
  initializeNavHighlighting();
  initializeCodeCopyButtons();
  initializeCollapsibleSections();

  // Adiciona classe para animar elementos quando estiverem visíveis
  animateOnScroll();
});

/**
 * Implementa smooth scrolling para links âncora
 */
function initializeSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Adiciona um pequeno offset para não esconder o conteúdo atrás do header fixo
        const offset = 60;
        const targetPosition = targetElement.offsetTop - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Atualiza a URL sem recarregar a página
        history.pushState(null, null, targetId);
      }
    });
  });
}

/**
 * Destaca o item de navegação ativo com base na posição de rolagem
 */
function initializeNavHighlighting() {
  const sections = document.querySelectorAll("section, div[id]");
  const navLinks = document.querySelectorAll(".sidebar a");

  // Detecta qual seção está atualmente visível na janela
  function highlightActiveSection() {
    const scrollPosition = window.scrollY + 100; // Ajusta para offset

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        sectionId &&
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // Adiciona a classe 'active' aos links do menu quando a seção estiver visível
  window.addEventListener("scroll", highlightActiveSection);

  // Executa uma vez quando a página carrega
  highlightActiveSection();
}

/**
 * Adiciona botões para copiar código nos blocos de código
 */
function initializeCodeCopyButtons() {
  const codeBlocks = document.querySelectorAll(".code-content");

  codeBlocks.forEach((block) => {
    // Cria o botão de cópia
    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.textContent = "Copiar";
    copyButton.title = "Copiar código para a área de transferência";

    // Adiciona o botão ao header do bloco de código
    const codeHeader = block
      .closest(".code-block")
      .querySelector(".code-header");
    codeHeader.appendChild(copyButton);

    // Adiciona o evento de clique
    copyButton.addEventListener("click", () => {
      // Obtém o texto do código
      const codeText = block.textContent;

      // Copia o texto para a área de transferência
      navigator.clipboard
        .writeText(codeText)
        .then(() => {
          // Feedback visual para o usuário
          copyButton.textContent = "Copiado!";
          copyButton.classList.add("copied");

          // Reverte o botão após 2 segundos
          setTimeout(() => {
            copyButton.textContent = "Copiar";
            copyButton.classList.remove("copied");
          }, 2000);
        })
        .catch((err) => {
          console.error("Erro ao copiar: ", err);
          copyButton.textContent = "Erro";

          setTimeout(() => {
            copyButton.textContent = "Copiar";
          }, 2000);
        });
    });
  });
}

/**
 * Implementa seções colapsáveis para melhorar a usabilidade em dispositivos móveis
 */
function initializeCollapsibleSections() {
  const sectionTitles = document.querySelectorAll(".section-title, .card h2");

  sectionTitles.forEach((title) => {
    // Não aplicamos a todos os cards, somente aos principais
    if (title.closest(".idea-card")) return;

    title.classList.add("collapsible");

    // Verifica se deve iniciar colapsado em dispositivos móveis
    if (window.innerWidth <= 768 && !title.closest(".intro-cards")) {
      const contentElements = getNextSiblings(title);
      contentElements.forEach((el) => {
        el.classList.add("collapsed");
      });
    }

    title.addEventListener("click", function () {
      const contentElements = getNextSiblings(this);
      const isCollapsed =
        contentElements[0] &&
        contentElements[0].classList.contains("collapsed");

      contentElements.forEach((el) => {
        if (isCollapsed) {
          el.classList.remove("collapsed");
        } else {
          el.classList.add("collapsed");
        }
      });

      this.classList.toggle("expanded", isCollapsed);
    });
  });

  // Função auxiliar para obter os elementos irmãos até o próximo título
  function getNextSiblings(element) {
    const siblings = [];
    let nextElement = element.nextElementSibling;

    while (
      nextElement &&
      !nextElement.matches(".section-title, .card h2") &&
      !nextElement.matches(".idea-card")
    ) {
      siblings.push(nextElement);
      nextElement = nextElement.nextElementSibling;
    }

    return siblings;
  }
}

/**
 * Adiciona animações de entrada para elementos quando eles se tornarem visíveis
 */
function animateOnScroll() {
  const animatedElements = document.querySelectorAll(
    ".idea-card, .card, .diagram-node, .info-box"
  );

  // Configura o Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          // Uma vez animado, não precisamos mais observar
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Quando pelo menos 10% do elemento está visível
      rootMargin: "0px 0px -100px 0px", // Carrega um pouco antes de entrar na viewport
    }
  );

  // Observa todos os elementos
  animatedElements.forEach((element) => {
    element.classList.add("animate-on-scroll");
    observer.observe(element);
  });
}

// Adiciona estilos CSS necessários para as novas funcionalidades
function addDynamicStyles() {
  const styleElement = document.createElement("style");
  styleElement.textContent = `
    /* Estilos para botões de cópia de código */
    .copy-button {
      background-color: #2c2c2c;
      color: #b0b0b0;
      border: none;
      border-radius: 4px;
      padding: 4px 8px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .copy-button:hover {
      background-color: #333;
      color: #fff;
    }
    
    .copy-button.copied {
      background-color: #4da8da;
      color: white;
    }
    
    /* Estilos para itens de navegação ativos */
    .sidebar a.active {
      background-color: #2c2c2c;
      color: #4da8da;
      border-left: 3px solid #4da8da;
    }
    
    /* Estilos para seções colapsáveis */
    .collapsible {
      cursor: pointer;
      position: relative;
    }
    
    .collapsible::after {
      content: '▼';
      font-size: 0.7rem;
      position: absolute;
      right: 10px;
      transition: transform 0.3s ease;
    }
    
    .collapsible.expanded::after {
      transform: rotate(180deg);
    }
    
    .collapsed {
      display: none;
    }
    
    /* Animações de entrada */
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animated {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  document.head.appendChild(styleElement);
}

// Adiciona os estilos dinâmicos quando o documento estiver pronto
document.addEventListener("DOMContentLoaded", addDynamicStyles);
