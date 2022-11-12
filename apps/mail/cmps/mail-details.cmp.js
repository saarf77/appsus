import { svgService } from '../services/mail-svg.service.js';

export default { 
    props: ['mail'],
    template:`
        <section class="mail-details" >
            <div class="details-title">
                <button @click="backEvent" class="back-btn circle-animation">
                    <img :src="backIcon" alt="" />
                </button>
                <span>FW:  </span>
                {{ mailTitle }}
            </div>
            <div class="details-sender">
            <div class="sender-icon">{{ signatureSender }}</div>    
            {{ mailSender }}
            </div>
            <div class="details-more-options"></div>
            <div class="mail-body">{{ maliBody }}</div>
        </section>
    `, 
    data(){
        return {
            detailsTitle: null,
            backIcon: null,
        }
    },
    created(){
        this.backIcon = svgService.getMailIcon('back');
    },
    methods:{
        backEvent(){
            this.$emit('BackFromDetails');
        }
        
    },
    computed:{
        mailSender(){
            if(!this.mail) return null;
            let str = this.mail.from;
            str = str.substring(0, str.indexOf('@'));
            if(str.includes('.')) str = str.replace('.', ' ');
            return str;
        }, 
        mailTitle(){
            if(!this.mail) return null;
            return this.mail.subject;
        },
        signatureSender(){
            if(!this.mailSender) return null;
            return this.mailSender[0].toUpperCase();
        },
        maliBody(){
            if(!this.mailSender) return null;
            return this.mail.body;
        } 
        
    }, 
    components:{
        svgService,
    }
}