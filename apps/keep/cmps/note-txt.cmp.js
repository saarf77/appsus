export default {
	name: 'noteTxt',
	props: ['info'],
	template: `
          <section class="note-txt" >
			  <h4 class="note-txt-title"  contenteditable="true">{{title}}</h4>
              <p  class="note-txt-text" contenteditable="true">{{txt}}</p>
          </section>
          `,
	data() {
		return {
			title: this.info.title,
			txt: this.info.txt,
		}
	},
	methods: {},
	computed: {},
}
