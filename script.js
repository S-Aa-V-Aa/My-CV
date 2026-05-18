document.addEventListener('DOMContentLoaded', () => {
    
    const saveSystemInfo = () => {
        const systemData = {
            browserInfo: navigator.userAgent,
            platformOS: navigator.platform,
            timeSaved: new Date().toLocaleString()
        };
        localStorage.setItem('savchuk_sys_data', JSON.stringify(systemData));
    };

    const displaySystemInfo = () => {
        const footerText = document.getElementById('browser-info');
        const retrievedData = JSON.parse(localStorage.getItem('savchuk_sys_data'));
        
        if (retrievedData) {
            footerText.innerText = `Платформа: ${retrievedData.platformOS} | Дані браузера: ${retrievedData.browserInfo}`;
        }
    };

    saveSystemInfo();
    displaySystemInfo();

    const loadComments = () => {
        const commentsDiv = document.getElementById('comments-container');
        const myVariant = 15; 

        fetch(`https://jsonplaceholder.typicode.com/posts/${myVariant}/comments`)
            .then(response => response.json())
            .then(data => {
                commentsDiv.innerHTML = ''; 
                
                data.forEach(comment => {
                    const block = document.createElement('div');
                    block.className = 'api-comment';
                    block.innerHTML = `
                        <strong>Email: ${comment.email}</strong>
                        <p>${comment.body}</p>
                    `;
                    commentsDiv.appendChild(block);
                });
            })
            .catch(error => {
                commentsDiv.innerHTML = '<p style="color: red;">Помилка завантаження відгуків із сервера.</p>';
                console.error('API Error:', error);
            });
    };

    loadComments();

    const modal = document.getElementById('feedback-modal');
    const closeBtn = document.querySelector('.close-modal');

    setTimeout(() => {
        modal.style.display = 'block';
    }, 60000); 

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    const themeButton = document.getElementById('theme-toggle');
    const themeIcon = themeButton.querySelector('i');

    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        updateIcon();
    });

    const updateIcon = () => {
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };

    const autoApplyTheme = () => {
        const currentHour = new Date().getHours();
        
        if (currentHour >= 21 || currentHour < 7) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        updateIcon();
    };

    autoApplyTheme();
});