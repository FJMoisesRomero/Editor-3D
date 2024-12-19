function openModal(item) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    
    let content = '';
    if (item === 'silla') {
        content = `
            <h3 class="text-2xl mb-4">Silla</h3>
            <img src="/images/chair.png" alt="Silla" style="width: 300px;" class="mb-4">
            <p>Vértices: 31,738</p>
            <p>Caras: 56,556</p>
            <p>Estilo artístico: Realista</p>
            <p>Semilla: 324320276</p>
            <p>Riqueza de texturas: Alto</p>
        `;
    } else if (item === 'mesa') {
        content = `
            <h3 class="text-2xl mb-4">Mesa</h3>
            <img src="/images/square_picnic_table.png" style="width: 300px;" alt="Mesa" class="mb-4">
            <p>Vértices: 15,000</p>
            <p>Caras: 30,000</p>
            <p>Estilo artístico: Realista</p>
            <p>Semilla: 123456789</p>
            <p>Riqueza de texturas: Medio</p>
        `;
    }

    modalContent.innerHTML = content;
    modal.classList.remove('hidden');
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
}
