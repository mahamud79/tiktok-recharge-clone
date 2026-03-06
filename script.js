const cards = document.querySelectorAll('.coin-card');
const buyBtn = document.getElementById('buy-btn');
const usernameInput = document.getElementById('username');
const customCard = document.getElementById('custom-card');
const customInput = document.getElementById('custom-input');
const customLabel = document.getElementById('custom-label');
const finalGoBack = document.getElementById('final-go-back');

let selectedPrice = null;
let selectedCoins = null;

usernameInput.addEventListener('input', () => {
    updateState();
});

function updateState() {
    const hasUser = usernameInput.value.trim().length > 0;
    const hasSelection = selectedPrice !== null;
    buyBtn.disabled = !(hasUser && hasSelection);
}

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (card.classList.contains('active')) {
            card.classList.remove('active');
            selectedPrice = null;
            buyBtn.innerText = "Buy";
            resetCustom();
        } else {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            if (card.id === 'custom-card') {
                customLabel.style.display = 'none';
                customInput.style.display = 'block';
                customInput.focus();
            } else {
                resetCustom();
                selectedCoins = card.getAttribute('data-coins');
                selectedPrice = card.getAttribute('data-price');
                buyBtn.innerText = `Buy for $${selectedPrice}`;
            }
        }
        updateState();
    });
});

function resetCustom() {
    customLabel.style.display = 'block';
    customInput.style.display = 'none';
    customInput.value = '';
}

customInput.addEventListener('input', (e) => {
    const val = e.target.value;
    if (val > 0) {
        selectedCoins = Number(val).toLocaleString();
        selectedPrice = (val * 0.01).toFixed(2);
        buyBtn.innerText = `Buy for $${selectedPrice}`;
    } else {
        selectedPrice = null;
        buyBtn.innerText = "Buy";
    }
    updateState();
});

buyBtn.addEventListener('click', () => {
    document.getElementById('main-screen').classList.add('hidden');
    document.getElementById('loading-screen').classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('success-screen').classList.remove('hidden');
        document.getElementById('success-detail').innerText = 
            `${selectedCoins} Coins were sent to ${usernameInput.value}`;
    }, 2500);
});

finalGoBack.addEventListener('click', () => {
    location.reload();
    // Return to main screen
    document.getElementById('success-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
    
    // Reset all states
    cards.forEach(c => c.classList.remove('active'));
    selectedPrice = null;
    selectedCoins = null;
    usernameInput.value = '';
    buyBtn.innerText = "Buy";
    buyBtn.disabled = true;
    resetCustom();
});