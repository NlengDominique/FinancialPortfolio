
$(document).ready(function() {
    $('.burger').click(function() {
        $('.nav-links').toggleClass('nav-active');
        $(this).toggleClass('toggle');
    });
});

//active navlink
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('nav').offsetHeight; // Height of the fixed navbar

    // Add click event listeners to nav links for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior

            const targetId = link.getAttribute('href').substring(1); // Get the target section id
            const targetSection = document.getElementById(targetId); // Get the target section element

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - navHeight, // Adjust for navbar height
                    behavior: 'smooth' // Smooth scrolling
                });
            }
        });
    });

    // Update active link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight; // Adjust for navbar height
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
// For the typing and wiping effect, we need to add some JavaScript to handle the timing and looping
var texts = [];
var elements = document.querySelectorAll('[lang]');
elements.forEach(function(element) {
    if (element.getAttribute('lang') === "fr") {
        texts = ["Investissez maintenant", "À votre écoute", "Solutions rapides"];
    } else if(element.getAttribute('lang') === "en") {
        texts = ["Invest now", "At your service", "Quick solutions"];
    }else{
        texts = ["Investieren Sie jetzt", "Wir hören Ihnen zu", "Schnelle Lösungen"];
    }
});

        let textIndex = 0;
        let charIndex = 0;
        const typingSpeed = 120; // Speed of typing in milliseconds
        const pauseBeforeSelect = 1000; // Pause before selecting text
        const pauseBeforeWiping = 1000; // Pause before wiping text
        const wipeSpeed = 50; // Speed of wiping in milliseconds

        const pauseBeforeTyping = 1000; // Pause before starting to type new text

        const typingTextElement = document.getElementById('typing-text');
        
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

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter-item');

    // Function to animate the counter
    const updateCounter = (element, target) => {
        const increment = target / 200; // Increment per interval
        let count = 0;

        const interval = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(interval);
            }
            element.textContent = Math.floor(count).toLocaleString(); // Update counter
        }, 10); // Adjust the interval time for speed
    };

    // Function to check if an element is in the viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth
        );
    };

    // Function to handle scroll and start counter animation
    const handleScroll = () => {
        counters.forEach(counter => {
            if (isInViewport(counter) && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                const numberElement = counter.querySelector('.counter-number');
                const target = +counter.querySelector('.counter-number').getAttribute('data-target');
                updateCounter(numberElement, target);
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
});

document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        slideIndex = (slideIndex + 1) % totalSlides;
        showSlide(slideIndex);
    }

    function prevSlide() {
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        showSlide(slideIndex);
    }

    document.querySelector('.next-slide').addEventListener('click', nextSlide);
    document.querySelector('.prev-slide').addEventListener('click', prevSlide);

    showSlide(slideIndex); // Show the first slide

    setInterval(nextSlide, 5000); // Automatically switch slides every 5 seconds
});



document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this);

    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('formMessage').innerText = data;
    })
    .catch(error => {
        document.getElementById('formMessage').innerText = 'An error occurred: ' + error;
    });
});


// modal for history
document.getElementById('schedule-button').addEventListener('click', function() {
    document.getElementById('calendar-modal').style.display = 'block';
});

document.getElementById('close-button').addEventListener('click', function() {
    document.getElementById('calendar-modal').style.display = 'none';
});

window.onclick = function(event) {
    if (event.target == document.getElementById('calendar-modal')) {
        document.getElementById('calendar-modal').style.display = 'none';
    }
};
/* document.getElementById('confirm-button').addEventListener('click', function() {
    const appointmentDate = document.getElementById('appointment-date').value;
    const appointmentTime = document.getElementById('appointment-time').value;
    const clientName = document.getElementById('client-name').value;
    const clientEmail = document.getElementById('client-email').value;

    if (appointmentDate && appointmentTime && clientName && clientEmail) {
        const appointmentDateTime = `${appointmentDate} ${appointmentTime}`;
        alert(`Votre rendez-vous est confirmé pour ${appointmentDateTime}.\nNom: ${clientName}\nEmail: ${clientEmail}`);
        document.getElementById('calendar-modal').style.display = 'none';
    } else {
        alert('Veuillez remplir tous les champs.');
    }
}); */

// Open modal
/* document.getElementById('your-open-button-id').addEventListener('click', function() {
    const modal = document.getElementById('calendar-modal');
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show'); // Add class for animation
    }, 10); // Short delay to allow the display to be set
}); */

// Close modal
document.getElementById('close-button').addEventListener('click', function() {
    const modal = document.getElementById('calendar-modal');
    modal.classList.remove('show'); // Remove class for animation
    setTimeout(() => {
        modal.style.display = 'none'; // Hide after animation
    }, 500); // Match the duration of the animation
});

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('calendar-modal');
    if (event.target === modal) {
        modal.classList.remove('show'); // Remove class for animation
        setTimeout(() => {
            modal.style.display = 'none'; // Hide after animation
        }, 500); // Match the duration of the animation
    }
};
//js for appointement
document.getElementById('confirm-button').addEventListener('click', function() {
    const appointmentDate = document.getElementById('appointment-date').value;
    const appointmentTime = document.getElementById('appointment-time').value;
    const clientName = document.getElementById('client-name').value;
    const clientEmail = document.getElementById('client-email').value;
    const clientPhone = document.getElementById('client-phone').value; // New field
    const clientMessage = document.getElementById('client-message').value; // New field

    if (appointmentDate && appointmentTime && clientName && clientEmail && clientPhone && clientMessage) {
        const appointmentDateTime = `${appointmentDate} ${appointmentTime}`;

        // Use Fetch API to send data to the PHP script
        fetch('send_appointment.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `client-name=${encodeURIComponent(clientName)}&client-email=${encodeURIComponent(clientEmail)}&client-phone=${encodeURIComponent(clientPhone)}&appointment-date=${encodeURIComponent(appointmentDate)}&appointment-time=${encodeURIComponent(appointmentTime)}&client-message=${encodeURIComponent(clientMessage)}`
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            document.getElementById('calendar-modal').style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

