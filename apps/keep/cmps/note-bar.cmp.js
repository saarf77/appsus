import editNoteBox from './edit-note-box.cmp.js'

export default {
	name: 'noteBar',
	props:['noteToEdit'],
	template: `
	<section> 
		<div v-if="!isEditOrAdd" class="add-note-bar" @click="changeNoteType('noteTxt')">	
		<p>Take a note...</p>
	</div>
	</section>
	<edit-note-box v-if="isEditOrAdd" @changeNoteType="changeNoteType" :noteToEdit="this.noteToEdit" :noteType="this.noteType" @saveNote="onSaveNote" @closeEditBox="closeEditBox"></edit-note-box>

    `,
	components: { editNoteBox },
	data() {
		return {
			noteType: null,
		}
	},
	methods: {
		closeEditBox() {
			this.noteType = null
			this.$emit('closeEditBox')
		},
		changeNoteType(type) {
			this.noteType = type
		},
		onSaveNote(note) {
			this.$emit('saveNote', note)
		},
	},
	computed: {
		isEditOrAdd() {
			if (this.noteToEdit || this.noteType) return true
		},
	},

}
