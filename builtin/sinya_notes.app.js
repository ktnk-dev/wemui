include({
    id: 'sinya_notes',
    name: 'Note',
    icon: 'fa-sticky-note',
    show_in_app_list: true,
    allow_multiple: true,
    size: [100, 100],

    style: `
.app_sinya_notes > .content {
    display: flex;
    flex-direction: column;
}
.app_sinya_notes > .content > textarea {
    height: 100%;
    font-size: 15px;
    background: rgba(0,0,0,0.0);
    border: 0;
    border-radius: 0 0 10px 10px;
    color: #fff;
    padding: 5px 10px;
    min-width: 100px;
    min-height: 100px;
    outline: rgba(0,0,0,0.0);
    overflow-x: hidden;
}`  
    ,

    run: () => {
        run_id = Math.round(Math.random()*100000)
        render_window(app.sinya_notes, run_id, `<textarea oninput="app.sinya_notes.edit(${run_id})"></textarea>`)
    },

    edit: (run_id) => {
        content = get_window_content(app.sinya_notes, run_id)
        content.getElementsByTagName('textarea')[0].innerHTML = content.getElementsByTagName('textarea')[0].value   
    },

    close: (run_id) => { remove_window(app.sinya_notes, run_id) }
})