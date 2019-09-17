// Variables
const searchField = document.querySelector ('#write-emoji');
const select = document.querySelector ('#categories');
let listOfEmojis;
const favouriteEmojiObjects = [];

// Event listeners
select.addEventListener ('change', function () {
  const selectedCategory = this.value;

  showEmojiByCategory = listOfEmojis.filter (emoji => {
    return emoji.category
      .toLowerCase ()
      .includes (selectedCategory.toLowerCase ());
  });

  renderEmojis (showEmojiByCategory);
});

searchField.addEventListener ('keyup', search);

// Fetch API
function fetchEmojiApi () {
  fetch ('https://raw.githubusercontent.com/amio/emoji.json/master/emoji.json')
    .then (response => response.json ())
    .then (json => {
      listOfEmojis = json;

      // Render all emojis
      renderEmojis (listOfEmojis);

      // Render categories
      renderCategories (json);

      // Check if thereis something in local storage
      if (localStorage.getItem ('emojiObject')) {
        const savedEmojiNames = JSON.parse (
          localStorage.getItem ('emojiObject')
        );
        renderFavouritesFromStorage (savedEmojiNames);
      }
    });
}

function renderEmojis (listOfEmojis) {
  const emojisUl = document.querySelector ('#list-of-emojis');
  emojisUl.innerHTML = '';

  // Create li, span and button for each emoji
  listOfEmojis.forEach (emoji => {
    const emojiListItem = document.createElement ('li');
    const emojiAndNameDiv = document.createElement ('div');
    emojiAndNameDiv.classList.add ('emojis-div');

    // Add emoji picture
    const emojiSpan = document.createElement ('span');
    emojiSpan.innerHTML = emoji.char;
    emojiAndNameDiv.appendChild (emojiSpan);
    emojiSpan.classList.add ('emoji');

    // Add emoji name
    const nameSpan = document.createElement ('span');
    nameSpan.innerHTML = emoji.name;
    emojiAndNameDiv.appendChild (nameSpan);
    nameSpan.classList.add ('emojiName');

    // Add button
    const addToFavButton = document.createElement ('button');
    addToFavButton.innerHTML = 'Add to Favourite';

    // Append elements
    emojiListItem.appendChild (emojiAndNameDiv);
    emojiListItem.appendChild (addToFavButton);
    emojisUl.appendChild (emojiListItem);

    // Copy clicked emoji to clipboard
    emojiListItem.addEventListener ('click', function (clicked) {
      const clickedEmoji = clicked.target.parentElement;
      const copyEmoji = clickedEmoji.querySelector ('.emoji').innerHTML;
      writeToClipboard (copyEmoji);
    });

    // Add emoji to favourite
    addToFavButton.addEventListener ('click', function (clicked) {
      const clickedEmoji = clicked.target.parentElement;
      saveFavourites (clickedEmoji);
      renderFavouriteEmojis (clickedEmoji);
    });
  });
}

fetchEmojiApi ();

// Search emoji by input
function search () {
  const searchValue = searchField.value;
  const newListOfEmojis = listOfEmojis.filter (emoji => {
    return emoji.name.toLowerCase ().includes (searchValue.toLowerCase ());
  });
  renderEmojis (newListOfEmojis);
}

// Get categories
function renderCategories (jsonData) {
  const categoriesOfAllEmojis = jsonData.map (emoji => emoji.category);
  const categoriesOnly = [...new Set (categoriesOfAllEmojis)];

  // create option for each category
  categoriesOnly.forEach (category => {
    const option = document.createElement ('option');
    option.innerHTML = category;
    option.value = category;
    select.appendChild (option);
  });
}

// Load favourite emojis
function renderFavouriteEmojis (addedItem) {
  const addToFavouriteLi = addedItem;
  const favEmojisUl = document.querySelector ('#list-of-fav-emojis');
  
  // Append favourite emojis
  favEmojisUl.appendChild (addToFavouriteLi);
  const removeFromFavourite = addToFavouriteLi.querySelector ('button');
  removeFromFavourite.innerHTML = 'Remove from favourite';

  // Add eventListener to button
  removeFromFavourite.addEventListener ('click', function (clicked) {
    const removeItem = clicked.target.parentElement;
    removeItem.remove ();
  });
}

// Save favourite emojis to local storage
function saveFavourites (favouriteEmoji) {
  const emojiObject = favouriteEmoji;
  const emojiObjectString = emojiObject.outerHTML;
  favouriteEmojiObjects.push (emojiObjectString);
  localStorage.setItem ('emojiObject', JSON.stringify (favouriteEmojiObjects));
}

// Load locally stored emojis
function renderFavouritesFromStorage (emojiNameArray) {
  for (let i = 0; i < emojiNameArray.length; i++) {
    // renderFavouriteEmojis(emojiNameArray[i]);
    convertAndRenderFromStorage (emojiNameArray[i]);
  }
}

// Convert items from storage, and render as favourites
function convertAndRenderFromStorage (addedItem) {
  const addToFavouriteLi = document.createElement ('span');
  addToFavouriteLi.innerHTML = addedItem;
  renderFavouriteEmojis (addToFavouriteLi);
}
