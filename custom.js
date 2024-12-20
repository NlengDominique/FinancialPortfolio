var texts =  ["Investissez maintenant", "À votre écoute", "Solutions rapides"];
var elements = document.querySelectorAll('[lang]');   
const typingTextElement = document.getElementById('typing-text');

let textIndex = 0;
let charIndex = 0;
const typingSpeed = 120; // Speed of typing in milliseconds
const pauseBeforeSelect = 1000; // Pause before selecting text
const pauseBeforeWiping = 1000; // Pause before wiping text
const wipeSpeed = 50; // Speed of wiping in milliseconds
const pauseBeforeTyping = 1000; // Pause before starting to type new text
        
        function typeText() {
            if (charIndex < texts[textIndex].length) {
                typingTextElement.textContent += texts[textIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeText, typingSpeed);
            } else {
                setTimeout(selectText, pauseBeforeSelect);
            }
        }

        function selectText() {
            typingTextElement.innerHTML = texts[textIndex]
                .split('')
                .map(char => `<span class="selected-text">${char}</span>`)
                .join('');
            setTimeout(wipeText, pauseBeforeWiping);
        }
        
        function wipeText() {
            // Clear the text content all at once
            typingTextElement.textContent = ''; // Clear the text content
            textIndex = (textIndex + 1) % texts.length; // Loop through texts
            charIndex = 0; // Reset charIndex for new text
            setTimeout(startTyping, pauseBeforeTyping); // Wait before starting to type
        }
        
        function startTyping() {
            setTimeout(typeText, typingSpeed); // Start typing new text
        }
        
        // Start typing effect when the page loads
        window.onload = () => {
            typeText();
        };
