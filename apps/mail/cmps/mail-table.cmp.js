import { eventBus } from '/services/event-bus.service.js';
import mailList from './mail-list.cmp.js';
import mailDetails from './mail-details.cmp.js';

export default {
    template:`
        <section class="mail-table">
            <header></header>
            <mail-list class="" :class="{hideme: isDetails}"/>
            <mail-details @BackFromDetails="backToInbox" class="" :class="{hideme: !isDetails}"  :mail="currMailDetails"/>
        </section >
    `, 
    data(){
        return {
            isDetails: false,
            currMailDetails: null
        }
    },
    methods:{
        getDetails(mail){
            this.currMailDetails = mail
            this.isDetails = true;
            this.updateTab(`details/${this.currMailDetails.id}`)
        },
        backToInbox(){
            this.isDetails = false;
            this.updateTab('inbox')
        },
        updateTab(val){
            this.$router.push({path:'/mail/list', query:{tab:val}})
        }
    },
    created(){
        eventBus.on('showDetails', this.getDetails);
    },
    watch:{
        /*$route: {
            handler(newValue, oldValue) {
            },
            deep: true
        }*/
    },
    components:{
        eventBus,
        mailList,
        mailDetails,
    }
}