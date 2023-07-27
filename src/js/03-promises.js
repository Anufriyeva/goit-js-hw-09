import notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() >= 0.3;
    setTimeout(() => {
      shouldResolve ? resolve({ position, delay }) : reject({ position, delay });
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', async function (event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const firstDelay = parseInt(formData.get('delay'));
  const step = parseInt(formData.get('step'));
  const amount = parseInt(formData.get('amount'));

  let i = 0;
  let accumulatedDelay = 0;

  while (i < amount) {
    const position = i + 1;
    const delay = firstDelay + accumulatedDelay;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    i++;
    accumulatedDelay += step;
  }
});