const carousel = document.querySelector('.carousel');
const cards = document.querySelectorAll('.card');

function setActiveCard() {
    const carouselCenter = carousel.scrollLeft + carousel.offsetWidth / 2;

    let closestCard = null;
    let closestDistance = Infinity;

    cards.forEach(function(card) {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(carouselCenter - cardCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestCard = card;
        }
    });

    cards.forEach(function(card) {
        card.classList.remove('active');
    });

    if (closestCard) {
        closestCard.classList.add('active');
    }
}

// Fix 1: start on the middle card on page load
cards[1].scrollIntoView({ inline: 'center', block: 'nearest' });

// Fix 2: update active card while scrolling
let scrollTimeout;

carousel.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(setActiveCard, 50);
});

// Set correct active card on load
setActiveCard();




const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

function scrollToCard(direction) {
    const cardWidth = cards[0].offsetWidth + 20;
    carousel.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}

prevBtn.addEventListener('click', function() {
    scrollToCard(-1);
});

nextBtn.addEventListener('click', function() {
    scrollToCard(1);
});




// Touch - Swipe support
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;

    const diff = touchStartX - touchEndX;

    if (diff > 50) {
        scrollToCard(1);
    } else if (diff < -50) {
        scrollToCard(-1);
    }
});