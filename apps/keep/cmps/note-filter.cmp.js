import { svgService } from "../services/svg.service.js"

export default {
	name: 'noteFilter',

	template: `
		<section class="filter-bar-container">
            <section class="filter-bar flex">
				<button className='icon' v-html="getKeepIcon('search')" ></button>
                <input type="text" class="search-input" @input="setFilter" v-model="filterBy.searchWord" placeholder="Search">
                <div class="note-type-filter">
                    <ul class="note-types clean-list flex">
                        <li title="Notes" :style="isNote" class="fa-solid fa-comment" @click="changeNoteFilter('noteTxt')"></li>
                        <li title="TDOOS" :style="isList" class="fa-solid fa-list" @click="changeNoteFilter('noteTodos')"></li>
                        <li title="Images" :style="isImg" class="fa-solid fa-image" @click="changeNoteFilter('noteImg')"></li>
                        <li title="Videos" :style="isVideo" class="fa-brands fa-youtube" @click="changeNoteFilter('noteVideo')"></li>
                    </ul>
                </div>
            </section>
		</section>
    `,
	data() {
		return {
			filterBy: {
				searchWord: '',
				noteType: null,
			},
		}
	},
	components: {},
	methods: {
		changeNoteFilter(noteType) {
			if (this.filterBy.noteType !== noteType)
				this.filterBy.noteType = noteType
			else this.filterBy.noteType = null
			this.setFilter()
		},
		setFilter() {
			this.$emit('filtered', { ...this.filterBy })
		},
		getKeepIcon(iconName) {
			return svgService.getKeepIcon(iconName)
		},
	},
	computed: {
		isNote() {
			return {
				color: this.filterBy.noteType === 'noteTxt' ? '#2f934a' : 'black',
			}
		},
		isList() {
			return {
				color: this.filterBy.noteType === 'noteTodos' ? '#ffbd00' : 'black',
			}
		},
		isImg() {
			return {
				color: this.filterBy.noteType === 'noteImg' ? '#0077b6' : 'black',
			}
		},
		isVideo() {
			return {
				color: this.filterBy.noteType === 'noteVideo' ? '#d93025' : 'black',
			}
		},
	},
	created() {},
}
