    let getHamburger = document.querySelectorAll('#toggle-bar');
    getHamburger.forEach((toggleMenu) => {
        toggleMenu.onclick = () => {
            let getMenu = document.querySelector(".nav-mobile");
            getMenu.classList.toggle("hamburger");
        };
    });
    
    

