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
    size: [200, 300],

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
        <p>Background image</p><input placeholder="/media/bg.png" onchange="app.system_settings.edit('bg')" id="app:system_settings:bg_value">

        <div>
            <p>Blur support</p>
            <span class="fa fa-check-circle" onclick="app.system_settings.edit('blur')" id="app:system_settings:blur_value"></span>
        </div>
        <div>
            <p>Legacy window placing</p>
            <span class="fa fa-circle-o" onclick="app.system_settings.edit('legacy_wp')" id="app:system_settings:legacy_wp_value"></span>
        </div>

        <h2 style="margin: 10px 0 0px; color: #f99">IN DEVELOPMENT</h2>
        `)
    },
    edit: (value) => {
        console.log(value);
    },
    close: () => {
        remove_window(app.system_settings, 0)
    },

})
