document.addEventListener('DOMContentLoaded', function () {
    const options = document.querySelectorAll('.options-container a');
    const dataForm = document.getElementById('dataForm');
    const dataInput = document.getElementById('dataInput');
    const dataPassword = document.getElementById('dataPassword');

    // Bloqueia os links inicialmente
    options.forEach(option => {
        option.classList.add('disabled');
        option.style.pointerEvents = 'none';
        option.style.opacity = '0.5';
    });

    dataForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio real

        const idValue = dataInput.value.trim();
        const passwordValue = dataPassword.value.trim();

        // Verificação simples de validade
        if (!/^\d+$/.test(idValue)) {
            alert('O campo ID deve conter apenas números.');
            return;
        }

        if (passwordValue.length < 4) {
            alert('A password deve ter pelo menos 4 caracteres.');
            return;
        }

        // Simulação de login válido
        console.log('Login efetuado com sucesso');

        // Desbloqueia os links
        options.forEach(option => {
            option.classList.remove('disabled');
            option.style.pointerEvents = 'auto';
            option.style.opacity = '1';
        });

        alert('Login efetuado com sucesso! As opções foram desbloqueadas.');
        dataForm.reset();
    });
});




