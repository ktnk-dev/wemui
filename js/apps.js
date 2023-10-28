const app = {}

function include(app_data){ 
    app[app_data.id] = app_data 
    init_statusbar()
}


include({
    id: 'system_settings',
    name: 'Settings',
    icon: 'fa-gear',
    show_in_app_list: true,
    allow_multiple: false,
    size: [200, 90],

    style: `
.app_system_settings > .content {
    display: flex;
    flex-direction: column;

    padding: 10px;
}
.app_system_settings > .content > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 10px;
}
.app_system_settings > .content > p {
    margin: 0 0 5px;
    font-weight: bold;
}
.app_system_settings > .content > div > p {
    font-weight: bold;
}
.app_system_settings > .content > div > .fa {
    cursor: pointer;
}
.app_system_settings > .content > input {
    font-size: 14px;
    width: 270px;
    background: rgba(0,0,0,0.2);
    border: 0;
    border-radius: 10px;
    color: #fff;
    padding: 7px 10px;
    margin: 0 0 15px; 
    outline: rgba(0,0,0,0.0);
} .app_system_settings > * > * > .fa-circle-o { color: #f99; } .app_system_settings > * > * > .fa-check-circle { color: #9f9; }
    `,

    run: () => {
        render_window(app.system_settings, 0, `
        <p>Background image</p><input placeholder="Default Background" onchange="app.system_settings.edit('bg')" id="app:system_settings:bg_value" spellcheck="false">

        <div>
            <p>Blur support</p>
            <span class="fa" onclick="app.system_settings.edit('blur')" id="app:system_settings:blur_value"></span>
        </div>
        <!-- <div>
            <p>Legacy window placing</p>
            <span class="fa fa-circle-o" onclick="app.system_settings.edit('legacy_wp')" id="app:system_settings:legacy_wp_value"></span>
        </div> -->

        
        `)
        st = load_storage('system_settings')
        if (st.bg == '/media/bg.png') {document.getElementById('app:system_settings:bg_value').value  = ''}
        else {document.getElementById('app:system_settings:bg_value').value = st.bg }

        if (st.blur == true) { document.getElementById('app:system_settings:blur_value').classList.add('fa-check-circle') }
        else { document.getElementById('app:system_settings:blur_value').classList.add('fa-circle-o') }
    },
    edit: (value) => {
        st = load_storage('system_settings')
        if (value == 'bg') { 
            st.bg = document.getElementById('app:system_settings:bg_value').value 
            if (st.bg == '') {
                st.bg = '/media/bg.png'
                document.getElementById('app:system_settings:bg_value').placeholder = 'Default Background'
            } else {document.getElementById('app:system_settings:bg_value').placeholder = st.bg}
        } if (value == 'blur') {
            be = document.getElementById('app:system_settings:blur_value').classList
            if (be.value.indexOf('fa-check-circle') != -1) {
                be.remove('fa-check-circle')
                be.add('fa-circle-o')
                st.blur = false

            } else {
                be.remove('fa-circle-o')
                be.add('fa-check-circle')
                st.blur = true
            }
        }

        save_storage('system_settings', st)
        init_ui()
    },
    close: () => {
        remove_window(app.system_settings, 0)
    },

})
