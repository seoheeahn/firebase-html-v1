// main.js - Interactive features for AlgoBee profile page

document.addEventListener('DOMContentLoaded', () => {
    console.log('AlgoBee profile loaded! 🐝');

    // Add subtle hover effects to profile section
    const container = document.querySelector('.container');
    container.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = container;
        
        const x = (clientX - offsetLeft) / offsetWidth;
        const y = (clientY - offsetTop) / offsetHeight;
        
        // Pixel-style shadow shift instead of rotation
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;
        
        container.style.boxShadow = `${10 - moveX}px ${10 - moveY}px 0px rgba(0,0,0,0.2)`;
        container.style.transform = `translate(${moveX/2}px, ${moveY/2}px)`;
    });

    container.addEventListener('mouseleave', () => {
        container.style.boxShadow = `10px 10px 0px rgba(0,0,0,0.1)`;
        container.style.transform = `translate(0, 0)`;
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
                        padding: 0.4rem 0.6rem;
                        background: transparent;
                        color: ${color};
                        border: 3px solid ${color}; /* Thicker, pixel-like border */
                        border-radius: 4px; /* Less rounded for pixel feel */
                        font-family: 'Press Start 2P', cursive;
                        font-size: 0.5rem;
                        font-weight: bold;
                        margin: 0.3rem;
                        text-transform: uppercase;
                        transition: all 0.2s ease;
                    }
                    .badge:hover {
                        transform: translate(-2px, -2px);
                        box-shadow: 2px 2px 0px ${color};
                        background: ${color};
                        color: #ffffff;
                    }
                </style>
                <span class="badge">#${name}</span>
            `;
        }
    }
    customElements.define('skill-badge', SkillBadge);
});
