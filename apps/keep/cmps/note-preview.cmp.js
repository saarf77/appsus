import noteTxt from './note-txt.cmp.js'
import noteTodos from './note-todos.cmp.js'
import noteImg from './note-img.cmp.js'
import noteVideo from './note-video.cmp.js'
import colorPalette from './color-palette.cmp.js'
import noteAudio from './note-audio.cmp.js'

export default {
	name: 'notePreview',

	props: ['note'],
	template: `
        <section  class="note-container flex column space-between" :style="noteBgClr" >
                <component :is="note.type" :info="note.info" @updateInfo="onUpdateInfo" class="note-content"></component>
                    <ul class="action-btns clean-list flex space-around">
						<li title="Pin note" class="fa-solid fa-thumbtack pinned-note" :style="isPinned" @click="onPinNote"></li>
						<li title="Send as mail" class="fa-solid fa-envelope" @click="onSendToMail"></li>
						<!-- <i @click="toEmail" class="note-to-email-btn fas fa-paper-plane"></i> -->
                        <li title="Background options"  class=" color-bar fa-solid fa-palette" @click="openColorModal">
							<color-palette v-if="isChooseClr" :noteId="this.note.id" @colorNote="onColorNote" @closeModal="closeColorModal"></color-palette>
						</li>
						<li title="Make a copy" class="fa-solid fa-copy" @click="onCopyNote"></li>
                        <li title="Edit note" class="fa-solid fa-pen-to-square" @click="onEditNote"></li>
                        <li title="Delete note" class="fa-solid fa-trash-can" @click="onRemoveNote"></li>
                        <li title="Audio note" class="fa-solid fa-music" @click="onAudio"></li>
                      
                    </ul>

        </section>
    `,
	data() {
		return {
			isChooseClr: false,
		}
	},
	components: { noteTxt, noteTodos, noteImg, noteVideo, colorPalette,noteAudio },
	methods: {
		openColorModal() {
			this.isChooseClr = true
		},
		closeColorModal() {
			this.isChooseClr = false
		},
		onRemoveNote() {
			this.$emit('removeNote', this.note.id)
		},
		onColorNote(color) {
			this.$emit('colorNote', this.note.id, color)
		},
		onCopyNote() {
			this.$emit('copyNote', this.note.id)
		},
		onPinNote() {
			this.$emit('pinNote', this.note.id)
		},
		onEditNote() {
			this.$emit('editNote', this.note)
		},
		onUpdateInfo(newInfo) {
			this.$emit('updateInfo', this.note.id, newInfo)
		},
		onSendToMail() {
			this.$emit('sendToMail', this.note.id)
		},
		// toEmail() {
        //     this.$router.push(`mail/${this.note.id}`)
        // }
	},
	computed: {
		noteBgClr() {
			return { backgroundColor: this.note.bgClr ? this.note.bgClr : 'white' }
		},
		isPinned() {
			return { color: this.note.isPinned ? 'black' : 'color: var(--clr4)' }
		},
		pinNote() {
			return this.note.isPinned ? 'Unpin note' : 'Pin note'
		},
	},
	created() { },
}
