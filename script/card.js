export default class Card {
  
  constructor(name, link) {
    this.link = link
    this.name = name     
  }

  createCard() {
      const placeCard = document.createElement('div');
      placeCard.classList.add('place-card');

     const image = document.createElement('div');
     image.classList.add('place-card__image');
     image.style.backgroundImage = `url(${this.link})`;

     const deleteButton = document.createElement('button');
     deleteButton.classList.add('place-card__delete-icon');

     const description = document.createElement('div');
     description.classList.add('place-card__description');

     const cardName = document.createElement('h3');
     cardName.classList.add('place-card__name');
     cardName.textContent = this.name;

     const likeButton = document.createElement('button');
     likeButton.classList.add('place-card__like-icon');

     image.appendChild(deleteButton);
     placeCard.appendChild(image);
     description.appendChild(cardName);
     description.appendChild(likeButton);
     placeCard.appendChild(description);


     return placeCard;
  }

  like = (event) => {
    event.target.classList.toggle('place-card__like-icon_liked');
  }
  remove = (event) => {

  }
}

// Ставим лайк
// function like(event){
//   if (event.target.classList.contains('place-card__like-icon')){
//       event.target.classList.toggle('place-card__like-icon_liked');
//   };
// }

// Удаление карточки
// function deleteCard(event) {
//   const target = event.target;
//   const placeCard = target.closest('.place-card');
//   if (event.target.classList.contains('place-card__delete-icon')){
//     placeCard.parentElement.removeChild(placeCard);
//   }
// }