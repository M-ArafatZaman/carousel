function main() {
    const WAITING_TIME = 5000;
    let $container = document.getElementById("123");
    let $inner = $container.getElementsByClassName("carousel-inner")[0];
    let activeIndex = -1;
    let noOfChildren = $inner.children.length;
    let currInterval;

    // Find the active index first
    for (let i = 0; i < noOfChildren; i++) {
        if ($inner.children[i].classList.contains("carousel-active")) {
            activeIndex = i;
            break;
        }
    };

    // Function to go next
    const goNext = () => {
        // Clear interval to cancel the ongoing waiting period
        clearInterval(currInterval);

        // Add active classes to the new carousel item and remove classes from the prev carousel item
        $inner.children[activeIndex].classList.remove("carousel-active", "carousel-active-prev");
        activeIndex = (activeIndex+1) % noOfChildren;
        $inner.children[activeIndex].classList.add("carousel-active");

        // Initiate cycle
        currInterval = setTimeout(() => {
            goNext();
        }, WAITING_TIME);
    };
    
    const goPrev = () => {
        // Go prev is complicated
        clearInterval(currInterval);

        // Once animation is completed, remove the class
        const removeCarouselRemovePrevClass = (e) => {
            e.target.classList.remove("carousel-remove-prev");
            e.target.removeEventListener("animationend", removeCarouselRemovePrevClass);
        };
        $inner.children[activeIndex].addEventListener("animationend", removeCarouselRemovePrevClass);
        
        $inner.children[activeIndex].classList.remove("carousel-active", "carousel-active-prev");
        $inner.children[activeIndex].classList.add("carousel-remove-prev");
        activeIndex--;
        activeIndex = activeIndex < 0 ? noOfChildren - 1 : activeIndex;
        $inner.children[activeIndex].classList.add("carousel-active-prev");

        currInterval = setTimeout(() => {
            goNext();
        }, WAITING_TIME);
    }

    // Add event listener
    $container.getElementsByClassName("carousel-controls-next")[0].addEventListener("click", goNext);
    $container.getElementsByClassName("carousel-controls-prev")[0].addEventListener("click", goPrev);

    // Initiate interval cycle
    currInterval = setTimeout(() => {
        goNext();
    }, WAITING_TIME);
    
};

// Event listener
window.addEventListener("DOMContentLoaded", main);