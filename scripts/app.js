// select Variable and Element
const navToggleIcon = document.querySelector(".nav__toggle");
const navMenu = document.querySelector(".nav__menu");
const overlay = document.querySelector(".overlay");
const ResumeList = document.querySelectorAll(".resume__list");
const portdolioList = document.querySelectorAll(".portfolio__list");
const menuItem = document.querySelectorAll(".nav__menu-item");
const sections = document.querySelectorAll("main > section");
const changeTheme = document.querySelector(".dark-light");
const changeActive = document.querySelectorAll(".dark-light__svg");
const sun = document.querySelector(".sun");
const mon = document.querySelector(".mon");

if (window.localStorage.getItem("theme") === "dark-theme"){
    document.documentElement.classList.add("dark-theme")
    sun.classList.remove("dark-light__svg--active")
    mon.classList.add("dark-light__svg--active")
}

// Intersection Observer
const observer = new IntersectionObserver(observerHandler,{threshold : 0.42});
function observerHandler(allSection){
    allSection.map(section => {
        let sectionClassName = section.target.className
        let sectionMenuItem = document.querySelector(`.nav__menu-item[data-section=${sectionClassName}]`)
        if (section.isIntersecting){
            sectionMenuItem.classList.add("nav__menu-item--active")
        }else{
            sectionMenuItem.classList.remove("nav__menu-item--active")
        }
    })
}

// Custom Functions
navigationTabs = (listItems, listItemsActiveClass, contentItemShowClass) => {
    listItems.forEach(listItem => {
        listItem.addEventListener('click', function () {
            removeActiveClass(listItemsActiveClass)
            removeActiveClass(contentItemShowClass)
            this.classList.add(listItemsActiveClass)
            let contentId = this.getAttribute("data-content-id")
            document.querySelector(contentId).classList.add(contentItemShowClass)
        })
    });
}
removeActiveClass = (className) => {
    document.querySelector(`.${className}`).classList.remove(className)
}
navigationTheme = (listItems, listItemsActiveClass) => {
    listItems.forEach(listItem => {
        listItem.addEventListener('click', function () {
            removeActiveClass(listItemsActiveClass)
            this.classList.add(listItemsActiveClass)
        })
    });
}

// App Navigation Setting
navigationTabs(ResumeList, "resume__list--active", "resume__contents--show")
navigationTabs(portdolioList, "portfolio__list--active", "swiper--show")
navigationTheme(changeActive, "dark-light__svg--active")

// Event Listeners
navToggleIcon.addEventListener('click', function(){
    this.classList.toggle('nav__toggle--open')
    navMenu.classList.toggle('nav__menu--open')
    overlay.classList.toggle('overlay--visible')
})
overlay.addEventListener("click", function(){
    navToggleIcon.classList.remove('nav__toggle--open')
    navMenu.classList.remove('nav__menu--open')
    overlay.classList.remove('overlay--visible')

})
changeTheme.addEventListener("click", function(e) {
    console.log(e.target.parentElement.classList.contains("mon"));
    if (e.target.parentElement.classList.contains("mon")){
        window.localStorage.setItem("theme", "dark-theme")
        document.documentElement.classList.add("dark-theme")
    } else if(e.target.parentElement.classList.contains("sun")) {
        window.localStorage.setItem("theme", "light-theme")
        document.documentElement.classList.remove("dark-theme")
    } else if (e.target.classList.contains("mon")){
        window.localStorage.setItem("theme", "dark-theme")
        document.documentElement.classList.add("dark-theme")
    } else if(e.target.classList.contains("sun")) {
        window.localStorage.setItem("theme", "light-theme")
        document.documentElement.classList.remove("dark-theme")
    }
})

// Loops
sections.forEach(section =>{
    observer.observe(section)
})
menuItem.forEach(item =>{
    item.addEventListener("click", function(e){
        e.preventDefault()
        removeActiveClass("nav__menu-item--active")
        item.classList.add("nav__menu-item--active")

        let sectionClass = item.getAttribute("data-section")
        let sectionOffSet = document.querySelector(`.${sectionClass}`).offsetTop
        window.scrollTo({
            top : sectionOffSet - 100,
            behavior : "smooth"
        })
    })
})
