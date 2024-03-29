// Importovanje Swiper biblioteke
import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
import { generateGalleries } from './generate.Galleries.js'; 
import { aboutMe } from './generateAboutMe.js';
import { contact } from './generateContact.js';
import { colorsBackgrounds } from './generateColorsAndBackgrounds.js';


window.onload=()=>{       
    reloadDataBases();
    basicColorsAndBackgrounds(colorsBackgrounds);
    colorsBackgroundsGalleriesPage(colorsBackgrounds);
    document.querySelectorAll('.nav-item').forEach(item=>{
        item.addEventListener('click',(e)=>{
            
        let underscore=document.querySelector('.underscore');
        let widthOfNavLink=document.querySelector('.nav-link').clientWidth;
        let navItemPaddingLeft = window.getComputedStyle(document.querySelector('.nav-item')).paddingLeft;
        let totalNavPadding =parseInt(navItemPaddingLeft);
            const href = e.target.getAttribute('data-');
             const mainSlidePages = document.querySelector('.moving-pages');
            if(href=='#about-me') document.querySelector('.adjust-size-mob').scrollTo(0, 0);
            if(href=='#contact') document.querySelector('.adjust-size-mob > div').scrollTo(0, 0);
            
             switch (href) {
                case '#galleries':
                    mainSlidePages.style.left=0 + 'vw';
                  //  document.querySelectorAll('.page .end')[0].style.backgroundColor='transparent';
              setTimeout(()=>{  
                basicColorsAndBackgrounds(colorsBackgrounds);
                colorsBackgroundsGalleriesPage(colorsBackgrounds);
            },200);
                if(window.innerWidth>990) {
                    underscore.style.left=`${0 -  3 * widthOfNavLink -3 * totalNavPadding }px`; } 
                    break;
                case '#about-me':
                    colorsBackgroundsAboutMePage(colorsBackgrounds);
                    mainSlidePages.style.left='-100vw';
                    setTimeout(()=>{
                        if(colorsBackgrounds[2].bodyBackgroundImg !=''){
                            document.querySelector('body').style.backgroundImage=`url(${colorsBackgrounds[2].bodyBackgroundImg})`;
                        }
                    },200);
                    
                    if(window.innerWidth>990)   underscore.style.left=`${0 -  2 * widthOfNavLink - 3.5* totalNavPadding  }px`;
                    break;
                case '#contact':
                    colorsBackgroundsContactPage(colorsBackgrounds);
                    setTimeout(()=>{
                        if(colorsBackgrounds[3].bodyBackgroundImg !=''){
                            document.querySelector('body').style.backgroundImage=`url(${colorsBackgrounds[3].bodyBackgroundImg})`;
                           
                        }
                    },200);
                   
                    mainSlidePages.style.left='-200vw';
                    if(window.innerWidth>990)   underscore.style.left=`${0 -   widthOfNavLink +  totalNavPadding}px`;
                    break;
              
            }
        });
    });
    
    const loadingAnimation =document.querySelector('.loadingAnimation');
   
    
    navBtn();
  
    setTimeout(()=>{
    loadingAnimation.style.display='none';
    document.querySelector('.main-frame').style.display='block';
    adjustBtstrpCss();
    },4000);
    setTimeout(()=>{
        const navbarItems = document.querySelectorAll('.nav-item');
       
        
        navbarItems.forEach(item => {
            item.style.transition = 'none'; 
            item.style.animation = 'none'; 
            item.style.opacity='1';
        });
        const navbarToggler = document.querySelector('.navbar-toggler');
        navbarToggler.style.animation = 'none';
        navbarToggler.style.opacity='1';
        const underscore = document.querySelector('.underscore');
       underscore.style.animationDuration='2s';
      /*  underscore.style.animation = 'none';
        underscore.style.opacity='1';*/
      },7000);
        /* Adjusting duration of nav(move and opacity) after load animation */ 
      setTimeout(function() {
        let navbar = document.querySelector('.navbar');
        let navTitle = document.querySelector('#nav-title');
        navbar.style.animationDuration = '1.5s';
        navTitle.style.animationDuration='2s';
    }, 10000); 

    
    setInterval(() => {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let text = `&nbsp;&nbsp;All rights reserved`;
        
        // Kreiranje novog span elementa za tekst "All rights reserved"
        let textSpan = document.createElement('span');
        textSpan.innerHTML = text;
        textSpan.style.fontSize = '.7rem';
        
        let footerText = `Copyright&copy; MarkArt ${year} ${textSpan.outerHTML}`;
        
        // Selektovanje elemenata sa klasom `.end` unutar elemenata sa klasom `.page`
        let footerTextElements = document.querySelectorAll('.page .end');
        
        
            footerTextElements.forEach(element => {
                element.innerHTML = footerText;
            });
        
       
    }, 1000);
   
     }  


function reloadDataBases(){
   generateGalleriesPage();
   generateAboutMePage();
   generateContactPage();
   colorsAndBackgrouns();
   setAllClickable();
}

     window.addEventListener('resize',()=>{
        
        exitFullscreenAboutMePageOnResize()
        
        underscorePosition();
        adjustBtstrpCss();
        navBtn();
        setUnderscore();
        backToContain();
        
            colorsBackgroundsAboutMePage(colorsBackgrounds);
            colorsBackgroundsContactPage(colorsBackgrounds);
        
        
        colorsBackgroundsGalleriesPage(colorsBackgrounds);
        
        
        if( document.getElementById('slider').style.display=='flex') document.getElementById('galleries').style.backgroundImage=``;
        });


function generateGalleriesPage(){
    // console.log('ucitavam single galleries');
    let cardFrame=document.getElementById('firstPageCardsFrame');
    let frameMainGrid= document.querySelector('.switch-to-single-gallery');


    
    for(let i=0;i<generateGalleries.length;i++){   
    let singleGallery= document.createElement('div');
    let newCard = document.createElement('div');
     newCard.classList.add('col-12', 'ps-0', 'col-sm-6', 'col-md-6', 'col-lg-4');
     singleGallery.classList.add('single-gallery');
     
    
    
     newCard.innerHTML =`
    
                            <div class="card bg-light ">
                                <p class="title-of-single-gallery ">${generateGalleries[i].title}</p>
                                    <img class="img-fluid" src=${generateGalleries[i].mainPicture} alt="">
                               
                            </div>
                        
     `;
    
    cardFrame.appendChild(newCard);
    
                         
     generateGalleries[i].imgUrls.forEach(background=>{
          
          let frameBetween= document.createElement('div');
    let underGridDiv= document.createElement('div');
      if(background.animation=='Down')      frameBetween.classList.add(`${background.shape}`,'animate__animated',`animate__backIn${background.animation}`);
      if(background.animation=='Up')      frameBetween.classList.add(`${background.shape}`,'animate__animated',`animate__backIn${background.animation}`);
      if(background.animation=='Right')      frameBetween.classList.add(`${background.shape}`,'animate__animated',`animate__backIn${background.animation}`);
      if(background.animation=='Left')      frameBetween.classList.add(`${background.shape}`,'animate__animated',`animate__backIn${background.animation}`);
     underGridDiv.classList.add('under-grid-div');
     underGridDiv.style.backgroundImage = `url(${background.url})`;
     frameBetween.appendChild(underGridDiv);
     singleGallery.appendChild(frameBetween);
     });
     frameMainGrid.appendChild(singleGallery);
    }
    
    document.querySelector('.swiper-btn-contain-cover').addEventListener('click', () => {
        // Provera da li je kliknuto dugme
        
        if (window.innerWidth <= 900) {
            console.log('radi na prvu')
            let swiperSlides = document.querySelectorAll('.swiper-slide');
            
            // Iteracija kroz sve swiper-slide elemente
            swiperSlides.forEach(slide => {
                // Promena veličine pozadine u zavisnosti od trenutnog stanja
                if (getComputedStyle(slide).backgroundSize === 'cover') {
                    slide.style.backgroundSize = 'contain';
                    
                } else {
                    slide.style.backgroundSize = 'cover';
                }
            });
        } 
    });   
}

function generateAboutMePage(){
    let accordionsBoard = document.getElementById('accordions-board');
    document.getElementById('title-of-page').innerText = `${aboutMe.titleOfPage}`;
    document.getElementById('profile-image').src = `${aboutMe.profileImage}`;
    document.getElementById('title-of-text').innerText = `${aboutMe.titleOfText}`;
    document.querySelector('.lead').textContent = `${aboutMe.firstText}`;
    document.getElementById('second-text').textContent = `${aboutMe.secondText}`;
    document.getElementById('about-me-btn').innerHTML = `${aboutMe.btnText} `;
    document.getElementById('about-me-btn').classList.add('bg-warning')

    aboutMe.accordions.forEach((accordion) => {
        let accordionHTML = `
            <section class="drop-down-info" id="questions${accordion.id}1">
                <div class="container-fluid container-lg">
                    <h2 class="title-of-accordion text-center mb-4">${accordion.titleOfAccordion}</h2>
                    <div class="accordion" id="questions${accordion.id}">
        `;
        
        accordion.bodyOfAccordion.forEach((item, index) => {
            accordionHTML += `
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button${index === 0 ? '' : ' collapsed'} btn " type="button" data-bs-toggle="collapse" data-bs-target="#question${accordion.id}${index + 1}">
                            ${item.question}
                        </button>
                    </h2>
                    <div id="question${accordion.id}${index + 1}" class="accordion-collapse collapse${index === 0 ? ' show' : ''}">
                        <div class="accordion-body">
                            ${item.answer}
                        </div>
                    </div>
                </div>
            `;
        });
        
        accordionHTML += `
                    </div>
                </div>
            </section>
        `;
        
        accordionsBoard.innerHTML += accordionHTML;
    });
}

function generateContactPage(){
let contactInfo = document.getElementById('info-items');
contact.forEach(itemObject=>{
   contactInfo.innerHTML+=`
   <li class="list-group-item border-0 border-bottom">
   <span class="fw-bold">${itemObject.item}</span>${itemObject.info}
</li>
   `;
});
}

function colorsAndBackgrouns(){
      colorsBackgrounds.forEach(colBac=>{
      //  console.log(colBac.id)
        if(colBac.id==1){        
            console.log(colBac)    ;  
          basicColorsAndBackgrounds(colorsBackgrounds);
        }
        if(colBac.id==2){
          //  console.log(colBac)
            colorsBackgroundsGalleriesPage(colorsBackgrounds);
           
            }
        if(colBac.id==3){
           
            colorsBackgroundsAboutMePage(colorsBackgrounds);
           
            }
      if(colBac.id==4){
     //   console.log(typeof colBac.backgroundUrl, colBac.backgroundUrl);
        colorsBackgroundsContactPage(colorsBackgrounds);
        }
      
  
            
       
      });
}

function basicColorsAndBackgrounds(colorsBackgrounds){
   
        let colBac=colorsBackgrounds[0];
     document.getElementById('logo').src=colBac.logo;
     document.getElementById('entrance-logo').src=colBac.logo;
    document.querySelector('.navbar ').style.color=colBac.color;
    document.querySelectorAll('.navbar a').forEach(link => {
        link.style.color = `${colBac.color}`;
    });
    document.querySelectorAll('.nav-item').forEach(item => {
        item.style.color = `${colBac.color}`;
    });
    
   document.querySelectorAll('#gallery-frame .card').forEach(frame=>frame.style.border=`3px solid ${colBac.cardFrameColor}`)
    document.getElementById('nav-title').style.color=colBac.color;
    document.querySelector('.underscore').style.color=colBac.color;
    document.querySelectorAll('.page .end').forEach(span=>span.style.backgroundColor=colBac.backgroundUrl);
    document.querySelectorAll('.page .end').forEach(span=>span.style.color=colBac.color);
    document.querySelector('.navbar').style.background=colBac.backgroundUrl;
    document.querySelector('.navbar').style.backgroundColor=colBac.navbarBackgroundUrl;
    if(colBac.navbarBackgroundImg==''){
        document.querySelector('.navbar').style.backgroundImage=colBac.navbarBackgroundGradient;
    } else{
        document.querySelector('.navbar').style.backgroundImage=`url(${colBac.navbarBackgroundImg})`;
        document.querySelector('.navbar').style.backgroundSize='cover'; 
       // document.querySelector('.navbar').style.backgroundRepeat='no-repeat'; 
        document.querySelector('.navbar').style.backgroundPosition='center center'; 
    }
    
    
    
    document.getElementById('galleries').style.color=colBac.color;
    document.querySelector('body').style.background=colBac.backgroundUrl;
    
    document.getElementById('galleries').style.background=colBac.backgroundUrl;
    document.getElementById('about-me').style.background=colBac.backgroundUrl;
    document.getElementById('contact').style.background=colBac.backgroundUrl;
    document.querySelector('.switch-to-single-gallery').style.background=colBac.backgroundUrl;
   // document.querySelectorAll('.form-control').forEach(e=>e.style.backgroundColor=colBac.colorOfContactInfo);
    document.querySelectorAll('.list-group-item').forEach(e=>e.style.backgroundColor=colBac.colorsOfContactQuestion);
   let galleryFrame=document.getElementById('gallery-frame');
   galleryFrame.style.setProperty('--thumb-color', colBac.color);
   
  // document.querySelector('.navbar-light .navbar-toggler').borderColor= colBac.color; solve the toggler-color
    document.querySelectorAll('.nav-item').forEach(item=>{
        item.style.borderColor=colBac.color;
    });
    if(colBac.backgroundUrl=='transparent') {
        document.querySelector('body').style.backgroundImage=`url(${colBac.bodyBackgroundImg})`;
       
        
        document.querySelectorAll('.page .end').forEach(span => {
            span.style.backgroundColor = colBac.backgroundSpan;
        });
    } 
}


function colorsBackgroundsGalleriesPage(colorsBackgrounds){
    let colBac=colorsBackgrounds[1];
    //console.log(colBac.galleriesTransparentBackgroundSmall);
       document.getElementById('galleries').style.backgroundImage=`url(${colBac.galleriesTransparentBackgroundSmall})`;
       document.getElementById('galleries').style.backgroundRepeat='no-repeat';
       document.getElementById('galleries').style.backgroundSize=colBac.backgroundImgSize;
    if(window.innerWidth>992)   document.getElementById('galleries').style.backgroundPosition=colBac.backgroundImgPosition;
    if(window.innerWidth<=992 || document.querySelector('.switch-to-single-gallery').style.display=='block')   document.getElementById('galleries').style.backgroundImage=``;
    document.getElementById('slider').style.background=colBac.backgroundUrl;
    document.querySelectorAll('.card').forEach(card=>card.style.color=colBac.color);
   
    setTimeout(() => {
        let navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach((navItem,index) => {
            
            if (navItem.classList.contains('active')) {
              
              if(index==0){
                let current= colorsBackgrounds[0].backgroundUrl;
               
                document.querySelector('.navbar').style.backgroundColor=current;
                document.querySelector('body').style.backgroundColor=current;
                document.querySelectorAll('.navbar a').forEach(link => {
                    link.style.color = `${colorsBackgrounds[0].color}`;
                });
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.style.borderRight = `1px solid ${colorsBackgrounds[0].color}`;
                });
                
                document.getElementById('nav-title').style.color=colorsBackgrounds[0].color;
                document.querySelector('.underscore').style.color=colorsBackgrounds[0].color;
              }
              if(index==1){
                let current= colorsBackgrounds[2].backgroundColor;
                document.querySelector('.navbar').style.backgroundColor=current;
                document.querySelector('body').style.backgroundColor=current;
                document.querySelectorAll('.navbar a').forEach(link => {
                    link.style.color = `${colorsBackgrounds[2].navbarTextColor}`;
                });
                document.querySelectorAll('.nav-item').forEach(item => {
                    item.style.borderRight = `1px solid ${colorsBackgrounds[2].navbarTextColor}`;
                });
                
                document.getElementById('nav-title').style.color=colorsBackgrounds[2].navbarTextColor;
                document.querySelector('.underscore').style.color=colorsBackgrounds[2].navbarTextColor;
              }
              if(index==2){
                let current= colorsBackgrounds[3].backgroundColor;
                document.querySelector('.navbar').style.backgroundColor=current;
                document.querySelector('body').style.backgroundColor=current;
              }
            }
        });
    
       
    }, 200);
    

}



var colorFirstCounter=1;
function colorsBackgroundsAboutMePage(colorsBackgrounds){
    let colBac=colorsBackgrounds[2];
   let bodyBackground= document.querySelector('body').style.backgroundImage;
    document.getElementById('about-me').style.background=colBac.backgroundColor;
   
    if(colBac.backgroundColor!='transparent' || bodyBackground!=''  ) {
         document.querySelector('body').style.backgroundColor=colBac.backgroundColor;
       setTimeout(()=>{
        document.querySelectorAll('.navbar a').forEach(link => {
            link.style.color = `${colBac.navbarTextColor}`;
        });
        document.querySelectorAll('.nav-item').forEach(item => {
            item.style.borderRight =`1px solid ${colBac.navbarTextColor}` ;
        });
        document.getElementById('nav-title').style.color=colBac.navbarTextColor;
        document.querySelector('.underscore').style.color=colBac.navbarTextColor;
       },200);
        
        document.querySelectorAll('.page .end')[1].style.backgroundColor=colBac.backgroundColor;
        document.querySelectorAll('.page .end ')[1].style.color=colBac.colorSpan;
        document.getElementById('text-about-me').style.color=colBac.textColor;
        document.getElementById('title-of-page').style.color=colBac.textColorTitle;
        document.getElementById('about-me-btn').style.color=colBac.textColorBtn;
        
        document.querySelectorAll('.title-of-accordion').forEach(title=>title.style.color=colorsBackgrounds[2].accordionTitleColor);
    
        if(colorFirstCounter==1){
            document.querySelector('.navbar').style.backgroundColor=colBac.backgroundColor;
            colorFirstCounter++;
        }else{
            setTimeout(()=>{document.querySelector('.navbar').style.backgroundColor=colBac.backgroundColor;},200); 
          
        }
        document.querySelectorAll('.page .end').forEach(span => {
            span.style.backgroundColor = colorsBackgrounds[0].backgroundSpan;
        });
    }   
    
     
   if(window.innerWidth>=992) {
    document.getElementById('learn').style.backgroundImage=`url(${colBac.textBackgroundLarge})`;
    document.getElementById('profile-image').style.outline=`10px solid ${colBac.profileOutline}`;
    document.getElementById('about-me-btn').style.display='block';
} 
if (window.innerWidth<992) {
    
    document.getElementById('learn').style.backgroundImage=``;
    document.getElementById('profile-image').style.outline=`10px solid transparent`;
    document.getElementById('about-me-btn').style.display='none';
   }
    
}
var colorSecondCounter=1;
function colorsBackgroundsContactPage(colorsBackgrounds){
    let colBac=colorsBackgrounds[3];
    let bodyBackground= document.querySelector('body').style.backgroundImage;
  
 
    document.getElementById('contact').style.background=colBac.backgroundColor;
  
    if(colBac.backgroundColor!='transparent' || bodyBackground !=''){
          document.querySelector('body').style.backgroundColor=colBac.backgroundColor;
          setTimeout(()=>{
            document.querySelectorAll('.navbar a').forEach(link => {
                link.style.color = `${colBac.navbarTextColor}`;
            });
            document.querySelectorAll('.nav-item').forEach(item => {
                item.style.borderRight =`1px solid ${colBac.navbarTextColor}` ;
            });
            document.getElementById('nav-title').style.color=colBac.navbarTextColor;
            document.querySelector('.underscore').style.color=colBac.navbarTextColor;
           },200);
        document.querySelectorAll('.page .end')[2].style.backgroundColor=colBac.backgroundColor;
        document.querySelectorAll('.page .end')[2].style.color=colBac.mainColorLetters;
        if(colorSecondCounter==1){
            document.querySelector('.navbar').style.backgroundColor='lightblue';
            colorSecondCounter++;
        } else{
            setTimeout(()=>{document.querySelector('.navbar').style.backgroundColor=colBac.backgroundColor;},200); 
            
        }
        document.querySelectorAll('.page .end').forEach(span => {
            span.style.backgroundColor = colorsBackgrounds[0].backgroundSpan;
        });
       
    } 
    if(window.innerWidth>=768) {
        document.getElementById('contact').style.backgroundImage=`url(${colBac.backgroundImage})`;
        document.getElementById('contact').style.backgroundSize=colBac.percentOfLarge;
    } 
    if(window.innerWidth<768) {
        document.getElementById('contact').style.backgroundImage=`url(${colBac.smallSizeBackground})`;
        document.getElementById('contact').style.backgroundSize=colBac.percentOfSmall;
    }  
    
    
    document.getElementById('ask-section').style.color=colBac.color;
    document.getElementById('title-of-contact').style.color='transparent';
    document.getElementById('title-of-contact').style.setProperty('--text-stroke-color',colBac.color);
    let placeHolder =document.getElementById('textarea');
    placeHolder.style.setProperty('--placeholder-color', colBac.color);
    
    document.querySelectorAll('.list-group-item ').forEach(item=>item.style.color=colBac.color);
}









function adjustBtstrpCss() {
    if (window.innerWidth === 575) {
        let frame = document.querySelector('.col-12');
        let cards = document.querySelectorAll('.card');
        let frameWidth = frame.offsetWidth;
        let frameHeight = frame.offsetHeight;

        cards.forEach(card => {
            card.style.width = frameWidth + 'px';
            card.style.height = frameHeight + 'px';
        });
    } else {
        let cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.width = ''; 
            card.style.height = ''; 
        });
    }
}
    

function navBtn(){  
    underscorePosition();
    let navItems = document.querySelectorAll('.nav-item');
    let navbarToggler = document.querySelector('.navbar-toggler');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            if (window.innerWidth<992){  
                setTimeout(()=>{
                    navbarToggler.click();
                   
                },600);
                
                
                
            }
        });
    });  

    

setInterval(() => {
   handleHeightOfPages();
}, 1);



    
 

 
    document.querySelectorAll('.nav-item').forEach(item=>{
        item.addEventListener('click',(e)=>{
            
        let underscore=document.querySelector('.underscore');
        let widthOfNavLink=document.querySelector('.nav-link').clientWidth;
        let navItemPaddingLeft = window.getComputedStyle(document.querySelector('.nav-item')).paddingLeft;
        let totalNavPadding =parseInt(navItemPaddingLeft);
            const href = e.target.getAttribute('data-');
             const mainSlidePages = document.querySelector('.moving-pages');
            if(href=='#about-me') document.querySelector('.adjust-size-mob').scrollTo(0, 0);
            if(href=='#contact') document.querySelector('.adjust-size-mob > div').scrollTo(0, 0);
            
             switch (href) {
                case '#galleries':
                    mainSlidePages.style.left=0 + 'vw';
              setTimeout(()=>{  
                basicColorsAndBackgrounds(colorsBackgrounds);
                colorsBackgroundsGalleriesPage(colorsBackgrounds);
            },200)   
                if(window.innerWidth>990) {
                    underscore.style.left=`${0 -  3 * widthOfNavLink -3 * totalNavPadding }px`; } 
                    break;
                case '#about-me':
                    colorsBackgroundsAboutMePage(colorsBackgrounds);
                    mainSlidePages.style.left='-100vw';
                    if(window.innerWidth>990)   underscore.style.left=`${0 -  2 * widthOfNavLink - 3.5* totalNavPadding  }px`;
                    break;
                case '#contact':
                    colorsBackgroundsContactPage(colorsBackgrounds);
                    mainSlidePages.style.left='-200vw';
                    if(window.innerWidth>990)   underscore.style.left=`${0 -   widthOfNavLink +  totalNavPadding}px`;
                    break;
              
            }
        });
    });
    }
       



function handleHeightOfPages(){
    
    let pages= document.querySelectorAll('.page');
    let navHeight= document.querySelector('.navbar').clientHeight;
    pages.forEach(page=>{
        page.style.height=`calc(100vh - ${navHeight}px)`;
        page.style.marginTop=`${navHeight}px`;
    })
}
function underscorePosition(){
        
    let underscore=document.querySelector('.underscore');
    let widthOfNavLink=document.querySelector('.nav-link').clientWidth;
    let currentBottom = underscore.style.bottom;
    let currentLeft = underscore.style.left;
    let navItemPaddingLeft = window.getComputedStyle(document.querySelector('.nav-item')).paddingLeft;
    let totalNavPadding =parseInt(navItemPaddingLeft);
    underscore.style.width=`${widthOfNavLink -totalNavPadding*2}px`;
    underscore.style.bottom =`${currentBottom - 17}px`;
    underscore.style.left=`${currentLeft -  3 * widthOfNavLink -3* totalNavPadding }px`;
    
}
   //-------============########   SET THE ANIMATION ON SCROLL EVENT FOR CARDS ON THE MAIN PAGE  ######=========-------
   var x=1;
   var checkFirstXonDown=1;
   let galleries= document.getElementById('galleries');
let galleryFrame= document.getElementById('gallery-frame');
galleries.addEventListener('wheel', function(event) {
    const deltaY = event.deltaY;
    const currentScrollTop = galleryFrame.scrollTop;
    const maxScrollTop = galleryFrame.scrollHeight - galleryFrame.clientHeight;
    
    let paramDirection;
    if (deltaY < 0 && currentScrollTop > 0) {
        galleryFrame.scrollTop -= Math.min(currentScrollTop, Math.abs(deltaY));
        event.preventDefault();
        paramDirection=true; 
        
    }
    
    else if (deltaY > 0 && currentScrollTop < maxScrollTop) {
        galleryFrame.scrollTop += Math.min(maxScrollTop - currentScrollTop, deltaY);
        event.preventDefault(); 
        paramDirection=false;
       
    }
   scrollAnimationCard(paramDirection);
});



var backOnScrollBtn;
function scrollAnimationCard(paramDirection) {
    let wrapper= document.querySelector('.wrapper-main-galleries');
    if (window.innerWidth >= 992  && getComputedStyle(wrapper).display=='block') {
       
      //  console.log(typeof getComputedStyle(wrapper).display);
        let cardsImgs = document.querySelectorAll('.card img');
        let imageGroups = [];
        let group = [];
        cardsImgs.forEach((_, index) => {
            group.push({ index });
            if (group.length === 3 || index === cardsImgs.length - 1) {
                imageGroups.push(group);
                group = [];
            }
   });
   // Create a function for snap-scroll

     

   if(typeof paramDirection=='undefined'){
    x=imageGroups.length-1;
    document.getElementById('gallery-frame').scrollTo(0, 550*x);
   } else{
    if(!paramDirection) {
        if(x==imageGroups.length-1  ) {
            x=0;
            document.getElementById('gallery-frame').scrollTo(0, 550*x);
               
        } else if(x==0){
            x=1;
            document.getElementById('gallery-frame').scrollTo(0, 550*x);
        } else if(x>0 && x<imageGroups.length){
            if(checkFirstXonDown==1){
                x=1;
                checkFirstXonDown++;
                document.getElementById('gallery-frame').scrollTo(0, 550*x);
                return
            }
            x++;
            document.getElementById('gallery-frame').scrollTo(0, 550*x);
        }
       }else if (paramDirection) {
        if(x==0){
            x=imageGroups.length-2;
            document.getElementById('gallery-frame').scrollTo(0, 550*x);
           } else{
            x--;
            document.getElementById('gallery-frame').scrollTo(0, 550*x);
           }
       } 
   }
   backOnScrollBtn=x;
}
} 









document.getElementById('about-me-btn').addEventListener('click',aboutMeBtn) 
function aboutMeBtn()  {
    const element = document.getElementById('learn');
    const profileImage = document.getElementById('profile-image');
    let soundOnClick = new Audio('assets/sounds/flash.mp3');
    
    
  setTimeout(()=>{
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (element.requestFullscreen) {
            document.getElementById('profile-image').style.filter='saturate(1)';
            soundOnClick.play();
            
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) { 
            element.mozRequestFullScreen();
            soundOnClick.play();
        } else if (element.webkitRequestFullscreen) { 
            element.webkitRequestFullscreen();
            soundOnClick.play();
        } else if (element.msRequestFullscreen) { 
            element.msRequestFullscreen();
            soundOnClick.play();
        }

        
        profileImage.style.maxWidth = '73%';
    } else {
        if (document.exitFullscreen ) {
            document.exitFullscreen();
            document.getElementById('profile-image').style.filter=''; 
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { 
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

       
        profileImage.style.maxWidth = '100%';
        
    }
  },100)
  
};

// Dodavanje event listener-a za promenu stanja punog ekrana
document.addEventListener('fullscreenchange', () => {
    const profileImage = document.getElementById('profile-image');
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        profileImage.style.maxWidth = '100%';
        profileImage.style.filter='';
    }
});



function exitFullscreenAboutMePageOnResize() {
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        if (window.innerWidth < 992) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
}





















function setUnderscore(){
  let active = document.querySelector('.nav-item.active a');
  let data= active.getAttribute('data-');
 let underscore = document.querySelector('.underscore')
  let widthOfNavLink =document.querySelector('.nav-link').clientWidth;
  let navItemPaddingLeft = window.getComputedStyle(document.querySelector('.nav-item')).paddingLeft;
    let totalNavPadding =parseInt(navItemPaddingLeft);
  if(data=='#galleries') {
  
    underscore.style.left=`${0 -  3 * widthOfNavLink -3* totalNavPadding }px`;
}
  if(data=='#about-me') {
 
    underscore.style.left=`${0 -  2 * widthOfNavLink -3.5 * totalNavPadding }px`;
}
  if(data=='#contact') {
   
  
    underscore.style.left=`${0 -   widthOfNavLink + totalNavPadding }px`;
}
}


function backToContain(){
    let swiperSlides = document.querySelectorAll('.swiper-slide');
    if (window.innerWidth > 900) {
        
        swiperSlides.forEach(slide => {
           slide.style.backgroundSize='contain';
        });
    } else{
        swiperSlides.forEach(slide => {
            slide.style.backgroundSize='cover';
         });
    }
}

function setAllClickable(){  
document.querySelectorAll('.card.bg-light').forEach((card,index)=>{
    let backBtn = document.getElementById('back-from-single-to-galleries');
    
    card.addEventListener('click',(e)=>{
      
      
        
       document.getElementById('galleries').style.backgroundImage='';
     let allGaleries =  document.querySelectorAll('.single-gallery');
     allGaleries.forEach(gallery=>gallery.style.display='grid');
     for(let i=0;i<allGaleries.length;i++){
       if(i!=index) allGaleries[i].style.display='none';
     }
       
       document.querySelector('.wrapper-main-galleries').style.display='none';
       document.querySelector('.switch-to-single-gallery').style.display='block';
       document.querySelector('#gallery-frame').style.width='100%';
       document.querySelector('#gallery-frame').style.marginTop='50px';
       document.querySelector('#gallery-frame').style.marginLeft='0px';
       document.querySelector('nav').style.display='none';
       handleHeightOfPages();
       backBtn.style.display='block';
       document.querySelector('#gallery-frame').scrollTo(0,0);
    });
 
   
    backBtn.addEventListener('click',()=>{
        document.querySelectorAll('.page .end').forEach(span=>span.style.display='block');
        
       document.querySelector('.wrapper-main-galleries').style.display='block';
       document.querySelector('.switch-to-single-gallery').style.display='none';
       document.querySelector('#gallery-frame').style.width='';
       document.querySelector('#gallery-frame').style.marginTop='';
       document.querySelector('#gallery-frame').style.marginLeft='';
       document.querySelector('#gallery-frame').scrollTo(0,550*backOnScrollBtn);
       backBtn.style.display='none';
       document.querySelector('nav').style.display='block';
       document.getElementById('slider-off-btn').style.display='none';
       document.getElementById('slider').style.display='none';
      
       document.querySelectorAll('.card img').forEach(img=>{
        img.classList.remove('.animate-out-left');
        img.classList.add('animate-in-left');
        img.parentNode.style.opacity='1';
    });
      handleHeightOfPages();
       setUnderscore();
       basicColorsAndBackgrounds(colorsBackgrounds);
    colorsBackgroundsGalleriesPage(colorsBackgrounds);
    })
 });


 let allGaleries =  document.querySelectorAll('.single-gallery ');
     allGaleries.forEach((gallery,index)=>{
            gallery.addEventListener('click',(e)=>{
                let soundOnClick = new Audio('assets/sounds/flash.mp3');
               setTimeout(()=>{soundOnClick.play();},200); 
                document.querySelectorAll('.page .end').forEach(span=>span.style.display='none');
               // console.log(e.target.parentNode.parentNode)//pronadjena .sinle-gallery za swiper
                setImgIntoSlider(e.target)
                document.getElementById('slider-off-btn').style.display='block';
               let switchSliderColor = document.getElementById('slider').style.background;
               document.getElementById('galleries').style.backgroundColor=switchSliderColor; // Add variable equal with gallery 
              
                document.getElementById('slider').style.display='flex';
                document.querySelector('.switch-to-single-gallery').style.display='none';
                document.querySelector('#gallery-frame').style.width='103%';
                document.querySelector('#gallery-frame').style.marginLeft='-22px';
               
            });

            document.querySelector('.swiper-btn-contain-cover').addEventListener('click', () => {
                // Provera da li je kliknuto dugme
                
                if (window.innerWidth <= 900) {
                    let swiperSlides = document.querySelectorAll('.swiper-slide');
                    
                    // Iteracija kroz sve swiper-slide elemente
                    swiperSlides.forEach(slide => {
                        // Promena veličine pozadine u zavisnosti od trenutnog stanja
                        if (getComputedStyle(slide).backgroundSize === 'cover') {
                            slide.style.backgroundSize = 'contain';
                            
                        } else {
                            slide.style.backgroundSize = 'cover';
                        }
                    });
                } 
            });   
           


            if(document.getElementById('slider-off-btn')){   
            document.getElementById('slider-off-btn').addEventListener('click',()=>{
                basicColorsAndBackgrounds(colorsBackgrounds);
                document.querySelectorAll('.page .end').forEach(span=>span.style.display='block');
             document.getElementById('slider-off-btn').style.display='none';
             document.getElementById('slider').style.display='none';
             document.querySelector('.switch-to-single-gallery').style.display='block';
             document.querySelector('#gallery-frame').style.width='100%';
                document.querySelector('#gallery-frame').style.marginLeft='0px';
                let colorSwitchSlider =document.getElementById('galleries').style.background;
                document.querySelector('.switch-to-single-gallery').style.backgroundColor=colorSwitchSlider;
              
                
            });
          }
          
     });

     document.querySelector('.swiper-btn-contain-cover').addEventListener('click', () => {
        // Provera da li je kliknuto dugme
        
        if (window.innerWidth <= 900) {
            let swiperSlides = document.querySelectorAll('.swiper-slide');
            
            // Iteracija kroz sve swiper-slide elemente
            swiperSlides.forEach(slide => {
                // Promena veličine pozadine u zavisnosti od trenutnog stanja
                if (getComputedStyle(slide).backgroundSize === 'cover') {
                    slide.style.backgroundSize = 'contain';
                    
                } else {
                    slide.style.backgroundSize = 'cover';
                }
            });
        } 
    });      

     document.addEventListener('keydown', function (event) {
        
       
        if (event.key === 'ArrowLeft') {
            
                swiper.slidePrev(); 
                
        }
       
        else if (event.key === 'ArrowRight') {
            
                swiper.slideNext(); 
                
        }
    });

    }



    var swiper;
     function swiperInit() {
        
        if (swiper )  swiper.destroy();
        
        
    
       
        swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: '.swiper-pagination',
            effect: 'coverflow',
            grabCursor: true,
            centeredSlide: true,
            slidesPerView: 'auto',
            coverflow: {
                rotate: 30,
                stretch: 0,
                depth: 200,
                modifier: 1,
                slideShadows: true,
            },
            loop: true,
            slidesPerView: 3,
            slidesPerGroup: 1,
            speed: 500,
           
        });
    }
   

    
    function setImgIntoSlider(img) {
        
        let swiperWrapper = document.querySelector('.swiper-wrapper');
        swiperWrapper.innerHTML = '';
        
        let imgUrlCurrent = getComputedStyle(img).getPropertyValue('background-image');
        let current = imgUrlCurrent.slice(4, -1).replace(/"/g, "");
        
    
        let siblingUrls = [];
        img.parentNode.parentNode.querySelectorAll('.under-grid-div').forEach(backgroundImg => {
            if (backgroundImg !== img.parentNode) {
                let backgroundUrl = getComputedStyle(backgroundImg).getPropertyValue('background-image');
                let imageUrl = backgroundUrl.slice(4, -1).replace(/"/g, "");
                siblingUrls.push(imageUrl);
            }
        });
    
        // Pronađi indeks trenutne slike u nizu
        let currentIndex = siblingUrls.indexOf(current);
        if (currentIndex !== -1 && currentIndex !== 1) {
            // Premesti trenutnu sliku na drugo mesto u nizu
            siblingUrls.splice(1, 0, siblingUrls.splice(currentIndex, 1)[0]);
        }
    
        // Kreirajte niz objekata slika
        let images = siblingUrls.map(imageUrl => {
            let imgObj = new Image();
            imgObj.src = imageUrl;
            return imgObj;
        });
    
        // Čekajte da se sve slike učitaju
        Promise.all(images.map(image => {
            return new Promise(resolve => {
                image.onload = () => resolve();
            });
        })).then(() => {
            // Kada su sve slike učitane, dodajte ih u swiper-wrapper sa odgovarajućim dimenzijama
            siblingUrls.forEach((imageUrl, index) => {
                    let divSwiperSlider = `<div class="swiper-slide" style="background-image: url(${imageUrl}); "></div>`;
                    swiperWrapper.innerHTML += divSwiperSlider;

                   
            });
            
            swiperInit(); // Ponovo inicijalizujte swiper kada su svi slajdovi dodati
           
        });
        
    }
    
   
    
   
    
   


    

   





        