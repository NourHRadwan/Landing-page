/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 * 
 */
//set global variable for navigation bar
const navigation_bar = document.getElementById('navbar__list');
//set global variable for sections
const sections_list = document.querySelectorAll('section');
const FargmentDoc = document.createDocumentFragment();


/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
// build the nav
const navigation_Builder = () => {
    //using forEach loop through sections
    sections_list.forEach(section => {
        itemlist = document.createElement('li');
        const sectionID = section.getAttribute('id');;
        const sectionsData = section.getAttribute('data-nav');
        itemlist.innerHTML = `<a class='menu__link' data-nav='${sectionID}' href='#${sectionID}'> ${sectionsData} </a>`;
        FargmentDoc.appendChild(itemlist);
    });
    // append all elemnts to the navigation_Builder
    navigation_bar.appendChild(FargmentDoc);
}
navigation_Builder();

// Add class 'active' to section when near top of viewport
const ActiveState = (section) => {
    return Math.floor(section.getBoundingClientRect().top);
};
//remove the active class
const removeActiveState = (section) => {
    section.classList.remove('your-active-class');
    section.style.cssText = "linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%);";
};

//add Active class
//condetional statment to Check if that section is on the the screen or not
const active_Addition = (conditional, section) => {
    if (conditional) {
        section.classList.add('your-active-class');
        section.style.cssText = "background-color: yellow;";
    };
};

//writing the main function the funciton
const theActive_Section = () => {
    sections_list.forEach(section => {
        const createElementOffSet = ActiveState(section);
        isInViewport = () => createElementOffSet >= -100 && createElementOffSet < 100;
        if (isInViewport) {
            active_Addition(isInViewport(), section);
        } else {
            removeActiveState(section);
        }
    });
};
document.addEventListener('scroll', theActive_Section);
// implementing the scrolling feature 
// Scroll to anchor ID using scrollTO event
sections_list.addEventListener('click', (nextSec) => {
    nextSec.preventDefault();
    if (nextSec.target.dataset.nav) {
        document.getElementById(`${nextSec.target.dataset.nav}`).scrollIntoView({ behavior: "smooth" });
    }
});