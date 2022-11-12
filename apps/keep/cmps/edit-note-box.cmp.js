
export default {
	template: `
        <section class="edit-note-box">
			<form @submit.prevent="onSaveNote">
				<input v-model="this.title" type="text" placeholder="Title" class="title-input" autofocus>
				<textarea v-model="this.noteInfo" :placeholder="noteTypePlaceholder" cols="30" rows="10" class="note-input" required></textarea>
				<div class="flex space-between">
 					<input class="note-edit-btns" type="button" @click="onDiscardNote" value="Close">
 					<input class="note-edit-btns" type="submit" value="Save">
 				</div>
			</form>
			<div class="note-type-select">
 				<ul class="note-types clean-list flex space-around">
 					<li title="Add text" :style="isNote" class="fa-solid fa-comment" @click="changeNoteType('noteTxt')"></li>
 					<li title="Add List" :style="isList" class="fa-solid fa-list" @click="changeNoteType('noteTodos')"></li>
 					<li title="Add image" :style="isImg" class="fa-solid fa-image" @click="changeNoteType('noteImg')"></li>
 					<li title="Add Youtube video" :style="isVideo" class="fa-brands fa-youtube" @click="changeNoteType('noteVideo')"></li>
 					<li title="Add audio" :style="isAudio" class="fa-solid fa-music" @click="changeNoteType('noteAudio')"></li>
 				</ul>
             </div>
        </section>
    `,
	props: ['noteType', 'noteToEdit'],
	data() {
		return {
			title: null,
			id: null,
			isPinned: false,
			bgClr: 'white',
			noteInfo: null,
		}
	},
	methods: {
		changeNoteType(noteType) {
			this.$emit('changeNoteType', noteType)
		},
		onDiscardNote() {
			this.$emit('closeEditBox')
		},
		onSaveNote() {
			switch (this.noteType || this.noteToEdit.type) {
				case 'noteTxt':
					this.$emit('saveNote', {
						id: this.id,
						isPinned: this.isPinned,
						bgClr: this.bgClr,
						type: this.noteType || this.noteToEdit.type,
						info: { title: this.title, txt: this.noteInfo },
					})
					break
				case 'noteTodos':
					let todos = this.noteInfo.split(',')
					todos = todos.map(todo => {
						return { task: todo, isDone: false }
					})
					this.$emit('saveNote', {
						id: this.id,
						isPinned: this.isPinned,
						bgClr: this.bgClr,
						type: this.noteType || this.noteToEdit.type,
						info: { title: this.title, todos },
					})
					break
				case 'noteImg':
					this.$emit('saveNote', {
						id: this.id,
						isPinned: this.isPinned,
						bgClr: this.bgClr,
						type: this.noteType || this.noteToEdit.type,
						info: { title: this.title, src: this.noteInfo },
					})
					break
				case 'noteVideo':
					if (!this.noteInfo.includes('watch?v=')) {
						alert('Not a valid Youtube link')
						break
					}
					let link = this.noteInfo
					link = link.replace('watch?v=', 'embed/')
					this.$emit('saveNote', {
						id: this.id,
						isPinned: this.isPinned,
						bgClr: this.bgClr,
						type: this.noteType || this.noteToEdit.type,
						info: { title: this.title, src: link },
					})
					break
			}
			this.$emit('closeEditBox')
		},
	},
	computed: {
		noteTypePlaceholder() {
			switch (this.noteType) {
				case 'noteTxt':
					return 'Enter your text here...'
				case 'noteTodos':
					return 'Enter your tasks (separated by ",")'
				case 'noteImg':
					return 'Enter image URL'
				case 'noteVideo':
					return 'Enter a Youtube URL'
				case 'noteAudio':
					return 'Enter a audio URL'
			}
		},

		},
		created() {
			if (this.noteToEdit) {
				this.title = this.noteToEdit.info.title
				this.id = this.noteToEdit.id
				this.isPinned = this.noteToEdit.isPinned
				this.bgClr = this.noteToEdit.bgClr
				this.noteInfo =
					this.noteToEdit.info.txt ||
					this.noteToEdit.info.src ||
					this.noteToEdit.info.todos
						.map(todo => {
							return todo.task
						})
						.join(',')
			}
		},
}