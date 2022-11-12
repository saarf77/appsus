import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTES_KEY = 'notesDB'

_createNotes()

export const keepService = {
	query,
	remove,
	get,
	save,
	update,
	toggleTodoCheck,
}
function toggleTodoCheck(idx, noteId) {
	const notes = _loadFromStorage()
	const note = notes.find((note) => noteId === note.id)
	const todos = note.info.todos
	todos[idx].isChecked = !todos[idx].isChecked
	_sortByChecked(todos)
	_saveToStorage(notes)
	return Promise.resolve(todos)
}
  
function query() {
	return storageService.query(NOTES_KEY)
}

function remove(noteId) {
	return storageService.remove(NOTES_KEY, noteId)
}

function get(noteId) {
	return storageService.get(NOTES_KEY, noteId)
}

function update(note) {
	return storageService.put(NOTES_KEY, note)
}

function save(note) {
	const newNote = JSON.parse(JSON.stringify(note))
	return storageService.post(NOTES_KEY, newNote)
}

function _createNotes() {
	let notes = utilService.loadFromStorage(NOTES_KEY)
	if (!notes || !notes.length) {
		notes = [
			{
				id: utilService.makeId(),
				isPinned: false,
				bgClr: '#a7ffeb',
				type: 'noteTxt',
				info: { title: 'Passwords', txt: 'Password: 12345' },
			},
			{
				id: utilService.makeId(),
				isPinned: false,
				bgClr: '#a0c4ffff',
				type: 'noteTxt',
				info: { title: 'Important!', txt: "Mom's birthday!" },
			},
			{
				id: utilService.makeId(),
				isPinned: false,
				bgClr: '#fff475',
				type: 'noteTxt',
				info: { title: 'Meetings', txt: 'Bank meeting' },
			},
			{
				id: utilService.makeId(),
				isPinned: false,
				bgClr: 'white',
				type: 'noteTodos',
				info: {
					title: 'TODO List',
					todos: [
						{
							task: 'Buy onions',
							isDone: true,
						},
						{
							task: 'Keep diet',
							isDone: true,
						},
						{
							task: 'Dont forget to add .js after cmps',
							isDone: false,
						},
					],
				},
			},
			{
				id: utilService.makeId(),
				isPinned: false,
				bgClr: '#ccff90',
				type: 'noteImg',
				info: {
					title: 'What a Vue',
					src: 'https://cdn.britannica.com/65/162465-050-9CDA9BC9/Alps-Switzerland.jpg',
				},
			},
			{
				id: utilService.makeId(),
				isPinned: false,
				bgClr: '#fdcfe8',
				type: 'noteVideo',
				info: {
					title: 'Ash - Live at Blue Lagoon',
					src: 'https://www.youtube.com/embed/5IfuDxHEWr8',
				},
			},
			{
				id: utilService.makeId(),
				isPinned: false,
				bgClr: '#d7aefb',
				type: 'noteVideo',
				info: {
					title: 'Best swim',
					src: 'https://www.youtube.com/embed/F16s7w-111s',
				},
			},
			{
				id: utilService.makeId(),
				isPinned: false,
				bgClr: '#fbbc04',
				type: 'noteTxt',
				info: { title: 'Passwords', txt: 'New Password: 12345' },
			},
			{
				id: utilService.makeId(),
				isPinned: false,
				bgClr: 'white',
				type: 'noteTodos',
				info: {
					title: 'TODO List',
					todos: [
						{
							task: 'Fix my TV',
							isDone: false,
						},
						{
							task: 'Keep diet',
							isDone: true,
						},
						{
							task: 'Keep diet harder',
							isDone: false,
						},
					],
				},
			},

			{
				id: utilService.makeId(),
				isPinned: false,
				bgClr: '#fdcfe8',
				type: 'noteImg',
				info: {
					title: 'Cute Dog',
					src: 'https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_4x3.jpg',
				},
			},
			{
				id: utilService.makeId(),
				isPinned: false,
				bgClr: '#aecbfa',
				type: 'noteTxt',
				info: {
					title: 'Who will win the World-Cup bets',
					txt: 'Bet on Brazil',
				},
			},
			{
				id: utilService.makeId(),
				isPinned: false,
				bgClr: '#fdffb6ff',
				type: 'noteTodos',
				info: {
					title: 'TODO List',
					todos: [
						{
							task: 'Fix sink',
							isDone: true,
						},
						{
							task: 'Fix TV',
							isDone: true,
						},
						{
							task: 'Get a job',
							isDone: true,
						},
						{
							task: 'Start a diet',
							isDone: false,
						},
					],
				},
			},
			{
				id: utilService.makeId(),
				isPinned: false,
				bgClr: '#ccff90',
				type: 'noteTxt',
				info: {
					title: 'Call my girlfriend!',
					txt: '050-6339966',
				},
			},
			{
				id: utilService.makeId(),
				isPinned: false,
				bgClr: '#e8eaed',
				type: 'noteTxt',
				info: {
					title: 'House cleaning',
					txt: "Don't forget to use the dishwasher",
				},
			},
		]
		utilService.saveToStorage(NOTES_KEY, notes)
	}
	return notes
}
