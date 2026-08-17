const characterList = document.getElementById('character-list');
const loader = document.getElementById('loader');
const radioButtons = document.querySelectorAll('input[name="category"]');

// デフォルトで全キャラクター一覧を表示
fetchCharacters('all');

// ラジオボタンを選択するたびにAPIを叩き直す
radioButtons.forEach(radio => {
  radio.addEventListener('change', (e) => {
    fetchCharacters(e.target.value);
  });
});

async function fetchCharacters(category) {
  loader.style.display = 'block';
  characterList.innerHTML = '';

  try {
    // 選択されたラジオボタンのvalueに応じて叩くAPIのURLを変える
    const apiUrl = `https://ihatov08.github.io/kimetsu_api/api/${category}.json`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('データの取得に失敗しました');
    }

    const data = await response.json();

    // 取得したデータをループ処理して画面に表示する要素を組み立てる
    data.forEach(character => {
      const card = document.createElement('div');
      card.className = 'card';

      // 名前要素
      const name = document.createElement('h3');
      name.textContent = character.name;

      // 画像要素
      const img = document.createElement('img');
      const baseUrl = "https://ihatov08.github.io";
      const imagePath = character.image;
      img.src = `${baseUrl}${imagePath}`;
      img.alt = character.name;

      // カテゴリ要素
      const categoryText = document.createElement('p');
      categoryText.textContent = `カテゴリ: ${character.category}`;

      // 要素をカードに追加
      card.appendChild(name);
      card.appendChild(img);
      card.appendChild(categoryText);

      // カードを一覧エリアに追加
      characterList.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    characterList.innerHTML = `<p style="color: red; grid-column: 1 / -1;">エラーが発生しました: ${error.message}</p>`;
  } finally {
    loader.style.display = 'none';
  }
}