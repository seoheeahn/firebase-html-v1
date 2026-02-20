// main.js - Interactive features for AlgoBee profile page

document.addEventListener('DOMContentLoaded', () => {
    console.log('AlgoBee profile loaded! 🐝');

    // Add subtle hover effects to profile section
    const container = document.querySelector('.container');
    container.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = container;
        
        // Calculate relative position (0 to 1)
        const x = (clientX - offsetLeft) / offsetWidth;
        const y = (clientY - offsetTop) / offsetHeight;
        
        // Tilt effect
        const tiltX = (y - 0.5) * 10;
        const tiltY = (x - 0.5) * -10;
        
        container.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
    });

    container.addEventListener('mouseleave', () => {
        container.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });

    // Animate SNS buttons one by one
    const snsButtons = document.querySelectorAll('.sns-button');
    snsButtons.forEach((btn, index) => {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            btn.style.transition = 'opacity 0.5s ease, transform 0.5s ease, color 0.3s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 300 * (index + 1));
    });

    // Custom Web Component for a "Skills" badge
    class SkillBadge extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            const name = this.getAttribute('name') || 'Skill';
            const color = this.getAttribute('color') || '#f7d54e';
            
            this.shadowRoot.innerHTML = `
                <style>
                    .badge {
                        display: inline-block;
                        padding: 0.2rem 0.6rem;
                        background: ${color};
                        color: #1a1a1a;
                        border-radius: 12px;
                        font-size: 0.8rem;
                        font-weight: bold;
                        margin: 0.2rem;
                        text-transform: uppercase;
                        box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
                        transition: transform 0.2s ease;
                    }
                    .badge:hover {
                        transform: scale(1.05);
                    }
                </style>
                <span class="badge">${name}</span>
            `;
        }
    }
    customElements.define('skill-badge', SkillBadge);
});
