function cookie_str_array() {

}

function load_storage(app_data){
    if (document.cookie == ''){
        document.cookie = 'system_app_manager|repos=|builtin/; expires=Mon, 1 Jan 2035 12:00:00 UTC;'
        document.cookie = 'system_app_manager|apps=|builtin/sinya_js_eval.app.js|builtin/sinya_notes.app.js; expires=Mon, 1 Jan 2035 12:00:00 UTC;'
        document.cookie = 'system_settings|blur=true; expires=Mon, 1 Jan 2035 12:00:00 UTC;'
        document.cookie = 'system_settings|bg=/media/bg.png; expires=Mon, 1 Jan 2035 12:00:00 UTC;'
    } 
    cookies = document.cookie.split('; ')
    data = {}
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        if (cookie.split('=')[0].split('|')[0] == app_data.id){
            const key = cookie.split('=')[0].split('|')[1]
            value = cookie.split('=')[1]
            if (value == 'true') {value = true}
            if (value == 'false') {value = true}
            if (value[0] == '|') {value = value.slice(1).split('|')}
            data[key] = value
        }
    }
    return data
}

function save_storage(app_data, data){
    for (let i = 0; i < Object.keys(data).length; i++) {
        const key = Object.keys(data)[i];
        var value = data[key] 
        if (typeof(value) == 'object'){
            value = ''
            for (let i = 0; i < data[key].length; i++) { value += `|${data[key][i]}` }
        }
        document.cookie = `${app_data.id}|${key}=${value}; expires=Mon, 1 Jan 2035 12:00:00 UTC`
        
    }
}



async function init_apps(){
    app_manager = load_storage({id: 'system_app_manager'})
    for (let i = 0; i < app_manager.apps.length; i++) {
        const app_url = app_manager.apps[i]

        el = document.createElement('script')
        el.async = false
        el.src = `${app_url}`
        el.type = 'text/javascript'

        document.getElementsByTagName('head')[0].appendChild(el)
        document.body.appendChild(el)
    }
    
    
}