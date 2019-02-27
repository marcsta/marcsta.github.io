const items = [...document.getElementsByClassName('gallery__item')];
const nature = items.filter(element => element.classList.contains('nature'));
const city = items.filter(element => element.classList.contains('city'));
const beach = items.filter(element => element.classList.contains('beach'));
const filters = [...document.querySelectorAll('.filter__item')];

filters.forEach((filterHasButton) => {
 filterHasButton.addEventListener('click', (e) => {
  const [, contentToFilter] = [...e.target.classList];

  items.forEach((el) => {
   el.classList.add('transition');
   el.classList.remove('transitioned');
  })

  setTimeout(() => {
   if(contentToFilter == 'nature') {
    showItems(nature);
   } else if(contentToFilter == 'beach') {
    showItems(beach);
   } else if (contentToFilter == 'city') {
    showItems(city);
   } else {
    showItems(items);
   }
  }, 400);

  const showItems = (itemToShow) => {
   items.forEach((el) => el.classList.add('hide'))
   itemToShow.forEach((el) => el.classList.remove('hide'));
   items.forEach((el) => {
    el.classList.remove('transition');
    el.classList.add('transitioned');
   })
  };

 });
});