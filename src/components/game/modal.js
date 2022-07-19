const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    console.log(modal)
    console.log(modal.classList)
    try {
        setTimeout(() => {
    modal.classList.toggle("show-modal");
            
        }, 1000);
        
    } catch (error) {
        
    }
}

export function windowOnClick(event) {
    // if (event.target === modal) {
        toggleModal();
    // }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);