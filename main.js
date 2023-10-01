const inputNode = document.querySelector('.notes__input')
const listNode = document.querySelector('.notes__list')
const form = document.querySelector('.notes__form')
const addNotesBtn = document.querySelector('.notes__btn')
const removeBtn = document.querySelector('.notes__btn-close')

let notes

if (localStorage.getItem('notes')) {
   notes = JSON.parse(localStorage.getItem('notes'))
   removeBtn.classList.remove('display__none')
} else {
   notes = []
   removeBtn.classList.add('display__none')
}

form.addEventListener('submit', (e) => {
   e.preventDefault()

   if (inputNode.value.length === 0) { return }
   const addNewNote = {
      title: inputNode.value,
      completed: false,
   }
   notes.push(addNewNote)

   localStorage.setItem('notes', JSON.stringify(notes))

   render()
   inputNode.value = ''

   removeBtn.classList.remove('display__none')
})

function render() {
   getEmptyPage()
   notes.forEach((el, i) => {
      listNode.insertAdjacentHTML('beforeend', noteTemplate(el, i))
   })
}
render()

listNode.addEventListener('click', e => {
   if (e.target.dataset.index) {
      const index = parseInt(e.target.dataset.index)
      const type = e.target.dataset.type

      if (type === 'toggle') {
         notes[index].completed = !notes[index].completed
         localStorage.setItem('notes', JSON.stringify(notes))
      } else if (type === 'remove') {
         notes.splice(index, 1)
      }
   }
   render()
})

function noteTemplate(notes, i) {
   return `
      <li class="notes__list-item" data-id ='${localStorage.length}'>
         <span data-index="${i}" data-type="toggle" class="notes__list-span-btn btn-check_${notes.completed ? 'blue' : 'transparent'}">&check;</span>
            <span class="notes__list-span-box">
               <span class="${notes.completed ? 'notes__list-span_through' : 'notes__list-span_text'} ">${notes.title}</span>
               <span data-index="${i}" data-type="remove" class="notes__list-span-btn-close btn-close">&times;</span>
            </span>
      </li>
   `
}

function getEmptyPage() {
   listNode.innerHTML = ''
   if (notes.length === 0) {
      listNode.innerHTML = '<p>Здесь пока ничего нет</p>'
   }
}

removeBtn.addEventListener('click', () => {
   while (listNode.firstChild) {
      listNode.removeChild(listNode.firstChild)
   }
   localStorage.clear()
   notes = []
   getEmptyPage()

   removeBtn.classList.add('display__none')
})