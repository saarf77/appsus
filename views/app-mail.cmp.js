import { clientService } from '../apps/mail/services/mail.service.js';
import { svgService } from '../apps/mail/services/mail-svg.service.js';
import { eventBus } from '../services/event-bus.service.js';
import mailFilter from '../apps/mail/cmps/mail-filter.cmp.js';
import mailNav from '../apps/mail/cmps/mail-nav.cmp.js';
import mailTable from '../apps/mail/cmps/mail-table.cmp.js';
import composeMail from '../apps/mail/cmps/mail-compose.cmp.js';

export default {
    template:`
    <main class="mail-layout" @click="mouseClicked">
        <mail-filter />
        <section class="table-container">
            <mail-nav @composeNewMail="startNewDraft"/>
            <mail-table/>
        </section>
        <compose-mail class="mail-composer" :class="{conceal: !isComposeCmp}" 
        :isOpen="isComposeCmp" @saveToDraft="saveDraft" @saveAndClose="closeComposer"/>
        <div class="invalid-recipient" :class="{conceal: !isRecipientInvalid}">
            <header class="error-msg-title"> Error</header>
            <div class="error-msg">
                Please specify at least one recipient.
                <button class="quit-msg" @click="closeMsg('invalid')">O.K</button>
            </div>
            <button class="close-x-btn circle-animation" @click="closeMsg('invalid')">
                <img :src="closeX" alt="" />
            </button>
        </div>
        <div class="no-subject-msg" :class="{conceal: !isMailValid}">
            <header class="error-msg-title"> mail.appsus.com says</header>
            <div class="error-msg">
                Send this message without a subject or text in the body?
                <button class="ignore-msg" @click="closeMsg('no-subject')">Cancel</button>
                <button class="quit-msg">O.K</button>
            </div>
        </div>
        <div class="send-mail-msg" :class="{conceal: !hasSendMail}">

        </div>
    </main>
    `, data(){
        return {
            isComposeCmp: false,
            isRecipientInvalid: false,
            isMailValid: false,
            hasSendMail: false,
            composeIntervalId: null,
            closeX: null,
        }
    },
    methods:{
        closeAfterSend(){
            this.isComposeCmp = false;
        },
        sendMail(){
            eventBus.emit('sendMail')
        },
        startNewDraft(){
            this.isComposeCmp = true
        },
        saveDraft(value){
            clientService.post('draft', value);
        },
        closeComposer(value){
            clientService.post('draft', value);
            this.isComposeCmp = false;
        },
        mouseClicked(){
            eventBus.emit('mouseClicked');
        }, 
        showComposerMsg(value){
            switch(value){
                case 'invalid-target' :
                    this.isRecipientInvalid = true;
                break;
                case 'no-subject' :
                    this.isMailValid = true;
                break;
                case 'send-mail' :
                    this.hasSendMail = true;
                    break;
            }
        },
        closeMsg(value){
            switch(value){
                case 'invalid':
                    this.isRecipientInvalid = false;
                    break;
                case 'no-subject':
                    this.isMailValid = false;
                    this.sendMail();
                    break;
                case 'send':
                    this.hasSendMail = false;
                    break;
            }
        }
    }, created(){
            this.closeX = svgService.getMailIcon('closeX');
            eventBus.on('mail-msg', this.showComposerMsg);
            eventBus.on('mailComposed', this.closeAfterSend)
        
    },
    components:{
        mailFilter,
        svgService,
        mailNav,
        mailTable,
        composeMail,
        eventBus,
    }
}