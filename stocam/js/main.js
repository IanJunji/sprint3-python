// Script principal do STOCAM

document.addEventListener("DOMContentLoaded", function () {
  // Animação de rolagem suave para links internos
  const scrollLinks = document.querySelectorAll('a[href^="#"]');

  for (const scrollLink of scrollLinks) {
    scrollLink.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: "smooth",
        });
      }
    });
  }

  // Animação de entrada para os cards de recursos
  const featureCards = document.querySelectorAll(".feature-card");

  // Função para verificar se um elemento está visível na viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Adicionar classe para animação quando o card estiver visível
  function checkVisibility() {
    featureCards.forEach((card) => {
      if (isElementInViewport(card)) {
        card.classList.add("visible");
      }
    });
  }

  // Verificar visibilidade inicial e quando rolar a página
  checkVisibility();
  window.addEventListener("scroll", checkVisibility);

  // Adicionar um efeito de destaque ao passar o mouse sobre o logo
  const logoElement = document.querySelector(".logo");
  if (logoElement) {
    logoElement.addEventListener("mouseover", function () {
      this.style.transform = "scale(1.05)";
      this.style.transition = "transform 0.3s ease";
    });

    logoElement.addEventListener("mouseout", function () {
      this.style.transform = "scale(1)";
    });
  }
});

// Adicionar animação aos cards de recursos
setTimeout(() => {
  const style = document.createElement("style");
  style.innerHTML = `
        .feature-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .feature-card.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(style);
}, 100);
