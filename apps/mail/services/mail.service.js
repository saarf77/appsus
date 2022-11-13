import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'loc-mail';
const DRAFT_KEY = 'draft-mail';
_createMail();

export const clientService = {
    query,
    post,
    remove,
    put,
}

function query() {
    return storageService.query(MAIL_KEY);
}

function post(storageType, mailData){
    switch(storageType){
        case 'mail':
            storageService.post(MAIL_KEY,mailData);
            break;
        case 'draft':
            //NOTE: using unshift so the first mail is the last one that had been composed
            storageService.get(DRAFT_KEY, mailData.id)
                .then(()=>{
                     //NOTE: if we got an entity from the storage => we need to update it!
                    storageService.put(DRAFT_KEY, mailData);
                    console.log('put draft in storage');
                }).catch(()=>{
                    //NOTE: async storage service return an error if there is no entity with the id you were looking for
                    storageService.post(DRAFT_KEY,mailData,false); 
                    console.log('post draft in storage');
                });

            break;
    }
}

function put(storageType, mailData) {
    switch(storageType){
        case 'mail':
            storageService.put(MAIL_KEY,mailData);
            break;
        case 'draft':
            storageService.put(DRAFT_KEY,mailData);
            break;
        }
}

function remove(storageType, mailId){
    switch(storageType){
        case 'mail':
            storageService.remove(MAIL_KEY,mailId);
            break;
        case 'draft':
            storageService.remove(DRAFT_KEY,mailId);
            break;
        }
}

function _createMail(){
    storageService.query()
    .then(mails=>{
        if(!mails || !(mails.length > 0)){
            storageService.saveAll(MAIL_KEY, HARDCODED_MAIL);
        }
    });
    
}


const HARDCODED_MAIL = [
    {
        id:'Xgm5Ye',
        tab: 'inbox',
        subject:'Miss you!',
        body:'Would love to catch up sometimes',
        isRead: true,
        isImportant: false,
        hasStar: false,
        sentAt:1599133930594,
        from:'mother@gmail.com',
        to:'user@appsus.com',
        hasAttach: true
    },
    {
        id:'VrBQP',
        tab: 'inbox',
        subject:'i\'m back baby!!!!',
        body:`It\'s time to get wild again, my friend and fiend. Let\'s meet up at our standard planet and state exploring 
        the universe by taking over it! it so good to catch up sometimes :)`,
        isRead: true,
        isImportant: false,
        hasStar: true,
        sentAt:1557458930594,
        from:'darth.puki@gmail.com',
        to:'user@appsus.com',
        hasAttach: false
    },
    {
        id:'1hvkg',
        tab: 'inbox',
        subject:'dear padawan',
        body:`catch up, i Would love to sometimes, as long as not disturbed your studies are. 
        having much fun i! and giggles this tiny island makes me. back shell you write me a mail.
         I have much joy in reading`,
        isRead: false,
        isImportant: false,
        hasStar: false,
        sentAt:1565133730594,
        from:'master.yoga@gmail.com',
        to:'user@appsus.com',
        hasAttach: true
    },
    {
        id:'SJIHg',
        tab: 'inbox',
        subject:'Miss you!',
        body:'Would love to catch up sometimes',
        isRead: true,
        isImportant: true,
        hasStar: true,
        sentAt:1588133930594,
        from:'doctor.seuss@gmail.com',
        to:'user@appsus.com',
        hasAttach: false
    },
    {
        id:'pHh7h',
        tab: 'inbox',
        subject:'Miss you!',
        body:'Would love to catch up sometimes',
        isRead: true,
        isImportant: false,
        hasStar: true,
        sentAt:1577133930594,
        from:'The.Wizard.of.Oz@yahoo.com',
        to:'user@appsus.com',
        hasAttach: false
    },
    {
        id:'4uSnH',
        tab: 'inbox',
        subject:'URGENT!',
        body:`Assalamu'alaikum!
        This is Brenda J. Gonzalez (LTC) of the U.S Army Special Operations Command (USASOC), 
        7th Special Forces Group (Airborne), Air Force Base, Afghanistan Please I need your urgent 
        assistance in securing a consignment (two trunk boxes) containing ($20,000,000), the funds 
        are surpluses of several contracts executed by my department during a supply of MH (Military Hardware).
        
        The consignment is presently in Amsterdam Schiphol Airport in the Netherlands, 
        via a U.S Military Air & Surface Transportation Company (ADM Europa LLC). 
        My desire and purpose is to have the (ADM Europa LLC) to deliver the funds to you for safe-keeping until 
        I return back to the U.S mid-next year after my deployment. 
        
        If you receive this message please e-mail me immediately with a delivery address and your full contact information; 
        the deal is 60/40 split (60% for me and 40% for you); I am not a greedy woman and I hope you will 
        not double cross a struggling uniform single mother with 3 teenage children?
        
        Once you receive the consignment ($20,000,000) take out your 40% ($8,000,000) and save my 60% ($12,000,000) 
        for me until I return back to the U.S mid-next year after my deployment.
        
        May God bless you as you extend your helping hand to the needy!
    
        Please REPLY!
        
        Respectfully,
        
        Lt. Col. Brenda J. Gonzalez (Mrs.)
        
        U.S. Army 7th Special Forces Group (Airborne)
        
        Air Force Base : Afghanistan`,
        isRead: true,
        isImportant: false,
        hasStar: false,
        sentAt:1574738930594,
        from:'nigerian.prince@yahoo.com',
        to:'user@appsus.com',
        hasAttach: true
    },
    {
        id:'YfhW3',
        tab: 'inbox',
        subject:'Miss you!',
        body:'Would love to catch up sometimes',
        isRead:false,
        isImportant: false,
        hasStar: false,
        sentAt:1668009111096,
        from:'momo@momo.com',
        to:'user@appsus.com',
        hasAttach: true
    },{
        id:'Xgm5Ye',
        tab: 'inbox',
        subject:'Miss you!',
        body:'Would love to catch up sometimes',
        isRead: true,
        isImportant: false,
        hasStar: false,
        sentAt:1668009111096,
        from:'momo@momo.com',
        to:'user@appsus.com',
        hasAttach: true
    },
    {
        id:'VrBQP',
        tab: 'inbox',
        subject:'Miss you!',
        body:'Would love to catch up sometimes',
        isRead: true,
        isImportant: false,
        hasStar: false,
        sentAt:1667009111096,
        from:'momo@momo.com',
        to:'user@appsus.com',
        hasAttach: false
    },
    {
        id:'1hvkg',
        tab: 'inbox',
        subject:'Miss you!',
        body:'Would love to catch up sometimes',
        isRead: true,
        isImportant: false,
        hasStar: false,
        sentAt:1551133930594,
        from:'momo@momo.com',
        to:'user@appsus.com',
        hasAttach: true
    },
    {
        id:'SJIHg',
        tab: 'send',
        subject:'Miss you!',
        body:'Would love to catch up sometimes',
        isRead: true,
        isImportant: false,
        hasStar: false,
        sentAt:1541133930594,
        from:'momo@momo.com',
        to:'user@appsus.com',
        hasAttach: false
    },
    {
        id:'pHh7h',
        tab: 'draft',
        subject:'I am bot miss you!',
        body:'please leave me alone!',
        isRead: true,
        isImportant: false,
        hasStar: true,
        sentAt:1551933930594,
        from:'user@appsus.com',
        to:'momo@momo.com',
        hasAttach: false
    },
    {
        id:'4uSnH',
        tab:'inbox',
        subject:'Miss you!',
        body:'Would love to catch up sometimes',
        isRead: true,
        isImportant: false,
        hasStar: false,
        sentAt:1588133930594,
        from:'momo@momo.com',
        to:'user@appsus.com',
        hasAttach: true
    },
    {
        id:'YfhW3',
        tab:'draft',
        subject:'Miss you!',
        body:'Would love to catch up sometimes',
        isRead: true,
        isImportant: false,
        hasStar: false,
        sentAt:1545433930594,
        from:'momo@momo.com',
        to:'user@appsus.com',
        hasAttach: true
    },
];