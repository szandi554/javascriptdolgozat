document.addEventListener('DOMContentLoaded', () => {
  const div = document.getElementById('bgBox');
  const originalImage = 'images.jpg';
  const clickedImage = 'hornokpuppy-kutya-husky.jpg';

  div.style.backgroundImage = `url('${originalImage}')`;

  div.addEventListener('click', () => {
    div.style.backgroundImage = `url('${clickedImage}')`;

    setTimeout(() => {
      div.style.backgroundImage = `url('${originalImage}')`;
    }, 2000);
  });
});

