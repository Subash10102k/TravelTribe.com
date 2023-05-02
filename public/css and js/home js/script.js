$(document).ready(function(){
    $(window).scroll(function(){
        
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        } 
        
        
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

   
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
       
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .nav-list li a').click(function(){
       
        $('html').css("scrollBehavior", "smooth");
    });

   
    $('.nav-list-btn').click(function(){
        $('.navbar .nav-list').toggleClass("active");
        $('.nav-list-btn i').toggleClass("active");
    });
 
 var typed = new Typed(".typing", {
    strings: [" logging in", " Exploring", " Travelling"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});



    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});



var height = $('#header').height();

$(window).scroll(function () {
    if ($(this).scrollTop() > height) {
        $('.navbar').addClass('fixed');
        
    }else{
        $('.navbar').removeClass('fixed');
    }
});


let suggestions = [
    "tajMahal",
    "elloraCaves",
    "tsongmoLake",
    "padmanabhaswamyTemple",  
];

const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let webLink;


inputBox.onkeyup = (e)=>{
    let userData = e.target.value;
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{

            webLink = document.location.origin+"/" + userData;

            linkTag.setAttribute("href", webLink);
            console.log(webLink);
            linkTag.click();
        }
        emptyArray = suggestions.filter((data)=>{
             return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
        });
        emptyArray = emptyArray.map((data)=>{
       
            return data = '<li>'+ data +'</li>';
        });
        searchWrapper.classList.add("active"); 
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
           
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); 
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{

        webLink = document.location.origin+"/" + selectData;

        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li>'+ userValue +'</li>';
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}
