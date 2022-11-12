
  import { VueDraggableNext } from 'vue-draggable-next'
export default{
	template: `
  <div class="flex m-10">
            <draggable class="dragArea list-group w-full" :list="list" @change="log">
      <div
      class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
        v-for="element in list"
        :key="element.name"
      >
      {{ element.name }}
      </div>
      </draggable>
      </div>
    `,
     data() {
        return {
          enabled: true,
          noteList: [
          ],
          dragging: false,
        }
      },
    components: {
        draggable: VueDraggableNext,
    },
    methods: {
        log(event) {
          console.log(event)
        },
      },
 
}