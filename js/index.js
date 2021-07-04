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
    const galleryList = document.querySelector('.gallery__list')

    const getResponse = async () => {
        const response      = await fetch('http://jsonplaceholder.typicode.com/photos')
        let receivedContent = await response.json()
        receivedContent     = receivedContent.splice(0, 100)
        
        return receivedContent
    }
    
    getResponse().then((data) => {
        for (let item of data) render(galleryList, template(item))
        
        const galleryItem = Array.from(document.querySelectorAll('.gallery__item'))
        console.log(galleryItem.length, 'карточек загружено и теперь можно с ними работать')
    })
} catch (err) {
    console.log(err)
    console.log('something went wrong...')
}

