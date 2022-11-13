import mailPreview from './mail-preview.cmp.js';
import { clientService } from '../services/mail.service.js'
import { eventBus } from '../../../services/event-bus.service.js';

export default {

    template: `
        <section class="mail-list">
            <mail-preview v-if="mailList && mailList.length > 0" v-for="mail in filteredMail" :mail="mail"
            :key="reloader"/>
        </section>
    `,
    data() {
        return {
            mailList: null,
            filteredMail: null,
            reloader: null,
            filterObj: {
                txt: ''
            },
        }
    },
    created() {
        clientService.query()
            .then(emails => {
                this.mailList = emails;
                this.filteredMail = emails;
            });

        eventBus.on('filter',this.updateFilter);
        eventBus.on('filterByValue', this.filterByTag);
    },
    methods:{
        updateTab(val){
            this.$router.push({path:'/mail/list', query:{tab:val}})
        },
        updateFilter(value){
            if(value.txt){
                this.filterObj.txt = value.txt.toLowerCase();
            }
            this.onFilter();
        },
        onFilter(){
            this.filteredMail = this.mailList;
            
            if(this.filterObj.txt.length > 0){
                this.filteredMail = this.mailList.filter((mail) => {
                   
                    let fromTxt = mail.from.toLowerCase();
                    let index = fromTxt.indexOf('@');
                    fromTxt = fromTxt.substring(0,index);

                    return fromTxt.includes(this.filterObj.txt);
                });
            }
        },
        filterByTag(value){
            this.filteredMail = this.mailList;

            switch (value) {
                case 'inbox':
                    return;
                    break;
                case 'star':
                    this.filteredMail = this.mailList.filter((mail) => {
                        return mail.hasStar;
                    });
                    break;
                case 'important':
                    this.filteredMail = this.mailList.filter((mail) => {
                        return mail.isImportant;
                    });
                    break;
                case 'sent':
                    this.filteredMail = this.mailList.filter((mail) => {
                        return mail.tag === 'send';
                    });
                    break;
                case 'draft':
                    this.filteredMail = this.mailList.filter((mail) => {
                        return mail.tag === 'draft';
                    });
                    break;
                default:
                    break;
            }
            
        } 
    }
    ,
    components: {
        mailPreview,
        eventBus,
        clientService,
    },
    watch: {
        /*$route(newQuestion, oldQuestion) {
          },
        $route: {
            handler(newValue, oldValue) {
            },
            deep: true
        }*/
    }
}