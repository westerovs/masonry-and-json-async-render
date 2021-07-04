// utils
const render = (element, template, place = 'beforeend') => {
    if (element instanceof Element) {
        element.insertAdjacentHTML(place, template)
    }
}

const template = (item) => (`
   <li class="gallery__item">
      <p>${ item.title }</p>
      <img src="${ item.url }" alt="#">
   </li>
`)

try {
    const getResponse = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/photos')
        const receivedContent = await response.json()
        
        return receivedContent.splice(0, 100)
    }
    
    getResponse()
        .then((data) => {
            const galleryList = document.querySelector('.gallery__list')
    
            for (let item of data) render(galleryList, template(item))
            
            const galleryItems = galleryList.querySelectorAll('.gallery__item')
            console.log(galleryItems.length, 'карточек загружено и теперь можно с ними работать')
        })
} catch (err) {
    console.log(err)
    console.log('something went wrong...')
}

