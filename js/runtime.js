function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, s*1000));
}

function apply_styles(app_data) {
    if (document.getElementById(`style:${app_data.id}`) == null) {
        style = document.createElement('style') 
        style.id = `style:${app_data.id}`
        if (typeof(app_data.z_index) == 'number'){z_index = `z-index: ${z_index};`}
        else {z_index = ''}
        maxsize = ``
        if (typeof(app_data.resize) == 'boolean'){
            if (app_data.resize == false){
                maxsize = `
    max-width: ${app_data.size[0]}px;
    max-height: ${app_data.size[1]}px;`
            } 
        }
        posX = window.innerWidth/2 - app_data.size[0]/2
        posY = window.innerHeight/2 - app_data.size[1]/2 - 50
        
        style.innerHTML = `
.app_${app_data.id} {
    opacity: 0;
    top: ${posY}px; 
    left: ${posX}px;
    min-width: ${app_data.size[0]}px;
    min-height: ${app_data.size[1]}px;
    ${z_index}
    ${maxsize}
} 
${app_data.style}


        `
        document.head.appendChild(style)
    } 
    return true
}

async function render_window(app_data, run_id, content, buttons = null, title = null){
    if (app_data.allow_multiple == false && document.getElementsByClassName(`app_${app_data.id}`).length > 0) {return false}
    if (document.getElementById(`app:${app_data.id}:${run_id}`) != null) {return false}
    
    apply_styles(app_data)
    
    if (title == null) {title = app_data.name}
    default_buttons = `<span class="fa fa-close" onclick="app.${app_data.id}.close('${run_id}')"></span>`
    if (buttons != null) {
        for (button in Object.keys(buttons)) {
            button = Object.keys(buttons)[button]
            func = buttons[button]
            default_buttons += `<span class="fa ${button}" onclick="app.${app_data.id}.${func}"></span>`
            console.log(default_buttons, button, func);
        }
    }
    inner = `
<app id="app:${app_data.id}:${run_id}" class="app_${app_data.id}">
    <div class="header" id="app:${app_data.id}:${run_id}:header">
        <div class="text">${title}</div>
        <div class="btns">${default_buttons}</div>
    </div>
    <div class="content" id="app:${app_data.id}:${run_id}:content">
        ${content}
    </div>
</app>`

    document.body.innerHTML += inner
    render_move()
    await sleep(.1)
    document.getElementById(`app:${app_data.id}:${run_id}`).style.opacity = 1

    if (app_data.runtime != undefined){app_data.runtime(run_id)}

}


async function remove_window(app_data, run_id) {
    try {
        document.getElementById(`app:${app_data.id}:${run_id}`).style.opacity = 0
        await sleep(.4)
        document.getElementById(`app:${app_data.id}:${run_id}`).remove()
        return true
    } catch {
        return false
    }
}

function get_window_content(app_data, run_id) {
    return document.getElementById(`app:${app_data.id}:${run_id}:content`)
}

async function init_statusbar(){
    
    inner = `
<div id="system_currtime">
    <span class="currtime"></span>
    <span class="currdate"></span>
</div>
    `
    for (let app_name in Object.keys(app)) {
        app_data = app[Object.keys(app)[app_name]]
        if (app_data.show_in_app_list == true){
            inner += `<div class="app_icon"><span class="fa ${app_data.icon}" onclick="app.${Object.keys(app)[app_name]}.run('#applist')"></span></div>`
        }
    }
    document.getElementById('system_statusbar').innerHTML = inner

    while (true) {
        date_object = new Date()
        time = date_object.toTimeString().slice(0, date_object.toTimeString().indexOf(' '))
        date = date_object.toDateString().slice(date_object.toDateString().indexOf(' '))
        inner = `<span class="currtime">${time}</span><span class="currdate">${date}</span>`
        document.getElementById('system_currtime').innerHTML = inner
        await sleep(1)
    }

}
function init_ui() {
    st = load_storage('system_settings')
    document.body.style.setProperty('--body-bg', `url(${st.bg})`)
    if (st.blur == true) { document.body.style.setProperty('--app-bg', `rgba(0,0,0,0.4)`) }
    else { document.body.style.setProperty('--app-bg', `#171717`) }
}

async function init() {
    force_storage_refresh()
    init_ui()
    init_apps()
    init_statusbar()
}
