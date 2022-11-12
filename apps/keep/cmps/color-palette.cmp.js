// import { svgService } from "../services/svg.service"

export default {
	template: `
        <div class="color-choose-modal flex">
		<div class="default" title="default" @click.stop="onColorNote('white')"></div>
		<div class="red over" title="red" @click.stop="onColorNote('#f28b82')"></div>
		<div class="orange over" title="orange" @click.stop="onColorNote('#fbbc04')"></div>
		<div class="yellow over" title="yellow" @click.stop="onColorNote('#fff475')"></div>
		<div class="green over" title="Green" @click.stop="onColorNote('#ccff90')"></div>
		<div class="teal over" title="Teal" @click.stop="onColorNote('#a7ffeb')"></div>
		<div class="blue over" title="blue" @click.stop="onColorNote('#cbf0f8')"></div>
		<div class="dark-blue over" title="dark-blue" @click.stop="onColorNote('#aecbfa')"></div>
		<div class="purple over" title="purple" @click.stop="onColorNote('#d7aefb')"></div>
		<div class="pink over" title="light-pink" @click.stop="onColorNote('#fdcfe8')"></div>
		<div class="brown over" title="brown" @click.stop="onColorNote('#e6c9a8')"></div> 
		<div class="grey over" title="grey" @click.stop="onColorNote('#e8eaed')"></div> 
        </div>
          `,
	data() {
		return {}
	},
	methods: {
		onColorNote(color) {
			this.$emit('colorNote', color)
			this.$emit('closeModal')
		},
		// getKeepIcon(iconName) {
		// 	return KeepSvgs.getKeepIcon(iconName)
		// },
	},
	computed: {},
}


