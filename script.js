const quoteBody = document.querySelector('.quote__body');
const quoteText = document.querySelector('.quote__text blockquote');
const quoteAuthor = document.querySelector('.quote__autor strong');
const loader = document.querySelector('.loader');
const btn = document.querySelector('.btn');

const facebookBtn = document.getElementById('facebook');
const whatsappBtn = document.getElementById('whatsapp');
const twitterBtn = document.getElementById('twitter');

const slidingAnimation = function () {
  quoteText.classList.add('slideLeft');
  quoteAuthor.classList.add('slideRight');

  setTimeout(() => {
    quoteText.classList.remove('slideLeft');
    quoteAuthor.classList.remove('slideRight');
  }, 500);
};

const loadingAnimationStart = function () {
  quoteText.textContent = '';
  quoteAuthor.textContent = '';

  quoteBody.style.display = 'none';
  loader.style.display = 'block';
};

const loadingAnimationFinish = function () {
  quoteBody.style.display = 'flex';
  loader.style.display = 'none';
};

const shareOnSocialMedia = function () {
  whatsappBtn.setAttribute(
    'href',
    `https://web.whatsapp.com/send?text=${encodeURI(
      quote.quoteText
    )} - *${encodeURI(quote.quoteAuthor)}*`
  );
  twitterBtn.setAttribute(
    'href',
    `https://twitter.com/intent/tweet?text=${encodeURI(
      quote.quoteText
    )} - ${encodeURI(quote.quoteAuthor)}`
  );
};

const quoteAPI = 'https://quote-garden.onrender.com/api/v3/quotes/random';
let quote = {};
const getQuotes = async function () {
  loadingAnimationStart();
  try {
    const responce = await fetch(quoteAPI);
    const quoteData = await responce.json();
    quote = quoteData.data[0];
  } catch (err) {
    console.log(err);
  }
  quoteText.textContent = quote.quoteText;
  quoteAuthor.textContent = quote.quoteAuthor;
  slidingAnimation();
  shareOnSocialMedia();
  loadingAnimationFinish();
};
getQuotes();

btn.addEventListener('click', e => {
  e.preventDefault();
  getQuotes();
});
