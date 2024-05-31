

const themeMap = {
    dark: "light",
    light: "dark"
  };
  
  const theme = localStorage.getItem('theme')
    || (tmp = Object.keys(themeMap)[0],
        localStorage.setItem('theme', tmp),
        tmp);
  const bodyClass = document.body.classList;
  bodyClass.add(theme);
  
  function toggleTheme() {
    const current = localStorage.getItem('theme');
    const next = themeMap[current];
  
    bodyClass.replace(current, next);
    localStorage.setItem('theme', next);
  }
  
  document.getElementById('themeButton').onclick = toggleTheme;
  
  
  document.addEventListener("DOMContentLoaded", () => {
    const exercicioDivs = document.querySelectorAll('#exercicio1');
  
    exercicioDivs.forEach(div => {
      div.addEventListener('click', () => {
        window.location.href = 'Preview_alongamento';
      });
    });
  });
 

  document.addEventListener("DOMContentLoaded", () => {
    const exercicioDivs = document.querySelectorAll('#exercicio2');
  
    exercicioDivs.forEach(div => {
      div.addEventListener('click', () => {
        window.location.href = 'Preview_condicionamento';
      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const exercicioDivs = document.querySelectorAll('#btn-voltar');
  
    exercicioDivs.forEach(div => {
      div.addEventListener('click', () => {
        window.location.href = './index.html';
      });
    });
  });

