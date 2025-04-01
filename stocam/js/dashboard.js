// Script específico para o dashboard STOCAM

document.addEventListener("DOMContentLoaded", function () {
  // Simulação de animação para os gráficos
  animateCharts();

  // Configurar botões do gráfico
  setupChartButtons();

  // Configurar interações dos alertas
  setupAlertActions();

  // Simulação de dados em tempo real
  setupRealtimeUpdates();
});

// Função para animar os gráficos
function animateCharts() {
  const chartBars = document.querySelectorAll(".chart-bar");

  // Animação inicial das barras do gráfico
  chartBars.forEach((bar) => {
    const originalHeight = bar.style.height;

    // Resetar altura
    bar.style.height = "0%";

    // Animar para a altura original
    setTimeout(() => {
      bar.style.height = originalHeight;
    }, 300 + Math.random() * 500);
  });
}

// Configurar botões do gráfico
function setupChartButtons() {
  const chartButtons = document.querySelectorAll(".chart-actions button");

  chartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remover classe ativa de todos os botões
      chartButtons.forEach((btn) => btn.classList.remove("active"));

      // Adicionar classe ativa ao botão clicado
      this.classList.add("active");

      // Simular mudança de dados do gráfico
      updateChartData(this.textContent.trim());
    });
  });
}

// Função para atualizar dados do gráfico
function updateChartData(timeframe) {
  const chartBars = document.querySelectorAll(".chart-bar");

  // Simulação de dados diferentes para cada período
  chartBars.forEach((bar) => {
    let newHeight;

    switch (timeframe) {
      case "Diário":
        newHeight = Math.floor(Math.random() * 60 + 20) + "%";
        break;
      case "Semanal":
        newHeight = Math.floor(Math.random() * 50 + 30) + "%";
        break;
      case "Mensal":
        newHeight = Math.floor(Math.random() * 40 + 40) + "%";
        break;
      default:
        newHeight = Math.floor(Math.random() * 60 + 20) + "%";
    }

    // Animar para a nova altura
    bar.style.height = "0%";

    setTimeout(() => {
      bar.style.height = newHeight;
    }, 100 + Math.random() * 300);
  });
}

// Configurar interações dos alertas
function setupAlertActions() {
  const actionButtons = document.querySelectorAll(".btn-action");

  actionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const alertItem = this.closest(".alert-item");
      const alertTitle = alertItem.querySelector("h3").textContent;

      // Simulação de ação
      this.textContent = "Processando...";
      this.disabled = true;

      setTimeout(() => {
        if (this.textContent === "Reabastecer") {
          // Simular ação de reabastecimento
          alertItem.style.opacity = 0.5;
          this.textContent = "Reabastecido";

          // Atualizar contador de itens abaixo do estoque
          const lowStockCounter = document.querySelector(
            ".stat-card:nth-child(2) .stat-value"
          );
          if (lowStockCounter) {
            const currentValue = parseInt(lowStockCounter.textContent);
            lowStockCounter.textContent = (currentValue - 1).toString();
          }
        } else {
          // Simular outras ações
          this.textContent = "Concluído";
        }

        // Adicionar classe para marcar como tratado
        alertItem.classList.add("treated");
      }, 1500);
    });
  });
}

// Configurar atualizações em tempo real
function setupRealtimeUpdates() {
  // Simulação de atualizações em tempo real
  setInterval(() => {
    const movementCounter = document.querySelector(
      ".stat-card:nth-child(3) .stat-value"
    );
    if (movementCounter) {
      const currentValue = parseInt(movementCounter.textContent);
      const newValue = currentValue + Math.floor(Math.random() * 3);

      // Animar a contagem
      animateCounter(movementCounter, currentValue, newValue);
    }
  }, 5000);
}

// Função para animar contadores
function animateCounter(element, startValue, endValue) {
  const duration = 1000; // 1 segundo
  const frameDuration = 1000 / 60; // 60fps
  const totalFrames = Math.round(duration / frameDuration);
  const increment = (endValue - startValue) / totalFrames;

  let currentFrame = 0;
  let currentValue = startValue;

  const animate = () => {
    currentFrame++;
    currentValue += increment;

    element.textContent = Math.round(currentValue).toString();

    if (currentFrame < totalFrames) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = endValue.toString();
    }
  };

  animate();
}

// Simular notificações de alertas
setTimeout(() => {
  // Criar um novo alerta após alguns segundos
  const alertList = document.querySelector(".alert-list");

  if (alertList) {
    const newAlert = document.createElement("div");
    newAlert.className = "alert-item warning";
    newAlert.style.opacity = "0";
    newAlert.style.transform = "translateY(20px)";
    newAlert.style.transition = "opacity 0.5s, transform 0.5s";

    newAlert.innerHTML = `
            <div class="alert-icon">⚠️</div>
            <div class="alert-content">
                <h3>Estoque Baixo: Ceftriaxona 1g</h3>
                <p>Restam 12 unidades. Nível mínimo: 25 unidades.</p>
                <span class="alert-time">Agora</span>
            </div>
            <div class="alert-action">
                <button class="btn-action">Reabastecer</button>
            </div>
        `;

    alertList.prepend(newAlert);

    // Atualizar contador
    const lowStockCounter = document.querySelector(
      ".stat-card:nth-child(2) .stat-value"
    );
    if (lowStockCounter) {
      const currentValue = parseInt(lowStockCounter.textContent);
      lowStockCounter.textContent = (currentValue + 1).toString();
    }

    // Animar entrada
    setTimeout(() => {
      newAlert.style.opacity = "1";
      newAlert.style.transform = "translateY(0)";

      // Configurar botão de ação
      const newButton = newAlert.querySelector(".btn-action");
      if (newButton) {
        newButton.addEventListener("click", function () {
          this.textContent = "Processando...";
          this.disabled = true;

          setTimeout(() => {
            newAlert.style.opacity = 0.5;
            this.textContent = "Reabastecido";

            // Atualizar contador de itens abaixo do estoque
            const lowStockCounter = document.querySelector(
              ".stat-card:nth-child(2) .stat-value"
            );
            if (lowStockCounter) {
              const currentValue = parseInt(lowStockCounter.textContent);
              lowStockCounter.textContent = (currentValue - 1).toString();
            }
          }, 1500);
        });
      }
    }, 100);
  }
}, 8000);
