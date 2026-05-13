let corSelecionada = "Nenhuma";
let m2Final = 0;

function validar() {
    const input = document.getElementById('senhaInput').value;
    if(input === "123") {
        // Desbloqueia e remove a tela de login
        document.getElementById('bloqueio').style.display = 'none';
        
        // Exibe o painel e controle por cima do visor da câmera
        document.getElementById('app-interface').style.display = 'block';
        
        // Corrige bug do motor do AR.js em relação ao tamanho da viewport do celular
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 300);
    } else { 
        alert("Senha Incorreta!"); 
    }
}

function calcularM2() {
    const l = document.getElementById('largura').value || 0;
    const a = document.getElementById('altura').value || 0;
    m2Final = (l * a).toFixed(2);
    document.getElementById('resultadoM2').innerText = m2Final + " m²";
}

const materiais = {
    piso: [
        { name: 'CARVALHO', color: '#e3d5ca' },
        { name: 'MÁRMORE', color: '#ffffff' },
        { name: 'CIMENTO', color: '#94a3b8' }
    ],
    parede: [
        { name: 'AZUL SOFT', color: '#dbeafe' },
        { name: 'AREIA', color: '#fef3c7' },
        { name: 'VERDE MENTA', color: '#f0fdf4' }
    ],
    revestimento: [
        { name: 'TIJOLINHO', color: '#b45309' },
        { name: 'PEDRA FERRO', color: '#475569' },
        { name: 'AZULEJO', color: '#bae6fd' }
    ]
};

function setMode(mode, btn) {
    // Reseta visual dos seletores
    document.querySelectorAll('.tool-btn').forEach(b => {
        b.style.background = '#1e293b';
        b.style.color = '#94a3b8';
        b.style.borderColor = '#475569';
    });
    // Destaca o botão ativado
    btn.style.background = '#1e293b';
    btn.style.color = 'white';
    btn.style.borderColor = '#3b82f6';
    
    const isPiso = (mode === 'piso');
    document.getElementById('obj-piso').setAttribute('visible', isPiso);
    document.getElementById('obj-parede').setAttribute('visible', !isPiso);
    renderOptions(mode);
}

function renderOptions(mode) {
    const container = document.getElementById('container-opcoes');
    if(!container) return;
    container.innerHTML = '';
    
    materiais[mode].forEach(m => {
        const div = document.createElement('div');
        div.className = 'swatch';
        
        // Estilização das amostras para garantir o clique
        div.style.background = m.color;
        div.style.padding = '10px 15px';
        div.style.borderRadius = '6px';
        div.style.cursor = 'pointer';
        div.style.color = '#000';
        div.style.fontWeight = 'bold';
        div.style.fontSize = '12px';
        div.style.whiteSpace = 'nowrap';
        div.style.border = '2px solid #475569';
        
        div.innerText = m.name;
        div.onclick = () => {
            corSelecionada = m.name;
            const target = (mode === 'piso') ? 'obj-piso' : 'obj-parede';
            document.getElementById(target).setAttribute('color', m.color);
            
            document.querySelectorAll('.swatch').forEach(s => s.style.borderColor = '#475569');
            div.style.borderColor = '#3b82f6';
        };
        container.appendChild(div);
    });
}

function enviarWhats() {
    const numero = "5599999999999"; // Coloque o número da loja de Timon/Teresina com o código 55
    const texto = `Olá! Usei o Simulador Guia Urbano.
    
Área Total: ${m2Final} m²
Material Selecionado: ${corSelecionada}
    
Gostaria de solicitar um orçamento para o meu projeto!`;
    
    window.open(`wa.me{numero}?text=${encodeURIComponent(texto)}`, '_blank');
}

// Inicializa renderizando as opções padrão de piso
renderOptions('piso');
