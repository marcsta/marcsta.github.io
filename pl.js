const logo = document.querySelectorAll('#preloader-logo path');

for (let i = 0; i < logo.length; i++) {
  console.log(`Letter ${i} is ${logo[i].getTotalLength()}`); 
}


function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 0);
  })
}

loadData()
  .then(() => {
    let $html                  = document.querySelector('html');
    let js_preloader           = document.querySelector('.js_preloader');
    let js_preloader_path_last = document.querySelector('.js_preloader_path_last');
    
    js_preloader.classList.add('preloader_show');
    $html.classList.add('scroll_stop');  
    js_preloader_path_last.addEventListener("webkitAnimationEnd", preloaderRemove);
    js_preloader_path_last.addEventListener("animationend", preloaderRemove);

    function preloaderRemove() {
      js_preloader.classList.add('preloader_bg');
      setTimeout(function() {
        $html.classList.remove('scroll_stop');
        setTimeout(function () {
              document.querySelector('.js_preloader_wrap').remove();
            },300);
      },1000);
    }
  });