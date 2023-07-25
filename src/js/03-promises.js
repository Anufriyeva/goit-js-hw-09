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

  const promises = [];

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const delay = firstDelay + i * step;
    promises.push(createPromise(position, delay));
  }

  try {
    const results = await Promise.allSettled(promises);
    results.forEach((result) => {
      const { position, delay } = result.value || result.reason;
      const status = result.status === 'fulfilled' ? '✅ Fulfilled' : '❌ Rejected';

      if (result.status === 'fulfilled') {
        notiflix.Notify.success(`${status} promise ${position} in ${delay}ms`);
      } else if (result.status === 'rejected') {
        notiflix.Notify.failure(`${status} promise ${position} in ${delay}ms`);
      }
    });
  } catch (error) {
    console.error('Error occurred:', error);
  }
});