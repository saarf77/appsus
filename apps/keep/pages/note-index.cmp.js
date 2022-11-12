import { keepService } from '../services/note.service.js'
import { eventBus } from '../../../services/event-bus.service.js'
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import notePreview from '../cmps/note-preview.cmp.js'
import noteBar from '../cmps/note-bar.cmp.js'
import noteFilter from '../cmps/note-filter.cmp.js'

export default {
	name: 'note-index',

	template: `
		<section class="flex column align-center">
			<section class="main-container flex column align-center">
				<note-filter @filtered="setFilter"></note-filter>
				<note-bar @saveNote="saveNote" :noteToEdit="noteToEdit" @closeEditBox="closeEditBox"></note-bar>
				<ul class="note-list clean-list">
					<li v-for="(note, idx) in notesForDisplay" :key="note.id"> 
					<note-preview :note="note" @colorNote="changeNoteClr" @toEmail="toEmail" @sendToMail="sendToMail" @copyNote="copyNote" @removeNote="removeNote" @pinNote="pinNote" @updateInfo="updateInfo" @editNote="editNote"></note-preview>

					</li>
				</ul>
			</section>
		</section>
    `,
	data() {
		return {
			notes: null,
			noteToEdit: null,
			filterBy: null,
		}
	},
	components: { notePreview, noteBar, noteFilter },
	methods: {
		removeNote(id) {
            keepService.remove(id)
				.then(note => {
					const idx = this.notes.findIndex(note => note.id === id)
				this.notes.splice(idx, 1)
                    this.note = note
                        showSuccessMsg(`Note removed`)
                    })
                    .catch(err =>{
                        showErrorMsg('Cannot remove note')
                })
		},
		
		// copyNote(id) {
        //     keepService.save(note)
		// 		.then(copiedNote => {
		// 			const idx = this.notes.findIndex(note => note.id === id)
		// 			const note = this.notes.find(note => note.id === id)
		// 		this.notes.splice(idx, 0, copiedNote)
		// 		keepService.update(note)
		// 			this.note = note
        //                 showSuccessMsg(`Note removed`)
        //             })
        //             .catch(err =>{
        //                 showErrorMsg('Cannot remove note')
        //         })
        // },

		copyNote(id) {
			const note = this.notes.find(note => note.id === id)
			const idx = this.notes.findIndex(note => note.id === id)
			keepService
				.save(note)
				.then(copiedNote => this.notes.splice(idx, 0, copiedNote))
				keepService.update(note).then(note =>
					eventBus.emit('show-msg', {
						txt: 'Note copied',
						type: 'success',
					})
				)
		},
		pinNote(id) {
			const note = this.notes.find(note => note.id === id)
			const idx = this.notes.findIndex(note => note.id === id)
			note.isPinned = !note.isPinned
			this.notes.splice(idx, 1)
			if (note.isPinned) this.notes.unshift(note)
			else this.notes.push(note)
			keepService.update(note).then(note =>
				eventBus.emit('show-msg', {
					txt: `Note ${!note.isPinned ? 'unpinned' : 'pinned'}`,
					type: 'success',
				})
			)
		},
		setFilter(filterBy) {
			this.filterBy = filterBy
		},
		closeEditBox() {
			this.noteToEdit = null
		},
		editNote(note) {
			this.noteToEdit = note
		},
		updateInfo(id, newInfo) {
			const note = this.notes.find(note => note.id === id)
			note.info = newInfo
			keepService.update(note).then(note =>
				eventBus.emit('show-msg', {
					txt: 'Note updated',
					type: 'success',
				})
			)
		},
		saveNote(note) {
			if (!note.id) {
				keepService.save(note).then(note => {
					this.notes.unshift(note)
					showSuccessMsg(`Note saved`)
                    })
                    .catch(err =>{
                        showErrorMsg('Cannot save note')
                })
			} else {
				keepService.update(note).then(() => {
					this.notes = null
					keepService.query().then(notes => {
						this.notes = notes
						showSuccessMsg(`Note updated`)
                    })
                    .catch(err =>{
                        showErrorMsg('Cannot update note')
                })
				})
			}
		},

		// changeNoteClr(id,color) {
		// 	keepService.update(note)
		// 		.then(note => {
		// 			const note = this.notes.find(note => note.id === id)
		// 			note.bgClr = color
		// 			showSuccessMsg(`Note removed`)
        //             })
        //             .catch(err =>{
        //                 showErrorMsg('Cannot remove note')
        //         })
        // },
		changeNoteClr(id, color) {
			const note = this.notes.find(note => note.id === id)
			note.bgClr = color
			keepService.update(note).then(note =>
				eventBus.emit('show-msg', {
					txt: 'Note color changed',
					type: 'success',
				})
			)
		},
		toEmail() {
            this.$router.push(`mail/${this.note.id}`)
        }
	},
	
	computed: {
		notesForDisplay() {
			let notes = this.notes
			if (this.filterBy?.noteType) {
				notes = notes.filter(note => note.type === this.filterBy.noteType)
			}
			if (this.filterBy?.searchWord) {
				const regex = new RegExp(this.filterBy.searchWord, 'i')
				notes = notes.filter(note => {
					if (regex.test(note.info.title)) return true
					if (note.info.txt && regex.test(note.info.txt)) return true
					if (note.info.todos) {
						return note.info.todos.some(todo => regex.test(todo.task))
					}
				})
			}
			return notes
		},
		// pinNote() {
			
		// },
		// sendToMail() {
			
		// },
	},
	created() {
		keepService.query().then(notes => {
			const pinnedNotes = notes.filter(note => {
				if (note.isPinned) return note
				else return
			})
			const unpinnedNotes = notes.filter(note => {
				if (!note.isPinned) return note
				else return
			})
			let allNotes = []
			if (pinnedNotes.length) allNotes.push(...pinnedNotes)
			if (unpinnedNotes.length) allNotes.push(...unpinnedNotes)
			this.notes = allNotes
		})
	},
	watch: {
		'$route.query': {
			handler(query) {
				if (!query.title || !query.txt) return
				else {
					keepService.query().then(notes => {
						if (notes.some(note => note.info?.txt === query.txt)) return
						else {
							const note = {
								isPinned: false,
								bgClr: 'white',
								type: 'noteTxt',
								info: { title: '', txt: '' },
							}
							if (query.title) note.info.title = query.title
							if (query.txt) note.info.txt = query.txt
							this.saveNote(note)
						}
					})
				}
			},
			immediate: true,
		},
	},
}
