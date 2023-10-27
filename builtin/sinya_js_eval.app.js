include({
    id: 'sinya_js_eval',
    name: 'JavaScript Runtime',
    icon: 'fa-code',
    show_in_app_list: true,
    allow_multiple: true,
    size: [300, 400],
    resize: false,

    style: `
.app_sinya_js_eval > .content {
    overflow-x: hidden;
}  

.app_sinya_js_eval > .content > input {
    font-size: 15px;
    width: 270px;
    background: rgba(0,0,0,0.2);
    border: 0;
    border-radius: 0px;
    color: #fff;
    padding: 7px 15px 10px;
    margin: 0 0 10px; 
    outline: rgba(0,0,0,0.0);
    font-family: monospace;
}
.app_sinya_js_eval > .content > p {
    margin: 0px 10px 10px; 
    font-family: monospace;
    font-size: 16px;
    word-wrap: normal;
    text-wrap: wrap;

}


`  
    ,
    run: () => {
        run_id = Math.round(Math.random()*100000)
        render_window(app.sinya_js_eval, run_id, `<input id="app:sinya_js_eval:${run_id}:input:1" placeholder="in [1]" onchange="app.sinya_js_eval.submit(${run_id}, 1)">`)

    },

    submit: (run_id, input_id) => {
        code = document.getElementById(`app:sinya_js_eval:${run_id}:input:${input_id}`).value
        if_error = ''
        try { result = eval(code)} 
        catch (error) { 
            result = error 
            if_error = 'color: #f88'
        }
        content = get_window_content(app.sinya_js_eval, run_id)
        document.getElementById(`app:sinya_js_eval:${run_id}:input:${input_id}`).disabled = true
        content.innerHTML = `<input id="app:sinya_js_eval:${run_id}:input:${input_id+1}" placeholder="in [${input_id+1}]:" onchange="app.sinya_js_eval.submit(${run_id}, ${input_id+1})"><p style="${if_error}">${result}</p>` + content.innerHTML
        document.getElementById(`app:sinya_js_eval:${run_id}:input:${input_id}`).placeholder = `[${input_id}] `+code
        document.getElementById(`app:sinya_js_eval:${run_id}:input:${input_id+1}`).focus()
    },

    close: (run_id) => { remove_window(app.sinya_js_eval, run_id) }
})
